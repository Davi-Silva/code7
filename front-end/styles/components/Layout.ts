import styled from 'styled-components'

export const LayoutDiv = styled.div`
  min-height: 100vh;
  width: 100%;
  .fullWidth {
    width: 100%;
    margin: 0 auto;
    @media (max-width: 1200px) {
      width: 100%;
    }
  }
  .containerWidth {
    width: 1200px;
    margin: 0 auto;
    @media (max-width: 1200px) {
      width: 95%;
    }
  }
`; 