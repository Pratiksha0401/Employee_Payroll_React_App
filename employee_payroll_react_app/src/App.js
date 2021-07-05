import './App.css';
import PayrollForm from './components/payroll-form/payroll-form'
import {BrowserRouter as Router , Switch, Route} from "react-router-dom";
import HomePage from './components/homePage/homePage.jsx' 

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}>
          {/* <HomePage /> */}
        </Route>
        <Route exact path="/payroll-form" component={PayrollForm}>
       {/* <PayrollForm /> */}
        </Route>
      </Switch>
    </Router>
  </div>
  );
}

export default App;
