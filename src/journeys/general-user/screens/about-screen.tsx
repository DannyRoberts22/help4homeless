import React, { Fragment, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import { Subheading } from '@src/components/molecules/subheading/Subheading';
import { ShareableButton } from '@src/components/organisms/shareable-button/ShareableButton';
import aboutData from '@src/content/about-data.json';

import { HowToUse } from '../modals/how-to-use-modal';

import { Content, SectionTitle } from '../styles/about-screen.styles';

export const AboutScreen = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <ScrollView>
          <Subheading text={aboutData.aboutScreen.title} />
          <Content>{aboutData.aboutScreen.intro}</Content>
          {aboutData.aboutScreen.sections.map(item => {
            return (
              <Fragment key={item.id}>
                <SectionTitle>{item.sectionTitle}</SectionTitle>
                <Content>{item.content}</Content>
              </Fragment>
            );
          })}
          <ShareableButton
            handler={() => setShowModal(true)}
            text="How To Use"
          />
          <HowToUse modalVisible={showModal} closeModal={closeModal} />
        </ScrollView>
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
