import { cleanMovies } from './getNowPlaying.js';
import { mockMovie, mockCleanedNowPlaying } from './mockData';


describe('data cleaner', () => {
  it('should return clean movie data', () => {
    expect(cleanMovies(mockMovie)).toEqual(mockCleanedNowPlaying); 
  });

});