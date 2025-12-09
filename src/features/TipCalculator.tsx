import styled, { type DefaultTheme } from "styled-components";
import {
  TextPreset1,
  TextPreset2,
  TextPreset3,
  TextPreset4,
  TextPreset5,
  TextPreset6,
} from "../components/Typography/Typography";
import BillImage from "../assets/images/icon-dollar.svg";
import PersonImage from "../assets/images/icon-person.svg";
import { useEffect, useState } from "react";
import { useScreenSize } from "../ScreenContext";

const TipCalculator = () => {
  const tips: number[] = [5, 10, 15, 25, 50];
  const [billInp, setBillInp] = useState<number | null>(null);
  const [people, setPeople] = useState<number | null>(null);
  const [tip, setTip] = useState<number | null>(null);
  const [tipAmt, setTipAmt] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const screen = useScreenSize();

  useEffect(() => {
    const getTip = () => {
      console.log("tip : ", tip);
      console.log("people : ", people);
      if (!people) {
        console.log("0 people from tip");
        setTipAmt(0);
        return;
      }
      setTipAmt(() => (((tip || 0) / 100) * (billInp || 0)) / people || 0);
    };

    const getTotal = () => {
      if (!people) {
        console.log("0 people from total");
        setTotal(0);
        return;
      }
      setTotal(() => (billInp || 0) / people + tipAmt || 0);
    };
    getTip();
    getTotal();
  }, [tip, billInp, people]);

  return (
    <Calculator>
      <TipWrapper>
        <BillBox>
          <TextPreset5 color="grey-500">Bill</TextPreset5>
          <BillFigure htmlFor="bill" tabIndex={0}>
            <BillImg src={BillImage} alt=""></BillImg>
            <TextPreset3 color="green-900">
              <BillInput
                id="bill"
                value={billInp ?? ""}
                placeholder="0"
                type="number"
                min={0}
                onChange={(e) => {
                  setBillInp(Number(e.target.value));
                }}
              ></BillInput>
            </TextPreset3>
          </BillFigure>
        </BillBox>

        <TipInput>
          <TextPreset5 color="grey-500">Select Tip %</TextPreset5>
          <Tips>
            {tips.map((elem, idx) => {
              return (
                <Tip
                  key={idx}
                  bgcolor="green-900"
                  activebgcolor="green-400"
                  hoverbgcolor="green-200"
                  color="black"
                  $hover={hoveredIndex === idx}
                  $active={activeIndex === idx}
                  onClick={() => {
                    setTip(elem);
                    setActiveIndex(idx);
                  }}
                  onMouseEnter={() => {
                    setHoveredIndex(idx);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                  }}
                >
                  <TextPreset3
                    $hover={hoveredIndex == idx}
                    activecolor="green-900"
                    color="white"
                  >
                    {elem}%
                  </TextPreset3>
                </Tip>
              );
            })}
            <Tip
              bgcolor="grey-50"
              hoverbgcolor="green-200"
              activebgcolor="green-400"
              $hover={hoveredIndex == 5}
              $active={activeIndex == 5}
              color="white"
              onClick={()=>{
                setActiveIndex(5);
              }}
              onMouseEnter={() => {
                setHoveredIndex(5);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
              }}
            >
              <TextPreset3 color="grey-550">Custom</TextPreset3>
            </Tip>
          </Tips>
        </TipInput>
        <PeopleBox>
          <ErrorBox>
            <TextPreset5 color="grey-500">Number of People</TextPreset5>
            {(billInp || tip || "") && !people && (
              <TextPreset5 color="orange-400">Can't be zero</TextPreset5>
            )}
          </ErrorBox>
          <PersonFigure
            htmlFor="person"
            tabIndex={0}
            $billInp={!!billInp}
            $tip={!!tip}
            $person={!!people}
          >
            <PersonImg src={PersonImage}></PersonImg>
            <TextPreset3 color="green-900">
              <PersonInput
                id="person"
                value={people ?? ""}
                placeholder="0"
                type="number"
                min={0}
                step="any"
                onChange={(e) => setPeople(Number(e.target.value))}
              ></PersonInput>
            </TextPreset3>
          </PersonFigure>
        </PeopleBox>
      </TipWrapper>

      <TipBox>
        <TipDisplay>
          <TipAmount>
            <Text>
              <TextPreset5 color="white">Tip Amount</TextPreset5>
              <TextPreset6 color="grey-400">/ person</TextPreset6>
            </Text>
            <>
              {screen == "mobile" ? (
                <TextPreset2 color="green-400">
                  ${(isNaN(tipAmt) ? 0.0 : tipAmt ?? 0.0).toFixed(2)}
                </TextPreset2>
              ) : (
                <TextPreset1 color="green-400">
                  ${(isNaN(tipAmt) ? 0.0 : tipAmt ?? 0.0).toFixed(2)}
                </TextPreset1>
              )}
            </>
          </TipAmount>
          <TipTotal>
            <Text>
              <TextPreset5 color="white">Total</TextPreset5>
              <TextPreset6 color="grey-400">/ person</TextPreset6>
            </Text>
            <>
              {screen == "mobile" ? (
                <TextPreset2 color="green-400">
                  ${(isNaN(total) ? 0.0 : total ?? 0.0).toFixed(2)}
                </TextPreset2>
              ) : (
                <TextPreset1 color="green-400">
                  ${(isNaN(total) ? 0.0 : total ?? 0.0).toFixed(2)}
                </TextPreset1>
              )}
            </>
          </TipTotal>
        </TipDisplay>

        {!billInp && !people && !tip ? (
          <ResetButton bgColor="green-750" disabled $disable={true}>
            <TextPreset4 color="green-800">RESET</TextPreset4>
          </ResetButton>
        ) : (
          <ResetButton
            bgColor="green-400"
            $disable={false}
            onClick={() => {
              setBillInp(null);
              setPeople(null);
              setTip(null);
              setHoveredIndex(null);
              setActiveIndex(null);
            }}
          >
            <TextPreset4 color="green-900">RESET</TextPreset4>
          </ResetButton>
        )}
      </TipBox>
    </Calculator>
  );
};

export default TipCalculator;

const Calculator = styled.main`
  padding: 32px;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors["white"]};
  gap: 48px;
  align-items: center;
  display: flex;

  & * {
    display: flex;
  }

  @media (min-width: 650px) and (max-width: 1024px) {
    flex-direction: column;
    padding: 48px 80px;
  }

  @media (max-width: 650px) {
    flex-direction: column;
    padding: 32px 24px;
  }
`;

const TipWrapper = styled.section`
  flex-direction: column;
  gap: 40px;

  @media (min-width: 650px) and (max-width: 1024px) {
    width: 100%;
    flex-direction: column;
  }

  @media (max-width: 650px) {
    width: 100%;
  }
`;

const BillBox = styled.section`
  flex-direction: column;
  gap: 8px;
`;

const BillFigure = styled.label`
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors["grey-50"]};

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors["green-400"]};
  }

`;

const BillImg = styled.img`
  width: 10px;
  height: 16px;
`;

const BillInput = styled.input`
  max-width: 100px;
  outline: none;
  border: none;
  color: inherit;
  background-color: inherit;
  font: inherit;
  text-align: right;

  &:focus {
    border: none;
    outline: none;
  }
`;

const TipInput = styled.section`
  flex-direction: column;
  gap: 8px;
`;

const Tips = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Tip = styled.button<{
  bgcolor?: keyof DefaultTheme["colors"];
  activebgcolor?: keyof DefaultTheme["colors"];
  hoverbgcolor?: keyof DefaultTheme["colors"];
  color?: keyof DefaultTheme["colors"];
  $hover: boolean;
  $active: boolean;
}>`
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({
    theme,
    bgcolor,
    activebgcolor,
    hoverbgcolor,
    $hover,
    $active,
  }) =>
    $active
      ? theme.colors[activebgcolor!]
      : $hover
      ? theme.colors[hoverbgcolor!]
      : theme.colors[bgcolor!]};

  color: ${({ theme, color, $hover }) =>
    $hover ? theme.colors[color!] : theme.colors["white"]};
`;

const PeopleBox = styled.section`
  flex-direction: column;
  gap: 8px;
`;

const PersonFigure = styled.label<{
  $billInp: boolean;
  $tip: boolean;
  $person: boolean;
}>`
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors["grey-50"]};

  &:focus-within {
    outline: 2px solid
      ${({ $billInp, $tip, $person, theme }) =>
        ($billInp || $tip) && !$person
          ? theme.colors["orange-400"]
          : theme.colors["green-400"]};
  }
  outline: 2px solid
    ${({ $billInp, $tip, $person, theme }) =>
      ($billInp || $tip) && !$person ? theme.colors["orange-400"] : "none"};

`;

const PersonImg = styled.img`
  width: 13px;
  height: 16px;
`;

const PersonInput = styled.input`
  max-width: 100px;
  font: inherit;
  color: inherit;
  background-color: inherit;
  border: none;
  text-align: right;

  &:focus {
    border: none;
    outline: none;
  }
`;

const TipBox = styled.div`
  width: 413px;
  padding: 24px 32px;
  border-radius: 15px;
  flex-direction: column;
  gap: 128px;
  background: ${({ theme }) => theme.colors["green-900"]};

  @media (min-width:650px) and (max-width: 1024px){
    gap: 16px;
  }

  @media (max-width: 650px) {
    width: 327px;
    padding: 24px;
    gap: 32px;
  }

  @media (max-width: 325px) {
    width: 290px;
    gap: 32px;
  }
`;

const TipDisplay = styled.section`
  flex-direction: column;
  gap: 24px;
`;

const TipAmount = styled.section`
  justify-content: space-between;
  align-items: center;
`;

const TipTotal = styled.section`
  justify-content: space-between;
  align-items: center;
`;

const ResetButton = styled.button<{
  bgColor: keyof DefaultTheme["colors"];
  $disable: boolean;
}>`
  width: 100%;
  height: 48px;
  border: none;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: ${({ theme, bgColor }) => theme.colors[bgColor]};

  cursor: ${({ $disable }) => ($disable ? "default" : "pointer")};
`;

const Text = styled.div`
  flex-direction: column;
`;

const ErrorBox = styled.div`
  justify-content: space-between;
`;
