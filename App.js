//Import react and usestate which allows me to use react framework and 
//add's a hook that makes it where I can add a state to a functional component.

import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Animated, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DragonEgg from './src/components/DragonEgg';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const {width} = Dimensions.get('window'); //Get the width of users phone sets as a const called width. 
// below this is the main functional component of my app 
const App = () => {
  const navigation = useNavigation();
  const nestImage = require('./src/assets/art/egg-nest.png');
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(width))[0];
  
    // Function to handle incoming deep links for API use 
    const handleDeepLink = (event) => {
      const data = Linking.parse(event.url);
      if (data && data.path && data.path === '/strava') {
        const queryParams = data.queryParams;
        if (queryParams && queryParams.code) {
          const authCode = queryParams.code;
          // This authCode is to request access tokens from Strava
        } 
      }
    };

    useEffect(() => {
      Linking.addEventListener('url', handleDeepLink);
      Linking.getInitialURL().then((url) => {
        if (url) {
          handleDeepLink({url});
        }
    });

    return () => {
Linking.removeAllListeners('url', handleDeepLink);
    };
  }, []); 

  const toggleSettingsPanel = () => {
    if (isPanelVisible) {
      // Slide out
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsPanelVisible(false));
    } else {
      setIsPanelVisible(true);
      // Slide in
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <ImageBackground source={require('./src/assets/art/medieval-background.png')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.settingsIcon} onPress={toggleSettingsPanel}>
          <Image source={require('./src/assets/art/settings-icon.png')} style={styles.icon} />
        </TouchableOpacity>

        {isPanelVisible && (
          <TouchableOpacity
          style={styles.overlay}
          onPress={toggleSettingsPanel}
          />
        )}

        <Animated.View style={[styles.settingsPanel, { transform: [{ translateX: slideAnim }] }]}>
          <Text style={styles.panelHeader}>Settings</Text>
          <TouchableOpacity onPress={() => {/* Link Strava Account */}}>
            <Text style={styles.panelItem}>Link Strava Account</Text>
          </TouchableOpacity>
          {/* Add more settings options here */}
        </Animated.View>

        <View style={styles.sidebar}>
          <ImageBackground
            source={require('./src/assets/art/button-overlay.png')}
            style={styles.textBox}
            imageStyle={styles.borderImage}
          >
            <Text style={styles.sidebarHeader}>Miles {"\n"} Walked</Text>
            <Text style={styles.sidebarValue}>0</Text>
          </ImageBackground>

          <ImageBackground
            source={require('./src/assets/art/button-overlay.png')}
            style={styles.textBox}
            imageStyle={styles.borderImage}
          >
            <Text style={styles.sidebarHeader}>Miles {"\n"} Ran</Text>
            <Text style={styles.sidebarValue}>0</Text>
          </ImageBackground>

          <ImageBackground
            source={require('./src/assets/art/button-overlay.png')}
            style={styles.textBox}
            imageStyle={styles.borderImage}
          >
            <Text style={styles.sidebarHeader}>Goal {"\n"} Weight</Text>
            <Text style={styles.sidebarValue}>170 lbs</Text>
          </ImageBackground>

          <ImageBackground
            source={require('./src/assets/art/button-overlay.png')}
            style={styles.textBox}
            imageStyle={styles.borderImage}
          >
            <Text style={styles.sidebarHeader}>Current {"\n"} Weight</Text>
            <Text style={styles.sidebarValue}>211 lbs</Text>
          </ImageBackground>
        </View>
        <View style={styles.mainContent}>
          <Text style={styles.dragonName}>DISTRO_KILLER</Text>
          <View style={styles.eggContainer}>
            {/*Nest Image*/} 
            <Image source={nestImage} style={styles.nestImage} />
            <DragonEgg />
          </View>
          <View style={styles.progressBarContainer}>
            <LinearGradient
              colors={['blue', 'gold']} // the gradient from blue to gold 
              start={{x: 0, y: 0}} //starting point of color gradient 
              end={{x: 1, y: 0}} //ending point where color transitions 
              style={styles.progressBar}
            />
            <Text style={styles.progressText}>75% to next level</Text>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Miles')}>
              <ImageBackground
                source={require('./src/assets/art/main-button-overlay.png')}
                style={styles.buttonOverlay}
              >
                <Text style={styles.buttonText}>MILES</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Calories')}>
              <ImageBackground
                source={require('./src/assets/art/main-button-overlay.png')}
                style={styles.buttonOverlay}
              >
                <Text style={styles.buttonText}>CALORIES</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Steps')}>
              <ImageBackground
                source={require('./src/assets/art/main-button-overlay.png')}
                style={styles.buttonOverlay}
              >
                <Text style={styles.buttonText}>STEPS</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  sidebar: {
    width: '20%',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    paddingVertical: 50,
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
    marginTop: 5,
    padding: 0.5,
  },
  borderImage: {
    resizeMode: 'cover',
    backgroundColor: 'solid',
    height: '120%',
    width: '100%',
  },
  sidebarHeader: {
    fontFamily: 'BlakaInk', //  font name that is in the src/assets/fonts
    color: 'gold',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0.5,
    marginBottom: 5,
    marginLeft: 3,
    paddingTop: 55,
    textShadowColor: 'blue', //shadow color
    textShadowOffset: {width: 0, height: 0}, //shadow offset to make the text pop
    textShadowRadius: 35, // the blur for the shadow effect
  },
  sidebarValue: {
    color: 'gold',
    fontWeight: 'bold',
    fontSize: 8,
    textAlign: 'center',

  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '105%',
    height: '100%',
  },
  dragonName: {
    fontFamily: 'DOMISC', 
    position: 'absolute',
    top: '21%',
    left: '29%',
    transform: [{ translateX: -50 }],
    fontSize: 27,
    fontWeight: 'bold',
    color: 'gold',
    zIndex: 2,
  },
  eggContainer: {
    position: 'absolute',
    top: '39%',
    left: '38%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
    zIndex: 1,
    width: 245,
    height: 215,
    overflow: 'visible',
  },
  nestImage: {
    width: 285,
    height: 150,
    position: "absolute",
    top: '60%',
    left: '42%',
    transform: [{translateX: -125}, {translateY: -75}],
    zIndex: 1, 
  },
  progressBarContainer: {
    width: '100%',
    height: 35,
    position: 'absolute',
    top: '1%',
    left: 0,
    transform: [{ translateX: -40 }],
    borderRadius: 5,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  progressBar: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    opacity: 0.8,
  },
  progressText: {
    position: 'absolute',
    right: 10,
    top: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  buttons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    left: '5%',
    transform: [{ translateX: -50 }],
    width: '80%',
    justifyContent: 'space-evenly',
  },
  button: {
    width: 165,
    height: 70,
    overflow: 'visible',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  buttonOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    width: '105%',
    height: '130%',
    resizeMode: 'contain',
    top: '-1%',
    left: '10%',
  },
  buttonText: {
    fontFamily: 'DOMISC', // Ensure this matches the actual font name
    color: 'gold',
    fontWeight: 'bold',
    fontSize: 12,
    zIndex: 1,
    textAlign: 'center',
    marginTop: 3,
    left: 2,
  },
  icon: {
    width: 120 ,
    height: 120,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 5,
  },
  settingsPanel: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width * 0.75, // 75 % of the screen 
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    zIndex: 15,
  },
  settingsIcon: {
    position: 'absolute',
    top: 40,
    right: 0,
    zIndex: 10,
  },
  panelHeader: {
    fontSize: 24,
    color: 'gold',
    marginBottom: 20,
  },
  panelItem: {
    fontSize: 18,
    color: 'white',
    marginBottom: 15,
  },
});

export default App;
