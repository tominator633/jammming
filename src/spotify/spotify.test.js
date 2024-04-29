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

        it('handles errors from Spotify API with message: Request for songs not successful', async () => {
            //ARRANGE
            const mockErrorMessage = "Request for songs not successful"
            // Mock Spotify.getAccessToken to return the mock token
            Spotify.getAccessToken = jest.fn(() => mockToken);
            // Set up the fetch mock to return an error response
            fetch.mockRejectedValueOnce(new Error(mockErrorMessage));
            
            
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
            expect(consoleSpy).toHaveBeenCalledWith(new Error(mockErrorMessage));
            expect(alertSpy).toHaveBeenCalledWith(new Error(mockErrorMessage));
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
    

        it('handles errors from Spotify API with message: Request for user ID not successful', async () => {
      
          //ARRANGE
          Spotify.getAccessToken = jest.fn(() => mockToken);
          fetch.mockRejectedValueOnce(new Error('Request for user ID not successful'));
      
          //ACT
          const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
          const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
          await Spotify.getUserId();
      
          //ASSERT
          expect(fetch).toHaveBeenCalledWith('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${mockToken}`,
            },
          });
          expect(consoleSpy).toHaveBeenCalledWith(new Error('Request for user ID not successful'));
          expect(alertSpy).toHaveBeenCalledWith(new Error('Request for user ID not successful'));
        });
      });

      describe(".createSpotifyPlaylist()", () => {
        it("posts a new public playlist in user's Spotify account and returns that playlist's ID", async () => {
            //ARRANGE
            Spotify.getUserId = jest.fn(() => "9876");
            Spotify.getAccessToken = jest.fn(() => mockToken);
            const mockResponse = {
                ok: true,
                json: () => Promise.resolve({id: "ABCD345"})
            }
            fetch.mockResolvedValueOnce(mockResponse);
            const expectedMockPlaylistId = "ABCD345";

            
            //ACT
            const actualMockPlaylistId = await Spotify.createSpotifyPlaylist("My Dinero Playlist");
            //ASSERT
            expect(actualMockPlaylistId).toBe(expectedMockPlaylistId);
            expect(fetch).toHaveBeenCalledWith("https://api.spotify.com/v1/users/9876/playlists", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + mockToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: "My Dinero Playlist",
                  description: "created with Jammming",
                })
            });
        });
        it("handles errors from Spotify API with message: Playlist not created. Request error.", async () => {
            //ARRANGE
            const mockErrorMessage = "Playlist not created. Request error.";
            Spotify.getAccessToken = jest.fn(() => mockToken);
            fetch.mockRejectedValueOnce(new Error(mockErrorMessage));
            //ACT
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
            const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
            await Spotify.createSpotifyPlaylist("My Dinero Playlist");
            //ASSERT
            expect(consoleSpy).toHaveBeenCalledWith(new Error(mockErrorMessage));
            expect(alertSpy).toHaveBeenCalledWith(new Error(mockErrorMessage));
            expect(fetch).toHaveBeenCalledWith("https://api.spotify.com/v1/users/9876/playlists", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + mockToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: "My Dinero Playlist",
                  description: "created with Jammming",
                })
            });
        })
      });

      describe(".addTracksToNewPlaylist", () => {
        it("adds tracks to the newly created playlist", async () => {
            //ARRANGE
            const mockPlaylistName = "My Dinero Playlist";
            const mockUrisArr = ["spotify:track:3ggtU1ZOKO8ZNiqPNyXGcm","spotify:track:22mQXNE0nCuWq4yOwcadIn"];
            Spotify.getAccessToken = jest.fn(() => mockToken);
            Spotify.createSpotifyPlaylist = jest.fn(() => "ABCD345");
            const mockResponse = {
                ok: true,
                json: () => Promise.resolve({})
            }
            fetch.mockResolvedValueOnce(mockResponse);
            //ACT
            await Spotify.addTracksToNewPlaylist(mockPlaylistName, mockUrisArr);
            const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
            //ASSERT

            expect(fetch).toHaveBeenCalledWith("https://api.spotify.com/v1/playlists/ABCD345/tracks", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + mockToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uris: mockUrisArr
                })
            });
            
            expect(alertSpy).toHaveBeenCalledWith("Playlist created :)");

        });
        it("handles errors from Spotify API with message: The addition of tracks failed", async () => {
            //ARRANGE
            const mockPlaylistName = "My Dinero Playlist";
            const mockUrisArr = ["spotify:track:3ggtU1ZOKO8ZNiqPNyXGcm","spotify:track:22mQXNE0nCuWq4yOwcadIn"];
            const mockErrorMessage = "The addition of tracks failed";
            fetch.mockRejectedValueOnce(new Error(mockErrorMessage));
            //ACT
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
            const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
            await Spotify.addTracksToNewPlaylist(mockPlaylistName, mockUrisArr);
            //ASSERT
            expect(consoleSpy).toHaveBeenCalledWith(new Error(mockErrorMessage));
            expect(alertSpy).toHaveBeenCalledWith(new Error(mockErrorMessage));
        });
      })
})


 