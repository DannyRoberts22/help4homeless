import React from 'react';
import {
  Description,
  SectionDescriptionProps,
} from './section-description.styles';

const SectionDescription = ({
  children,
  variant,
}: {
  children: string;
  variant?: SectionDescriptionProps['variant'];
}) => {
  return <Description variant={variant}>{children}</Description>;
};

export default SectionDescription;
