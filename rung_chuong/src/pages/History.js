import React from 'react';

export const History = ({ history, onClearHistory }) => {
  if (history.length === 0) {
    return <h2>Chưa có lượt chơi nào.</h2>;
  }

  // Tạo bản sao rồi sắp xếp điểm giảm dần
  const sortedHistory = [...history].sort((a, b) => b.score - a.score);

  const totalGames = history.length;
  const highScore = sortedHistory[0].score;
  const avgScore = Math.round(
    history.reduce((sum, item) => sum + item.score, 0) / totalGames
  );

  return (
    <div>
      <h2>Lịch sử các lượt chơi</h2>
      <div style={{ marginBottom: '15px' }}>
        <p>Số lượt chơi: <strong>{totalGames}</strong></p>
        <p>Điểm cao nhất: <strong>{highScore}</strong></p>
        <p>Điểm trung bình: <strong>{avgScore}</strong></p>
      </div>

      <button onClick={onClearHistory} style={{ marginBottom: '15px', color: 'red' }}>
        Xóa lịch sử
      </button>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Người chơi</th>
            <th>Số câu đúng</th>
            <th>Điểm</th>
            <th>Danh hiệu</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistory.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.correctCount}</td>
              <td>{item.score}</td>
              <td>{item.rank}</td>
              <td>{item.playedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};