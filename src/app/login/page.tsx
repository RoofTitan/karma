"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email,
          createdAt: new Date(),
        });
        router.push('/profile');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/profile');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f7' }}>
      <form onSubmit={handleAuth} style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', minWidth: 320 }}>
        <h2 style={{ marginBottom: 24 }}>{isSignup ? 'Sign Up' : 'Login'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 12, marginBottom: 16, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={6}
          style={{ width: '100%', padding: 12, marginBottom: 16, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
        />
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, background: '#0a7ea4', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16, fontWeight: 600 }}>
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <span style={{ color: '#0a7ea4', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </span>
        </div>
      </form>
    </div>
  );
} 