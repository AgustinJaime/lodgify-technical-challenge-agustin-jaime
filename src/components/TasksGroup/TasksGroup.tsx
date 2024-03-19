import { CaretRight, ListBullets } from "@phosphor-icons/react";
import "./TasksGroup.css";

interface Props {
  group: Group;
  groupIndex: number;
  handleCheckBoxClick(
    e: React.ChangeEvent<HTMLInputElement>,
    groupIndex: number,
    taskIndex: number
  ): void;
  handleExpandGroup(index: number): void;
  expanded: boolean;
  completed: boolean;
}

const TasksGroups = ({
  group,
  groupIndex,
  expanded,
  handleCheckBoxClick,
  handleExpandGroup,
  completed,
}: Props) => {
  return (
    <div className="group-ctn">
      <div
        data-testid={`groupHeaderTestId_${groupIndex}`}
        className="group-header"
        {...(group.tasks.length
          ? { onClick: () => handleExpandGroup(groupIndex) }
          : {})}
      >
        <div className="group-header-section">
          <ListBullets className="list-i" />
          <p className={`${completed ? "group-completed" : ""}`}>
            {group.name}
          </p>
        </div>
        <div className="group-header-section">
          <p>Show</p>
          <CaretRight className={`arrow-i ${expanded ? "expanded" : ""}`} />
        </div>
      </div>
      {expanded &&
        group.tasks.map((task, taskIndex) => (
          <div
            key={`task_${taskIndex}_key`}
            className="group-list"
            data-testid={`taskTestId_${taskIndex}`}
          >
            <label>
              <input
                type="checkbox"
                className="list-i"
                checked={task.checked}
                onChange={(e) => handleCheckBoxClick(e, groupIndex, taskIndex)}
              />
              {task.description}
            </label>
          </div>
        ))}
    </div>
  );
};

export default TasksGroups;
