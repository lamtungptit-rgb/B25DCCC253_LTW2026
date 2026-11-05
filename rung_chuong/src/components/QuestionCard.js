import React from 'react';
import { LEVELS, LETTERS } from '../data';

export const QuestionCard = ({
  question,
  currentIndex,
  total,
  onSelectOption,
  selectedOption,
  revealed,
  disabledOptions = []
}) => {
  return (
    <div>
      <h3>
        Câu {currentIndex + 1}/{total} · {question.topic} · {LEVELS[question.level]}
      </h3>
      <p style={{ fontSize: '18px' }}>{question.question}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {question.options.map((option, idx) => {
          const isHidden = disabledOptions.includes(idx);
          let bgColor = '#fff';

          if (revealed) {
            if (idx === question.answer) bgColor = '#90ee90'; // Xanh lá nếu đúng
            else if (idx === selectedOption) bgColor = '#ffcccb'; // Đỏ nếu chọn sai
          } else if (idx === selectedOption) {
            bgColor = '#ffeb3b'; // Vàng khi đang chốt
          }

          return (
            <button
              key={idx}
              onClick={() => onSelectOption(idx)}
              disabled={revealed || selectedOption !== null || isHidden}
              style={{
                padding: '12px',
                textAlign: 'left',
                backgroundColor: isHidden ? '#eee' : bgColor,
                cursor: (revealed || selectedOption !== null || isHidden) ? 'not-allowed' : 'pointer',
                opacity: isHidden ? 0.4 : 1
              }}
            >
              <strong>{LETTERS[idx]}.</strong> {isHidden ? '' : option}
            </button>
          );
        })}
      </div>
    </div>
  );
};