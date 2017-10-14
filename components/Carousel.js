import React from 'react';
import Iterator from './Iterator';

const Carousel = ({items, loop, children: render}) => (
  <div className="carousel">
    {!!items.length && (
      <Iterator count={items.length} loop={loop}>
        {cursor => [
          <button
            key="prev"
            onClick={cursor.prev}
            className="carousel-prev"
            disabled={!loop && cursor.isFirst}
          >
            &#x3008;
          </button>,
          <div key="content" className="carousel-content">
            {render({
              ...cursor,
              prevItem: items[cursor.prevIndex],
              item: items[cursor.index],
              nextItem: items[cursor.nextIndex],
            })}
          </div>,
          <button
            key="next"
            className="carousel-next"
            onClick={cursor.next}
            disabled={!loop && cursor.isLast}
          >
            &#x3009;
          </button>,
        ]}
      </Iterator>
    )}
  </div>
);

export default Carousel;
