import Styled from 'styled-components';

export const Card = Styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
  margin-bottom:20px;
  transition: box-shadow 0.3s ease; /* Smooth transition for hover effect */

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Deeper shadow on hover */
  }
`;