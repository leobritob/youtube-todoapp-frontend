import styled from 'styled-components';
import { color, ColorProps, space, SpaceProps, typography, TypographyProps } from 'styled-system';

type TextProps = TypographyProps & SpaceProps & ColorProps;

export const Text = styled.p<TextProps>`
  font-family: 14px;
  color: #fff;
  ${color}
  ${typography}
  ${space}
`;
