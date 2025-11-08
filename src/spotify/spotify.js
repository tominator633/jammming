const clientId = "";
const redirectUri = 'http://localhost:3000/';
const baseURL = "https://api.spotify.com";
let accessToken;
export {accessToken}

const Spotify = {
        getAccessToken() {
    
        if (accessToken) {
          return accessToken;
        } 
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
          accessToken = accessTokenMatch[1];
          const expiresIn = Number(expiresInMatch[1]);
          window.setTimeout(() => accessToken = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
          return accessToken;
        } else {
          const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
          window.location = accessUrl;
        }
      },

         async getSongs (searchedTitle) {
            const searchEndpoint = "/v1/search";
            let token = Spotify.getAccessToken();
            try {
                const response = await fetch(`${baseURL}${searchEndpoint}?q=${searchedTitle}&type=track`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                });
                if (response.ok) {
                    const jsonResponse = await response.json();
                 const resultsArr = await jsonResponse.tracks.items.map((item) => {
                    return {
                        name: item.name,
                        artist: item.artists[0].name,
                        album: item.album.name,
                        id: item.id,
                        uri: item.uri,
                        img: item.album.images[0].url 
                        /* i DID IT WRONG WY THE WHOLE TIME just because of
                         watching the spotify manual - you need to check 
                         the jsonresponse itself to find the right path to img */
                    }
                });
                console.log(jsonResponse);
                console.log(resultsArr);
                return resultsArr;
                } else {
                    throw new Error("Request for songs not successful");
                }
            } catch(error) {
                alert(error);
                console.log(error);
            }
        },

        async getUserId () {
            const currentUserEndpoint = "/v1/me";
            let token = Spotify.getAccessToken();
            try {
                const response = await fetch(`${baseURL}${currentUserEndpoint}`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                });
                if (response.ok) {
                    const jsonResponse = await response.json();
                    const spotifyUserId = await jsonResponse.id;
                    console.log(spotifyUserId);
                    return spotifyUserId;
                } else {
                    throw new Error("Request for user ID not successful");
                }
                
            } catch (error) {
                    alert(error);
                    console.log(error);
            }
        },

        async createSpotifyPlaylist (playlistName) {
            const spotifyUserId = await Spotify.getUserId();
            const playlistsEndpoint = `/v1/users/${spotifyUserId}/playlists`;
            let token = Spotify.getAccessToken();
            //console.log(token);
            //console.log(playlistName);
            //console.log(`${baseURL}${playlistsEndpoint}`);
            try {
                const response = await fetch(`${baseURL}${playlistsEndpoint}`, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: playlistName,
                      description: "created with Jammming",
                /*       public: false */
                /* PUBLIC: FALSE IS OUT OF MY GRANTED SCOPE- IT CAUSED THE ERROR 403 !!! 
                I was not authorized to use this header because manipulation 
                of private playlists is out of my scope*/
                    })
                });
                if (response.ok) {
                    const jsonResponse = await response.json();
                    const playlistId = await jsonResponse.id;
                    console.log(playlistId);
                    console.log(playlistName);
                    return playlistId;
                } else {
                    throw new Error("Playlist not created. Request error.");
                }
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },

        async addTracksToNewPlaylist (playlistName, urisArr) {
            let token = Spotify.getAccessToken();
            const playlistId = await Spotify.createSpotifyPlaylist(playlistName);
            const newPlaylistEndpoint = `/v1/playlists/${playlistId}/tracks`;
            try {
                const response = await fetch(`${baseURL}${newPlaylistEndpoint}`, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        uris: urisArr
                    })
                });
                if (response.ok) {
                    alert("Playlist created :)");
                } else {
                    throw new Error("The addition of tracks failed");
                }
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
}

export default Spotify;


