import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

export const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  if (!state) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>{state.reason}</h2>
      <p>Người chơi: <strong>{state.name}</strong></p>
      <p>Số câu trả lời đúng: <strong>{state.correctCount}</strong></p>
      <p>Điểm: <strong>{state.score}</strong></p>
      <p>Danh hiệu: <strong>{state.rank}</strong></p>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <button onClick={() => navigate('/play')} style={{ padding: '8px 16px' }}>
          Chơi lại
        </button>
        <button onClick={() => navigate('/')} style={{ padding: '8px 16px' }}>
          Về trang chủ
        </button>
      </div>
    </div>
  );
};