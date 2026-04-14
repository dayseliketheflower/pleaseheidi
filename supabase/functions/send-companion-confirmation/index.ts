// Supabase Edge Function — send-companion-confirmation
// Trigger: database webhook on INSERT to public.provider_applications
// Deploy: supabase functions deploy send-companion-confirmation
// Secret:  supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req: Request) => {
  try {
    const payload = await req.json();

    // Supabase database webhooks send { type, table, record, ... }
    const record = payload?.record ?? payload;
    const firstName: string = record?.first_name ?? "there";
    const email: string = record?.email;

    if (!email) {
      return new Response(JSON.stringify({ error: "No email in payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY not set" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const emailBody = `Hi ${firstName},

Thank you for applying to become a Heidi provider.

We've received your application and a member of our team will review it within 1-2 business days. We read every application individually — your personal statement matters to us.

Here's what to expect from here:

  Step 1 — Application review (happening now)
  Step 2 — Identity verification via Persona (we'll reach out within 48 hours)
  Step 3 — Background check via Checkr (3-5 business days)
  Step 4 — Social media review (conducted by our team)
  Step 5 — Video interview (20-30 minutes, scheduled by us)
  Step 6 — Provider training acknowledgment

You'll hear from us soon.

— The Heidi Team
info@pleaseheidi.com

---
Not therapy. Not dating. Not sexual services.`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Heidi <info@pleaseheidi.com>",
        to: [email],
        subject: "We received your Heidi provider application",
        text: emailBody,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", errText);
      return new Response(JSON.stringify({ error: errText }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify({ ok: true, id: data.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Function error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
