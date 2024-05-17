/* import React, {useState} from "react";
import App from "./App";
import {addTrack} from "./App";
import SearchResults from "./SearchResults/SearchResults";
import Playlist from "./Playlist/Playlist";
import Track from "./Track/Track";
import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";


const songsMockArr = [
    {
        name: "Black and Yellow",
        artist: "Wiz Khalifa",
        album: "Rolling Papers",
        id: "5A6OHHy73AR5tLxgTc98zz",
        uri: "spotify:track:5A6OHHy73AR5tLxgTc98zz",
        img: "https://i.scdn.co/image/ab67616d0000b273fe3cf32b1320e8ded39d8c74"
    }
]

describe("addTrack", () => {
    it("enables user to add track to their playlist after the plus button on a searched track is clicked", () => {
      // Setup
    const tracklist = [];
    const setTracklist = jest.fn(); // Mock setTracklist function

    // Execution
    const newTrack = {
      name: "New Track",
      artist: "Artist",
      album: "Album",
      id: "123",
      uri: "spotify:track:123",
      img: "https://example.com/image.jpg"
    };
    addTrack(newTrack, tracklist, setTracklist);

    // Assertion
    expect(setTracklist).toHaveBeenCalledWith([newTrack]);
      
    });
     it("does not add a track if it's already included in the tracklist", () => {
        // Setup
        const existingTrack = {
          name: "Existing Track",
          artist: "Artist",
          album: "Album",
          id: "456",
          uri: "spotify:track:456",
          img: "https://example.com/image.jpg"
        };
        const tracklist = [existingTrack];
        const setTracklist = jest.fn(); // Mock setTracklist function
    
        // Execution
        addTrack(existingTrack, tracklist, setTracklist);
    
        // Assertion
        expect(setTracklist).not.toHaveBeenCalled(); // The setTracklist function should not be called
      });


}) */