import Styled from 'styled-components';

export const NavButton = Styled.text`
  font-size: 32px;
  cursor: pointer;

  color: #0B192C;
  transition: all 0.3s ease; /* Smooth transition for hover effect */
  &:hover {
    text-decoration: underline;
    font-weight: bold;
  }
`;