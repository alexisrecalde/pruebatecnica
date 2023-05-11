import styled from 'styled-components';
import { PasswordErrorProps } from '../../types/chat';

function ErrorPassword(PasswordErrorProps: PasswordErrorProps) {
  const { mgeErrorLogin } = PasswordErrorProps;


  const Container = styled.div`
    display:flex;
    justify-content:center;
    height: 40px
    align-items:center;
`;

  const Item = styled.span`
    color: red;
    font-size: 16px;
`;
  
  return (
    <Container>
      <Item>{ mgeErrorLogin}</Item>   
    </Container>
  );
}

export default ErrorPassword;