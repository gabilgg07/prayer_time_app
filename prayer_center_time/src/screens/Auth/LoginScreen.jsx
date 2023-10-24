import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {COLORS} from '../../utils/Colors';
import {AuthContext} from '../../routers/AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as yup from 'yup';
import styles from './styles';

const LoginScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isSecurePass, setIsSecurePass] = useState(true);
  const {login} = useContext(AuthContext);
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Boş buraxıla bilmez')
      .email('Düzgün e-poçt adresi daxil edin!'),
    password: yup
      .string()
      .required('Boş buraxıla bilmez')
      .min(6, ({min}) => 'Şifrə ən az ' + min + ' xarakter olmalıdır!')
      .matches(/\w*[A-Z]\w*/, 'Ən az 1 ədəd böyük hərf istifadə etməlisinizz!')
      .matches(/\w*[a-z]\w*/, 'Ən az 1 ədəd kiçik hərf istifadə etməlisiniz!')
      .matches(/\d/, 'Ən az 1 ədəd rəqəm istifadə etməlisiniz!')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'Ən az 1 ədəd özəl xarakter istifadə etməlisiniz!',
      ),
  });
  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? COLORS.darkColor : COLORS.lightColor},
      ]}>
      <View
        style={[
          styles.formWrapper,
          {
            backgroundColor: isDarkMode ? COLORS.blackColor : COLORS.whiteColor,
            borderColor: isDarkMode
              ? COLORS.lightColor200
              : COLORS.darkColor200,
          },
        ]}>
        <Text style={styles.formTitle}>Hesab Girişi</Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={values => login(values.email, values.password)}>
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
                placeholder="E-poçt adresiniz"
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
                <Text style={styles.inputError}>{errors.email}</Text>
              )}

              <View style={styles.inputBox}>
                <TextInput
                  name="password"
                  placeholder="Şifrəniz"
                  placeholderTextColor={
                    isDarkMode ? COLORS.darkColor300 : COLORS.lightColor300
                  }
                  style={[
                    styles.inputInBox,
                    {
                      color: isDarkMode
                        ? COLORS.lightColor100
                        : COLORS.darkColor100,
                    },
                  ]}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={isSecurePass}
                />

                <TouchableOpacity
                  onPress={() => setIsSecurePass(!isSecurePass)}>
                  <Icon
                    style={{marginRight: 10}}
                    size={20}
                    name={isSecurePass ? 'eye-slash' : 'eye'}
                    color={COLORS.mainColor}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.inputError}>{errors.password}</Text>
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
                    Giriş
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

export default LoginScreen;
