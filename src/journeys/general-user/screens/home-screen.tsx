import React from 'react';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import {InnerContainer} from '@src/components/layout/InnerContainer';
import ArrowFlow from '@src/components/organisms/arrow-flow/arrow-flow';

export const HomeScreen = () => {
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <ArrowFlow />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
