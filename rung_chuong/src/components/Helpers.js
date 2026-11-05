import React from 'react';

export const Helpers = ({
  usedHelpers,
  onUseEliminate,
  onUseExtraTime,
  onToggleLifeline,
  lifelineActive,
  status
}) => {
  const isDisabled = status !== 'answering';

  return (
    <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
      <button
        onClick={onUseEliminate}
        disabled={isDisabled || usedHelpers.eliminate}
      >
        Loại 1 đáp án
      </button>

      <button
        onClick={onUseExtraTime}
        disabled={isDisabled || usedHelpers.extraTime}
      >
        Thêm 15 giây
      </button>

      <button
        onClick={onToggleLifeline}
        disabled={usedHelpers.lifeline && !lifelineActive}
        style={{ backgroundColor: lifelineActive ? 'orange' : '' }}
      >
        {lifelineActive ? 'Phao đang bật' : 'Phao cứu sinh'}
      </button>
    </div>
  );
};