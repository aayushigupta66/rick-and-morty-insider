import gql from 'graphql-tag';

/**
 * Interface for the query that includes the character object.
 */
export interface QueryResult {
    character: Character;
}

/**
 * Interface for the character object that contains information strings and objects for the detailed character screen.
 */
interface Character {
    id: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Location;
    location: Location;
    image: string;
    episode: Episode[];
}

/**
 * Interface for the location object that contains the location's id and name.
 */
interface Location {
    id: string;
    name: string;
}

/**
 * Interface for the episode object that contains the episode's id, name, and episode #.
 */
interface Episode {
    id: string;
    name: string;
    episode: string;
}

/**
 * Interface for the query variables.
 */
export interface Variables {
    id: number;
}

/**
 * Query for the API to request the required information for the detailed character screen.
 */
export const GET_PROFILE = gql`
    query profile($id: ID!) {
      character(id:$id) {
        id
        name
        status
        species
        type
        gender
        origin {
          id
          name
        }
        location {
          id 
          name
        }
        image
        episode {
          id
          name
          episode
        }
      }
    }
`;
