import "./App.css";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import TasksGroups from "./components/TasksGroup/TasksGroup";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Lodgify Grouped Tasks</h1>
      </header>
      <main>
        <section>
          <ProgressBar />
        </section>
        <section className="groups-section">
          <TasksGroups />
        </section>
      </main>
    </div>
  );
}

export default App;
