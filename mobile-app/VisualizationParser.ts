import gql from 'graphql-tag';

/**
 * Interface for the query that includes the episodesByIds object.
 */
export interface QueryResult {
    episodesByIds: Episodes[];
}

/**
 * Interface for the episodes object that contains information strings and objects for the visualization screen.
 */
interface Episodes {
    characters: Character[];
}

/**
 * Interface for the character object that contains the character's id and name.
 */
interface Character {
    id: string;
    name: string;
    image: string;
    species: string;
}

/**
 * Interface for the query variables.
 */
export interface Variables {
    ids: number[];
}

/**
 * Query for the API to request the required information for the visualization screen.
 */
export const GET_VISUALIZATION = gql`
    query visualization($ids: [ID!]!) {
      episodesByIds(ids: $ids) {
        characters {
          id
          name
          image
          species
        }
      }
    }
`;
