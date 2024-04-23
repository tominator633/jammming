import React from "react";
import styles from "./SearchBar.module.css"

function SearchBar (props) {

    return (
    <form 
        role="form"
        onSubmit={props.onSubmit}
        id={styles.searchBarForm}
       /*  method="POST" 
        action="#" */ >
        <label htmlFor="search">
        <input
            type="search"
            id="search"
            className={styles.songSearchField}
            placeholder="enter a song title"
            name="song"
            onChange={props.onChange}
            value={props.searchImput}
             /></label>

        <button 
            id={styles.songSearchSubmit}
            type="submit"
            aria-label="search button">
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


