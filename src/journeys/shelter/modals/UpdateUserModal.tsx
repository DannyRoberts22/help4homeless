import React from 'react';
import { Modal, ScrollView, Text, View } from 'react-native';

import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import ScreenHeader from '@src/components/utility/screen-header/ScreenHeader';

const AddUserModal = ({
  modalVisible,
  closeModal,
}: {
  modalVisible: boolean;
  closeModal: () => void;
}) => {
  //TODO is this component needed?
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
            <View>
              <Text>Add User</Text>
            </View>
          </ScrollView>
        </InnerContainer>
      </SafeAreaViewStatus>
    </Modal>
  );
};

export default AddUserModal;
