import renderer from "react-test-renderer";

import Home from "./Home";

describe("Test Home Component", () => {
  it("Home renders correctly", () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
