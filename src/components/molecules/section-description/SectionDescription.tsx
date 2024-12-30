import React from 'react';
import { Description } from './section-description.styles';

const SectionDescription = ({ children }: { children: string }) => {
  return <Description>{children}</Description>;
};

export default SectionDescription;
