import { rj } from 'react-rocketjump';
import rjCache from 'react-rocketjump/plugins/cache';
import rjList, { limitOffsetPaginationAdapter } from 'react-rocketjump/plugins/list';
import { find } from 'lodash';

import { getDocument, getDocuments } from './api';
import {
  MEDIA_VIGNETTE,
  TYPE_MEDAL,
  EVENT_BIRTH,
  EVENT_DEATH
} from './constants';


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

export const personState = rj(
  rjCache({
    ns: 'person',
    size: 50
  }), {
    effect: getDocument,

    //  Selector to get events in an object with the event type as key
    selectors: ({ getData }) => ({
      getPerson: state => getData(state),
      getThumbnail: state => getData(state)?.documents.filter(doc => doc.data.type === MEDIA_VIGNETTE)[0],
      getMedals: state => getData(state)?.documents.filter(doc => doc.data.type === TYPE_MEDAL)
    }),
    computed: {
      person: 'getPerson',
      thumbnail: 'getThumbnail',
      medals: 'getMedals'
    }
  }
);

export const peopleState = rj(
  rjCache({
    ns: 'people',
    size: 50
  }),
  rjList({
    pageSize: 100,
    pagination: limitOffsetPaginationAdapter,
  }), {
    effect: getDocuments,

    //  Selector to get events in an object with the event type as key
    selectors: ({ getList, getCount, hasNext, getNext }) => ({
      getPeople: state => getList(state)?.map(person => ({
        ...person,
        illustration: person.documents.filter(doc => doc.data.type === MEDIA_VIGNETTE)[0],
        data: {
          ...person.data,
          birth_year: find(person.documents, ['data.event_type', EVENT_BIRTH])?.data.date?.substring(0, 4),
          death_year: find(person.documents, ['data.event_type', EVENT_DEATH])?.data.date?.substring(0, 4)
        }
      })),
      getNextOffset: state => getNext(state)?.offset
    }),
    computed: {
      people: 'getPeople',
      count: 'getCount',
      canLoadMore: 'hasNext',
      nextOffset: 'getNextOffset'
    }
  }
);

export const placeState = rj(
  rjCache({
    ns: 'place',
    size: 50
  }), {
    effect: getDocument,
    computed: {
      place: 'getData'
    }
  }
);

export const searchPeopleState = rj(
  rjCache({
    ns: 'searchPeople',
    size: 50
  }), {
    effect: getDocuments,

    //  Selector to get events in an object with the event type as key
    selectors: ({ getData }) => ({
      getPeople: state => getData(state)?.results || [],
      getPeopleIds: state => getData(state)?.results.map(person => person.id)
    }),
    computed: {
      people: 'getPeople',
      peopleIds: 'getPeopleIds'
    }
  }
);

export const searchPlacesState = rj(
  rjCache({
    ns: 'searchPlaces',
    size: 50
  }), {
    effect: getDocuments,

    //  Selector to get events in an object with the event type as key
    selectors: ({ getData }) => ({
      getPlaces: state => getData(state)?.results || []
    }),
    computed: {
      places: 'getPlaces'
    }
  }
);

export const eventsState = rj(
  rjCache({
    ns: 'events',
    size: 50
  }), {
    effect: getDocuments,

    //  Selector to get events in an object with the event type as key
    selectors: ({ getData }) => ({
      getEvents: state => getData(state)?.results.map(
        event => ({
          ...event,
          coordinates: [...event.place.data.coordinates.geometry.coordinates].reverse()
        })
      ),
      getEventsByType: state => {

        const eventByTypes = {};
        const events = getData(state)?.results;

        for(const event of events || []) {
          const type      = event.data.event_type;
          eventByTypes[type] = eventByTypes[type] || [];
          eventByTypes[type].push(event);
        }

        return eventByTypes;
      }
    }),

    computed: {
      events: 'getEvents',
      eventsByType: 'getEventsByType'
    },

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
                event[related.data.type] = related;
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
