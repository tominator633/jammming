import React from "react";
import SearchBar from "./SearchBar";
import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";


it("should be rendered in the document", () => {

render(<SearchBar/>);
screen.debug();


});