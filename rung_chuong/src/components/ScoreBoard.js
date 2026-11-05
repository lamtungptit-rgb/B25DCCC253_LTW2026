import React from 'react';

export const ScoreBoard = ({ answers, currentIndex, total = 15 }) => {
  return (
    <div style={{ display: 'flex', gap: '5px', marginTop: '15px' }}>
      {Array.from({ length: total }).map((_, idx) => {
        const item = answers[idx];
        let border = '1px solid #ccc';
        let bg = '#f0f0f0';

        if (idx === currentIndex) border = '2px solid black';
        if (item) {
          if (item.correct) bg = '#90ee90'; // Trả lời đúng
          else if (item.lifelineUsed) bg = 'orange'; // Qua nhờ phao cứu sinh
          else bg = '#ffcccb'; // Trả lời sai
        }

        return (
          <div
            key={idx}
            style={{
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: bg,
              border: border,
              fontWeight: 'bold'
            }}
          >
            {idx + 1}
          </div>
        );
      })}
    </div>
  );
};