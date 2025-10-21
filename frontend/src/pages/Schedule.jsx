import React, { useEffect, useState, useContext } from 'react';
import API from '../api/api';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../contexts/AuthContext';

export default function Schedule(){
  const { logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  useEffect(()=> {
    API.get('/posts').then(r=> setPosts(r.data)).catch(console.error);
  }, []);
  const deletePost = async (id) => {
    if (!confirm('Delete?')) return;
    await API.delete(`/posts/${id}`);
    setPosts(prev => prev.filter(p=> p._id !== id));
  };
  return (
    <div className="flex">
      <Sidebar onLogout={logout} />
      <main className="ml-64 p-8 w-full">
        <h2 className="text-xl font-bold mb-4">Scheduled Posts</h2>
        <div className="grid gap-3">
          {posts.map(p => (
            <div className="card flex justify-between" key={p._id}>
              <div>
                <div className="font-semibold">{p.platform} • {p.status}</div>
                <div className="text-sm text-gray-600">{new Date(p.scheduledAt || p.createdAt).toLocaleString()}</div>
                <div className="mt-2">{p.caption?.slice(0,120)}</div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={()=>deletePost(p._id)} className="px-3 py-1 border rounded text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
