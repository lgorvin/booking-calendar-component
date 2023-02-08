import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Booking from "./components/booking";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Booking date={new Date()} />
    </div>
  );
}

export default App;
