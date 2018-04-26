import * as React from 'react';

const JustifyIcon = ({justify}: {justify: 'left' | 'center' | 'right' | 'full'}) => {
  const longStartX = 0;
  const longEndX = 12;
  let shortStartX = 0;
  let shortEndX = 12;
  switch (justify) {
    case 'left':
      shortEndX = 7;
      break;
    case 'center':
      shortStartX = 3;
      shortEndX = 9;
      break;
    case 'right':
      shortStartX = 3;
      break;
    case 'full':
      break;
  }
  return (
    <svg viewBox="0 0 12 12" className="svg-icon" style={{width: 12, height: 12}}>
      <path d={`M ${shortStartX} 0 L ${shortEndX} 0`} style={{stroke: 'black'}} />
      <path d={`M ${longStartX} 2 L ${longEndX} 2`} style={{stroke: 'black'}} />

      <path d={`M ${shortStartX} 4 L ${shortEndX} 4`} style={{stroke: 'black'}} />
      <path d={`M ${longStartX} 6 L ${longEndX} 6`} style={{stroke: 'black'}} />

      <path d={`M ${shortStartX} 8 L ${shortEndX} 8`} style={{stroke: 'black'}} />
      <path d={`M ${longStartX} 10 L ${longEndX} 10`} style={{stroke: 'black'}} />
    </svg>
  );
};

export default JustifyIcon;
