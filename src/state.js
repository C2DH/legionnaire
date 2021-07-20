import { rj } from 'react-rocketjump';
import rjCache from 'react-rocketjump/plugins/cache';
import rjList, { limitOffsetPaginationAdapter } from 'react-rocketjump/plugins/list';

import { getDocument, getDocuments } from './api';


export const docState = rj(
  rjCache({
    ns: 'millerDocument',
    size: 50
  }), getDocument
);

export const docsState = rj(
  rjCache({
    ns: 'millerDocuments',
    size: 50
  }), getDocuments
);

export const peopleState = rj(
  rjCache({
    ns: 'persons',
    size: 50
  }),
  rjList({
    pageSize: 100,
    pagination: limitOffsetPaginationAdapter,
  }), {
    effect: getDocuments,
  }
);

export const eventsState = rj(
  rjCache({
    ns: 'events',
    size: 50
  }), {
    effect: getDocuments,

    //  Selecgtor to get events in an object with the event type as key
    selectors: ({ getData }) => ({
      getEventsByType: state => {

        const eventByTypes = {};
        const events = getData(state)?.results;

        for(const event of events || []) {
          const type = event.data.event_type;
          eventByTypes[type] = eventByTypes[type] || [];
          eventByTypes[type].push(event);
        }

        return eventByTypes;
      }
    }),

    // Reducer to inject related document (place and person) directly in the data with the type as key
    reducer: oldReducer => (state, action) => {

      if(action.type === 'SUCCESS') {

        return {
          ...state,
          pending: false,
          data: {
            ...action.payload.data,
            results: action.payload.data.results.map(event => {

              for(const related of event.documents) {
                event.data[related.data.type] = related;
              }

              return event;
            })
          }
        }
      }

      return oldReducer(state, action) // forward any other action to the default reducer
    }
  }
);

export const mediasState = rj(
  rjCache({
    ns: 'medias',
    size: 50
  }),
  rjList({
    pageSize: 50,
    pagination: limitOffsetPaginationAdapter,
  }), getDocuments
);
