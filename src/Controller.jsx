import React from 'react';

export default function Controller({ title, onClickIncrease, onClickDecrease }) {
  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
      <span>{title}</span>
      <button type='button' onClick={onClickIncrease}>
        up
      </button>
      <button type='button' onClick={onClickDecrease}>
        down
      </button>
    </div>
  );
}
