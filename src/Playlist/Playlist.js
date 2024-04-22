import React from "react";
import styles from "./Playlist.module.css";
import Track from "../Track/Track";

function Playlist (props) {

  const handleChange = (event) => {
    props.setPlaylistName(event.target.value);
  }

  const handleClick = () => {
    props.sendPlaylist();
    props.emptyTracklist();
  }

return (
    <div id={styles.playlistCON}>
    <input id={styles.playlistName} 
            type="text"
            placeholder="name your playlist"
            onChange={handleChange}
            value={props.playlistName}
            />

     {props.tracklist.map((song) => <Track 
                                      name={song.name} 
                                      artist={song.artist} 
                                      album={song.album} 
                                      key={song.id} 
                                      id={song.id}
                                      img={song.img}
                                      song={song}
                                      uri={song.uri}
                                      removeTrack={props.removeTrack}
                                      buttonSign="-"
                                      />)} 

    <button id={styles.savePlaylist}
            onClick={handleClick}
    >Save to Spotify</button>
    <p>{props.playlistName}</p>
  </div>
)
}

export default Playlist;