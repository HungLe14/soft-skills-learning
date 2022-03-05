import "./App.css";
import { DashBoard } from "./components/DashBoard/DashBoard";
import { Form } from "./components/form/Form";

function App() {
  return (
    <div className="App">
      <DashBoard>
        <Form />
      </DashBoard>
    </div>
  );
}

export default App;
