import { render, screen } from '@testing-library/react';
import App from './App.js';
import ReactDOM from "react-dom";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

it("renders search field", () => {
  render(<App />);
  const searchBar = screen.getByRole("textbox");
  expect(searchBar).toBeInTheDocument();
});