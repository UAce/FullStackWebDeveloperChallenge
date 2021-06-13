import { render, screen, queryByAttribute } from "@testing-library/react";

import SearchBar from "./SearchBar";

describe("Test SearchBar Component", () => {
  it("Should render correctly", () => {
    const word = "hell";
    const props = {
      word,
      setWord: jest.fn().mockReturnValue([word, {}]),
      results: [{ target: "hello", rating: 0.8 }]
    };

    render(<SearchBar {...props} />);

    const childElement = screen.getByDisplayValue(word);
    expect(childElement).toBeInTheDocument();
  });

  it("Should disable add button when querying more than one word", () => {
    const word = "hello world";
    const props = {
      word,
      setWord: jest.fn().mockReturnValue([word, {}]),
      results: [{ target: "hello", rating: 0.8 }]
    };

    const searchBar = render(<SearchBar {...props} />);

    const getById = queryByAttribute.bind(null, "id");
    const addButton = getById(searchBar.container, "addWord");
    expect(addButton).toHaveClass("disabled");
  });

  it("Should disable remove button when there are no results", () => {
    const word = "no-similar-words";
    const props = {
      word,
      setWord: jest.fn().mockReturnValue([word, {}]),
      results: []
    };

    const searchBar = render(<SearchBar {...props} />);

    const getById = queryByAttribute.bind(null, "id");
    const removeButton = getById(searchBar.container, "removeMostSimilarWord");
    expect(removeButton).toHaveClass("disabled");
  });
});
