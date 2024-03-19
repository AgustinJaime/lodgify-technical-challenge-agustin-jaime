import React, { useEffect, useState } from "react";
import "./App.css";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import TasksGroups from "./components/TasksGroup/TasksGroup";
import { getPercentage } from "./helpers/appHelpers";
import { useAppDispatch, useAppSelector } from "./store/config";
import { fetchTasks } from "./store/actions/tasksActions";
import { LoadingStatus, updateCheckData } from "./store/reducers/tasksReducer";
import LoadingIcon from "./components/UI/LoadingIcon";

function App() {
  const dispatch = useAppDispatch();
  const { data: tasksData = [], loading } = useAppSelector(
    (state) => state.tasks
  );
  const [groupExpanded, setGroupExpanded] = useState<Record<number, boolean>>(
    {}
  );
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Fetch data
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    setProgress(getPercentage(tasksData));
  }, [tasksData]);

  const handleCheckBoxClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    groupIndex: number,
    taskIndex: number
  ) => {
    e.preventDefault();
    dispatch(
      updateCheckData({
        value: e.target.checked,
        groupIndex,
        taskIndex,
      })
    );
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
        {loading === LoadingStatus.PENDING ? (
          <section className="no-data-section">
            <LoadingIcon />
            <p>Loading Tasks</p>
          </section>
        ) : null}
        {loading === LoadingStatus.REJECTED ? (
          <section className="no-data-section">Something went wrong!</section>
        ) : null}
        {loading === LoadingStatus.SUCCEEDED ? (
          <>
            <section>
              <ProgressBar progress={progress} />
            </section>
            <section className="groups-section">
              {tasksData.length ? (
                <>
                  {tasksData.map((group, groupIndex) => (
                    <React.Fragment key={`group_${groupIndex}_key`}>
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
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <section className="no-data-section">No data to show</section>
              )}
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
}

export default App;
