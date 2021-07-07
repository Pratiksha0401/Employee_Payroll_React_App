import './App.css';
import PayrollForm from './components/payroll-form/payroll-form'
import {BrowserRouter as Router , Switch, Route} from "react-router-dom";
import HomePage from './components/homePage/homePage' 
import Display from './components/homePage/Display';

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}>
          {/* <HomePage /> */}
        </Route>
        <Route exact path="/payroll-form" component={PayrollForm} />
        <Route exact path="/payroll-form/:id" component={PayrollForm} />
      </Switch>
    </Router>
  </div>
  );
}

export default App;
