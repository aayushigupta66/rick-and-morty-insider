import gql from 'graphql-tag';

/**
 * Interface for the query that includes the character, location, and episode object.
 */
export interface QueryResult {
    characters: CharacterResult;
    locations: LocationResult;
    episodes: EpisodeResult;
}

/**
 * Interface for the character result object that contains information strings and objects for the search results screen.
 */
interface CharacterResult {
    results: Character[];
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
 * Interface for the location result object that contains information strings and objects for the search results screen.
 */
interface LocationResult {
    results: Location[];
}

/**
 * Interface for the location object that contains the location's id, name, and dimension.
 */
interface Location {
    id: string;
    name: string;
    dimension: string;
}

/**
 * Interface for the episode result object that contains information strings and objects for the search results screen.
 */
interface EpisodeResult {
    results: Episode[];
}

/**
 * Interface for the episode object that contains the episode's id, name, and episode.
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
    name: string;
    character: boolean;
    location: boolean;
    episode: boolean;
}

/**
 * Query for the API to request the required information for the search results screen.
 */
export const GET_SEARCH = gql`
    query search($name: String, $character: Boolean!, $location: Boolean!, $episode: Boolean!) {
      characters(filter: { name: $name }) @include(if: $character) {
        results {
          id
          name
          species
          image
        }
      }
      locations(filter: { name: $name }) @include(if: $location) {
        results {
          id
          name
          dimension
        }
      }
      episodes(filter: { name: $name }) @include(if: $episode) {
        results {
          id
          name
          episode
        }
      }
    }
`;
