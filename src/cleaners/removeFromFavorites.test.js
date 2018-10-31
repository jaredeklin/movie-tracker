import { removeFromFavorites } from './removeFromFavorites';

const url = process.env.REACT_APP_DATABASE_URL;

describe('removeFromFavorites', () => {

  it('should remove from favorites', async () => {
    const mockUserId = 4;
    const mockMovieId = 123456;
    const mockMovieInfo = JSON.stringify({
      user_id: 4,
      movie_id: 123456
    });

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({ 
        status: 200,
        json: () => Promise.resolve(mockMovieInfo)
      })
    );

    const expected = [`${url}/api/v1/favorites/${mockMovieInfo}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    }];

    await removeFromFavorites(mockUserId, mockMovieId);
  
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });

  it('should throw an error if bad request', () => {
    window.fetch = jest.fn().mockImplementation(() => 
      Promise.reject({
        status: 500
      }) 
    );

    const expected = {"status": 500};
    expect(removeFromFavorites()).rejects.toEqual(expected);
  });
});
