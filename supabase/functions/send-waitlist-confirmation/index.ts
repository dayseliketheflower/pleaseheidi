// Supabase Edge Function — send-waitlist-confirmation
// Trigger: database webhook on INSERT to public.client_signups
// Deploy: supabase functions deploy send-waitlist-confirmation
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

You're on the Heidi waitlist.

We'll be in touch when Heidi launches in New York City. We'll have early access spots reserved for people who signed up early — you're one of them.

Questions? Reach us at info@pleaseheidi.com.

— The Heidi Team

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
        subject: "You're on the Heidi waitlist",
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
