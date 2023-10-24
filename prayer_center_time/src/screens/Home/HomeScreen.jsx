import React, {useContext, useState, useEffect} from 'react';
// import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {AuthContext} from '../../routers/AuthProvider';
import {deviceHeight, deviceWidth} from '../../utils/dimensions';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../utils/Loading';

const HomeScreen = () => {
  // const gradientStart = {x: 1, y: 0}; // Top-left
  // const gradientEnd = {x: 1, y: 1}; // Top-right (horizontal gradient)
  const [isLoading, setIsloading] = useState({
    userIsLoading: true,
    userCoinsIsLoading: true,
    coinsIsLoading: true,
  });
  const {user} = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const [userCoinList, setUserCoinList] = useState([]);
  const [coinList, setCoinList] = useState([]);

  const usersColl = firestore().collection('users');
  const coinsColl = firestore().collection('coins');
  const userCoinsColl = firestore().collection('userCoins');

  useEffect(() => {
    usersColl
      .doc(user.uid)
      .get()
      .then(data => {
        setCurrentUser(data.data());
        setIsloading({
          ...isLoading,
          userIsLoading: false,
        });
      });
    userCoinsColl.onSnapshot(querySnapshot => {
      let list = [];
      querySnapshot.forEach(doc => {
        const {userID, coinID, value} = doc.data();
        if (userID === user.uid) {
          list.push({
            id: doc.id,
            userID,
            coinID,
            value,
          });
        }
      });
      setUserCoinList(list);
      setIsloading({
        ...isLoading,
        userCoinsIsLoading: false,
      });
    });

    coinsColl.onSnapshot(querySnapshot => {
      let list = [];
      querySnapshot.forEach(doc => {
        const {name} = doc.data();
        list.push({
          id: doc.id,
          name,
        });
      });

      setCoinList(list);
      setIsloading({
        ...isLoading,
        coinsIsLoading: false,
      });
    });
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={{
          flexDirection: 'row',
          width: '95%',
          height: 60,
          borderWidth: 1,
          margin: 10,
          borderRadius: 20,
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          {coinList.map((x, i) => {
            if (x.id == item.coinID) {
              return (
                <Text key={x.id} style={{color: '#fff'}}>
                  {x.name}
                </Text>
              );
            }
          })}
        </View>

        <View style={{flex: 1}}>
          <Text style={{textAlign: 'right', fontSize: 18, color: '#fff'}}>
            {item.value}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#00BEFF',
      }}>
      {/* <LinearGradient
        start={gradientStart}
        end={gradientEnd}
        colors={['#0098DB', '#0098DB', '#0098DB', '#0098DB', 'transparent']}
        style={{
          width: deviceWidth * 2,
          height: deviceWidth * 2,
          borderRadius: deviceWidth,
          position: 'absolute',
          top: -deviceWidth - 50,
          left: -15,
        }}></LinearGradient>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#05B8FD', '#0098DB']}
        style={{
          width: deviceWidth * 2,
          height: deviceWidth * 2,
          borderRadius: deviceWidth,
          position: 'absolute',
          top: -deviceWidth - 70,
          left: -10,
        }}></LinearGradient> */}

      {isLoading.userIsLoading &&
      isLoading.userCoinsIsLoading &&
      isLoading.coinsIsLoading ? (
        <Loading clr="#fff" />
      ) : (
        <>
          <View
            style={{
              padding: 20,
              margin: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 15,
              borderColor: '#fff',
              width: deviceWidth / 2 + 100,
              height: deviceHeight / 4 + 100,
              borderRadius: deviceWidth / 2 + 100,
            }}>
            <Text style={{color: '#fff'}}>Merhaba </Text>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 18,
                color: '#fff',
              }}>
              {user.displayName}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 22,
                  textAlign: 'center',
                  color: '#fff',
                  marginRight: 5,
                }}>
                {currentUser.TRY}
              </Text>
              <View style={{justifyContent: 'flex-end', marginBottom: 2}}>
                <Text
                  style={{
                    color: '#fff',
                  }}>
                  TL
                </Text>
              </View>
            </View>
          </View>
          <View style={{flex: 3, width: '90%'}}>
            <FlatList
              style={{flex: 1, width: '100%'}}
              data={userCoinList}
              keyExtractor={item => item.id}
              renderItem={renderItem}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
