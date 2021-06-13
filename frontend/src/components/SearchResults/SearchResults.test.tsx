import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { ISimilarWord } from "../../common/interfaces";

import SearchResults from "./SearchResults";

describe("Test SearchResults Component", () => {
  it("Should render correctly", () => {
    const results = [{ target: "hello", rating: 0.8 }];

    const tree = renderer.create(<SearchResults results={results} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should show 3 words", () => {
    const results = [
      { target: "hello", rating: 0.8 },
      { target: "helloa", rating: 0.5 },
      { target: "hellob", rating: 0.3 }
    ];
    render(<SearchResults results={results} />);
    expect(screen.getAllByText(/hello/i)).toHaveLength(3);
  });

  it("Should show no results", () => {
    const results: ISimilarWord[] = [];
    render(<SearchResults results={results} />);
    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });
});
