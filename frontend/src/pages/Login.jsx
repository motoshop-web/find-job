import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://musical-lamp-jjxw79wqjjx925jpx-5000.app.github.dev/api/auth/login', form);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      alert('登入失敗');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
      <h2>登入</h2>
      <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ width: '100%', padding: 8, margin: '8px 0' }} />
      <input type="password" placeholder="密碼" value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={{ width: '100%', padding: 8, margin: '8px 0' }} />
      <button onClick={handleSubmit} style={{ width: '100%', padding: 10, background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>登入</button>
      <p>沒有帳號？<Link to="/register">註冊</Link></p>
    </div>
  );
}
