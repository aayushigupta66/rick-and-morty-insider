import gql from 'graphql-tag';

/**
 * Interface for the query that includes the episode object.
 */
export interface QueryResult {
    episode: Episode;
}

/**
 * Interface for the episode object that contains information strings and objects for the detailed episode screen.
 */
interface Episode {
    name: string;
    air_date: string;
    episode: string;
    characters: Character[];
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
 * Query for the API to request the required information for the detailed episode screen.
 */
export const GET_EPISODE = gql`
    query episode($id: ID!) { 
      episode(id:$id) {
        name
        air_date
        episode
        characters {
          id
          name
          species
          image
        }
      }
    }
`;
