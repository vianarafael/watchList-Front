import styled from 'styled-components'
import { useHistory } from "react-router-dom";

const SignButton = styled.button`
  color: var(--white);
  background: var(--red);
  padding: 8px;
  border-radius 8px;
  cursor: pointer;
  &:focus { outline:none };
`

const Menu = () => {
    const history = useHistory();
    return (
        <SignButton onClick={() => {
            history.push('/log')
        }}
        >Sign In</SignButton>
    )
}

export default Menu;