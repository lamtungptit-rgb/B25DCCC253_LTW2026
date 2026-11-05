import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Play } from './pages/Play';
import { Result } from './pages/Result';
import { QuestionBank } from './pages/QuestionBank';
import { QuestionDetail } from './pages/QuestionDetail';
import { History } from './pages/History';
import { NotFound } from './pages/NotFound';

export const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerName, setPlayerName] = useState('');

  // Đọc lịch sử từ localStorage
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('ltw_rcv_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Lưu lịch sử khi có thay đổi
  useEffect(() => {
    localStorage.setItem('ltw_rcv_history', JSON.stringify(history));
  }, [history]);

  // Gọi API lấy dữ liệu câu hỏi có AbortController
  useEffect(() => {
    const controller = new AbortController();

    axios
      .get('/data/questions.json', { signal: controller.signal })
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request cancelled:', err.message);
        } else {
          setError('Không tải được câu hỏi.');
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  const handleFinishGame = (gameData) => {
    const newRecord = {
      id: Date.now(),
      ...gameData,
      playedAt: new Date().toLocaleString('vi-VN')
    };
    setHistory((prev) => [...prev, newRecord]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home playerName={playerName} setPlayerName={setPlayerName} history={history} />} />
        <Route path="play" element={<Play questions={questions} playerName={playerName} onFinishGame={handleFinishGame} />} />
        <Route path="result" element={<Result />} />
        <Route path="history" element={<History history={history} onClearHistory={handleClearHistory} />} />
        <Route path="questions" element={<QuestionBank questions={questions} loading={loading} error={error} />} />
        <Route path="questions/:id" element={<QuestionDetail questions={questions} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
export default App;