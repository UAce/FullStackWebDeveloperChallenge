import renderer from "react-test-renderer";

import Title from "./Title";

describe("Test Title Component", () => {
  it("Title renders correctly", () => {
    const tree = renderer.create(<Title />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
