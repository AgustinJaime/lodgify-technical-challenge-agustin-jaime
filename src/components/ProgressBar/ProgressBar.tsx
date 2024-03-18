import "./ProgressBar.css";
interface Props {
  progress: number;
}
const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="progress-bar-ctn">
      <div className="progress-bar-base">
        <div
          className="progress-bar-inner"
          style={{
            padding: `0.5rem ${progress ? "0.5rem" : "0"}`,
            width: `${progress}%`,
            transition: "width 150ms ease",
          }}
        >
          <p>{`${progress}%`}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
