import React, { Ref } from 'react';
import { forwardRefWithAs as forwardRef } from '../utils/forward-ref-with-as';
import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';
import styled from 'styled-components';
import css from '@styled-system/css';

import {
  background,
  border,
  color,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
  textStyle,
  colorStyle,
  buttonStyle,
  compose,
} from 'styled-system';

import extraConfig, { extraProps, transformAliasProps as tx } from './config';
import { BoxProps } from './types';

export * from './types';

export const systemProps = compose(
  layout,
  color,
  space,
  background,
  border,
  grid,
  position,
  shadow,
  typography,
  flexbox,
  textStyle,
  buttonStyle,
  colorStyle
);

const shouldForwardProp = createShouldForwardProp([...props, ...extraProps]);

export const StyledBox = styled('div').withConfig({
  shouldForwardProp: prop => shouldForwardProp(prop),
})<BoxProps>`
  ${systemProps};
  ${extraConfig};
`;

/**
 * The selectors are based on [WAI-ARIA state properties](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties) and common CSS Selectors
 */
const hover = '&:hover';
const active = '&:active, &[data-active=true]';
const focus = '&:focus';
const visited = '&:visited';
const even = '&:nth-of-type(even)';
const odd = '&:nth-of-type(odd)';
const disabled =
  '&:disabled, &:disabled:focus, &:disabled:hover, &[aria-disabled=true], &[aria-disabled=true]:focus, &[aria-disabled=true]:hover';
const checked = '&[aria-checked=true]';
const mixed = '&[aria-checked=mixed]';
const selected = '&[aria-selected=true]';
const invalid = '&[aria-invalid=true]';
const pressed = '&[aria-pressed=true]';
const readOnly = '&[aria-readonly=true], &[readonly]';
const first = '&:first-of-type';
const last = '&:last-of-type';
const expanded = '&[aria-expanded=true]';
const grabbed = '&[aria-grabbed=true]';
const notFirst = '&:not(:first-of-type)';
const notLast = '&:not(:last-of-type)';
const groupHover = '[role=group]:hover &';

const BoxWithPseudoStyles = styled(StyledBox)<BoxProps>(
  ({
    _after,
    _focus,
    _selected,
    _focusWithin,
    _hover,
    _invalid,
    _active,
    _disabled,
    _grabbed,
    _pressed,
    _expanded,
    _visited,
    _before,
    _readOnly,
    _first,
    _notFirst,
    _notLast,
    _last,
    _placeholder,
    _checked,
    _groupHover,
    _mixed,
    _odd,
    _even,
  }) => {
    return css({
      [hover]: tx(_hover),
      [focus]: tx(_focus),
      [active]: tx(_active),
      [visited]: tx(_visited),
      [disabled]: tx(_disabled),
      [selected]: tx(_selected),
      [invalid]: tx(_invalid),
      [expanded]: tx(_expanded),
      [grabbed]: tx(_grabbed),
      [readOnly]: tx(_readOnly),
      [first]: tx(_first),
      [notFirst]: tx(_notFirst),
      [notLast]: tx(_notLast),
      [last]: tx(_last),
      [odd]: tx(_odd),
      [even]: tx(_even),
      [mixed]: tx(_mixed),
      [checked]: tx(_checked),
      [pressed]: tx(_pressed),
      [groupHover]: tx(_groupHover),
      '&:before': tx(_before),
      '&:after': tx(_after),
      '&:focus-within': tx(_focusWithin),
      '&::placeholder': tx(_placeholder),
    });
  }
);

const Box = forwardRef((props: BoxProps, ref: Ref<HTMLDivElement>) => (
  <BoxWithPseudoStyles ref={ref} {...props} />
));

Box.displayName = 'Box';

export { Box };
