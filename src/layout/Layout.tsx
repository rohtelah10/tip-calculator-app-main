import styled from "styled-components";
import SplitImg from "../assets/images/logo.svg";
import TipCalculator from "../features/TipCalculator";

const Layout = () => {
  return (
    <Wrapper>
      <SplitterImg src={SplitImg} alt=""></SplitterImg>
      <TipCalculator></TipCalculator>
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 88px;
  background-color: ${({ theme }) => theme.colors["grey-200"]};

  @media (min-width: 650px) and (max-width: 1024px) {
    padding-bottom: 80px;
  }
`;

const SplitterImg = styled.img`
  width: 87px;
  height: 53px;

  @media (max-width: 650px) {
    margin-top: 50px;
  }
`;
