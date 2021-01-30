import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
} from 'react-native';

const data = [
  {
    title: 'First',
  },
  {
    title: 'Second',
  },
  {
    title: 'third',
  },
  {
    title: 'third1',
  },
  {
    title: 'Second2',
  },
  {
    title: 'third3',
  },
  {
    title: 'third12',
  },
];

const headerHeight = 70;

const App: () => React = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const extrapolate = 'clamp';
  const easing = Easing.linear;

  const headerY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate,
    easing,
  });

  const opacityScroll = scrollY.interpolate({
    inputRange: [0, 0, 30],
    outputRange: [1, 1, 0],
    extrapolate,
    easing,
  });

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text>Header</Text>
      </View>

      <Animated.View style={{transform: [{translateY: headerY}]}}>
        <Animated.ScrollView
          horizontal
          style={{
            ...styles.chipsParent,
            opacity: opacityScroll,
          }}>
          {data.map(({title}) => (
            <View style={styles.chips} key={title}>
              <Text># {title}</Text>
            </View>
          ))}
        </Animated.ScrollView>

        <Animated.ScrollView
          scrollEventThrottle={headerHeight}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {data.map(({title}) => (
            <View key={title} style={styles.card}>
              <Text>{title}</Text>
            </View>
          ))}
        </Animated.ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: '#333',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  chipsParent: {
    marginTop: 55,
  },
  chips: {
    minWidth: 100,
    padding: 10,
    margin: 5,
    height: 40,
    borderRadius: 5,
    fontSize: 13,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    backgroundColor: '#eee',
  },
  card: {
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#909',
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
