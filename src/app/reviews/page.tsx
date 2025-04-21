"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface Review {
  id: string;
  reviewerId: string;
  rating: number;
  feedback: string;
  createdAt: { seconds: number };
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userEmails, setUserEmails] = useState<{ [uid: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const reviewsData: Review[] = [];
      const userIds = new Set<string>();
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        reviewsData.push({ id: docSnap.id, ...data } as Review);
        userIds.add(data.reviewerId);
      });
      // Fetch user emails
      const emails: { [uid: string]: string } = {};
      for (const uid of userIds) {
        try {
          const userDoc = await getDocs(collection(db, 'users'));
          userDoc.forEach(userSnap => {
            if (userSnap.id === uid) {
              emails[uid] = userSnap.data().email;
            }
          });
        } catch {}
      }
      setUserEmails(emails);
      setReviews(reviewsData);
      setLoading(false);
    };
    fetchReviews();
  }, []);

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7', padding: 32 }}>
      <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 24 }}>
        <h2 style={{ marginBottom: 24 }}>All Reviews</h2>
        {reviews.length === 0 && <div>No reviews found.</div>}
        {reviews.map(review => (
          <div key={review.id} style={{ borderBottom: '1px solid #eee', padding: '16px 0' }}>
            <div><strong>Reviewer:</strong> {userEmails[review.reviewerId] || review.reviewerId}</div>
            <div><strong>Rating:</strong> {review.rating} / 5</div>
            <div><strong>Feedback:</strong> {review.feedback}</div>
            <div style={{ color: '#888', fontSize: 12 }}>Date: {new Date(review.createdAt.seconds * 1000).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 