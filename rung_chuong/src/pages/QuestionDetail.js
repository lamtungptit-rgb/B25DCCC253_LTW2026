import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, LETTERS, POINTS } from '../data';

export const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const question = questions.find((q) => q.id === Number(id));

  if (!question) {
    return <h2>Không tìm thấy câu hỏi.</h2>;
  }

  return (
    <div>
      <h2>
        Câu hỏi số {question.id} – {question.topic} ({LEVELS[question.level]}, {POINTS[question.level]} điểm)
      </h2>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{question.question}</p>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {question.options.map((opt, idx) => {
          const isCorrect = idx === question.answer;
          return (
            <li
              key={idx}
              style={{
                padding: '8px',
                margin: '5px 0',
                backgroundColor: isCorrect ? '#d4edda' : '#f8f9fa',
                border: isCorrect ? '1px solid #c3e6cb' : '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <strong>{LETTERS[idx]}.</strong> {opt} {isCorrect && <b>(Đáp án đúng)</b>}
            </li>
          );
        })}
      </ul>

      <button onClick={() => navigate(-1)} style={{ padding: '8px 16px', cursor: 'pointer' }}>
        Quay lại
      </button>
    </div>
  );
};