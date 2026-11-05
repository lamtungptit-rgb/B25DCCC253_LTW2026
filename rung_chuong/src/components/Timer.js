import React from 'react';

export const Timer = ({ time }) => {
  const isDanger = time <= 5;
  return (
    <h3 style={{ color: isDanger ? 'red' : 'black' }}>
      Còn {time} giây
    </h3>
  );
};