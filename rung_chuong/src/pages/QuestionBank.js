import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TOPICS, LEVELS } from '../data';

export const QuestionBank = ({ questions, loading, error }) => {
  const [selectedTopic, setSelectedTopic] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <h2>Đang tải câu hỏi...</h2>;
  if (error) return <h2>{error}</h2>;

  const filteredQuestions = questions.filter((q) => {
    const matchTopic = selectedTopic === 'Tất cả' || q.topic === selectedTopic;
    const matchSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTopic && matchSearch;
  });

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>
      <div style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
        <div>
          <label>Chủ đề: </label>
          <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
            <option value="Tất cả">Tất cả các chủ đề</option>
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Tìm kiếm: </label>
          <input
            type="text"
            placeholder="Nội dung câu hỏi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <p>Có <strong>{filteredQuestions.length}</strong> câu hỏi.</p>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Chủ đề</th>
            <th>Mức độ</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q, index) => (
            <tr key={q.id}>
              <td>{index + 1}</td>
              <td>{q.topic}</td>
              <td>{LEVELS[q.level]}</td>
              <td>
                <Link to={`/questions/${q.id}`}>{q.question}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};  