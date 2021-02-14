import styled from 'styled-components'
import { useHistory } from "react-router-dom";

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
    return (
        <TopMenu>
        <h1>Watch List</h1>
        <input type="text" placeholder="Search.." />
        <SignButton onClick={() => {
            history.push('/log')
        }}
        >Sign In</SignButton>
    </TopMenu>
    )
}

export default Menu;