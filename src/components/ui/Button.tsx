import Styled from 'styled-components';

export const  ButtonContainer = Styled.button`
    text-transform : capitalize;
    font-size : 1.4rem;
    background : #fff;
    width:30%;
    height:50px;
    color: #000;
    border-radius : 60px;
    padding : 0.2rem 0.3rem;
    cursor : pointer;
    margin : 0.2rem 0.3rem 0.5rem 0;
    transition :all 0.5s ease-in-out;
    &:focus{
        outline : none;
    };
    &:hover{
        font-weight:bolder;
    }
`; 

export const SignUpButton = Styled.button`
  background-color: #0B192C; /* Primary background color */
  color: white;
  padding: 10px 25px;
  font-size: 32px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease; /* Smooth transition for hover effect */
  border: 2px solid #000;
  
  &:hover {
    background-color: transparent;
    color: #0B192C;
    border: 2px solid #0B192C; /* Turns into outlined on hover */
  }
`;