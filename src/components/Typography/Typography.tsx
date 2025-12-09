import type { JSX } from "react";
import styled, { type DefaultTheme } from "styled-components";

interface TextProps {
  children: React.ReactNode;
  color : keyof DefaultTheme["colors"];
  activecolor?: keyof DefaultTheme["colors"];
  as?: keyof JSX.IntrinsicElements;
  $hover?: boolean;
}

export const TextPreset1 = styled.p<TextProps>`
  font-family: "Space Mono", monospace;
  font-size: 48px;
  font-weight: 700;
  line-height: 71px;
  letter-spacing: -1px;

  color: ${ ( {theme, color}) => color? theme.colors[color] : theme.colors["black"]};
`;
export const TextPreset2 = styled.p<TextProps>`
  font-family: "Space Mono", monospace;
  font-size: 32px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.67px;

  color: ${ ( {theme, color}) => color? theme.colors[color] : theme.colors["black"]};
`;
export const TextPreset3 = styled.p<TextProps>`
  font-family: "Space Mono", monospace;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0px;
  
  color: ${ ( {theme, color, $hover, activecolor}) => color && $hover? theme.colors[activecolor!] : theme.colors[color!]};
`;
export const TextPreset4 = styled.p<TextProps>`
  font-family: "Space Mono", monospace;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 0px;

  color: ${ ( {theme, color}) => color? theme.colors[color] : theme.colors["black"]};
`;
export const TextPreset5 = styled.p<TextProps>`
  font-family: "Space Mono", monospace;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0px;

  color: ${ ( {theme, color}) => color? theme.colors[color] : theme.colors["black"]};
`;
export const TextPreset6 = styled.p<TextProps>`
  font-family: "Space Mono", monospace;
  font-size: 13px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0px;

  color: ${ ( {theme, color}) => color? theme.colors[color] : theme.colors["black"]};
`;
