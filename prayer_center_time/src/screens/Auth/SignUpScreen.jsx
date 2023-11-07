import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import {AuthContext} from '../../routers/AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as yup from 'yup';
import {COLORS} from '../../utils/Colors';
import styles from './styles';

const SignUpScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isSecurePass, setIsSecurePass] = useState(true);
  const [isSecurePassConfirm, setIsSecurePassConfirm] = useState(true);

  const {signup} = useContext(AuthContext);
  const signupValidationSchema = yup.object().shape({
    firstname: yup
      .string()
      .required('Boş buraxıla bilməz')
      .min(3, ({min}) => 'Adınız ən az ' + min + ' xarakter olmalıdır!'),
    lastname: yup
      .string()
      .required('Boş buraxıla bilməz')
      .min(3, ({min}) => 'Soyadınız ən az ' + min + ' xarakter olmalıdır!'),
    username: yup
      .string()
      .required('Boş buraxıla bilməz')
      .min(
        6,
        ({min}) => 'İstifadəçi adınız ən az ' + min + ' xarakter olmalıdır!',
      ),
    phone: yup
      .string()
      .required('Boş buraxıla bilməz')
      .length(
        9,
        ({length}) =>
          'Telefon nömrənizin uzunluğu ' + length + ' xarakter olmalıdır!',
      ),
    email: yup
      .string()
      .required('Boş buraxıla bilməz')
      .email('Düzgün e-poçt adresi daxil edin!'),
    password: yup
      .string()
      .required('Boş buraxıla bilməz')
      .min(6, ({min}) => 'Şifrə ən az ' + min + ' xarakter olmalıdır!')
      .matches(/\w*[A-Z]\w*/, 'Ən az 1 ədəd böyük hərf istifadə etməlisiniz!')
      .matches(/\w*[a-z]\w*/, 'Ən az 1 ədəd kiçik hərf istifadə etməlisiniz!')
      .matches(/\d/, 'Ən az 1 ədəd rəqəm istifadə etməlisiniz!')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'Ən az 1 ədəd özəl xarakter istifadə etməlisiniz!',
      ),
    passwordConfirm: yup
      .string()
      .required('Boş buraxıla bilməz')
      .oneOf([yup.ref('password')], 'Şifrələr eyni deyil!'),
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? COLORS.darkColor : COLORS.lightColor,
      }}>
      <ScrollView style={{flex: 1, width: '100%'}}>
        <View style={styles.container}>
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
            <Text style={styles.formTitle}>Qeydiyyat</Text>
            <Formik
              validationSchema={signupValidationSchema}
              initialValues={{
                firstname: '',
                lastname: '',
                username: '',
                phone: '',
                email: '',
                password: '',
                passwordConfirm: '',
              }}
              onSubmit={values =>
                signup(
                  values.firstname,
                  values.lastname,
                  values.username,
                  values.phone,
                  values.email,
                  values.password,
                  navigation,
                )
              }>
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
                    onChangeText={handleChange('firstname')}
                    onBlur={handleBlur('firstname')}
                    value={values.firstname}
                  />
                  {errors.firstname && (
                    <Text style={styles.inputError}>{errors.firstname}</Text>
                  )}

                  <TextInput
                    name="lastname"
                    placeholder="Soyadınız"
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
                    onChangeText={handleChange('lastname')}
                    onBlur={handleBlur('lastname')}
                    value={values.lastname}
                  />
                  {errors.lastname && (
                    <Text style={styles.inputError}>{errors.lastname}</Text>
                  )}

                  <TextInput
                    name="username"
                    placeholder="İstifadəçi adınız"
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
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                  />
                  {errors.username && (
                    <Text style={styles.inputError}>{errors.username}</Text>
                  )}

                  <TextInput
                    name="phone"
                    placeholder="Telefon (Nümunə: 123456789)"
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
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    keyboardType="phone-pad"
                  />
                  {errors.phone && (
                    <Text style={styles.inputError}>{errors.phone}</Text>
                  )}

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
                        color="#aaa"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text style={styles.inputError}>{errors.password}</Text>
                  )}

                  <View style={styles.inputBox}>
                    <TextInput
                      name="passwordConfirm"
                      placeholder="Şifrə təsdiqləmə"
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
                      onChangeText={handleChange('passwordConfirm')}
                      onBlur={handleBlur('passwordConfirm')}
                      value={values.passwordConfirm}
                      secureTextEntry={isSecurePassConfirm}
                    />

                    <TouchableOpacity
                      onPress={() =>
                        setIsSecurePassConfirm(!isSecurePassConfirm)
                      }>
                      <Icon
                        style={{marginRight: 10}}
                        size={20}
                        name={isSecurePassConfirm ? 'eye-slash' : 'eye'}
                        color="#aaa"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.passwordConfirm && (
                    <Text style={styles.inputError}>
                      {errors.passwordConfirm}
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
                        Yadda saxla
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
