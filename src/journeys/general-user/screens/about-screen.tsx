import {InnerContainer} from '@src/components/layout/InnerContainer';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import React, {useState} from 'react';

import aboutData from '@src/content/about-data.json';
import {Subheading} from '@src/components/molecules/subheading/Subheading';
import {SectionTitle, Content} from '../styles/about-screen.styles';
import {ScrollView} from 'react-native-gesture-handler';
import {HowToUse} from '../modals/how-to-use-modal';
import {ShareableButton} from '@src/components/organisms/shareable-button/ShareableButton';

export const AboutScreen = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <ScrollView>
          <Subheading text={aboutData.aboutScreen.title} />
          <Content>{aboutData.aboutScreen.intro}</Content>
          {aboutData.aboutScreen.sections.map((item, index) => (
            <>
              <SectionTitle key={`section-title-${index}`}>
                {item.sectionTitle}
              </SectionTitle>
              <Content key="section-content">{item.content}</Content>
            </>
          ))}
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
