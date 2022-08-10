import gql from 'graphql-tag';

/**
 * Interface for the query that includes the character object.
 */
export interface QueryResult {
    characters: Result;
}

/**
 * Interface for the result object that includes the array of characters.
 */
interface Result {
    results: Character[];
}

/**
 * Interface for the character object that contains information strings for the character feed screen.
 */
interface Character {
    id: string;
    name: string;
    status: string;
    species: string;
    image: string;
}

/**
 * Interface for the query variables.
 */
export interface Variables {
    page: number;
}

/**
 * Query for the API to request the required information for the character feed screen.
 */
export const GET_CHARACTERS = gql`
    query characters($page: Int) { 
      characters(page: $page) {
        results {
          id
          name
          status
          species
          image
        }
      }
    }
`;
