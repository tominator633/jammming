import React from "react";
import Playlist from "./Playlist";
import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";



const tracklistMock = [
    {
        name: "Dinero",
        artist: "Trinidad Cardona",
        album: "Dinero",
        id: "3ggtU1ZOKO8ZNiqPNyXGcm",
        uri: "spotify:track:3ggtU1ZOKO8ZNiqPNyXGcm",
        img: "https://i.scdn.co/image/ab67616d0000b27338c99f64fec0cfebda3bfb6f"
    },
    {
        name: "Dinero",
        artist: "Jennifer Lopez",
        album: "Dinero",
        id: "22mQXNE0nCuWq4yOwcadIn",
        uri: "spotify:track:22mQXNE0nCuWq4yOwcadIn",
        img: "https://i.scdn.co/image/ab67616d0000b2734a729ab5bbf4ce1d75c849d9"
    }
];

it("enables user to name their playlist", () => {
    render(<Playlist
            tracklist={tracklistMock}
            onClick={()=>{}}
            onChange={()=>{}}
            removeTrack={()=>{}}
            />);
    const playlistNameField = screen.getByRole("textbox", {name: /name your playlist/i});
    userEvent.type(playlistNameField, "My Dinero Playlist");
    expect(playlistNameField).toBeInTheDocument();
    expect(playlistNameField).toHaveValue("My Dinero Playlist");
});

it("renders the tracklist with selected tracks by user", () => {
    render(<Playlist
        tracklist={tracklistMock}
        onClick={()=>{}}
        onChange={()=>{}}
        removeTrack={()=>{}}
        />);
    const jlo = screen.getByText(/Jennifer Lopez/i);
    const trinidad = screen.getByText(/Trinidad Cardona/i);
    expect(jlo).toBeInTheDocument();
    expect(trinidad).toBeInTheDocument();
 
});
it("submits the playlist to Spotify after the user clicks the button", () => {
    const onClickMock = jest.fn();
    render(<Playlist 
        playlistName={"Hey play"}
        tracklist={tracklistMock}
        onClick={onClickMock}
        onChange={()=>{}}
        removeTrack={()=>{}}
        />);
    const playlistSaveButton = screen.getByRole("button", {name: /Save to Spotify/i});
    userEvent.click(playlistSaveButton);
    expect(playlistSaveButton).toBeInTheDocument();
    expect(onClickMock).toHaveBeenCalled();
    
})