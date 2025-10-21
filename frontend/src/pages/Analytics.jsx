import React, { useState, useEffect, useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import API from '../api/api';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../contexts/AuthContext';

const COLORS = ['#8884d8','#82ca9d','#ffc658','#2563EB'];

export default function Analytics(){
  const { logout } = useContext(AuthContext);
  const [data, setData] = useState(null);
  useEffect(()=> { API.get('/analytics').then(r=> setData(r.data)).catch(console.error); }, []);
  if(!data) return <div className="min-h-screen">Loading...</div>;
  // map followersGrowth if exists
  const lineData = (data.followersGrowth || []).map(d => ({ date: new Date(d.date).toLocaleDateString(), followers: d.followers }));
  const pie = [{name:'Instagram', value: 60}, {name:'Facebook', value: 30}, {name:'WhatsApp', value:10}];
  return (
    <div className="flex">
      <Sidebar onLogout={logout}/>
      <main className="ml-64 p-8 w-full">
        <h2 className="text-xl font-bold mb-4">Analytics</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card"><div className="text-sm">Total Posts</div><div className="text-2xl font-bold">{data.total}</div></div>
          <div className="card"><div className="text-sm">Engagement Rate</div><div className="text-2xl font-bold">{data.engagementRate}%</div></div>
          <div className="card"><div className="text-sm">Best Time</div><div className="text-2xl font-bold">{data.bestTime || '—'}</div></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="card">
            <h3 className="mb-2 font-semibold">Followers Growth</h3>
            <LineChart width={500} height={250} data={lineData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="followers" stroke="#2563EB" />
            </LineChart>
          </div>

          <div className="card">
            <h3 className="mb-2 font-semibold">Engagement by Platform</h3>
            <PieChart width={300} height={250}>
              <Pie data={pie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
                {pie.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
            </PieChart>
          </div>
        </div>

        <div className="card mt-4">
          <h4 className="font-semibold">AI Insights</h4>
          <p className="text-sm mt-2">{data.aiTip}</p>
        </div>
      </main>
    </div>
  );
}
