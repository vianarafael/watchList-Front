import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './components/Home';
import RegistrationLogin from './components/RegistrationLogin'


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/log" component={RegistrationLogin} />
      </Switch>
    </Router>
  )
}

export default App;