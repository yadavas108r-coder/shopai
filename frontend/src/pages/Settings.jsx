import React, { useContext, useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../contexts/AuthContext';
import API from '../api/api';

export default function Settings(){
  const { user } = useContext(AuthContext);
  const [shopName, setShopName] = useState(user?.shopName || '');
  const [owner, setOwner] = useState('');
  useEffect(()=> { setShopName(user?.shopName || '') }, [user]);
  const save = async () => {
    // update via API (create /users route if needed)
    alert('Saved (placeholder)');
  };
  return (
    <div className="flex">
      <Sidebar onLogout={()=>{}} />
      <main className="ml-64 p-8 w-full">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <div className="card max-w-2xl">
          <div className="space-y-3">
            <div>
              <label className="text-sm">Shop Name</label>
              <input value={shopName} onChange={(e)=>setShopName(e.target.value)} className="w-full p-3 border rounded-lg" />
            </div>
            <div>
              <label className="text-sm">Owner</label>
              <input value={owner} onChange={(e)=>setOwner(e.target.value)} className="w-full p-3 border rounded-lg" />
            </div>
            <div>
              <label className="text-sm">Subscription</label>
              <div className="flex gap-3 mt-1">
                <button className="px-3 py-1 border rounded">Free</button>
                <button className="px-3 py-1 border rounded">Pro ₹999</button>
              </div>
            </div>
            <div>
              <button onClick={save} className="btn">Save Profile</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
