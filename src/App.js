import React, {useCallback, useEffect, useState} from 'react';
import Intro from './Intro/Intro';
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import Playlist from './Playlist/Playlist';
import styles from "./App.module.css";
import Spotify from './spotify/spotify';
import { accessToken } from './spotify/spotify';



function App() {
  const [results, setResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [tracklist, setTracklist] = useState([]);
  const [searchImput, setSearchImput] = useState("");


//THIS GETS NEW ACCESS TOKEN EVERYTIME ITS VALUE CHANGES (EXPIRES) WITHOUT THE NEED OF CLICKING TWICE ON THE SEARCH BUTTON
useEffect(() => {
  Spotify.getAccessToken();
}, [accessToken]);


const addTrack = (track) => {
if (!tracklist.includes(track)) {
  setTracklist((prev) => [...prev, track]);
  setResults((prev) => prev.filter((resultSong) => resultSong !== track));
}
}

function removeTrack (track) {
if (tracklist.includes(track)) {
  setTracklist((prev) => prev.filter((song) => song !== track));
  setResults((prev) => [track, ...prev]);
}
}

const gatherPlaylistUri = () => {
      return tracklist.map((song) => song.uri);
};
const emptyTracklist = () => {
  setTracklist([]);
}

const search = useCallback (() => {
  if (searchImput) {
    Spotify.getSongs(searchImput).then((arr) => setResults(arr));
  } else {
    alert("Start by typing into the search field")
  }
},[searchImput]);
/* THIS WORKS:
const search = () => {
 Spotify.getSongs(searchImput).then(setResults);
}
This works too:
const search = () => {
 Spotify.getSongs(searchImput).then((arr) => setResults(arr));
}
THIS DOES NOT WORK:
const search = () => {
 setResults(Spotify.getSongs(searchImput));
}

whenever we call a promise, we get its state - fulfiled/pending
then method says, that after the promise settles I WILL DO THIS.
if await is not possible to use here, use then() - it does the same.
 */
const sendPlaylist = () => {
  const urisArr = gatherPlaylistUri();
  Spotify.addTracksToNewPlaylist(playlistName,urisArr);
}

//SearchBar handlers
const handleSearchBarChange = (event) => {
  setSearchImput(event.target.value);
}
const handleSearchBarSubmit = (event) => {
  event.preventDefault();
  search();
}
//Playlist handlers
const handlePlaylistNameChange = (event) => {
  setPlaylistName(event.target.value);
}
const handlePlaylistButtonClick = () => {
  if (tracklist.length && playlistName) {
    sendPlaylist();
    emptyTracklist();
  } else if (!playlistName && tracklist.length) {
    alert("Give your playlist a name.");
  } else if (playlistName && !tracklist.length) {
    alert("Add at least one song to your new playlist.");
  } else {
    alert("Give your playlist a name and add at least one song to your new playlist.")
  }
  
}


if (results.length || tracklist.length) {
  return (
    <>
    <SearchBar onChange={handleSearchBarChange}
                onSubmit={handleSearchBarSubmit}
                searchImput={searchImput}
               />

    <section id={styles.resultsPlaylistCON}
              className={styles.getBor}>

      <SearchResults results={results} 
                     addTrack={addTrack}
                      />

      <Playlist playlistName={playlistName} 
                onChange={handlePlaylistNameChange}
                onClick={handlePlaylistButtonClick}
                tracklist={tracklist}
                removeTrack={removeTrack}
                />
    </section>
    
</>
  );
} else {
  return (
    <>
    <SearchBar onChange={handleSearchBarChange}
                onSubmit={handleSearchBarSubmit}
                searchImput={searchImput}
               />
    <Intro/>
</>
  );
}

}

export default App;
//export {addTrack};



