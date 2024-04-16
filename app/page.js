import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Account, Account2 } from "./components";

export default function Home() {
  return (
    <div className="container">
      <div
        className="big-area"
        style={{ backgroundColor: "lightgrey", width: "50%", height: "300px" }}
      >
        <Account />
      </div>
      <div
        className="big-area"
        style={{ backgroundColor: "lightgreen", width: "50%", height: "300px" }}
      >
        <Account2 />
      </div>
    </div>
  );
}
