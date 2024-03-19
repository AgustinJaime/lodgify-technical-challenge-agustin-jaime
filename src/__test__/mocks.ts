const fetchedDataMock = [
  {
    name: "Group 1",
    tasks: [
      {
        description: "Task 1 - 1",
        value: 10,
        checked: true,
      },
      {
        description: "Task 2 - 1",
        value: 20,
        checked: false,
      },
    ],
  },
  {
    name: "Group 2",
    tasks: [
      {
        description: "Task 1 - 1",
        value: 30,
        checked: false,
      },
      {
        description: "Task 2 - 1",
        value: 20,
        checked: false,
      },
    ],
  },
  {
    name: "Group 3",
    tasks: [
      {
        description: "Task 1 - 1",
        value: 20,
        checked: false,
      },
    ],
  },
];

export const mockInitialState = {
  tasks: {
    loading: "SUCCEEDED",
    data: fetchedDataMock,
  },
};
