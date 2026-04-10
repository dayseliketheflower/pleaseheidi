import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import InvestorContactForm from './InvestorContactForm';

export const metadata: Metadata = {
  title: 'Heidi — Investor Information',
  description:
    'Heidi is an early-stage, two-sided marketplace for nonsexual companionship and emotional support for women. Learn about the company and contact us.',
};

const SERIF = "'Playfair Display', Georgia, serif";

const WHY_NOW = [
  'The loneliness crisis among women is documented and growing',
  'Demand for non-clinical emotional support has accelerated post-pandemic',
  'Trust infrastructure (identity verification, background check APIs, in-app safety tooling) is now mature enough to make this viable',
  'No funded, safety-first competitor exists in the US market',
];

export default function InvestorsPage() {
  return (
    <div style={{ backgroundColor: 'var(--heidi-canvas)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />

      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(160deg, var(--heidi-ocean) 0%, var(--heidi-primary-dark) 100%)`,
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <p className="text-label" style={{ color: 'var(--heidi-mist)', marginBottom: 14 }}>
          Investor information
        </p>
        <h1
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 600,
            color: 'var(--heidi-canvas)',
            marginBottom: 20,
            lineHeight: 1.2,
            maxWidth: 640,
            margin: '0 auto 20px',
          }}
        >
          A structured market for human presence.
        </h1>
        <p
          style={{
            fontSize: 16,
            color: 'var(--heidi-mist)',
            maxWidth: 520,
            margin: '0 auto',
            lineHeight: 1.65,
          }}
        >
          Heidi is an early-stage, two-sided marketplace connecting women with vetted companions for nonsexual
          emotional support and practical presence. We are building a new category — not a feature.
        </p>
      </section>

      <div style={{ maxWidth: 720, margin: '0 auto', width: '100%', padding: '72px 24px', display: 'flex', flexDirection: 'column', gap: 56 }}>

        {/* The Problem */}
        <section>
          <p className="text-label" style={{ color: 'var(--heidi-primary)', marginBottom: 12 }}>The problem</p>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 600, color: '#5C2D5C', marginBottom: 20 }}>
            The need is real. The infrastructure doesn&apos;t exist.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--heidi-mist)', lineHeight: 1.75, marginBottom: 16 }}>
            Loneliness, medical anxiety, grief, burnout — these are not niche experiences. They are the daily
            reality for millions of women who have no structured, safe way to get human support outside of
            therapy, relationships, or asking friends for favors they feel bad requesting.
          </p>
          <p style={{ fontSize: 15, color: 'var(--heidi-mist)', lineHeight: 1.75, marginBottom: 16 }}>
            Professional cuddling and companionship services exist in fragmented, informal, and often unvetted
            markets. Japan and South Korea have demonstrated significant willingness-to-pay for structured
            companionship — models that routinely charge the equivalent of $100–300 USD for multi-hour sessions.
            No credible, safety-first platform exists for this need in the United States.
          </p>
          <p style={{ fontSize: 15, color: 'var(--heidi-mist)', lineHeight: 1.75 }}>
            Heidi is building that platform.
          </p>
        </section>

        <div style={{ borderTop: '0.5px solid var(--heidi-foam)' }} />

        {/* What Heidi Is */}
        <section>
          <p className="text-label" style={{ color: 'var(--heidi-primary)', marginBottom: 12 }}>The category</p>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 600, color: '#5C2D5C', marginBottom: 20 }}>
            The category, clearly stated.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--heidi-mist)', lineHeight: 1.75, marginBottom: 16 }}>
            Heidi is a subscription and session-based marketplace. Clients pay to access a curated pool of
            vetted companions. Companions pay a platform fee and share a commission on completed sessions.
            The platform enforces a strict non-sexual scope through written agreements, identity verification,
            background checks, and active monitoring.
          </p>
          <div
            style={{
              backgroundColor: 'var(--heidi-surface)',
              border: '0.5px solid var(--heidi-primary-border)',
              borderRadius: 12,
              padding: '20px 24px',
              marginTop: 20,
            }}
          >
            <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--heidi-ocean)', lineHeight: 1.65 }}>
              This is not therapy. Not a dating app. Not an escort service. It is a new category: structured,
              safe, nonsexual human presence — for women who are ready to pay for it.
            </p>
          </div>
        </section>

        <div style={{ borderTop: '0.5px solid var(--heidi-foam)' }} />

        {/* Why Now */}
        <section>
          <p className="text-label" style={{ color: 'var(--heidi-primary)', marginBottom: 12 }}>Timing</p>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 600, color: '#5C2D5C', marginBottom: 24 }}>
            The conditions are right.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {WHY_NOW.map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  backgroundColor: 'var(--heidi-canvas)',
                  border: '0.5px solid var(--heidi-foam)',
                  borderRadius: 10,
                  padding: '14px 16px',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                  <path d="M5 13l4 4L19 7" stroke="var(--heidi-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: 14, color: 'var(--heidi-ocean)', lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <div style={{ borderTop: '0.5px solid var(--heidi-foam)' }} />

        {/* Business Model */}
        <section>
          <p className="text-label" style={{ color: 'var(--heidi-primary)', marginBottom: 12 }}>Revenue model</p>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 600, color: '#5C2D5C', marginBottom: 20 }}>
            How Heidi makes money.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Client subscriptions', body: 'Monthly or annual access fee to the marketplace.' },
              { label: 'Companion platform fee', body: 'Monthly fee to remain active on the platform.' },
              { label: 'Session commission', body: 'Platform takes a percentage of each completed session.' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  backgroundColor: 'var(--heidi-canvas)',
                  border: '0.5px solid var(--heidi-foam)',
                  borderRadius: 12,
                  padding: '18px 20px',
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--heidi-ocean)', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 14, color: 'var(--heidi-mist)', lineHeight: 1.6 }}>{item.body}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--heidi-mist)', lineHeight: 1.65, marginTop: 16 }}>
            Early pricing benchmarks are drawn from US professional cuddling services (~$60–80/hr) and Asian
            companionship models (~$100–300+ for multi-hour sessions). Heidi targets the upper-middle segment
            with a premium safety and trust positioning.
          </p>
        </section>

        <div style={{ borderTop: '0.5px solid var(--heidi-foam)' }} />

        {/* Current Stage */}
        <section>
          <p className="text-label" style={{ color: 'var(--heidi-primary)', marginBottom: 12 }}>Stage</p>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 600, color: '#5C2D5C', marginBottom: 20 }}>
            Where we are.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--heidi-mist)', lineHeight: 1.75, marginBottom: 12 }}>
            Heidi is pre-beta. The founding team is completing legal formation, platform architecture, and
            companion vetting infrastructure. We are accepting waitlist signups and building toward a
            controlled NYC launch.
          </p>
          <p style={{ fontSize: 15, color: 'var(--heidi-mist)', lineHeight: 1.75 }}>
            We are not overstating our stage. We are building carefully and deliberately.
          </p>
        </section>

        <div style={{ borderTop: '0.5px solid var(--heidi-foam)' }} />

        {/* Contact */}
        <section style={{ paddingBottom: 16 }}>
          <p className="text-label" style={{ color: 'var(--heidi-primary)', marginBottom: 12, textAlign: 'center' }}>Get in touch</p>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 600, color: '#5C2D5C', marginBottom: 16, textAlign: 'center' }}>
            Interested in learning more?
          </h2>
          <p style={{ fontSize: 15, color: 'var(--heidi-mist)', lineHeight: 1.65, marginBottom: 32, maxWidth: 440, margin: '0 auto 32px', textAlign: 'center' }}>
            If you are an investor and would like to learn more, send us a message below.
          </p>
          <InvestorContactForm />
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Link href="/" style={{ color: 'var(--heidi-primary-mid)', fontSize: 14, textDecoration: 'none' }}>
              ← Back to Heidi
            </Link>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}
