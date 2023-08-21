import { useMemo } from 'react';
import { useRunRj, deps } from 'react-rocketjump';
import {
  staticPageState,
  docsState,
  personState,
  peopleState,
  placeState,
  searchPeopleState,
  searchPlacesState,
  eventsState,
  allEventsState,
  mediaState,
  mediasState,
  timelineEventsState
} from './state';

const ALL_RECORDS = 10000;

/**
 * Hook to get a static page content identified by its id or slug from the backend
 * @param   id  id or slug of the static page content to get
 */
export function useGetStaticPage(id) {
  return useRunRj(
    staticPageState,
    [ id ],
    true
  );
}

/**
 * Hook to get a person identified by its id from the backend
 * @param   id  id or slug of the person to get
 */
export function useGetPerson(id) {
  return useRunRj(
    personState,
    [ id ],
    true
  );
}


/**
 * Hook to get the list of legionnaires from the backend
 * @param   offset  offset of the current page to load
 * @param   starts  Optional. First letter of the name to filter the list
 */
export function useGetPeople(offset = 0, starts) {

  //  Memorize params to avoid infinite loop
  const params = useMemo(() => ({
    filters: {
      data__type: 'person',
      title__istartswith: starts
    },
    limit: 100,
    detailed: true,
    offset: offset,
    orderby: 'title'
  }), [offset, starts]);

  return useRunRj(
    peopleState,
    [ deps.withMeta(params, {append: offset !== 0}) ],
    false
  );
}


/**
 * Hook to get a place identified by its id from the backend
 * @param   id  id or slug of the place to get
 */
export function useGetPlace(id) {
  return useRunRj(
    placeState,
    [ id ],
    true
  );
}


/**
 * Hook to get events of people identified by their id from the backend
 * @param   id      id of the person or array of id of people to get
 * @param   types   types of event to get. All events are retrieved if not specified
 */
export function useGetEventsByPersonId(id, types) {

  //  Memorize params to avoid infinite loop
  const params = useMemo(() => {

    if(!id) return null;

    let params = {
      filters: {
        data__type: 'event'
      },
      detailed: true,
      orderby: 'data__date',
      limit: ALL_RECORDS
    };

    if(id.constructor === Array)
      params.filters.documents__in = id;
    else
      params.filters.documents = id;

    if(types)
      params.filters.data__event_type__in = types;

    return params;

  }, [id, types]);

  const result = useRunRj(
    eventsState,
    [ deps.maybeNull(params) ],
    true
  );

  return result;
}


/**
 * Hook to get all events
 */
const eventsParams = {
  filters: {
    data__type: 'event'
  },
  detailed: true,
  orderby: 'data__date',
  limit: ALL_RECORDS
};
export function useGetEvents() {
  return useRunRj(
    allEventsState,
    [ eventsParams ],
    true
  );
}


/**
 * Hook to get a media identified by its id from the backend
 * @param   id  id or slug of the media to get
 */
export function useGetMedia(id) {
  return useRunRj(
    mediaState,
    [ id ],
    true
  );
}


/**
 * Hook to get paginated list of medias
 * @param   offset  offset of the current page to load
 * @param   type    type of the media to get
 */
export function useGetMedias(offset = 0, type) {

  //  Memorize params to avoid infinite loop
  const params = useMemo(() => ({
    filters: {
      type__in: ['image', 'pdf'],
      data__category: type
    },
    exclude: {
      data__category: 'vignette'
    },
    limit: 50,
    offset: offset,
    orderby: 'data__title'
  }), [offset, type]);

  return useRunRj(
    mediasState,
    [ deps.withMeta(params, {append: offset !== 0}) ],
    false
  );
}


/**
 * Hook to get type facets of medias
 */
const mediaFacetsParams =
  {
    filters: {
      type__in: ['image', 'pdf']
    },
    exclude: {
      data__category: 'vignette'
    },
    limit: 1,
    facets: 'data__category'
  };
export function useGetMediaFacets() {

  return useRunRj(
    docsState,
    [ mediaFacetsParams ],
    true,
    (state, { getData }) => ({
      mediaTypeFacets: getData(state)?.facets?.data__category,
      count: getData(state)?.count
    })
  );
}


export function useSearch(query) {

  const [{ people, peopleIds }]     = useSearchPeople(query);
  const [{ places, placesIds }]     = useSearchPlaces(query);

  //  Memorize params to avoid infinite loop
  const params = useMemo(() => {

    if(query && (!peopleIds || !placesIds)) return null;

    let params = {
      filters: {
        data__type: 'event',
        documents__in: query ? peopleIds.concat(placesIds) : undefined
      },
      detailed: true,
      orderby: 'data__date',
      limit: ALL_RECORDS
    };

    return params;

  }, [peopleIds, placesIds, query]);

  const [{ events, eventsByType }] = useRunRj(
    query ? eventsState : allEventsState,
    [ deps.maybeNull(params) ],
    true
  );

  return [{ people, places, events, eventsByType }];
}


/**
 * Hook to do a search on people from the backend
 * @param   q       query to search
 */
export function useSearchPeople(query='') {

  //  Memorize params to avoid infinite loop
  const params = useMemo(() => (
    query ?
      {
        filters: {
          data__type: 'person'
        },
        q: `${query}*`,
        limit: ALL_RECORDS
      }: null
  ), [query]);

  return useRunRj(
    searchPeopleState,
    [ deps.maybeNull(params) ],
    true
  );
}


/**
 * Hook to do a search on places from the backend
 * @param   q       query to search
 */
export function useSearchPlaces(query='') {

  //  Memorize params to avoid infinite loop
  const params = useMemo(() => (
    query ?
      {
        filters: {
          data__type: 'place'
        },
        q: `${query}*`,
        limit: ALL_RECORDS
      }: null
  ), [query]);

  return useRunRj(
    searchPlacesState,
    [ deps.maybeNull(params) ],
    true
  );
}


/**
 * Hook to get all timeline events
 */
const timelineEventsParams = {
  filters: {
    data__type: 'timeline-event'
  },
  detailed: true,
  orderby: 'data__date',
  limit: ALL_RECORDS
};
export function useGetTimelineEvents() {
  return useRunRj(
    timelineEventsState,
    [ timelineEventsParams ],
    true
  );
}
