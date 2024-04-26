import React from "react";
import SearchBar from "./SearchBar";
import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

it("should be rendered in the document", () => {
render(<SearchBar searchImput={"dinero"}/>);

const searchField = screen.getByRole("searchbox", {name: /song search field/i});
expect(searchField).toBeInTheDocument();
expect(searchField).toHaveValue("dinero");
const searchButton = screen.getByRole("button", {name: /submit/i});
expect(searchButton).toBeInTheDocument();
});
