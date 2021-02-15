import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './components/Home';
import RegistrationLogin from './components/RegistrationLogin';
import Dashboard from './components/Dashboard';
import { useReducer, createContext } from 'react'

export const SelectedMovieContext = createContext();


const initialState = {selectedMovie: null}
const reducer = (state, action) => {
  switch(action.type) {
    case 'set_selected_movie':
      state.selectedMovie = action.payload;
      return;
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SelectedMovieContext.Provider value={{state, dispatch}}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/log" component={RegistrationLogin} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </SelectedMovieContext.Provider>
  )
}

export default App;