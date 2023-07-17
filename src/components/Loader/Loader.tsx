import { ProgressSpinner } from "primereact/progressspinner";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <ProgressSpinner />
      </div>
    </div>
  );
};

export default Loader;
