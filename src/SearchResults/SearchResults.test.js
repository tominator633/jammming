import React from "react";
import SearchResults from "./SearchResults";
import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const resultsMock = [
    {
        name: "Crazy In Love (feat. Jay-Z)",
        artist: "Beyoncé",
        album: "Dangerously In Love",
        id: "5IVuqXILoxVWvWEPm82Jxr",
        uri: "spotify:track:5IVuqXILoxVWvWEPm82Jxr",
        img: "https://i.scdn.co/image/ab67616d0000b27345680a4a57c97894490a01c1"
    },
    {
        name: "Crazy",
        artist: "Gnarls Barkley",
        album: "St. Elsewhere",
        id: "1vxw6aYJls2oq3gW0DujAo",
        uri: "spotify:track:1vxw6aYJls2oq3gW0DujAo",
        img: "https://i.scdn.co/image/ab67616d0000b273ceb0b3423d21e3da43c58b0b"
    }
    ];


it("displays correctly the list of song results based on user`s request", () => {
    render(<SearchResults 
        results={resultsMock} 
        addTrack={()=>{}} 
        />);
        const heading = screen.getByText("Results");
        expect(heading).toBeInTheDocument();
        const bey = screen.getByText(/Beyoncé/i);
        const gnarls = screen.getByText(/Gnarls Barkley/i);
        expect(bey).toBeInTheDocument();
        expect(gnarls).toBeInTheDocument(); 
});