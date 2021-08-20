import React, { useState, useEffect, useRef } from 'react';
import {
  Masonry,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  WindowScroller,
  AutoSizer
} from 'react-virtualized';
import PersonCard from './PersonCard';


const IMAGE_WIDTH       = 195;
const COLUMN_WIDTH      = IMAGE_WIDTH + 10 * 2;
const DEFAULT_COL_COUNT = 3;
const SPACER            = 10;

const cacheConfig = {
  defaultHeight:  250,
  defaultWidth:   COLUMN_WIDTH,
  fixedWidth:     true,
  fixedHeight:    false
};

const cellPositionerConfig = {
  columnCount:        DEFAULT_COL_COUNT,
  columnWidth:        COLUMN_WIDTH,
  spacer:             SPACER
};


/**
 * PeopleGrid components
 */
const PeopleGrid = ({ items, canLoadMore=false, loadMore }) => {

  const [colCount, setColCount] = useState(DEFAULT_COL_COUNT);
  const [cache]                 = useState(() => new CellMeasurerCache(cacheConfig));
  const [cellPositioner]        = useState(() => createMasonryCellPositioner({
    ...cellPositionerConfig,
    cellMeasurerCache: cache
  }));
  const masonry                 = useRef(null);

  useEffect(() => {
    cellPositioner.reset({
      ...cellPositionerConfig,
      cellMeasurerCache:  cache,
      columnCount:        colCount
    });
    masonry.current.recomputeCellPositions();
  }, [colCount, cache, cellPositioner]);

  function cellRenderer({ index, key, parent, style }) {

    const item = items[index];

    if (!item) return null;

    let imageHeight;

    if(item.illustration?.data?.resolutions?.thumbnail?.height)
      imageHeight = IMAGE_WIDTH / item.illustration.data.resolutions.thumbnail.width * item.illustration.data.resolutions.thumbnail.height;;

    return (
      <CellMeasurer
        cache   = {cache}
        index   = {index}
        key     = {key}
        parent  = {parent}
      >
        {({ registerChild }) => (
          <div style={style} ref={registerChild}>
            <PersonCard person={item} imageHeight={imageHeight} />
          </div>
        )}
      </CellMeasurer>
    )
  }

  function onResize({ width }) {
    setColCount(Math.floor((width + SPACER) / (COLUMN_WIDTH + SPACER)));
  }

  function onCellsRendered({ stopIndex }) {
    if (canLoadMore && stopIndex >= items.length - 10)
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
              <Masonry
                autoHeight
                className         = "mx-auto"
                ref               = {masonry}
                cellCount         = {items.length}
                cellMeasurerCache = {cache}
                cellPositioner    = {cellPositioner}
                cellRenderer      = {cellRenderer}
                onCellsRendered   = {onCellsRendered}
                height            = {height}
                width             = {colCount * (COLUMN_WIDTH + SPACER) - SPACER}
                scrollTop         = {scrollTop}
              />
            </div>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );

}

export default PeopleGrid;
