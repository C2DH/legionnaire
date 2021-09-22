import { useMemo } from 'react';
import { useRunRj, deps } from 'react-rocketjump';
import {
  docState,
  docsState,
  peopleState,
  searchPeopleState,
  eventsState,
  mediasState
} from './state';
import { MEDIA_VIGNETTE } from './constants';

const ALL_RECORDS = 10000;
const EVENT_BIRTH = "birth";

/**
 * Hook to get a person identified by its id from the backend
 * @param   id  id or slug of the person to get
 */
export function useGetPerson(id) {
  return useRunRj(
    docState,
    [ id ],
    true,
    (state, { getData }) => ({
      person: getData(state)
    })
  );
}

/**
 * Hook to get a person identified by its id from the backend
 * @param   offset  offset of the current page to load
 */
export function useGetPeople(offset = 0) {

  //  Memorize params to avoid infinite loop
  const params = useMemo(() => ({
    filters: {
      data__type: 'person'
    },
    limit: 100,
    detailed: true,
    offset: offset,
    orderby: 'title'
  }), [offset]);

  return useRunRj(
    peopleState,
    [ deps.withMeta(params, {append: offset !== 0}) ],
    false,
    (state, { getList, getCount, hasNext, getNext }) => ({
      people: (getList(state) || []).map(person => {
        for(const related of person.documents) {

          //  Get the vignette or firts photo from related documents and put it in the illustration property
          if(related.data.type === MEDIA_VIGNETTE /*|| (!person.illustration && related.data.type === MEDIA_PHOTO)*/)
            person.illustration = related;

          // Get the birth date from related documents and put the year in the data.birth_year property
          if(related.data.event_type === EVENT_BIRTH)
            person.data.birth_year = related.data.date?.substring(0, 4);

        }
        return person;
      }),
      count: getCount(state),
      canLoadMore: hasNext(state),
      nextOffset: getNext(state)?.offset
    })
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
 * Hook to get a media identified by its id from the backend
 * @param   id  id or slug of the media to get
 */
export function useGetMedia(id) {
  return useRunRj(
    docState,
    [ id ],
    true,
    (state, { getData }) => ({
      media: getData(state)
    })
  );
}

/**
 * Hook to get paginated list of medias
 * @param   offset  offset of the current page to load
 */
export function useGetMedias(offset = 0, type) {

  //  Memorize params to avoid infinite loop
  const params = useMemo(() => ({
    filters: {
      type__in: ['image', 'pdf'],
      data__type: type
    },
    limit: 50,
    offset: offset,
    orderby: 'data__title'
  }), [offset, type]);

  return useRunRj(
    mediasState,
    [ deps.withMeta(params, {append: offset !== 0}) ],
    false,
    (state, { getList, getCount, hasNext, getNext }) => ({
      medias: getList(state),
      count: getCount(state),
      canLoadMore: hasNext(state),
      nextOffset: getNext(state)?.offset
    })
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
    limit: 1,
    facets: 'data__type'
  };
export function useGetMediaFacets() {

  return useRunRj(
    docsState,
    [ mediaFacetsParams ],
    true,
    (state, { getData }) => ({
      mediaTypeFacets: getData(state)?.facets?.data__type,
      count: getData(state)?.count
    })
  );
}

/**
 * Hook to do a search from the backend
 * @param   q       query to search
 */
export function useSearch(query='') {

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
