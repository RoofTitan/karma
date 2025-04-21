"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f7f7f7', padding: 32 }}>
      <div style={{ background: '#fff', padding: 40, borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16, color: '#0a7ea4' }}>Welcome to Karma</h1>
        <p style={{ fontSize: 18, color: '#444', marginBottom: 32 }}>
          A platform for contractors and homeowners to build trust, leave reviews, and manage their reputation.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Link href="/login" style={{ padding: 16, background: '#0a7ea4', color: '#fff', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 18 }}>Login / Sign Up</Link>
          <Link href="/profile" style={{ padding: 16, background: '#f2f2f2', color: '#0a7ea4', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 18 }}>Profile</Link>
          <Link href="/reviews" style={{ padding: 16, background: '#f2f2f2', color: '#0a7ea4', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 18 }}>Browse Reviews</Link>
        </div>
      </div>
    </div>
  );
}
