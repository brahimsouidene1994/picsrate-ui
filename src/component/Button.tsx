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