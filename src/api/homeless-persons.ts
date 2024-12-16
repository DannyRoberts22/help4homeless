import firestore from '@react-native-firebase/firestore';

// Add person to HomelessPersons Firestore collection
export const firebaseAddHomelessPerson = async (person: any): Promise<void> => {
  // create a firebase id to add to firebaseAddHomelessPerson function
  //   const id = firestore().collection('HomelessPersons').doc().id;
  try {
    await firestore().collection('HomelessPersons').add(person);
    console.log('Person added successfully:', person);
  } catch (error) {
    console.error('Error adding person:', error);
    throw error;
  }
};

// Get homeless persons from HomelessPersons Firestore collection including their id
export const firebaseGetHomelessPersons = async (): Promise<any[]> => {
  try {
    const homelessPersons = await firestore()
      .collection('HomelessPersons')
      .get();
    const persons = homelessPersons.docs.map(doc => ({
      person: doc.data(),
      id: doc.id,
    }));
    console.log('Persons retrieved successfully:', persons);
    return persons;
  } catch (error) {
    console.error('Error retrieving persons:', error);
    throw error;
  }
};
