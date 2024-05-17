import React, {useCallback, useEffect, useState} from 'react';
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import Playlist from './Playlist/Playlist';
import styles from "./App.module.css";
import Spotify from './spotify/spotify';
import { accessToken } from './spotify/spotify';
import { eventWrapper } from '@testing-library/user-event/dist/utils';


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
}
}

function removeTrack (track) {
if (tracklist.includes(track)) {
  setTracklist((prev) => prev.filter((song) => song !== track));
}
}

const gatherPlaylistUri = () => {
      return tracklist.map((song) => song.uri);
};
const emptyTracklist = () => {
  setTracklist([]);
}

const search = useCallback (() => {
 Spotify.getSongs(searchImput).then((arr) => setResults(arr));
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
  sendPlaylist();
  emptyTracklist();
}
//Track handlers



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
}

export default App;
//export {addTrack};



