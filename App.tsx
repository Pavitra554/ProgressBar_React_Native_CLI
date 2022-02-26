/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

const BACKGROUND_COLOR = '#212121';
const BACKGROUND_STROCK = '#121212';
const STROCK_COLOR = '#3DDC83';
const CIRCLE_LENGTH = 900;
const CIRCLE_RADIUS = CIRCLE_LENGTH / (2 * Math.PI);
const {height,width} = Dimensions.get('window');
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const App = () => {
  const isDarkMode = useColorScheme() === "light";
  const progress = useSharedValue(0);
  const opacity = useSharedValue(1);
  const animatedProps = useAnimatedProps(()=>({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));
  
  const start = useCallback(()=>{
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 10000 });
    opacity.value =  withRepeat(withTiming(0),Infinity,true )
 },[])

  const rStyle = useAnimatedStyle(()=>{
    return{
      opacity:opacity.value
    }
  })

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value *100)}`;
  });


  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={'#212121'} barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.under}>
      <ReText style={[styles.text]} text={progressText} />
      <AnimatedIcon name="flash" size={50} style={rStyle} color={'#3DDC83'} />
      </View>
      <Svg style={styles.svg}>
        <Circle
          r={CIRCLE_RADIUS}
          cx={width / 2}
          cy={height / 2}
          stroke={BACKGROUND_STROCK}
          strokeWidth={30}
        />
        <AnimatedCircle
          r={CIRCLE_RADIUS}
          cx={width / 2}
          cy={height / 2}
          stroke={STROCK_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
        />
      </Svg>
      <TouchableOpacity style={styles.btn} onPress={()=>start()}>
          <Text style={styles.btntext}>Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  svg: {
    position: "absolute",
    top:-30,
  },
  text: {
    fontSize: 60,
    color: "#fff",
    // 
  },
  under:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom: 30,
  },
  btn: {
    height: 50,
    width: width * 0.7,
    backgroundColor: BACKGROUND_STROCK,
    position: "absolute",
    bottom: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  btntext: {
    fontSize: 20,
    letterSpacing: 2.0,
    color: "#fff",
  },
});

export default App;
