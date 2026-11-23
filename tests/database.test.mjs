import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { after, before, test } from "node:test";
import { PGlite } from "@electric-sql/pglite";

const ids = {
  admin: "11111111-1111-4111-8111-111111111111",
  editor: "22222222-2222-4222-8222-222222222222",
  sales: "33333333-3333-4333-8333-333333333333",
  outsider: "44444444-4444-4444-8444-444444444444",
};
let db;
before(async () => {
  db = await PGlite.create();
  await db.exec(
    await readFile(new URL("./fixtures/supabase.sql", import.meta.url), "utf8"),
  );
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const name of (await readdir(dir))
    .filter((name) => name.endsWith(".sql"))
    .sort()) {
    await db.exec(await readFile(new URL(name, dir), "utf8"));
  }
  for (const [role, id] of Object.entries(ids)) {
    await db.query("insert into auth.users(id,email) values($1,$2)", [
      id,
      `${role}@example.test`,
    ]);
    await db.query("insert into auth.sessions(id,user_id) values($1,$1)", [id]);
    if (role !== "outsider")
      await db.query(
        "insert into public.staff_members(user_id,email,role,is_active) values($1,$2,$3,true)",
        [id, `${role}@example.test`, role],
      );
  }
  await db.exec(`
    insert into public.brands(slug,name,is_active) values('published-brand','Published Brand',true),('draft-brand','Draft Brand',false);
    insert into public.categories(slug,name,is_active) values('published-category','Published Category',true);
    insert into public.products(slug,title,brand_id,category_id,is_active)
      select 'published-product','Published Product',b.id,c.id,true from public.brands b,public.categories c where b.slug='published-brand';
    insert into public.products(slug,title,brand_id,category_id,is_active)
      select 'draft-product','Draft Product',b.id,c.id,false from public.brands b,public.categories c where b.slug='published-brand';
    insert into public.enquiries(enquiry_id,name,email,message,enquiry_type) values('ENQ-fixture','Fixture Buyer','buyer@example.test','A test enquiry','product');
  `);
});
after(async () => {
  if (db) await db.close();
});

async function actor(role, operation, aal = "aal2") {
  return db.transaction(async (tx) => {
    const databaseRole =
      role === "anon" || role === "service_role" ? role : "authenticated";
    await tx.exec(`set local role ${databaseRole}`);
    await tx.query("select set_config('request.jwt.claims',$1,true)", [
      JSON.stringify({ sub: ids[role], session_id: ids[role], aal }),
    ]);
    return operation(tx);
  });
}
async function scalar(tx, sql) {
  return (await tx.query(sql)).rows[0].n;
}
async function denied(role, sql, aal) {
  await assert.rejects(
    actor(role, (tx) => tx.exec(sql), aal),
    (error) => ["42501", "23514"].includes(error.code),
  );
}

test("anonymous visitors see only published catalogue data and no enquiries", async () => {
  await actor("anon", async (tx) => {
    assert.equal(
      await scalar(tx, "select count(*)::int n from public.products"),
      1,
    );
    assert.equal(
      await scalar(tx, "select count(*)::int n from public.brands"),
      1,
    );
  });
  await denied("anon", "select * from public.enquiries");
  await denied("anon", "select * from public.staff_members");
});
test("an unapproved signed-in user cannot create content or see leads", async () => {
  await actor("outsider", async (tx) => {
    assert.equal(
      await scalar(tx, "select count(*)::int n from public.enquiries"),
      0,
    );
    assert.equal(
      await scalar(tx, "select count(*)::int n from public.products"),
      1,
    );
  });
  await denied(
    "outsider",
    "insert into public.brands(name,slug) values('Intruder','intruder')",
  );
});
test("editors can create drafts but cannot publish, alter published rows or delete them", async () => {
  await actor("editor", (tx) =>
    tx.exec(
      "insert into public.brands(name,slug) values('Editorial Draft','editorial-draft')",
    ),
  );
  await denied(
    "editor",
    "update public.brands set is_active=true where slug='editorial-draft'",
  );
  await actor("editor", async (tx) => {
    assert.equal(
      (
        await tx.query(
          "update public.brands set name='Changed' where slug='published-brand' returning id",
        )
      ).rows.length,
      0,
    );
    assert.equal(
      (
        await tx.query(
          "delete from public.brands where slug='published-brand' returning id",
        )
      ).rows.length,
      0,
    );
    assert.equal(
      await scalar(tx, "select count(*)::int n from public.products"),
      2,
    );
  });
});
test("administrators can publish while generated identity columns remain immutable", async () => {
  await actor("admin", (tx) =>
    tx.exec(
      "update public.brands set is_active=true where slug='editorial-draft'",
    ),
  );
  await denied(
    "admin",
    "update public.brands set created_at=now() where slug='editorial-draft'",
  );
  await denied(
    "admin",
    "update public.products set updated_at=now() where slug='draft-product'",
  );
});
test("sales can update lead status and notes but cannot change customer identity", async () => {
  await actor("sales", async (tx) => {
    assert.equal(
      await scalar(tx, "select count(*)::int n from public.enquiries"),
      1,
    );
    await tx.exec(
      "update public.enquiries set status='read',internal_notes='Follow up' where enquiry_id='ENQ-fixture'",
    );
    assert.equal(
      await scalar(tx, "select count(*)::int n from public.products"),
      1,
    );
  });
  await denied(
    "sales",
    "update public.enquiries set email='changed@example.test'",
  );
  await denied(
    "sales",
    "insert into public.enquiries(enquiry_id,name,email,message,enquiry_type) values('BYPASS','Buyer','buyer@example.test','Bypass','contact')",
  );
});
test("MFA is required for staff data but own membership supports initial enrollment", async () => {
  await actor(
    "admin",
    async (tx) => {
      assert.equal(
        await scalar(tx, "select count(*)::int n from public.staff_members"),
        1,
      );
      assert.equal(
        await scalar(tx, "select count(*)::int n from public.enquiries"),
        0,
      );
    },
    "aal1",
  );
  await denied(
    "admin",
    "insert into public.brands(name,slug) values('Password Only','password-only')",
    "aal1",
  );
});
test("disabling membership takes effect without refreshing the caller's claims", async () => {
  await db.query(
    "update public.staff_members set is_active=false where user_id=$1",
    [ids.sales],
  );
  await actor("sales", async (tx) =>
    assert.equal(
      await scalar(tx, "select count(*)::int n from public.enquiries"),
      0,
    ),
  );
  await db.query(
    "update public.staff_members set is_active=true where user_id=$1",
    [ids.sales],
  );
});
test("membership changes require an admin and cannot demote the caller", async () => {
  await denied(
    "editor",
    `select public.set_staff_member('${ids.editor}','editor@example.test','admin',true)`,
  );
  await denied(
    "admin",
    `select public.set_staff_member('${ids.admin}','admin@example.test','sales',false)`,
  );
  await denied("editor", "update public.staff_members set role='admin'");
  await actor("admin", (tx) =>
    tx.query("select public.set_staff_member($1,$2,$3,$4)", [
      ids.outsider,
      "outsider@example.test",
      "editor",
      false,
    ]),
  );
});
test("enquiry persistence atomically queues notifications and rate limiting is shared", async () => {
  assert.equal(
    await scalar(
      db,
      "select count(*)::int n from backend_private.notification_jobs",
    ),
    1,
  );
  await actor("service_role", async (tx) => {
    for (let i = 1; i <= 6; i++) {
      const result = (
        await tx.query(
          "select public.consume_request_limit($1,5,60) as result",
          ["a".repeat(64)],
        )
      ).rows[0].result;
      assert.equal(result.allowed, i <= 5);
    }
    assert.equal(
      (
        await tx.query(
          "select * from public.claim_enquiry_notifications(10,null)",
        )
      ).rows.length,
      1,
    );
    assert.equal(
      (
        await tx.query(
          "select * from public.claim_enquiry_notifications(10,null)",
        )
      ).rows.length,
      0,
    );
  });
  await denied(
    "admin",
    "select public.consume_request_limit(repeat('b',64),5,60)",
  );
  await denied(
    "anon",
    "select * from public.claim_enquiry_notifications(10,null)",
  );
});
test("private storage exposes only media referenced by published content", async () => {
  const path = `${ids.editor}/example.png`;
  await actor("editor", (tx) =>
    tx.query(
      "insert into storage.objects(bucket_id,name) values('images',$1)",
      [path],
    ),
  );
  await actor("anon", async (tx) =>
    assert.equal(
      await scalar(tx, "select count(*)::int n from storage.objects"),
      0,
    ),
  );
  await db.query(
    "update public.products set images=$1 where slug='published-product'",
    [[`/api/media/images/${path}`]],
  );
  await actor("anon", async (tx) =>
    assert.equal(
      await scalar(tx, "select count(*)::int n from storage.objects"),
      1,
    ),
  );
  await denied(
    "editor",
    `insert into storage.objects(bucket_id,name) values('images','${ids.admin}/wrong-owner.png')`,
  );
});
test("audit events are append-only for staff and contain no enquiry bodies", async () => {
  await actor("admin", async (tx) =>
    assert.equal(
      (await scalar(tx, "select count(*)::int n from public.audit_events")) > 0,
      true,
    ),
  );
  await denied(
    "admin",
    "insert into public.audit_events(table_name,operation) values('products','FORGED')",
  );
  await actor("editor", async (tx) =>
    assert.equal(
      await scalar(tx, "select count(*)::int n from public.audit_events"),
      0,
    ),
  );
});

test("revoked and expired sessions lose staff data access while an old JWT remains", async () => {
  await db.query(
    "update auth.sessions set not_after=now()-interval '1 minute' where id=$1",
    [ids.sales],
  );
  await actor("sales", async (tx) =>
    assert.equal(
      await scalar(tx, "select count(*)::int n from public.enquiries"),
      0,
    ),
  );
  await db.query("delete from auth.sessions where id=$1", [ids.sales]);
  await actor("sales", async (tx) =>
    assert.equal(
      await scalar(tx, "select count(*)::int n from public.enquiries"),
      0,
    ),
  );
  await actor("sales", async (tx) =>
    assert.equal(
      await scalar(tx, "select count(*)::int n from public.staff_members"),
      0,
    ),
  );
  await db.query("insert into auth.sessions(id,user_id) values($1,$1)", [
    ids.sales,
  ]);
});
test("Auth email lookup is available only to the trusted server role", async () => {
  await denied(
    "anon",
    "select * from public.find_staff_auth_user('admin@example.test')",
  );
  await denied(
    "admin",
    "select * from public.find_staff_auth_user('admin@example.test')",
  );
  await actor("service_role", async (tx) =>
    assert.equal(
      (
        await tx.query(
          "select * from public.find_staff_auth_user('admin@example.test')",
        )
      ).rows[0].user_id,
      ids.admin,
    ),
  );
});
test("category parent cycles are rejected by the database", async () => {
  await actor("admin", (tx) =>
    tx.exec(
      "insert into public.categories(name,slug) values('Parent','parent'); insert into public.categories(name,slug,parent_id) select 'Child','child',id from public.categories where slug='parent';",
    ),
  );
  await denied(
    "admin",
    "update public.categories set parent_id=(select id from public.categories where slug='child') where slug='parent'",
  );
});
test("attachments stay private to admin and sales and their metadata cannot be rewritten by sales", async () => {
  await db.exec(
    "insert into storage.objects(bucket_id,name) values('enquiry-attachments','private-reference.pdf'); update public.enquiries set attachment_path='private-reference.pdf',attachment_name='reference.pdf',attachment_mime='application/pdf',attachment_size=20,attachment_sha256=repeat('a',64) where enquiry_id='ENQ-fixture';",
  );
  for (const role of ["admin", "sales"])
    await actor(role, async (tx) =>
      assert.equal(
        await scalar(
          tx,
          "select count(*)::int n from storage.objects where bucket_id='enquiry-attachments'",
        ),
        1,
      ),
    );
  for (const role of ["anon", "editor"])
    await actor(role, async (tx) =>
      assert.equal(
        await scalar(
          tx,
          "select count(*)::int n from storage.objects where bucket_id='enquiry-attachments'",
        ),
        0,
      ),
    );
  await denied("sales", "update public.enquiries set attachment_path=null");
  await assert.rejects(
    db.exec(
      "update public.enquiries set attachment_mime=null where enquiry_id='ENQ-fixture'",
    ),
    (error) => error.code === "23514",
  );
});
test("published settings can expose their own media without exposing draft uploads", async () => {
  await db.exec(
    "insert into storage.objects(bucket_id,name) values('images','site-logo.png'); insert into public.settings(key,value,is_public) values('site','{\"logo\":\"/api/media/images/site-logo.png\"}',false);",
  );
  await actor("anon", async (tx) =>
    assert.equal(
      await scalar(
        tx,
        "select count(*)::int n from storage.objects where name='site-logo.png'",
      ),
      0,
    ),
  );
  await actor("admin", (tx) =>
    tx.exec("update public.settings set is_public=true where key='site'"),
  );
  await actor("anon", async (tx) =>
    assert.equal(
      await scalar(
        tx,
        "select count(*)::int n from storage.objects where name='site-logo.png'",
      ),
      1,
    ),
  );
});
test("brand logo policies correlate the object name and never expose unrelated draft files", async () => {
  await db.exec(
    "insert into storage.objects(bucket_id,name) values('images','brand-only.png'),('images','unlinked-draft.png'); update public.brands set logo_url='/api/media/images/brand-only.png' where slug='published-brand';",
  );
  await actor("anon", async (tx) => {
    assert.equal(
      await scalar(
        tx,
        "select count(*)::int n from storage.objects where name='brand-only.png'",
      ),
      1,
    );
    assert.equal(
      await scalar(
        tx,
        "select count(*)::int n from storage.objects where name='unlinked-draft.png'",
      ),
      0,
    );
  });
  await db.exec(
    "update public.brands set logo_url='/api/media/images/'||name where slug='published-brand';",
  );
  await actor("anon", async (tx) =>
    assert.equal(
      await scalar(
        tx,
        "select count(*)::int n from storage.objects where name='unlinked-draft.png'",
      ),
      0,
    ),
  );
});
