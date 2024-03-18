import { useEffect, useState } from "react";
import "./App.css";
import { fetchedDataMock } from "./__test__/mocks";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import TasksGroups from "./components/TasksGroup/TasksGroup";
import { getPercentage } from "./helpers/appHelpers";

function App() {
  const [data, setData] = useState<Data>([...fetchedDataMock]);
  const [groupExpanded, setGroupExpanded] = useState<Record<number, boolean>>(
    {}
  );
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Fetch and set data
    setProgress(getPercentage(data));
  }, []);

  const handleCheckBoxClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    groupIndex: number,
    taskIndex: number
  ) => {
    const newData = [...data];
    data[groupIndex].tasks[taskIndex].checked = e.target.checked;
    setProgress(getPercentage(newData));
    setData(newData);
  };

  const handleExpandGroup = (index: number) => {
    setGroupExpanded({
      ...groupExpanded,
      [index]: !groupExpanded[index],
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Lodgify Grouped Tasks</h1>
      </header>
      <main>
        <section>
          <ProgressBar progress={progress} />
        </section>
        <section className="groups-section">
          {data.map((group, groupIndex) => (
            <TasksGroups
              group={group}
              groupIndex={groupIndex}
              expanded={groupExpanded[groupIndex]}
              handleCheckBoxClick={handleCheckBoxClick}
              handleExpandGroup={handleExpandGroup}
              completed={
                Boolean(group.tasks.length) &&
                !group.tasks.some((t) => !t.checked)
              }
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
