import React from 'react';
import * as CSS from './styles.ts';

const TextLabel = ({text}: {text: string}) => {
  return <CSS.TextLabel>{text}</CSS.TextLabel>;
};

export default TextLabel;
