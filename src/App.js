import './App.css';
import {ThemeProvider} from "@material-ui/core/styles"

import Navbar from "./Components/navbar"
import Theme from "./Theme"

function App() {
  return (
    <ThemeProvider theme={Theme}>
    </ThemeProvider>
  );
}

let styles = {
  container: {
    width: "500px",
    height: "100vh",
    margin: "0 auto",
  }
}

export default App;
