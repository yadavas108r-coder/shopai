import React, { useState, useContext } from 'react';
import API from '../api/api';
import { AuthContext } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';

export default function CreatePost(){
  const { logout } = useContext(AuthContext);
  const [shopName,setShopName] = useState('');
  const [product,setProduct] = useState('');
  const [style, setStyle] = useState('Trendy');
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loadingCaption, setLoadingCaption] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const genCaption = async ()=>{
    setLoadingCaption(true);
    try {
      const { data } = await API.post('/ai/generate-caption', { shopName, product, style });
      setCaption(data.caption);
    } catch (err){ alert('Caption error'); }
    setLoadingCaption(false);
  };

  const genImage = async ()=>{
    setLoadingImage(true);
    try {
      const { data } = await API.post('/ai/generate-image', { product, style });
      setImageUrl(data.imageUrl);
    } catch (err){ alert('Image error'); }
    setLoadingImage(false);
  };

  const saveDraft = async (status = 'draft') => {
    try {
      await API.post('/posts', { caption, imageUrl, platform: 'Instagram', status });
      alert('Saved');
    } catch (err){ alert('Save error'); }
  };

  const postNow = async ()=>{
    await saveDraft('posted');
    alert('Posted (simulated).');
  };

  return (
    <div className="flex">
      <Sidebar onLogout={logout} />
      <main className="ml-64 p-8 w-full">
        <div className="card max-w-4xl mx-auto space-y-4">
          <h2 className="text-xl font-bold">Create Post</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Shop Name</label>
              <input value={shopName} onChange={(e)=>setShopName(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="MyShop"/>
            </div>
            <div>
              <label className="text-sm">Post Style</label>
              <select value={style} onChange={(e)=>setStyle(e.target.value)} className="w-full p-3 border rounded-lg">
                <option>Trendy</option><option>Professional</option><option>Funny</option><option>Desi</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-sm">Product / Offer details</label>
              <textarea value={product} onChange={(e)=>setProduct(e.target.value)} className="w-full p-3 border rounded-lg" rows={3} placeholder="Black oversized T-shirt, size L..."></textarea>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={genCaption} className="btn">{loadingCaption ? 'Generating...' : 'Generate Caption'}</button>
            <button onClick={genImage} className="btn">{loadingImage ? 'Generating Image...' : 'Generate Image'}</button>
            <button onClick={()=>saveDraft('draft')} className="px-4 py-2 rounded-xl border">Save to Draft</button>
            <button onClick={postNow} className="px-4 py-2 rounded-xl border bg-green-500 text-white">Post Now</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="card h-64 flex items-center justify-center">
              {imageUrl ? <img src={imageUrl} alt="AI" className="max-h-full rounded-lg" /> : <div className="text-gray-400">Image preview</div>}
            </div>
            <div className="card">
              <h4 className="font-semibold">Caption</h4>
              <textarea value={caption} onChange={(e)=>setCaption(e.target.value)} className="w-full h-40 p-2 border mt-2 rounded-lg"></textarea>
              <div className="mt-3 flex gap-2">
                <button onClick={()=>navigator.clipboard.writeText(caption)} className="px-3 py-1 border rounded">Copy</button>
                <a className="px-3 py-1 border rounded" href="#" download>Download</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
