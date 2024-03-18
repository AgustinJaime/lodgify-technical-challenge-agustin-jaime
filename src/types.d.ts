interface Task {
  description: string;
  value: number;
  checked: boolean;
}

interface Group {
  name: string;
  tasks: Task[];
}

type Data = Group[];
