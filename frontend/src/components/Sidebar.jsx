import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, Calendar, BarChart2, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ onLogout }) {
  const loc = useLocation();
  const items = [
    { to: '/', icon: <Home size={18}/> , label: 'Dashboard' },
    { to: '/create', icon: <PlusCircle size={18}/>, label: 'Create Post' },
    { to: '/schedule', icon: <Calendar size={18}/>, label: 'Schedule Posts' },
    { to: '/analytics', icon: <BarChart2 size={18}/>, label: 'Analytics' },
    { to: '/settings', icon: <Settings size={18}/>, label: 'Settings' }
  ];
  return (
    <div className="w-64 h-screen p-4 border-r bg-white fixed">
      <div className="mb-6">
        <h2 className="text-primary text-xl font-bold">ShopAI</h2>
        <p className="text-sm text-gray-500">Grow your Shop with AI Power 💡</p>
      </div>
      <nav className="space-y-2">
        {items.map(it => (
          <Link key={it.to} to={it.to} className={`flex gap-3 items-center p-2 rounded-lg ${loc.pathname === it.to ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
            <div className="text-gray-600">{it.icon}</div>
            <span>{it.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-6">
        <button onClick={onLogout} className="flex items-center gap-2 text-sm text-red-600"> <LogOut size={16}/> Logout</button>
      </div>
    </div>
  );
}
