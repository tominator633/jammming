import React from "react";
import styles from "./SearchBar.module.css"

function SearchBar (props) {

    return (
    <form 
<<<<<<< HEAD
=======
        role="form"
>>>>>>> 997bb0bf4888dcb62ca0989d958ad8ef917a2410
        onSubmit={props.onSubmit}
        id={styles.searchBarForm}
       /*  method="POST" 
        action="#" */ >
        <label htmlFor="search">
        <input
            type="search"
<<<<<<< HEAD
            aria-label="song search field"
            id={styles.songSearchField}
=======
            id="search"
            className={styles.songSearchField}
>>>>>>> 997bb0bf4888dcb62ca0989d958ad8ef917a2410
            placeholder="enter a song title"
            name="song"
            onChange={props.onChange}
            value={props.searchImput}
             /></label>

        <button 
            id={styles.songSearchSubmit}
            type="submit"
<<<<<<< HEAD
            aria-label="submit"
            alt="submit">
=======
            aria-label="search button">
>>>>>>> 997bb0bf4888dcb62ca0989d958ad8ef917a2410
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


