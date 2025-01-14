import Styled from 'styled-components';

export const NavButton = Styled.text`
  font-size: 20px;
  cursor: pointer;
  height: 100%;
  color: #0B192C;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease; /* Smooth transition for hover effect */
  &:hover {
    font-weight: bold;
  };
  @media only screen and (max-width: 960px) {
    padding: 20px 0;
    font-weight: bold;
  }

`;