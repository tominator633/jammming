import Spotify from "./spotify"
// Mock the fetch function
global.fetch = jest.fn();
const mockToken = 'mock-token';




describe("Spotify", () => {

     describe(".getSongs()", () => {
        it("gets a list of songs from Spotify API based on user's request", async () => {
        //ARRANGE
        const expectedMockSongList = [
            {
                name: "Dinero",
                artist: "Trinidad Cardona",
                album: "Dinero",
                id: "3ggtU1ZOKO8ZNiqPNyXGcm",
                uri: "spotify:track:3ggtU1ZOKO8ZNiqPNyXGcm",
                img: "https://i.scdn.co/image/ab67616d0000b27338c99f64fec0cfebda3bfb6f"
            },
            {
                name: "Dinero",
                artist: "Jennifer Lopez",
                album: "Dinero",
                id: "22mQXNE0nCuWq4yOwcadIn",
                uri: "spotify:track:22mQXNE0nCuWq4yOwcadIn",
                img: "https://i.scdn.co/image/ab67616d0000b2734a729ab5bbf4ce1d75c849d9"
            }
        ];
        const mockResponse = {
            ok: true,
            json: () => Promise.resolve({
                tracks: {
                    items: [
                        {
                            name: "Dinero",
                            artists: [
                                {name: "Trinidad Cardona"}
                            ],
                            album: {
                                name: "Dinero",
                                images: [{url: "https://i.scdn.co/image/ab67616d0000b27338c99f64fec0cfebda3bfb6f"}]
                            },
                            id: "3ggtU1ZOKO8ZNiqPNyXGcm",
                            uri: "spotify:track:3ggtU1ZOKO8ZNiqPNyXGcm"
                        },
                        {
                            name: "Dinero",
                            artists: [
                                {name: "Jennifer Lopez"}
                            ],
                            album: {
                                name: "Dinero",
                                images: [{url: "https://i.scdn.co/image/ab67616d0000b2734a729ab5bbf4ce1d75c849d9"}]
                            },
                            id: "22mQXNE0nCuWq4yOwcadIn",
                            uri: "spotify:track:22mQXNE0nCuWq4yOwcadIn"
                        }
                    ],
                }
            })
        };

        Spotify.getAccessToken = jest.fn(() => mockToken);
        fetch.mockResolvedValueOnce(mockResponse);

        //ACT
        const actualSongList = await Spotify.getSongs("dinero");

        //ASSSERT
        expect(fetch).toHaveBeenCalledWith("https://api.spotify.com/v1/search?q=dinero&type=track", {
            headers: {
              Authorization: `Bearer ${mockToken}`,
            },
          });
        expect(actualSongList).toEqual(expectedMockSongList);
        });

        it('handles errors from Spotify API (getSongs)', async () => {
            //ARRANGE
            // Mock Spotify.getAccessToken to return the mock token
            Spotify.getAccessToken = jest.fn(() => mockToken);
            // Set up the fetch mock to return an error response
            fetch.mockRejectedValueOnce(new Error('Request for songs not successful'));
            
            
            //ACT
            // Call the getSongs method
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
            const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
            await Spotify.getSongs("dinero");
            
            
            //ASSERT
            // Assert that fetch is called with the correct URL and headers
            expect(fetch).toHaveBeenCalledWith("https://api.spotify.com/v1/search?q=dinero&type=track", {
              headers: {
                Authorization: `Bearer ${mockToken}`,
              },
            });
            // Assert that the console.log and window.alert are called with the correct error message
            expect(consoleSpy).toHaveBeenCalledWith(new Error('Request for songs not successful'));
            expect(alertSpy).toHaveBeenCalledWith(new Error('Request for songs not successful'));
          });
    });


    describe('.getUserId()', () => {
        it('fetches user ID from Spotify API', async () => {
        //ARRANGE
          // Mock response data
          const expectedMockUserId = '9876';
          const mockResponse = {
            ok: true,
            json: () => Promise.resolve({
                country: "Czechia",
                displayName: "Robot",
                id: "9876",
            }),
          };
          // Mock Spotify.getAccessToken to return the mock token
          Spotify.getAccessToken = jest.fn(() => mockToken);
          // Set up the fetch mock to return the mock response
          fetch.mockResolvedValueOnce(mockResponse);
          


          //ACT
          // Call the getUserId method
          const actualUserId = await Spotify.getUserId();
       
      
          // ASSERT
          //that fetch is called with the correct URL and headers
          expect(fetch).toHaveBeenCalledWith('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${mockToken}`,
            },
          });
          //that the returned user ID matches the mock user ID
          expect(actualUserId).toBe(expectedMockUserId);
        });
    

        it('handles errors from Spotify API', async () => {
      
          // Mock Spotify.getAccessToken to return the mock token
          Spotify.getAccessToken = jest.fn(() => mockToken);
      
          // Set up the fetch mock to return an error response
          fetch.mockRejectedValueOnce(new Error('Request for user ID not successful'));
      
          // Call the getUserId method
          const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
          const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
          await Spotify.getUserId();
      
          // Assert that fetch is called with the correct URL and headers
          expect(fetch).toHaveBeenCalledWith('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${mockToken}`,
            },
          });
      
          // Assert that the console.log and window.alert are called with the correct error message
          expect(consoleSpy).toHaveBeenCalledWith(new Error('Request for user ID not successful'));
          expect(alertSpy).toHaveBeenCalledWith(new Error('Request for user ID not successful'));
        });
      });
})


 