import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://musical-lamp-jjxw79wqjjx925jpx-5000.app.github.dev/api/jobs').then(res => setJobs(res.data));
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>找工作</h1>
        <div>
          {user ? (
            <>
              <span>歡迎, {user.name}</span>
              {user.role === 'employer' && (
                <>
                  <button onClick={() => navigate('/post-job')} style={{ margin: '0 10px', padding: '8px 16px' }}>發布職缺</button>
                  <button onClick={() => navigate('/applications')} style={{ margin: '0 10px', padding: '8px 16px', background: '#17a2b8', color: 'white', border: 'none', cursor: 'pointer' }}>查看應徵者</button>
                </>
              )}
              <button onClick={logout} style={{ padding: '8px 16px' }}>登出</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} style={{ margin: '0 10px', padding: '8px 16px' }}>登入</button>
              <button onClick={() => navigate('/register')} style={{ padding: '8px 16px' }}>註冊</button>
            </>
          )}
        </div>
      </div>
      <div>
        {jobs.map(job => (
          <div key={job._id} style={{ border: '1px solid #ddd', padding: 16, margin: '10px 0', borderRadius: 8 }}>
            <h3>{job.title}</h3>
            <p>{job.company?.companyName}</p>
            <p>{job.location} | {job.salary}</p>
            <p>{job.description}</p>
            {user?.role === 'jobseeker' && <button onClick={() => navigate(`/apply/${job._id}`)} style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>應徵</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
