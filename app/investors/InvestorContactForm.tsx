'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const SERIF = "'Playfair Display', Georgia, serif";

export default function InvestorContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    const { error } = await supabase.from('investor_inquiries').insert({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      message: formData.message,
    });
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
    }
  }

  if (status === 'success') {
    return (
      <div
        style={{
          backgroundColor: 'var(--heidi-surface)',
          border: '0.5px solid var(--heidi-primary-border)',
          borderRadius: 12,
          padding: '32px 28px',
          textAlign: 'center',
          maxWidth: 480,
          margin: '0 auto',
        }}
      >
        <p style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 600, color: '#5C2D5C', marginBottom: 10 }}>
          Thank you.
        </p>
        <p style={{ fontSize: 15, color: 'var(--heidi-mist)', lineHeight: 1.65 }}>
          We received your message and will be in touch soon.
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: 44,
    padding: '0 14px',
    fontSize: 14,
    color: 'var(--heidi-ocean)',
    backgroundColor: 'var(--heidi-canvas)',
    border: '0.5px solid var(--heidi-foam)',
    borderRadius: 8,
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, color: 'var(--heidi-mist)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            First name
          </label>
          <input
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, color: 'var(--heidi-mist)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Last name
          </label>
          <input
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 12, color: 'var(--heidi-mist)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 12, color: 'var(--heidi-mist)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Message
        </label>
        <textarea
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={5}
          style={{ ...inputStyle, height: 'auto', padding: '12px 14px', resize: 'vertical' }}
        />
      </div>

      {status === 'error' && (
        <p style={{ fontSize: 13, color: '#c0392b', lineHeight: 1.5 }}>
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#5C2D5C',
          color: '#FBF7F2',
          borderRadius: 10,
          height: 48,
          padding: '0 28px',
          fontSize: 15,
          fontWeight: 500,
          border: 'none',
          cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
          opacity: status === 'submitting' ? 0.6 : 1,
          transition: 'background-color 0.15s ease, opacity 0.15s ease',
          width: '100%',
        }}
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
