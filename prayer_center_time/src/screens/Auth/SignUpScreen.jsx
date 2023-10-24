import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../../routers/AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as yup from 'yup';

const SignUpScreen = ({navigation}) => {
  const [isSecurePass, setIsSecurePass] = useState(true);
  const [isSecurePassConfirm, setIsSecurePassConfirm] = useState(true);

  const {signup} = useContext(AuthContext);
  const signupValidationSchema = yup.object().shape({
    firstname: yup
      .string()
      .required('Boş geçilemez')
      .min(3, ({min}) => 'Adınız en az ' + min + ' karakter olmalıdır!'),
    lastname: yup
      .string()
      .required('Boş geçilemez')
      .min(3, ({min}) => 'Soyadınız en az ' + min + ' karakter olmalıdır!'),
    username: yup
      .string()
      .required('Boş geçilemez')
      .min(
        6,
        ({min}) => 'Kullanıcı adınız en az ' + min + ' karakter olmalıdır!',
      ),
    phone: yup
      .string()
      .required('Boş geçilemez')
      .length(
        9,
        ({length}) =>
          'Telefon numaranızın uzunluğu ' + length + ' karakter olmalıdır!',
      ),
    email: yup
      .string()
      .required('Boş geçilemez')
      .email('Geçerli bir email adresi giriniz!'),
    password: yup
      .string()
      .required('Boş geçilemez')
      .min(6, ({min}) => 'Şifre en az ' + min + ' karakter olmalıdır!')
      .matches(/\w*[A-Z]\w*/, 'En az 1 adet büyük harf kullanmalısınız!')
      .matches(/\w*[a-z]\w*/, 'En az 1 adet küçük harf kullanmalısınız!')
      .matches(/\d/, 'En az 1 adet rakam kullanmalısınız!')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'En az 1 adet özel karakter kullanmalısınız!',
      ),
    passwordConfirm: yup
      .string()
      .required('Boş geçilemez')
      .oneOf([yup.ref('password')], 'Şifreler uyumsuz'),
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1, width: '100%'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: '80%',
              alignItems: 'center',
              padding: 5,
              backgroundColor: '#333',
              borderRadius: 30,
              paddingVertical: 15,
            }}>
            <Text style={{fontSize: 24}}>Yeni Üye Kaydı</Text>
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
                    style={{
                      height: 50,
                      width: '90%',
                      padding: 10,
                      margin: 10,
                      borderColor: '#000',
                      borderWidth: 1,
                      borderRadius: 10,
                      fontSize: 16,
                      backgroundColor: '#fff',
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
                    style={{
                      height: 50,
                      width: '90%',
                      padding: 10,
                      margin: 10,
                      borderColor: '#000',
                      borderWidth: 1,
                      borderRadius: 10,
                      fontSize: 16,
                      backgroundColor: '#fff',
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

                  <TextInput
                    name="username"
                    placeholder="Kullanıcı adınız"
                    style={{
                      height: 50,
                      width: '90%',
                      padding: 10,
                      margin: 10,
                      borderColor: '#000',
                      borderWidth: 1,
                      borderRadius: 10,
                      fontSize: 16,
                      backgroundColor: '#fff',
                    }}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                  />
                  {errors.username && (
                    <Text style={{color: '#f00', fontSize: 14}}>
                      {errors.username}
                    </Text>
                  )}

                  <TextInput
                    name="phone"
                    placeholder="Telefon (Örnek: 123456789)"
                    style={{
                      height: 50,
                      width: '90%',
                      padding: 10,
                      margin: 10,
                      borderColor: '#000',
                      borderWidth: 1,
                      borderRadius: 10,
                      fontSize: 16,
                      backgroundColor: '#fff',
                    }}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    keyboardType="phone-pad"
                  />
                  {errors.phone && (
                    <Text style={{color: '#f00', fontSize: 14}}>
                      {errors.phone}
                    </Text>
                  )}

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
                      backgroundColor: '#fff',
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

                  <View
                    style={{
                      borderColor: '#000',
                      borderWidth: 1,
                      borderRadius: 10,
                      width: '90%',
                      flexDirection: 'row',
                      margin: 10,
                      paddingHorizontal: 5,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      name="password"
                      placeholder="Şifreniz"
                      style={{
                        height: 50,
                        width: '70%',
                        borderWidth: 0,
                        fontSize: 16,
                        backgroundColor: '#fff',
                        color: '#000',
                      }}
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
                    <Text style={{color: '#f00', fontSize: 14}}>
                      {errors.password}
                    </Text>
                  )}

                  <View
                    style={{
                      borderColor: '#000',
                      borderWidth: 1,
                      borderRadius: 10,
                      width: '90%',
                      flexDirection: 'row',
                      margin: 10,
                      paddingHorizontal: 5,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      name="passwordConfirm"
                      placeholder="Şifre Doğrulama"
                      style={{
                        height: 50,
                        width: '70%',
                        borderWidth: 0,
                        fontSize: 16,
                        backgroundColor: '#fff',
                        color: '#000',
                      }}
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
                    <Text style={{color: '#f00', fontSize: 14}}>
                      {errors.passwordConfirm}
                    </Text>
                  )}
                  <View style={{width: '50%'}}>
                    <Button
                      color="#f00"
                      onPress={handleSubmit}
                      disabled={!isValid}
                      title="Kaydet"
                    />
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
