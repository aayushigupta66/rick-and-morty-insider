import gql from 'graphql-tag';

/**
 * Interface for the query that includes the location object.
 */
export interface QueryResult {
    location: Location;
}

/**
 * Interface for the location object that contains information strings and objects for the detailed location screen.
 */
interface Location {
    name: string;
    type: string;
    dimension: string;
    residents: Character[];
}

/**
 * Interface for the character object that contains the character's id, name, species, and image.
 */
interface Character {
    id: string;
    name: string;
    species: string;
    image: string;
}

/**
 * Interface for the query variables.
 */
export interface Variables {
    id: number;
}

/**
 * Query for the API to request the required information for the detailed location screen.
 */
export const GET_LOCATION = gql`
    query location($id: ID!) { 
      location(id: $id) {
        name
        type
        dimension
        residents {
          id
          name
          species
          image
        }
      }
    }
`;
