import "./LearningTime.css";
const LearningTime = ({ hours, mins }) => {
  return (
    <div className="learning-time-box">
      <h3 className="learning-time-title">Learning Time</h3>
      <div className="learning-time-display">
        <span className="time-value">{hours.toFixed(0)}</span>
        <span className="time-unit">Hrs</span>
        <span className="time-separator">:</span>
        <span className="time-value">{mins.toFixed(0)}</span>
        <span className="time-unit">Mins</span>
      </div>
    </div>
  );
};
export default LearningTime;
