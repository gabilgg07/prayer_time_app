import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../../routers/AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as yup from 'yup';

const ResetPasswordScreen = ({navigation}) => {
  const [isSecurePass, setIsSecurePass] = useState(true);
  const {resetPassword} = useContext(AuthContext);
  const signupValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Boş geçilemez')
      .email('Geçerli bir email adresi giriniz!'),
  });
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          width: '80%',
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#ddd',
          borderRadius: 30,
        }}>
        <Text style={{fontSize: 24}}>Şifre Sıfırlama</Text>
        <Formik
          validationSchema={signupValidationSchema}
          initialValues={{email: '', password: '', passwordConfirm: ''}}
          onSubmit={values => resetPassword(values.email)}>
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
                name="email"
                placeholder="Email Adresiniz"
                style={{
                  height: 50,
                  width: '90%',
                  padding: 10,
                  margin: 10,
                  borderColor: '#000',
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 16,
                }}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && (
                <Text style={{color: '#f00', fontSize: 14}}>
                  {errors.email}
                </Text>
              )}

              <View style={{width: '50%'}}>
                <Button
                  color="#f00"
                  onPress={handleSubmit}
                  disabled={!isValid}
                  title="Gönder"
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
