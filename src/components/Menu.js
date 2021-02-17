import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import { useState } from 'react';

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

const Menu = () => {
    const history = useHistory();
    const [searchedMovie, setSearchedMovie] = useState(null)
    return (
        <TopMenu>
        <h1>Watch List</h1>
        <input type="text" placeholder="Search.." onChange={(e) => {
          setSearchedMovie(e.target.value);
        }} 

          onKeyUp={(e) => {
          console.log(e.code === "Enter")
          // if(e.KeyboardEvent.code === 13)
        }} />
        <SignButton onClick={() => {
            history.push('/log')
        }}
        >Sign In</SignButton>
    </TopMenu>
    )
}

export default Menu;