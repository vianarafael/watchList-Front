import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './components/Home';
import RegistrationLogin from './components/RegistrationLogin';
import Dashboard from './components/Dashboard';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/log" component={RegistrationLogin} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default App;