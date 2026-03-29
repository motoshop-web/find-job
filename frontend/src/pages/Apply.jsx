import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Apply() {
  const [form, setForm] = useState({ resume: '', coverLetter: '' });
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('https://musical-lamp-jjxw79wqjjx925jpx-5000.app.github.dev/api/applications', { ...form, job: id, applicant: user.id });
      alert('應徵成功！');
      navigate('/');
    } catch (err) {
      alert('應徵失敗');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', padding: 20 }}>
      <h2>應徵職位</h2>
      <input placeholder="履歷連結" value={form.resume} onChange={e => setForm({...form, resume: e.target.value})} style={{ width: '100%', padding: 8, margin: '8px 0' }} />
      <textarea placeholder="求職信" value={form.coverLetter} onChange={e => setForm({...form, coverLetter: e.target.value})} style={{ width: '100%', padding: 8, margin: '8px 0', height: 150 }} />
      <button onClick={handleSubmit} style={{ width: '100%', padding: 10, background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>送出應徵</button>
    </div>
  );
}
