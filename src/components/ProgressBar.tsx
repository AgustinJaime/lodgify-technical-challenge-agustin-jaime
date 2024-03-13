import "./ProgressBar.css";
const ProgressBar = () => {
  return (
    <div className="progress-bar-ctn">
      <div className="progress-bar-base">
        <div className="progress-bar-inner" style={{ width: "30%" }}>
          18%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
