import React, { useState } from 'react';
import { Grid, WindowScroller, AutoSizer } from 'react-virtualized';
import CollectionCard from './CollectionCard';

const COLUMN_WIDTH = 225;
const COLUMN_HEIGHT = 370;

const CollectionGrid = ({ collection, canLoadMore=false, loadMore }) => {

  const [colCount, setColCount] = useState(3);
  const rowCount = Math.ceil(collection.length / colCount);

  function cellRenderer({ columnIndex, key, rowIndex, style }) {

    const i = rowIndex * colCount + columnIndex
    const item = collection[i]

    if (!item) return null;

    return (
      <div key={key} style={{ ...style }}>
        <div style={{ padding: 5, height: '100%' }}>
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
    if (canLoadMore && i >= collection.length - 10)
      loadMore()
  }

  return (
    <WindowScroller>
      {({ height, isScrolling, registerChild, scrollTop }) => (
        <AutoSizer
          disableHeigth
          style         = {{ height: 'auto' }}
          onResize      = {onResize}
        >
          {({ width }) => (

            <div ref={registerChild}>
              <Grid
                autoHeight
                cellRenderer      = {cellRenderer}
                columnCount       = {colCount}
                height            = {height}
                width             = {width}
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