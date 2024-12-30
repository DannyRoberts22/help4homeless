import React from 'react';
import { Title } from './section-title.styles';

const SectionTitle = ({ children }: { children: string }) => {
  return <Title>{children}</Title>;
};

export default SectionTitle;
