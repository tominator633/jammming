import React from "react";
import styles from "./SearchBar.module.css"

function SearchBar (props) {

    return (
    <form 
        onSubmit={props.onSubmit}
        id={styles.searchBarForm}>
        <input
            type="search"
            aria-label="song search field"
            className={styles.songSearchField}
            placeholder="enter a song title"
            name="song"
            onChange={props.onChange}
            value={props.searchImput}
             />

        <button 
            id={styles.songSearchSubmit}
            type="submit"
            aria-label="submit"
            alt="submit">
                <svg 
                    id={styles.songSearchSubmitSVG}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="1em" 
                    height="1em" 
                    viewBox="0 0 24 24"><path 
                    fill="currentColor" 
                    d="M21.409 9.353a2.998 2.998 0 0 1 0 
                    5.294L8.597 21.614C6.534 22.737 4 
                    21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z"/></svg>
        </button>
    </form>
    )
}
export default SearchBar;