import React from "react";
import Track from "./Track";
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


it("displays correctly song information", async ()=>{

    render(songsMockArr.map((songMock) => {
        return <Track name={songMock.name}
        artist={songMock.artist} 
        album={songMock.album} 
        key={songMock.id}
        id={songMock.id}
        img={songMock.img}
        song={songMock}
        addTrack={()=>{}}
        buttonSign="+"/>
    }));

const songName = screen.getByText(/Black and Yellow/i);
const artistName = screen.getByText(/Wiz Khalifa/i);
const albumName = screen.getByText(/Rolling Papers/i);
const coverPhoto = screen.getByRole("img", {name: /cover image for Black and Yellow/i});
expect(songName).toBeInTheDocument();
expect(artistName).toBeInTheDocument();
expect(albumName).toBeInTheDocument();
expect(coverPhoto).toBeInTheDocument();
});

it("Calls the addTrack() function when a user wants to add track to their playlist", () => {
    const mockAddTrack = jest.fn();
    const mockRemoveTrack = jest.fn();
    render(songsMockArr.map((songMock) => {
        return <Track name={songMock.name}
        artist={songMock.artist} 
        album={songMock.album} 
        key={songMock.id}
        id={songMock.id}
        img={songMock.img}
        song={songMock}
        addTrack={mockAddTrack}
        removeTrack={mockRemoveTrack}
        buttonSign="+"/>
    }));
    const addButton = screen.getByRole("button", {name: /add track to your playlist/i});
    userEvent.click(addButton);
    expect(mockAddTrack).toHaveBeenCalled();
});
it("Calls the removeTrack() function when a user wants to remove track from their playlist", () => {
    const mockAddTrack = jest.fn();
    const mockRemoveTrack = jest.fn();
    render(songsMockArr.map((songMock) => {
        return <Track name={songMock.name}
        artist={songMock.artist} 
        album={songMock.album} 
        key={songMock.id}
        id={songMock.id}
        img={songMock.img}
        song={songMock}
        addTrack={mockAddTrack}
        removeTrack={mockRemoveTrack}
        buttonSign="-"/>
    }));
    const addButton = screen.getByRole("button", {name: /remove track from your playlist/i});
    userEvent.click(addButton);
    expect(mockRemoveTrack).toHaveBeenCalled();
});

