import Link from 'next/link';

const SERIF = "'Playfair Display', Georgia, serif";

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: 'var(--heidi-ocean)', color: 'var(--heidi-canvas)' }}
      className="mt-auto"
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: 'var(--heidi-primary)', fontFamily: SERIF, fontWeight: 700, fontSize: 20 }}>
                Heidi
              </span>
            </div>
            <p style={{ color: 'var(--heidi-mist)', fontSize: 14, lineHeight: 1.65, marginBottom: 12 }}>
              A trust-and-safety-first marketplace for vetted, nonsexual companionship and emotional support.
              Launching in New York City, 2026.
            </p>
          </div>

          {/* Platform */}
          <div>
            <p className="text-label mb-4" style={{ color: 'var(--heidi-mist)' }}>Platform</p>
            <div className="flex flex-col gap-3">
              <Link href="/how-it-works" style={{ color: 'var(--heidi-canvas)', fontSize: 14 }} className="hover:opacity-70 transition-opacity">
                How It Works
              </Link>
              <Link href="/safety" style={{ color: 'var(--heidi-canvas)', fontSize: 14 }} className="hover:opacity-70 transition-opacity">
                Safety
              </Link>
              <Link href="/story" style={{ color: 'var(--heidi-canvas)', fontSize: 14 }} className="hover:opacity-70 transition-opacity">
                Our Story
              </Link>
              <Link href="/companions" style={{ color: 'var(--heidi-canvas)', fontSize: 14 }} className="hover:opacity-70 transition-opacity">
                For Companions
              </Link>
              <Link href="/resources" style={{ color: 'var(--heidi-canvas)', fontSize: 14 }} className="hover:opacity-70 transition-opacity">
                Resources
              </Link>
              <Link href="/waitlist" style={{ color: 'var(--heidi-canvas)', fontSize: 14 }} className="hover:opacity-70 transition-opacity">
                Join the Waitlist
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="text-label mb-4" style={{ color: 'var(--heidi-mist)' }}>Legal</p>
            <div className="flex flex-col gap-3">
              <Link href="/privacy" style={{ color: 'var(--heidi-canvas)', fontSize: 14 }} className="hover:opacity-70 transition-opacity">
                Privacy Policy
              </Link>
              <Link href="/terms" style={{ color: 'var(--heidi-canvas)', fontSize: 14 }} className="hover:opacity-70 transition-opacity">
                Terms of Use
              </Link>
              <Link href="/conduct" style={{ color: 'var(--heidi-canvas)', fontSize: 14 }} className="hover:opacity-70 transition-opacity">
                Code of Conduct
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-label mb-4" style={{ color: 'var(--heidi-mist)' }}>Contact</p>
            <div className="flex flex-col gap-3">
              <Link href="/contact" style={{ color: 'var(--heidi-canvas)', fontSize: 14 }} className="hover:opacity-70 transition-opacity">
                Contact
              </Link>
              <Link href="/investors" style={{ color: 'var(--heidi-canvas)', fontSize: 14, opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
                Investors
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{ borderTop: '0.5px solid rgba(255,255,255,0.1)' }}
          className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <p style={{ color: 'var(--heidi-mist)', fontSize: 13, fontStyle: 'italic', lineHeight: 1.6, maxWidth: 560 }}>
            &ldquo;Not therapy. Not dating. Not sexual services. Heidi provides peer-style emotional support
            and companionship only.&rdquo;
          </p>
          <p style={{ color: 'var(--heidi-mist)', fontSize: 12, flexShrink: 0 }}>
            © 2026 Heidi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
