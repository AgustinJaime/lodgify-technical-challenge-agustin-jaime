import App from "./App";
import { mockInitialState } from "./__test__/mocks";
import renderConnected from "./__test__/renderConnected";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

describe("<App>", () => {
  it("should render without issues", () => {
    const documentBody = renderConnected(<App />, { ...mockInitialState });
    expect(documentBody).toMatchSnapshot();
  });
  it("should render header text", () => {
    const documentBody = renderConnected(<App />, { ...mockInitialState });
    documentBody.getByRole("heading", { name: "Lodgify Grouped Tasks" });
  });
  it("should render progress bar section", () => {
    const documentBody = renderConnected(<App />, { ...mockInitialState });
    documentBody.getByTestId("progressBarTestId");
  });
  it("should render groups section", () => {
    const documentBody = renderConnected(<App />, { ...mockInitialState });
    documentBody.getByTestId("groupsTestId");
  });
  it("should render 3 groups ", () => {
    const documentBody = renderConnected(<App />, { ...mockInitialState });
    const groups = documentBody.queryAllByTestId("groupHeaderTestId_", {
      exact: false,
    });
    expect(groups).toHaveLength(3);
  });
  it("should render 'Loading tasks' text when request is PENDING", () => {
    const documentBody = renderConnected(<App />, {
      tasks: { ...mockInitialState.tasks, loading: "PENDING" },
    });
    const loadingText = documentBody.queryByText("Loading Tasks");
    const progressSection = documentBody.queryByTestId("progressBarTestId");
    const groupsSection = documentBody.queryByTestId("groupsTestId");
    expect(loadingText).toBeInTheDocument();
    expect(groupsSection).not.toBeInTheDocument();
    expect(progressSection).not.toBeInTheDocument();
    //
  });
  it("should render 'Something went wrong!' text when request is REJECTED", () => {
    const documentBody = renderConnected(<App />, {
      tasks: { ...mockInitialState.tasks, loading: "REJECTED" },
    });
    const loadingText = documentBody.queryByText("Something went wrong!");
    const progressSection = documentBody.queryByTestId("progressBarTestId");
    const groupsSection = documentBody.queryByTestId("groupsTestId");
    expect(loadingText).toBeInTheDocument();
    expect(groupsSection).not.toBeInTheDocument();
    expect(progressSection).not.toBeInTheDocument();
  });
  it("should render 'No data to show' text when request is SUCCEEDED and no data", () => {
    const documentBody = renderConnected(<App />, {
      tasks: { loading: "SUCCEEDED", data: [] },
    });
    const loadingText = documentBody.queryByText("No data to show");
    expect(loadingText).toBeInTheDocument();
  });
});
