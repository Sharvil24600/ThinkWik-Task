import { ProgressSpinner } from "primereact/progressspinner";
import "./Loader.css"

const Loader = () => {
  return (
    <div className="loader-container">
      <ProgressSpinner />
    </div>
  );
};

export default Loader;
