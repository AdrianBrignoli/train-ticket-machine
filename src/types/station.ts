/**
 * Represents a train station
 * 
 * @interface Station
 * @property {string} stationCode - Unique identifier for the station
 * @property {string} stationName - Human-readable station name
 */
export interface Station {
  stationCode: string;
  stationName: string;
}

export interface SearchResult {
  stations: Station[];
  nextCharacters: string[];
}