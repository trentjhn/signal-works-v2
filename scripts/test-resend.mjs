// Resend send test for the Route-C intake notification path.
// Proves a real email leaves your account before the form goes live.
//
// Usage (from signal-works-v2/):
//   node --env-file=.env.local scripts/test-resend.mjs
//
// .env.local (gitignored) must contain:
//   RESEND_API_KEY=re_...
//   INTAKE_TO=your@email.com         # with onboarding@resend.dev this MUST be your Resend account email
//   INTAKE_FROM=onboarding@resend.dev

import { Resend } from "resend";

const { RESEND_API_KEY, INTAKE_TO, INTAKE_FROM } = process.env;

if (!RESEND_API_KEY) {
  console.error("Missing RESEND_API_KEY. Put it in .env.local (see header).");
  process.exit(1);
}
if (!INTAKE_TO) {
  console.error("Missing INTAKE_TO. With onboarding@resend.dev it must be your Resend account email.");
  process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);
const from = INTAKE_FROM ?? "onboarding@resend.dev";

const { data, error } = await resend.emails.send({
  from,
  to: INTAKE_TO,
  subject: "[AEO audit request] TEST — example.com",
  text: [
    "This is a Route-C intake test email. If you got it, the notification path works.",
    "",
    "Brand: Test Brand",
    "Website: https://example.com/",
    "Work email: founder@example.com",
    "Routing: high-touch (brand-domain email)",
    "",
    "NEXT STEP — run the audit in the sandbox:",
    "  SANDBOX_EGRESS_RESTRICTED=1 npm run audit:intake -- https://example.com/",
  ].join("\n"),
});

if (error) {
  console.error("Send FAILED:", error);
  process.exit(1);
}
console.log("Send OK. Resend id:", data?.id);
console.log(`Check the inbox for ${INTAKE_TO}.`);
