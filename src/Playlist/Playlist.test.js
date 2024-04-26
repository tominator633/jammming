import React from "react";
import Playlist from "./Playlist";
import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Track from "../Track/Track";

it("enables user to name thier playlist, add songs to this section", () => {
    
    const expectedTracklist = [
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

    const tracklist = [
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
    
    
    render(<Playlist playlistName={"My dinero playlist"}
                    tracklist={tracklist}
            />);
    const playlistNameField = screen.getByRole("textbox", {name: /name your playlist/i});
    expect(playlistNameField).toBeInTheDocument();
    expect(playlistNameField).toHaveValue("My dinero playlist");

})