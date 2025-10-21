import React, { useEffect, useState, useContext } from 'react';
import API from '../api/api';
import { AuthContext } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';

export default function Dashboard(){
  const { user, logout } = useContext(AuthContext);
  const [summary, setSummary] = useState(null);
  useEffect(()=>{
    const load = async ()=> {
      try { const r = await API.get('/analytics'); setSummary(r.data); }
      catch(e){ console.error(e); }
    }; load();
  }, []);
  return (
    <div className="flex">
      <Sidebar onLogout={logout} />
      <main className="ml-64 p-8 w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.shopName || user?.email} 👋</h1>
            <p className="text-sm text-gray-600">Your AI marketing assistant</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="card"> <div className="text-sm text-gray-500">Posts this week</div><div className="text-xl font-bold">{summary?.total || 0}</div></div>
          <div className="card"> <div className="text-sm text-gray-500">Engagement Rate</div><div className="text-xl font-bold">{summary?.engagementRate || 0}%</div></div>
          <div className="card"> <div className="text-sm text-gray-500">Best Time</div><div className="text-xl font-bold">{summary?.topPost ? new Date(summary.topPost.createdAt).toLocaleTimeString([], {hour:'2-digit'}) : summary?.bestTime || '—'}</div></div>
          <div className="card"> <div className="text-sm text-gray-500">AI Tips</div><div className="text-sm">{summary?.aiTip || 'No tips yet'}</div></div>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">Preview</h3>
          <p className="text-sm text-gray-500">Get started with "Create Post" to generate captions & images.</p>
        </div>
      </main>
    </div>
  );
}
