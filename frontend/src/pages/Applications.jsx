import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Applications() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'employer') return navigate('/');
    
    axios.get('https://musical-lamp-jjxw79wqjjx925jpx-5000.app.github.dev/api/jobs')
      .then(res => {
        const myJobs = res.data.filter(job => job.company?._id === user.id || job.company === user.id);
        setJobs(myJobs);
        myJobs.forEach(job => {
          axios.get(`https://musical-lamp-jjxw79wqjjx925jpx-5000.app.github.dev/api/applications/job/${job._id}`)
            .then(r => setApplications(prev => ({ ...prev, [job._id]: r.data })));
        });
      });
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: 20, padding: '8px 16px' }}>← 返回</button>
      <h2>應徵者名單</h2>
      {jobs.length === 0 && <p>目前沒有職缺</p>}
      {jobs.map(job => (
        <div key={job._id} style={{ border: '1px solid #ddd', padding: 16, margin: '10px 0', borderRadius: 8 }}>
          <h3>{job.title}</h3>
          <p>應徵人數：{applications[job._id]?.length || 0}</p>
          {applications[job._id]?.map(app => (
            <div key={app._id} style={{ background: '#f5f5f5', padding: 12, margin: '8px 0', borderRadius: 4 }}>
              <p><strong>姓名：</strong>{app.applicant?.name}</p>
              <p><strong>Email：</strong>{app.applicant?.email}</p>
              <p><strong>履歷：</strong>{app.resume}</p>
              <p><strong>求職信：</strong>{app.coverLetter}</p>
              <p><strong>狀態：</strong>{app.status}</p>
              <select value={app.status} onChange={e => {
                axios.put(`https://musical-lamp-jjxw79wqjjx925jpx-5000.app.github.dev/api/applications/${app._id}`, { status: e.target.value })
                  .then(() => {
                    setApplications(prev => ({
                      ...prev,
                      [job._id]: prev[job._id].map(a => a._id === app._id ? { ...a, status: e.target.value } : a)
                    }));
                  });
              }} style={{ padding: '4px 8px' }}>
                <option value="pending">待審核</option>
                <option value="reviewed">已查看</option>
                <option value="accepted">錄取</option>
                <option value="rejected">不錄取</option>
              </select>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
