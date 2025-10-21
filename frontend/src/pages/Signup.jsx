import React, { useState, useContext } from 'react';
import API from '../api/api';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const [shopName,setShopName] = useState('');
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const submit = async (e)=> {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register',{ name, email, password, shopName });
      login(data.token, data.user);
      nav('/');
    } catch (err) { alert(err.response?.data?.message || 'Signup failed'); }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create Account</h2>
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full p-3 border rounded-lg" placeholder="Full name" value={name} onChange={(e)=>setName(e.target.value)}/>
          <input className="w-full p-3 border rounded-lg" placeholder="Shop name" value={shopName} onChange={(e)=>setShopName(e.target.value)}/>
          <input className="w-full p-3 border rounded-lg" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" className="w-full p-3 border rounded-lg" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button className="btn w-full">Create account</button>
        </form>
      </div>
    </div>
  );
}
