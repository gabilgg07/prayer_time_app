import React, {useState, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const usersColl = firestore().collection('users');
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth()
              .signInWithEmailAndPassword(email, password)
              .then(async result => {
                if (!result.user.emailVerified) {
                  result.user.sendEmailVerification();
                  alert(
                    'Zəhmət olmasa e-poçtanıza göndərilmiş keçidlə e-poçtanızı təstiqləyin...',
                  );
                } else {
                  console.log('Daxil oldunuz');
                }
              });
          } catch (error) {
            console.log(error);
          }
        },

        signup: async (
          firstname,
          lastname,
          username,
          phone,
          email,
          password,
          navigation,
        ) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(async result => {
                var uid = result.user.uid;

                result.user.sendEmailVerification();
                result.user.updateProfile({
                  displayName: firstname + ' ' + lastname,
                });

                await usersColl.doc(uid).set({
                  country: 'Azerbaijan',
                  city: 'Baku',
                  CreatedDate: new Date(),
                  Email: email,
                  Password: password,
                  ImageUrl: '',
                  FirstName: firstname,
                  LastName: lastname,
                  Username: username,
                  Phone: phone,
                });

                alert(
                  'Qeydiyatdan keçdiniz! Zəhmət olmasa e-poçtanıza göndərilmiş keçidlə e-poçtanızı təstiqləyin...',
                );
                navigation.navigate('LoginScreen');
              });
          } catch (error) {
            console.log(error);
          }
        },

        resetPassword: async email => {
          try {
            await auth().sendPasswordResetEmail(email);
            alert('Şifrə sıfırlama linki e-poçt adresinizə göndərildi!');
          } catch (error) {
            alert(error);
          }
        },

        signout: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            console.log(error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
