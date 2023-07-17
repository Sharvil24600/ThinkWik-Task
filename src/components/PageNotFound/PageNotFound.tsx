import { Card } from "primereact/card";

const PageNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Card className="p-shadow-98">
        <img
          src={require("./pagenotfound.png")}
          alt="404 Page Not Found"
          height={"300vh"}
        />
      </Card>
    </div>
  );
};

export default PageNotFound;
