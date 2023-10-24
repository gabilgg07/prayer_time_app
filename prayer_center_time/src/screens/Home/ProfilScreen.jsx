import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../routers/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {Formik} from 'formik';
import * as yup from 'yup';
import Loading from '../../utils/Loading';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconAD from 'react-native-vector-icons/AntDesign';

const ProfilScreen = () => {
  const {signout, user} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(true);

  const [isUploading, setIsUploading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [downloadURL, setDownloadURL] = useState();
  const [uploadTask, setUploadTask] = useState();
  const [uploadTaskSnapshot, setUploadTaskSnapshot] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const usersColl = firestore().collection('users');
  const [showModal, setShowModal] = useState(false);

  const signupValidationSchema = yup.object().shape({
    firstname: yup
      .string()
      .required('Boş geçilemez')
      .min(3, ({min}) => 'Adınız en az ' + min + ' karakter olmalıdır!'),
    lastname: yup
      .string()
      .required('Boş geçilemez')
      .min(3, ({min}) => 'Soyadınız en az ' + min + ' karakter olmalıdır!'),
  });

  const getCurrentUser = async () => {
    setIsLoading(true);
    const response = await usersColl.doc(user.uid).get();
    setCurrentUser(response.data());
    setIsLoading(false);
  };

  const updateCurrentUser = async (firstname, lastname) => {
    setIsLoading(true);
    setIsUpdated(false);

    await usersColl.doc(user.uid).update({
      FirstName: firstname,
      LastName: lastname,
    });

    user.updateProfile({
      displayName: firstname + ' ' + lastname,
    });

    getCurrentUser();
  };

  useEffect(() => {
    getCurrentUser();

    setIsLoading(false);
    setIsUpdated(true);
  }, [currentUser.FirstName]);
  useEffect(() => {
    getCurrentUser();
  }, []);

  const onTakePhoto = async () => {
    await launchCamera({mediaType: 'photo', saveToPhotos: true}, onMediaSelect);
  };

  const onSelectImagePress = async () => {
    await launchImageLibrary(
      {mediaType: 'photo', saveToPhotos: true},
      onMediaSelect,
    );
  };

  const onMediaSelect = async media => {
    if (!media.didCancel) {
      setIsUploading(true);
      const reference = storage().ref(
        'Uploads/Users/' + media.assets[0].fileName,
      );
      const task = reference.putFile(media.assets[0].uri);
      setUploadTask(task);
      task.on('state_changed', taskSnapshot => {
        setUploadTaskSnapshot(taskSnapshot);
      });
      task.then(async () => {
        const downloadURL = await reference.getDownloadURL();
        setDownloadURL(downloadURL);
        await usersColl.doc(user.uid).update({
          ImageUrl: downloadURL,
        });
        setIsUploading(false);
        setUploadTaskSnapshot({});
        setShowModal(false);
        getCurrentUser();
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
      }}>
      {isLoading || !isUpdated ? (
        <Loading />
      ) : (
        <>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={showModal}
              onRequestClose={() => {
                alert('Gule gule');
                setShowModal(!showModal);
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#eee',
                  padding: 10,
                  margin: 25,
                }}>
                <TouchableOpacity
                  onPress={onTakePhoto}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 20,
                    height: 50,
                    width: '80%',
                    borderWidth: 1,
                    borderColor: '#000',
                    borderRadius: 30,
                  }}>
                  <Text style={{fontSize: 20, color: '#000'}}>
                    Fotoğraf Çek
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onSelectImagePress}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 20,
                    marginTop: 0,
                    height: 50,
                    width: '80%',
                    borderWidth: 1,
                    borderColor: '#000',
                    borderRadius: 30,
                  }}>
                  <Text style={{fontSize: 20, color: '#000'}}>
                    Kütüphaneden Seç
                  </Text>
                </TouchableOpacity>

                {isUploading && (
                  <View
                    style={{
                      marginTop: 50,
                      marginBottom: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ActivityIndicator size={50} color="#f00" />
                    <Text style={{fontSize: 20, margin: 20, color: '#000'}}>
                      Uploading
                    </Text>
                    <Text style={{fontSize: 20, margin: 20, color: '#000'}}>
                      {(
                        (uploadTaskSnapshot.bytesTransferred /
                          uploadTaskSnapshot.totalBytes) *
                        100
                      ).toFixed(2) + '% / 100%'}
                    </Text>
                  </View>
                )}

                <Button
                  color="#f00"
                  onPress={() => setShowModal(!showModal)}
                  title="Kapat"
                />
              </View>
            </Modal>
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                backgroundColor: '#555',
                margin: 10,
              }}>
              <Image
                source={{
                  uri: currentUser.ImageUrl,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 75,
                }}
              />
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: '#b6ee8a',
                  borderWidth: 2,
                  borderColor: '#000',
                  position: 'absolute',
                  bottom: 5,
                  right: 5,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="camera" size={15} color="#000" />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 20,
                fontWeight: 'bold',
                color: '#123456',
              }}>
              {currentUser.FirstName + ' ' + currentUser.LastName}
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Formik
              validationSchema={signupValidationSchema}
              initialValues={{
                firstname: currentUser.FirstName,
                lastname: currentUser.LastName,
              }}
              onSubmit={values => {
                updateCurrentUser(values.firstname, values.lastname);
                getCurrentUser();
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <>
                  <TextInput
                    name="firstname"
                    placeholder="Adınız"
                    placeholderTextColor="gray"
                    style={{
                      height: 50,
                      width: '90%',
                      padding: 10,
                      margin: 10,
                      borderColor: '#000',
                      borderWidth: 1,
                      borderRadius: 10,
                      fontSize: 16,
                      color: '#000',
                    }}
                    onChangeText={handleChange('firstname')}
                    onBlur={handleBlur('firstname')}
                    value={values.firstname}
                  />
                  {errors.firstname && (
                    <Text style={{color: '#f00', fontSize: 14}}>
                      {errors.firstname}
                    </Text>
                  )}

                  <TextInput
                    name="lastname"
                    placeholder="Soyadınız"
                    placeholderTextColor="gray"
                    style={{
                      height: 50,
                      width: '90%',
                      padding: 10,
                      margin: 10,
                      borderColor: '#000',
                      borderWidth: 1,
                      borderRadius: 10,
                      fontSize: 16,
                      color: '#000',
                    }}
                    onChangeText={handleChange('lastname')}
                    onBlur={handleBlur('lastname')}
                    value={values.lastname}
                  />
                  {errors.lastname && (
                    <Text style={{color: '#f00', fontSize: 14}}>
                      {errors.lastname}
                    </Text>
                  )}

                  <View style={{width: '50%'}}>
                    <Button
                      color="#f00"
                      onPress={handleSubmit}
                      disabled={!isValid}
                      title="Guncelle"
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>

          <TouchableOpacity
            onPress={() => signout()}
            style={{
              position: 'absolute',
              top: 10,
              right: 30,
              alignSelf: 'flex-end',
              backgroundColor: '#f00',
              padding: 5,
              borderRadius: 20,
            }}>
            <IconAD color="#fff" name="logout" size={30} />
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default ProfilScreen;
