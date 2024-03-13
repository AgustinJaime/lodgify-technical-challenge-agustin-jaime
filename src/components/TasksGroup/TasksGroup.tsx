import { CaretRight, ListBullets } from "@phosphor-icons/react";
import "./TasksGroup.css";

const TasksGroups = () => {
  return (
    <div className="group-ctn">
      <div className="group-header">
        <div className="group-header-section">
          <ListBullets className="list-i" />
          <p>GROUP</p>
        </div>
        <div className="group-header-section">
          <p>Show</p>
          <CaretRight className="arrow-i hovered" />
        </div>
      </div>
      <div className="group-list">
        <label>
          <input
            type="checkbox"
            className="list-i"
            // checked={true}
            // onChange={handleCheckboxChange}
          />
          Task 2-1
        </label>
      </div>
    </div>
  );
};

export default TasksGroups;
