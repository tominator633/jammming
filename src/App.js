import React, {useCallback, useState} from 'react';
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import Playlist from './Playlist/Playlist';
import styles from "./App.module.css";
import Spotify from './spotify/spotify';
import { eventWrapper } from '@testing-library/user-event/dist/utils';



/* const songs = [
  {name: "Yeah!", artist: "Chris Brown", album: "nanana", id: "1", uri: "spotify:track:2QtxlzvSBONjs1bDC34ixs"},
  {name: "Bussin", artist: "Nicki Minaj", album: "Untitled", id: "2", uri: "spotify:track:7lcI4X8RZxK4zIknJcwpBq"},
  {name: "FE!N", artist: "Travis Scott", album: "UTOPIA", id: "3", uri: "spotify:track:42VsgItocQwOQC3XWZ8JNA"},
  {name: "Atomy", artist: "Jelen", album: "Vsechno bude dobry", id: "4", uri: "spotify:track:2HwxIhPUcdB40xuOZnEVXC"},
  {name: "Freestyle", artist: "Lil Baby", album: "Too Hard", id: "5", uri: "spotify:track:5BbdKBZO0TH0GhfxUfyhL9?context=spotify%3Aplaylist%3A37i9dQZF1DX76Wlfdnj7AP"},
];
const tracksInPlaylist = [
  {name: "Yeah!", artist: "Chris Brown", album: "nanana", id: "1"},
  {name: "Bussin", artist: "Nicki Minaj", album: "Untitled", id: "2"},
  {name: "FE!N", artist: "Travis Scott", album: "UTOPIA", id: "3"},
  {name: "Atomy", artist: "Jelen", album: "Vsechno bude dobry", id: "4"},
  {name: "Freestyle", artist: "Lil Baby", album: "Too Hard", id: "5"},
]; */


function App() {
  const [results, setResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [tracklist, setTracklist] = useState([]);
  const [searchImput, setSearchImput] = useState("");
/*   const [urisArr, setUrisArr] = useState([]); */
/* 
THIS FUNCTION TOOOK ME ONE DAY TO FIGURE OUT---
FIRST I USED PREV IN THE CONDITION - BUT 
PREV IS NOT DEFINED UNTIL IT IS DECLARED AS
 PARAMETER IN SETTER
EVERYTIME THE SET TRACKLIST IS CALLED, 
A NEW ARRAY REPLACES THE OLD ONE. THATS WHY PUSH() D
OES NOT WORK EITHER!!! */
function addTrack (track) {
if (!tracklist.includes(track)) {
  setTracklist((prev) => [...prev, track]);
/*   setUrisArr((prev) => [...prev, track.uri]); */
}
}

function removeTrack (track) {
if (tracklist.includes(track)) {
  setTracklist((prev) => prev.filter((song) => song !== track));
 /*  setUrisArr((prev) => prev.filter((uri) => uri !== track.uri)); */
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

    <section id={styles.resultsPlaylistCON}>

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




