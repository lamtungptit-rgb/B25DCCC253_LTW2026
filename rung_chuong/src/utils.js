import { POINTS, RANKS } from './data';

export const calcScore = (answers) => {
  return answers
    .filter((a) => a.correct)
    .reduce((sum, a) => sum + (POINTS[a.level] || 0), 0);
};

export const getRank = (score) => {
  const rankObj = RANKS.find((r) => score >= r.min);
  return rankObj ? rankObj.title : 'Cần cố gắng';
};