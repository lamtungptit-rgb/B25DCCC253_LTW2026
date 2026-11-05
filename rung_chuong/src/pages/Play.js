import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { TIME_PER_QUESTION, EXTRA_TIME } from '../data';
import { calcScore, getRank } from '../utils';
import { QuestionCard } from '../components/QuestionCard';
import { Timer } from '../components/Timer';
import { ScoreBoard } from '../components/ScoreBoard';
import { Helpers } from '../components/Helpers';

export const Play = ({ questions, playerName, onFinishGame }) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState('answering'); // 'answering' | 'locked' | 'revealed'
  const [answers, setAnswers] = useState([]);

  // Trợ giúp
  const [usedHelpers, setUsedHelpers] = useState({ eliminate: false, extraTime: false, lifeline: false });
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [lifelineActive, setLifelineActive] = useState(false);

  const currentQ = questions[currentIndex];

  // Chặn nếu chưa nhập tên
  if (!playerName) {
    return <Navigate to="/" replace />;
  }

  // Đổi tiêu đề tab trình duyệt
  useEffect(() => {
    const currentScore = calcScore(answers);
    document.title = `Câu ${currentIndex + 1}/15 – ${currentScore} điểm`;
    return () => {
      document.title = 'Rung chuông vàng';
    };
  }, [currentIndex, answers]);

  // Phím tắt 1-4
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (status !== 'answering') return;
      const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3 };
      if (e.key in keyMap) {
        const optionIdx = keyMap[e.key];
        if (!hiddenOptions.includes(optionIdx)) {
          handleSelectOption(optionIdx);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, hiddenOptions, currentIndex]);

  // Đếm ngược đồng hồ 20s
  useEffect(() => {
    if (status !== 'answering') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [status, currentIndex]);

  // Xử lý Hết giờ
  const handleTimeOut = () => {
    setStatus('revealed');
    processAnswerResult(false, true);
  };

  // Chọn đáp án
  const handleSelectOption = (idx) => {
    if (status !== 'answering') return;
    setSelectedOption(idx);
    setStatus('locked');

    setTimeout(() => {
      setStatus('revealed');
      const isCorrect = idx === currentQ.answer;
      processAnswerResult(isCorrect, false);
    }, 2000);
  };

  // Xử lý logic đúng/sai và phao cứu sinh
  const processAnswerResult = (isCorrect, isTimeOut) => {
    setTimeout(() => {
      const isSavedByLifeline = !isCorrect && lifelineActive;
      const answerRecord = {
        id: currentQ.id,
        level: currentQ.level,
        correct: isCorrect,
        lifelineUsed: isSavedByLifeline
      };
      const updatedAnswers = [...answers, answerRecord];
      setAnswers(updatedAnswers);

      if (lifelineActive) setLifelineActive(false);

      if (isCorrect || isSavedByLifeline) {
        if (currentIndex + 1 < questions.length && currentIndex + 1 < 15) {
          // Sang câu tiếp theo
          setCurrentIndex((prev) => prev + 1);
          setSelectedOption(null);
          setHiddenOptions([]);
          setTimeLeft(TIME_PER_QUESTION);
          setStatus('answering');
        } else {
          // Thắng cuộc / Hoàn thành 15 câu
          finishGame(updatedAnswers, 'Bạn đã hoàn thành 15 câu');
        }
      } else {
        // Bị loại
        const reason = isTimeOut ? 'Hết giờ!' : 'Bạn đã bị loại (trả lời sai)';
        finishGame(updatedAnswers, reason);
      }
    }, 1500);
  };

  // Kết thúc lượt chơi & chuyển sang Result
  const finishGame = (finalAnswers, reason) => {
    const score = calcScore(finalAnswers);
    const rank = getRank(score);
    const correctCount = finalAnswers.filter((a) => a.correct).length;

    const gameData = {
      name: playerName,
      score,
      rank,
      correctCount,
      reason
    };

    onFinishGame(gameData);
    navigate('/result', { replace: true, state: gameData });
  };

  // Trợ giúp 1: Loại 1 đáp án sai
  const handleUseEliminate = () => {
    if (usedHelpers.eliminate || status !== 'answering') return;
    const wrongIndexes = currentQ.options
      .map((_, i) => i)
      .filter((i) => i !== currentQ.answer);
    const randomWrong = wrongIndexes[Math.floor(Math.random() * wrongIndexes.length)];
    setHiddenOptions([randomWrong]);
    setUsedHelpers((prev) => ({ ...prev, eliminate: true }));
  };

  // Trợ giúp 2: Thêm 15 giây
  const handleUseExtraTime = () => {
    if (usedHelpers.extraTime || status !== 'answering') return;
    setTimeLeft((prev) => prev + EXTRA_TIME);
    setUsedHelpers((prev) => ({ ...prev, extraTime: true }));
  };

  // Trợ giúp 3: Phao cứu sinh
  const handleToggleLifeline = () => {
    if (usedHelpers.lifeline && !lifelineActive) return;
    if (!usedHelpers.lifeline) {
      setUsedHelpers((prev) => ({ ...prev, lifeline: true }));
      setLifelineActive(true);
    }
  };

  if (!currentQ) return <div>Không có câu hỏi.</div>;

  return (
    <div>
      <Timer time={timeLeft} />
      <QuestionCard
        question={currentQ}
        currentIndex={currentIndex}
        total={15}
        onSelectOption={handleSelectOption}
        selectedOption={selectedOption}
        revealed={status === 'revealed'}
        disabledOptions={hiddenOptions}
      />
      <Helpers
        usedHelpers={usedHelpers}
        onUseEliminate={handleUseEliminate}
        onUseExtraTime={handleUseExtraTime}
        onToggleLifeline={handleToggleLifeline}
        lifelineActive={lifelineActive}
        status={status}
      />
      <ScoreBoard answers={answers} currentIndex={currentIndex} total={15} />
    </div>
  );
};