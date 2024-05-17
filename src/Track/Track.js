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
      <div id={styles.track}
            className={styles.getBor}>
        <figure id={styles.cover}
                className={styles.getBor}
                aria-label={`cover image for ${props.name}`}>
          <img id={styles.coverImg} 
                src={props.img} 
                alt={`cover image for ${props.name}`}
                aria-label={`cover image for ${props.name}`}/>
        </figure>
        <div id={styles.trackInfo}
              className={styles.getBor}>
          <h3 id={styles.trackName}>{props.name}</h3>
          <h4 id={styles.artistAlbum}>{props.artist} | {props.album}</h4>
        </div>
        <button id={styles.btn}
                className={styles.getBor}
                aria-label={props.buttonSign === "+" ? "add track to your playlist" : "remove track from your playlist"}
                onClick={props.buttonSign === "+" ? handleClickAddTrack : handleClickRemoveTrack}
                >{props.buttonSign}</button>
      </div>
    )
}

export default Track;