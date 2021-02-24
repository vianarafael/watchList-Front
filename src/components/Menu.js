import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import { useState, useContext } from 'react';
import axios from 'axios';
import env from 'react-dotenv';

import { SelectedMovieContext } from '../App'

const TopMenu = styled.nav`
  background: #000;
  padding 16px;
  display: flex;
  justify-content: space-around;
`

const SignButton = styled.button`
  color: var(--white);
  background: var(--red);
  padding: 8px;
  border-radius 8px;
  border-color: var(--red);
  cursor: pointer;
  &:focus { outline:none };
`

const Logo = styled.img`
  cursor: pointer;
`

const Menu = () => {
    const history = useHistory();
    const [query, setQuery] = useState(null);

    const selectedContext = useContext(SelectedMovieContext);

    const searchMovie = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${env.KEY}&language=en-US&query=${query}`);
      // I need to make this display in the home if when the function is called

      // 1. set 2 states - searched & the array of searched movies - that goes to home

      // 2. if searched is true, display the searched movies on top

      selectedContext.dispatch({type: 'set_searched', payload: true });
      selectedContext.dispatch({type: 'set_searched_movies' , payload: response.data.results})

      history.push('/');
    }

    return (
        <TopMenu>
        <Logo onClick={() => {
          history.push('/');
        }} src="https://fontmeme.com/permalink/210224/4b588a1a31011f69495c99671fd7706e.png" alt="netflix-font" border="0" />
        <input type="text" placeholder="Search.." onChange={(e) => {
          setQuery(e.target.value);
        }} 

          onKeyUp={(e) => {
          if(e.code === "Enter") {
            // make a call searching for that movie
            searchMovie();
          }
        }} />
        { !localStorage.getItem("logged") ?  
        (<SignButton onClick={() => {
            history.push('/log')
        }}
        >Sign In</SignButton>)
        : 
        (<SignButton onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("uid");
          localStorage.removeItem("logged");
          history.push('/');
      }}
      >Sign Out</SignButton>)
      }
    </TopMenu>
    )
}

export default Menu;