import React, { useState } from 'react';
import { Grid, WindowScroller, AutoSizer } from 'react-virtualized';
import CollectionCard from './CollectionCard';

const COLUMN_WIDTH = 178;
const COLUMN_HEIGHT = 212;

const CollectionGrid = ({ items, canLoadMore=false, loadMore }) => {

  const [colCount, setColCount] = useState(3);
  const rowCount = Math.ceil(items.length / colCount);

  function cellRenderer({ columnIndex, key, rowIndex, style }) {

    const i = rowIndex * colCount + columnIndex
    const item = items[i];

    if (!item) return null;

    return (
      <div key={key} style={{ ...style }}>
        <div style={{ padding: 17, height: '100%' }}>
          <CollectionCard doc={item} />
        </div>
     </div>
    )
  }

  function onResize({ width }) {
    setColCount(Math.floor(width / COLUMN_WIDTH));
  }

  function onSectionRendered({ columnStopIndex, rowStopIndex }) {
    const i = rowStopIndex * colCount + columnStopIndex
    if (canLoadMore && i >= items.length - 10)
      loadMore()
  }

  return (
    <WindowScroller>
      {({ height, isScrolling, registerChild, scrollTop }) => (
        <AutoSizer
          disableHeigth
          style         = {{ height: 'auto' }}
          onResize      = {onResize}
          className     = "w-100"
        >
          {() => (

            <div ref={registerChild}>
              <Grid
                autoHeight
                cellRenderer      = {cellRenderer}
                columnCount       = {colCount}
                height            = {height}
                width             = {colCount * COLUMN_WIDTH}
                rowCount          = {rowCount}
                columnWidth       = {COLUMN_WIDTH}
                rowHeight         = {COLUMN_HEIGHT}
                scrollTop         = {scrollTop}
                isScrolling       = {isScrolling}
                onSectionRendered = {onSectionRendered}
              />
            </div>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );

}

export default CollectionGrid;
