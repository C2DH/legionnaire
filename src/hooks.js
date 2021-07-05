import { useMemo } from 'react';
import { useRunRj, deps } from 'react-rocketjump';
import { docState, docsState, eventsState } from './state';

const ALL_RECORDS = 10000;

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
 */
const personsParams = {
  filters: {
    data__type: 'person'
  },
  limit: 1000
};
export function useGetPersons() {

  return useRunRj(
    docsState,
    [ personsParams ],
    false,
    (state, { getData }) => ({
      persons: getData(state)?.results
    })
  );
}

/**
 * Hook to get events of a person identified by its id from the backend
 * @param   id  id of the person to get
 */
export function useGetEventsByPersonId(id) {

  //  Memorize params to avoid infinite loop
  const params = useMemo(() => (
    id ?
      {
        filters: {
          data__type: 'event',
          documents: id
        },
        detailed: true,
        orderby: 'data__date',
        limit: ALL_RECORDS
      }: null
  ), [id]);

  const result = useRunRj(
    eventsState,
    [ deps.maybeNull(params) ],
    false,
    (state, { getData, getEventsByType }) => ({
      events: getData(state),
      //  Selecgtor to get events in an object with the event type as key
      eventsByTypes: getEventsByType(state)
    })
  );

  return result;
}
