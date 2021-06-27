import styled from 'styled-components';
import {
  border,
  BorderProps,
  borderRadius,
  BorderRadiusProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from 'styled-system';

type ColumnProps = LayoutProps & SpaceProps & ColorProps & BorderRadiusProps & BorderProps & FlexboxProps;

export const Column = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  ${flexbox}
  ${layout}
  ${space}
  ${color}
  ${borderRadius}
  ${border}
`;
