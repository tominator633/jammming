import React from "react";
import styles from "./Intro.module.css";




function Intro (props) {

return (

    <div className={styles.getBor} id={styles.introCON}>
        <div className={styles.getBor} 
            id={styles.intro}>
        <section className={styles.getBor} 
                id={styles.instructions}>
            <p className={styles.getBor}>1. Search for any song 
                you like in the Spotify database.</p>
            <p className={styles.getBor}>2. Add songs to your new playlist</p>
            <p className={styles.getBor}>3. Save the playlist to your Spotify account</p>
        </section>
        
        <section className={styles.getBor}>
            <a href="https://open.spotify.com/" 
            target="blank"
            className={styles.getBor}
            id={styles.spotifyLogo}>
                <img src="Spotify_Logo_RGB_Green.png" ></img>
            </a>
        </section>
        </div>
        <h3 className={styles.getBor}
            id={styles.introMessage}>Start by typing a song name into the search field and pressing play button!</h3>
        
       
    </div>
    )
    }
    
    export default Intro;