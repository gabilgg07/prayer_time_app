import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Loading = ({clr = '#061d34'}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="large" color={clr} />
    </View>
  );
};

export default Loading;
