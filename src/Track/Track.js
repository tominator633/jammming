import React from "react";
import styles from "./Track.module.css";

function Track (props) {

const handleClickAddTrack = () => {
props.addTrack(props.song)
}

const handleClickRemoveTrack = () => {
  props.removeTrack(props.song)
}

return (
      <div id={styles.track}>
        <figure id={styles.cover}>
          <img id={styles.coverImg} src={props.img} alt={props.name}/>
        </figure>
        <div id={styles.trackInfo}>
          <h3 id={styles.trackName}>{props.name}</h3>
          <h4 id={styles.artistAlbum}>{props.artist} | {props.album}</h4>
        </div>
        <button id={styles.btn}
                onClick={props.buttonSign === "+" ? handleClickAddTrack : handleClickRemoveTrack}
                >{props.buttonSign}</button>
      </div>
    )
}

export default Track;