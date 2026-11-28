import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import UniversalQuoteApp from "@/features/products/universal-quote/UniversalQuoteApp";
import ContactPageApp from "@/features/contact/ContactPageApp";
import AboutPageApp from "@/features/about/AboutPageApp";
import ObjectFields from "@/features/admin/cms/ObjectFields";
import { SiteSettingsProvider } from "@/features/site/SiteSettings";
import type { Brand } from "@/types/cms";

test("an empty published catalogue offers a general quote without phantom selections", () => {
  const html = renderToStaticMarkup(
    <UniversalQuoteApp products={[]} categories={[]} brands={[]} />,
  );
  assert.match(html, /Our catalogue is being updated/);
  assert.match(html, /Select a product or model above/);
  assert.doesNotMatch(html, /sp-v010|Science Plus Variable Volume|Qty: 10/);
  assert.doesNotMatch(html, /<input(?=[^>]*type="checkbox")[^>]*checked/);
});

test("the quote selector contains only supplied catalogue options and starts unselected", () => {
  const html = renderToStaticMarkup(
    <UniversalQuoteApp
      products={[
        {
          id: "verified-model",
          name: "Verified Model",
          category: "Verified Category",
          brand: "Verified Brand",
        },
      ]}
      categories={["Verified Category"]}
      brands={["Verified Brand"]}
    />,
  );
  assert.match(html, /Verified Model/);
  assert.match(html, /Verified Category/);
  assert.match(html, /Verified Brand/);
  assert.doesNotMatch(
    html,
    /Science Plus|FAC Plus|<input(?=[^>]*type="checkbox")[^>]*checked/,
  );
  assert.match(html, /aria-label="Search published products or models"/);
});

test("contact information comes from approved public settings", () => {
  const html = renderToStaticMarkup(
    <SiteSettingsProvider
      value={{
        contact: {
          email: "sales@example.test",
          phone: "+91 12345 67890",
          businessHours: "Mon–Fri, 9am–5pm",
          address: "Example office",
        },
      }}
    >
      <ContactPageApp />
    </SiteSettingsProvider>,
  );
  assert.match(html, /href="mailto:sales@example.test"/);
  assert.match(html, /href="tel:\+911234567890"/);
  assert.match(html, /Mon–Fri, 9am–5pm/);
  assert.doesNotMatch(html, /PRIMARY EMAIL FROM CMS|VERIFY BUSINESS HOURS/);
});

test("missing contact settings produce useful enquiry guidance without placeholder links", () => {
  const html = renderToStaticMarkup(<ContactPageApp />);
  assert.match(html, /Send your enquiry using this form/);
  assert.doesNotMatch(html, /href="(?:mailto:|tel:)|\[PRIMARY|\[VERIFY/);
});

test("About links only to the supplied published brands and hides unfinished leadership", () => {
  const brand = {
    id: "fixture",
    name: "Verified Brand",
    slug: "verified-brand",
    description: "Verified description",
    website: null,
  } as Brand;
  const html = renderToStaticMarkup(<AboutPageApp brands={[brand]} />);
  assert.match(html, /href="\/brands\/verified-brand"/);
  assert.doesNotMatch(
    html,
    /href="\/brands\/(?:labxe|ssciences|danwer)"|\[OWNER|\[COMPANY|\[CHAIRMAN/,
  );
});

test("contact settings provide named controls and invalid JSON stays recoverable", () => {
  const html = renderToStaticMarkup(
    <ObjectFields
      id="settings"
      label="Public settings"
      group="contact"
      value='{"email":"sales@example.test"}'
      onChange={() => {}}
    />,
  );
  assert.match(html, /Public email/);
  assert.match(html, /Business hours/);
  assert.match(html, /type="email"/);
  assert.doesNotMatch(html, /<textarea/);
  const invalid = renderToStaticMarkup(
    <ObjectFields
      id="settings"
      label="Public settings"
      group="contact"
      value="{broken"
      onChange={() => {}}
    />,
  );
  assert.match(invalid, /<textarea/);
  assert.match(invalid, /Enter a valid JSON object/);
});
