"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (!firebaseUser) {
        router.push('/login');
        return;
      }
      setUser(firebaseUser);
      // Fetch profile from Firestore
      const docRef = doc(db, 'users', firebaseUser.uid);
      const docSnap = await getDoc(docRef);
      setProfile(docSnap.exists() ? docSnap.data() : null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f7' }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', minWidth: 320 }}>
        <h2 style={{ marginBottom: 24 }}>Profile</h2>
        <div style={{ marginBottom: 16 }}><strong>Email:</strong> {user?.email}</div>
        {/* Add more profile fields here */}
        <div style={{ marginBottom: 16 }}><strong>Profile Info:</strong> {profile ? JSON.stringify(profile) : 'No profile data'}</div>
        <button onClick={handleLogout} style={{ width: '100%', padding: 12, background: '#0a7ea4', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16, fontWeight: 600 }}>Logout</button>
      </div>
    </div>
  );
} 