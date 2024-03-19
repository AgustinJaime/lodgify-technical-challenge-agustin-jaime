import { mockInitialState } from "../../__test__/mocks";
import renderConnected from "../../__test__/renderConnected";
import TasksGroups from "./TasksGroup";

const props = {
  group: mockInitialState.tasks.data[0],
  groupIndex: 1,
  expanded: true,
  handleCheckBoxClick: jest.fn(),
  handleExpandGroup: jest.fn(),
  completed: false,
};

describe("<App>", () => {
  it("should render without issues", () => {
    const documentBody = renderConnected(<TasksGroups {...props} />);
    expect(documentBody).toMatchSnapshot();
  });
  it("should render group name", () => {
    const documentBody = renderConnected(<TasksGroups {...props} />);
    documentBody.getByText("Group 1");
  });
  it("should render 'show'", () => {
    const documentBody = renderConnected(<TasksGroups {...props} />);
    documentBody.getByText("Show");
  });
  it("should render tasks", () => {
    const documentBody = renderConnected(<TasksGroups {...props} />);
    const tasks = documentBody.queryAllByTestId("taskTestId_", {
      exact: false,
    });
    expect(tasks).toHaveLength(2);
  });
  it("should render input with description and checked as default", () => {
    const documentBody = renderConnected(<TasksGroups {...props} />);
    const taskOne = documentBody.queryByRole("checkbox", {
      name: "Task 1 - 1",
    });
    const taskTwo = documentBody.queryByRole("checkbox", {
      name: "Task 2 - 1",
    });
    expect(taskOne).toBeInTheDocument();
    expect(taskTwo).toBeInTheDocument();
    expect(taskOne).toBeChecked();
    expect(taskTwo).not.toBeChecked();
  });
});
