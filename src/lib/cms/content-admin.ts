import "server-only";
import type { NextRequest } from "next/server";
import { staffEndpoint } from "@/lib/auth/request";
import { assertCanPublish } from "@/lib/auth/publishing";
import { hasPermission } from "@/lib/auth/permissions";
import { HttpError } from "@/lib/http/errors";
import { readJsonObject } from "@/lib/http/request";
import { databaseError, errorResponse } from "@/lib/http/responses";
import {
  CONTENT_DEFINITIONS,
  isContentEntity,
} from "@/features/admin/cms/content-config";
import { invalidatePublicContent } from "./invalidate";
import {
  parseProductInput,
  parseBlogInput,
  parseBrandInput,
  parseCategoryInput,
  parseResourceInput,
  parsePageInput,
  parseSettingsInput,
  parseRecordId,
} from "@/lib/validation/admin";

const parsers = {
  products: parseProductInput,
  blog: parseBlogInput,
  brands: parseBrandInput,
  categories: parseCategoryInput,
  resources: parseResourceInput,
  pages: parsePageInput,
  settings: parseSettingsInput,
};
export type ContentContext = {
  params: Promise<{ entity: string; id?: string }>;
};

export async function contentRequest(
  request: NextRequest,
  context: ContentContext,
) {
  try {
    const { entity, id: rawId } = await context.params;
    if (!isContentEntity(entity))
      throw new HttpError(
        404,
        "NOT_FOUND",
        "This content section does not exist.",
      );
    const definition = CONTENT_DEFINITIONS[entity];
    const permission =
      entity === "settings"
        ? "settings:manage"
        : request.method === "GET"
          ? "content:read"
          : request.method === "DELETE"
            ? "content:publish"
            : "content:write";
    return staffEndpoint(
      request,
      permission,
      async ({ client, staff }) => {
        if (request.method === "GET") {
          const page = Number(request.nextUrl.searchParams.get("page") || 1);
          const pageSize = Number(
            request.nextUrl.searchParams.get("pageSize") || 25,
          );
          const search = request.nextUrl.searchParams.get("q")?.trim() || "";
          if (
            !Number.isInteger(page) ||
            page < 1 ||
            page > 100_000 ||
            !Number.isInteger(pageSize) ||
            pageSize < 1 ||
            pageSize > 100 ||
            search.length > 200
          )
            throw new HttpError(
              400,
              "INVALID_INPUT",
              "Choose a valid page and search query.",
            );
          let query = client
            .from(definition.table)
            .select("*", { count: "exact" })
            .order("created_at", { ascending: false })
            .order("id");
          if (search)
            query = query.ilike(
              definition.nameField,
              `%${search.replace(/[\\%_]/g, "\\$&")}%`,
            );
          const { data, count, error } = await query.range(
            (page - 1) * pageSize,
            page * pageSize - 1,
          );
          if (error) databaseError(error, "list content");
          return {
            items: data ?? [],
            page,
            pageSize,
            total: count ?? 0,
            hasMore:
              count !== null
                ? page * pageSize < count
                : data?.length === pageSize,
          };
        }
        const id = rawId ? parseRecordId(rawId) : null;
        if (request.method === "DELETE") {
          if (!id)
            throw new HttpError(400, "INVALID_INPUT", "Choose a record.");
          const { data, error } = await client
            .from(definition.table)
            .update({ [definition.publication]: false })
            .eq("id", id)
            .select("id")
            .maybeSingle();
          if (error) databaseError(error, "unpublish content");
          if (!data)
            throw new HttpError(404, "NOT_FOUND", "The record was not found.");
          invalidatePublicContent();
          return { success: true };
        }
        const creating = request.method === "POST";
        if (!creating && !id)
          throw new HttpError(400, "INVALID_INPUT", "Choose a record.");
        const input = parsers[entity](
          await readJsonObject(request, 131_072),
          creating,
        );
        if (creating && !Object.hasOwn(input, definition.publication))
          input[definition.publication] = false;
        if (entity !== "settings")
          assertCanPublish(staff.role, input[definition.publication]);
        let query;
        if (creating)
          query = client.from(definition.table).insert(input).select().single();
        else {
          let update = client.from(definition.table).update(input).eq("id", id);
          if (
            entity !== "settings" &&
            !hasPermission(staff.role, "content:publish")
          )
            update = update.eq(definition.publication, false);
          query = update.select().maybeSingle();
        }
        const { data, error } = await query;
        if (error) databaseError(error, "save content");
        if (!data)
          throw new HttpError(
            404,
            "NOT_FOUND",
            "No editable record was found.",
          );
        invalidatePublicContent();
        return data;
      },
      request.method === "POST" ? 201 : 200,
    );
  } catch (error) {
    return errorResponse(error, "content request");
  }
}
