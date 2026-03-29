import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PostJob() {
  const [form, setForm] = useState({ title: '', description: '', salary: '', location: '', jobType: 'full-time' });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('https://musical-lamp-jjxw79wqjjx925jpx-5000.app.github.dev/api/jobs', { ...form, company: user.id });
      navigate('/');
    } catch (err) {
      alert('發布失敗');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', padding: 20 }}>
      <h2>發布職缺</h2>
      <input placeholder="職位名稱" value={form.title} onChange={e => setForm({...form, title: e.target.value})} style={{ width: '100%', padding: 8, margin: '8px 0' }} />
      <input placeholder="地點" value={form.location} onChange={e => setForm({...form, location: e.target.value})} style={{ width: '100%', padding: 8, margin: '8px 0' }} />
      <input placeholder="薪資" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} style={{ width: '100%', padding: 8, margin: '8px 0' }} />
      <textarea placeholder="職位描述" value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={{ width: '100%', padding: 8, margin: '8px 0', height: 100 }} />
      <button onClick={handleSubmit} style={{ width: '100%', padding: 10, background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>發布</button>
    </div>
  );
}
