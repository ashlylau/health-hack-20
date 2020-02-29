// In App.js in a new project

import * as React from 'react';
import MapView, {Marker} from 'react-native-maps';
import ReactDOM from 'react-dom';
import { View, Button, Text, Dimensions, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import image from './assets/cherry.svg';

export class Map extends React.Component {
  state = {
    region: {
      latitude: 51.4995933,
      longitude: -0.1748108,
      latitudeDelta: 0.000002,
      longitudeDelta: 0.0021,
    },
    marker: [{
      latlng: {
        latitude: 51.4995933,
        longitude: -0.1748108,
      },
      title: "my location",
      description: "description",
      image: 'snake.png'
    }]
  };

  // onRegionChange(region) {
  //   this.setState({ region });
  // }
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle}
        region={this.state.region}
        // onRegionChange={this.onRegionChange}>
        >
          {this.state.marker.map(marker => (
            <MapView.Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              image={image}
              pinColor='blue'
            />
          ))}
          </MapView>
      </View>
    );
  }
}


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Map')}
      />
    </View>
  );
}


function OtherScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Other screen</Text>

    </View>
  );
}

function MapScreen() {
  return (
      <Map/>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Other" component={OtherScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default App;
