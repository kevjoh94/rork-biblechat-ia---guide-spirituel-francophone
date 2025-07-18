import React, { useRef } from 'react';
import { ImageBackground, Animated, Platform, Dimensions } from 'react-native';

interface ParallaxBackgroundProps {
  source: { uri: string };
  style?: any;
  children?: React.ReactNode;
  parallaxFactor?: number;
}

const { height } = Dimensions.get('window');

export function ParallaxBackground({ 
  source, 
  style, 
  children, 
  parallaxFactor = 0.3 
}: ParallaxBackgroundProps) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const translateY = Platform.OS !== 'web' ? scrollY.interpolate({
    inputRange: [0, height],
    outputRange: [0, height * parallaxFactor],
    extrapolate: 'clamp',
  }) : 0;

  return (
    <Animated.View style={[style, Platform.OS !== 'web' && { transform: [{ translateY }] }]}>
      <ImageBackground
        source={source}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
        imageStyle={{ opacity: 0.15 }}
      >
        {children}
      </ImageBackground>
    </Animated.View>
  );
}