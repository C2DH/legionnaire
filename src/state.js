import { rj } from 'react-rocketjump';
import rjCache, { InMemoryStore } from 'react-rocketjump/plugins/cache';
import rjList, { limitOffsetPaginationAdapter } from 'react-rocketjump/plugins/list';
import { find, sortBy, map, uniqBy } from 'lodash';

import { getDocument, getDocuments, getStory } from './api';
import { parseYear, translate } from './utils';
import {
  MEDIA_VIGNETTE,
  TYPE_MEDAL,
  TYPE_PERSON,
  EVENT_BIRTH,
  EVENT_DEATH,
  defaultLanguage
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

export const staticPageState = rj(
  rjCache({
    ns: 'staticPage',
    size: 5
  }), {
    effect: getStory,

    selectors: ({ getData }) => ({
      getPage: state => translate(getData(state), defaultLanguage)
    }),
    computed: {
      page: 'getPage'
    }
  }
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
      getThumbnail: state => getData(state)?.documents.filter(doc => doc.data.category === MEDIA_VIGNETTE)[0],
      getMedals: state => getData(state)?.documents.filter(doc => doc.data.type === TYPE_MEDAL),
      getMilitaryRanks: state => sortBy(getData(state)?.data.military_rank, ['date']),
      getProfessions: state => sortBy(getData(state)?.data.profession, ['date'])
    }),
    computed: {
      person: 'getPerson',
      thumbnail: 'getThumbnail',
      medals: 'getMedals',
      militaryRanks: 'getMilitaryRanks',
      professions: 'getProfessions'
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
        illustration: person.documents.filter(doc => doc.data.category === MEDIA_VIGNETTE)[0],
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
      getPlaces: state => getData(state)?.results || [],
      getPlacesIds: state => getData(state)?.results.map(place => place.id)
    }),
    computed: {
      places: 'getPlaces',
      placesIds: 'getPlacesIds'
    }
  }
);

const eventConfig = {

    effect: getDocuments,

    //  Selector to get events in an object with the event type as key
    selectors: ({ getData }) => ({
      getEvents: state => getData(state)?.results
        .filter(event => !isNaN(event.place?.data.coordinates.geometry.coordinates[0]))
        .map(
          event => ({
            ...event,
            coordinates: [...event.place?.data.coordinates.geometry.coordinates].reverse()
          })
        )
      ,
      getEventsByType: state => {

        const eventByTypes = {};
        const events = sortBy(getData(state)?.results, ['person.title']);

        for(const event of events || []) {
          const type      = event.data.event_type;
          eventByTypes[type] = eventByTypes[type] || [];
          eventByTypes[type].push(event);
        }

        return eventByTypes;
      },
      getPeople: state => uniqBy(map(getData(state)?.results, 'person'), 'id')
    }),

    computed: {
      events: 'getEvents',
      eventsByType: 'getEventsByType',
      people: 'getPeople'
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
};

export const eventsState = rj(
  rjCache({
    ns: 'events',
    size: 50
  }), eventConfig
);

// Use InMemoryStore for the cache for all events because it's too big for the SessionStorageStore
export const allEventsState = rj(
  rjCache({
    ns: 'allEvents',
    size: 1,
    store: InMemoryStore
  }), eventConfig
);

export const mediaState = rj(
  rjCache({
    ns: 'media',
    size: 50
  }), {
    effect: getDocument,

    //  Selector to get events in an object with the event type as key
    selectors: ({ getData }) => ({
      getMedia: state => getData(state),
      getPeople: state => getData(state)?.documents.filter(doc => doc.data.type === TYPE_PERSON),
      getRelatedMedias: state => sortBy(getData(state)?.documents.filter(doc => doc.data.type !== TYPE_PERSON && doc.data.index), ['data.index'])
    }),
    computed: {
      media: 'getData',
      people: 'getPeople',
      relatedMedias: 'getRelatedMedias'
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
  }), {
    effect: getDocuments,

    //  Selector to get events in an object with the event type as key
    selectors: ({ getNext }) => ({
      getNextOffset: state => getNext(state)?.offset
    }),
    computed: {
      medias: 'getList',
      count: 'getCount',
      canLoadMore: 'hasNext',
      nextOffset: 'getNextOffset'
    }
  }
);

export const timelineEventsState = rj(
  rjCache({
    ns: 'timelineEvents',
    size: 1
  }), {
    effect: getDocuments,

    selectors: ({ getData }) => ({
      getEvents: state => getData(state)?.results || [],
      getEventsByYear: state =>
        getData(state)?.results.reduce((eventByYear, event) => {

          if(event.data.date) {
            let year = parseYear(event.data.date);
            eventByYear[year] = eventByYear[year] || [];
            eventByYear[year].push(event);
          }

          return eventByYear;
        }, {}) || {}
    }),
    computed: {
      events: 'getEvents',
      eventsByYear: 'getEventsByYear'
    }
  }
);
