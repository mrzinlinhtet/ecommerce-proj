import "./Spinner.css"

const Spinner = () => {
  return (
    <div>
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="spinner-center"></div>
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
};

export default Spinner;
