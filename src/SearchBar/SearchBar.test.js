import React from "react";
import SearchBar from "./SearchBar";
import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";


it("enables a user to type a request for songs", () => {
    render(<SearchBar
        onSubmit={()=>{}}
        onChange={()=>{}}
       />);
       const searchField = screen.getByRole("searchbox", {name: /song search field/i});
       userEvent.type(searchField, "dinero");
       expect(searchField).toBeInTheDocument();
       expect(searchField).toHaveValue("dinero");
});

it("sends the request to Spotify API after the user clicks on submit button", () => {
    const onSubmitMock = jest.fn();
    render(<SearchBar
        onSubmit={onSubmitMock}
        searchImput={"soul"}
        onChange={()=>{}}
       />);
    const searchButton = screen.getByRole("button", {name: /submit/i});
    userEvent.click(searchButton);
    expect(searchButton).toBeInTheDocument();
    expect(onSubmitMock).toHaveBeenCalled();

})      