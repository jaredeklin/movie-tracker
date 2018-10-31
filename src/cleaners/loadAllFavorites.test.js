import { loadAllFavorites } from './loadAllFavorites.js';
import { 
  mockUser, 
  mockLoadAllFavoritesMovie, 
  mockCleanMovie 
} from './mockData';  

describe('loadAllFavorites', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockLoadAllFavoritesMovie)
    }));
  });

  it('should call fetch with the correct params', () => {
    const expected = 'http://localhost:3000/api/v1/users/4/favorites';

    loadAllFavorites(mockUser.id);
    expect(window.fetch).toHaveBeenCalledWith(expected);
  });

  it('should fetch all favorites', async () => {
    const expected = await loadAllFavorites(mockUser.id);

    expect(expected).toEqual(mockCleanMovie);
  });

  it('should return an empty object if resonse is a 404', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 404
    }));

    expect(await loadAllFavorites(mockUser.id)).toEqual({});
  });

  it('should throw an error', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject({
      ok: false,
      statusText: 'Not found'
    }));

    const expected = {
      ok: false,
      statusText: 'Not found'};

    expect(loadAllFavorites()).rejects.toEqual(expected);
  });
});
