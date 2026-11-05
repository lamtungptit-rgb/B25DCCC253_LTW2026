import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = ({ playerName, setPlayerName, history }) => {
  const [inputName, setInputName] = useState(playerName || '');
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (inputName.trim()) {
      setPlayerName(inputName.trim());
      navigate('/play');
    }
  };

  // Tính kỷ lục cao nhất từ lịch sử
  const record = history.length > 0
    ? [...history].sort((a, b) => b.score - a.score)[0]
    : null;

  return (
    <div>
      <h2>Trò chơi Rung chuông vàng</h2>
      <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
        <h4>Luật chơi:</h4>
        <ul>
          <li>Vượt qua 15 câu hỏi trắc nghiệm với thời gian 20s mỗi câu.</li>
          <li>Trả lời đúng được cộng điểm, sai hoặc hết giờ bị loại ngay.</li>
          <li>Đạt tối đa 300 điểm để Rung chuông vàng!</li>
        </ul>
      </div>

      {record && (
        <p style={{ color: 'green', fontWeight: 'bold' }}>
          Kỷ lục: {record.score} điểm – {record.name}
        </p>
      )}

      <form onSubmit={handleStart} style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Nhập tên người chơi..."
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          style={{ padding: '8px', width: '250px', marginRight: '10px' }}
        />
        <button type="submit" disabled={!inputName.trim()} style={{ padding: '8px 16px' }}>
          Vào thi
        </button>
      </form>
    </div>
  );
};