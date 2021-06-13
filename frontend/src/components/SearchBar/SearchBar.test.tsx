import renderer from "react-test-renderer";
import { render, screen, queryByAttribute } from "@testing-library/react";

import SearchBar from "./SearchBar";

describe("Test SearchBar Component", () => {
  it("Should render correctly", () => {
    const word = "hel";
    const props = {
      word,
      setWord: jest.fn().mockReturnValue([word, {}]),
      results: [{ target: "hello", rating: 0.8 }]
    };

    const tree = renderer.create(<SearchBar {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render results and disable add button when querying more than one word", () => {
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

  it("Should render no results and disable remove button when queried word has no similar words", () => {
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
