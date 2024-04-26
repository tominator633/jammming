import React from "react";
import SearchBar from "./SearchBar";
import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

it("should be rendered in the document", () => {
render(<SearchBar searchImput={"dinero"}/>);

<<<<<<< HEAD
const searchField = screen.getByRole("searchbox", {name: /song search field/i});
expect(searchField).toBeInTheDocument();
expect(searchField).toHaveValue("dinero");
const searchButton = screen.getByRole("button", {name: /submit/i});
expect(searchButton).toBeInTheDocument();
});
=======
    render(<SearchBar />);
        const form = screen.getByRole("form");
        expect(form).toBeInTheDocument();
        const searchField = screen.getByRole("searchbox");
        expect(searchField).toBeInTheDocument();
        const searchButton = screen.getByRole("button", {name: /search button/i});
        expect(searchButton).toBeInTheDocument();
        });

it("should have the value passed from props", () => {
    render(<SearchBar searchImput="Hey soul sister"/>);
    const searchField = screen.getByRole("searchbox");
    expect(searchField).toHaveValue("Hey soul sister");
})
>>>>>>> 997bb0bf4888dcb62ca0989d958ad8ef917a2410
