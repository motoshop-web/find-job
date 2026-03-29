import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'jobseeker', companyName: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://musical-lamp-jjxw79wqjjx925jpx-5000.app.github.dev/api/auth/register', form);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      alert('註冊失敗');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
      <h2>註冊</h2>
      <input placeholder="姓名" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: 8, margin: '8px 0' }} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ width: '100%', padding: 8, margin: '8px 0' }} />
      <input type="password" placeholder="密碼" value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={{ width: '100%', padding: 8, margin: '8px 0' }} />
      <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} style={{ width: '100%', padding: 8, margin: '8px 0' }}>
        <option value="jobseeker">求職者</option>
        <option value="employer">雇主</option>
      </select>
      {form.role === 'employer' && <input placeholder="公司名稱" value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} style={{ width: '100%', padding: 8, margin: '8px 0' }} />}
      <button onClick={handleSubmit} style={{ width: '100%', padding: 10, background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>註冊</button>
      <p>已有帳號？<Link to="/login">登入</Link></p>
    </div>
  );
}
