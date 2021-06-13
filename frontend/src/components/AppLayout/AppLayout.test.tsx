import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import AppLayout from "./AppLayout";

describe("Test AppLayout Component", () => {
  it("Should render text as children", () => {
    render(<AppLayout>hello world</AppLayout>);
    const childElement = screen.getByText(/hello world/i);
    expect(childElement).toBeInTheDocument();
  });

  it("Should render HTML element", () => {
    const tree = renderer
      .create(
        <AppLayout>
          <div>Hello World</div>
        </AppLayout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render without children", () => {
    const tree = renderer.create(<AppLayout />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
