import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {AuthContext} from '../../routers/AuthProvider';
import {Formik} from 'formik';
import * as yup from 'yup';
import {COLORS} from '../../utils/Colors';

const ResetPasswordScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {resetPassword} = useContext(AuthContext);
  const signupValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Boş buraxıla bilməz')
      .email('Düzgün e-poçt adresi daxil edin!'),
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDarkMode ? COLORS.darkColor : COLORS.lightColor,
      }}>
      <View
        style={[
          styles.formWrapper,
          {
            backgroundColor: isDarkMode
              ? COLORS.darkColor90
              : COLORS.whiteColor,
            borderColor: isDarkMode
              ? COLORS.lightColor200
              : COLORS.darkColor200,
          },
        ]}>
        <Text style={styles.formTitle}>Şifrə sıfırlama</Text>
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
                placeholder="E-poçt ünvanınız"
                placeholderTextColor={
                  isDarkMode ? COLORS.darkColor300 : COLORS.lightColor300
                }
                style={[
                  styles.formInput,
                  {
                    color: isDarkMode
                      ? COLORS.lightColor100
                      : COLORS.darkColor100,
                  },
                ]}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && (
                <Text style={{color: COLORS.errorColor, fontSize: 14}}>
                  {errors.email}
                </Text>
              )}

              <View style={{width: '50%'}}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!isValid}
                  style={{
                    backgroundColor: isValid
                      ? COLORS.mainColor
                      : isDarkMode
                      ? COLORS.darkGray
                      : 'lightgray',
                    marginTop: 15,
                    padding: 10,
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: isValid
                        ? COLORS.whiteColor
                        : isDarkMode
                        ? 'gray'
                        : 'darkgray',
                    }}>
                    Göndər
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
