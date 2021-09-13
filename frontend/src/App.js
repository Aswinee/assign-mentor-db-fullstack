import "./App.css";
import Home from "./Home";
import Students from "./Students";
import Mentors from "./Mentors";
import Navigation from "./Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Mentor from "./Mentor";
import CreateStudent from "./CreateStudent";
import CreateMentor from "./CreateMentor";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ textAlign: "center" }}>Student Mentor APP</h1>
      </header>
      <BrowserRouter>
        <Navigation />{" "}
        <Switch>
          <Route exact path="/home" render={() => <Home />} />
          <Route path="/students" render={() => <Students />} />
          <Route path="/mentors" render={() => <Mentors />} />
          <Route path="/createstudent" render={() => <CreateStudent />} />
          <Route path="/createMentor" render={() => <CreateMentor />} />
          <Route path="/mentor/:id" render={() => <Mentor />} />
          <Route path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
