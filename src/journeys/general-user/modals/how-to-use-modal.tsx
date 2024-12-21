import React from 'react';
import { Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import ArrowFlow from '@src/components/organisms/arrow-flow/ArrowFlow';
import ScreenHeader from '@src/components/utility/screen-header/ScreenHeader';
import aboutData from '@src/content/about-data.json';

export const HowToUse = ({
  modalVisible,
  closeModal,
}: {
  modalVisible: boolean;
  closeModal: () => void;
}) => {
  const transformSteps = aboutData.HowToUse.steps.map(item => {
    return {
      title: item.step,
      description: item.description,
    };
  });

  return (
    <Modal
      animationType="slide" // or "fade" for fade-in and fade-out animation
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal} // Android back button handling
    >
      <SafeAreaViewStatus>
        <ScreenHeader isModal={true} handleClose={closeModal} />
        <InnerContainer>
          <ScrollView>
            <ArrowFlow content={transformSteps} />
          </ScrollView>
        </InnerContainer>
      </SafeAreaViewStatus>
    </Modal>
  );
};
