// In App.js in a new project

// In App.js in a new project

import * as React from 'react';
import MapView from 'react-native-maps';
import { View, Button, Text, Dimensions, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export class Map extends React.Component {
        region = {
            latitude: 51.4995933,
            longitude: -0.1748108,
            latitudeDelta: 0.000002,
            longitudeDelta: 0.0021,
        }

        marker = [{
            latlng: {
                latitude: 51.4995933,
                longitude: -0.1748108,
            },
            title: "my location",
            description: "description",
            image: require('./assets/test.png')
        }, {
            latlng: {
                latitude: 51.4995933,
                longitude: -0.1748108,
            },
            title: "my location",
            description: "description",
            image: require('./assets/icon.png')
        },{
            latlng: {
                latitude: 53.4995933,
                longitude: -2.1748108,
            },
            title: "my location",
            description: "description",
            image: require('./assets/icon.png')
        }]


  render() {
    return (
        <View style={styles.container}>
          <MapView style={styles.mapStyle}
                   initialRegion={{
                     latitude: 51.4978923,
                     longitude: -0.17212,
                     latitudeDelta: 0.015,
                     longitudeDelta: 0.015
                   }}>
            <MapView.Marker
                image={this.marker[0].image}
                coordinate={this.marker[0].latlng}/>
            <MapView.Marker
                image={this.marker[2].image}
                coordinate={this.marker[2].latlng}/>
        </MapView>
        </View>
    );
  }
}

function HomeScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize: 40}}>Welcome back</Text>
        <Text style={{fontSize: 40}}>Jason</Text>
        <Text style={{padding: 20}}/>
        <Button
            color={"green"}
            title="Points earned today: 283"
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Map/>
        <Button
            title="Claim Checkpoint!"
        />
      </View>
  );
}

const Tabs = createBottomTabNavigator();

function App() {
  return (
      <NavigationContainer>
        <Tabs.Navigator initialRouteName="Home">
          <Tabs.Screen name="Home" component={HomeScreen} />
          <Tabs.Screen name="Scores" component={OtherScreen} />
          <Tabs.Screen name="Map" component={MapScreen} />
        </Tabs.Navigator>
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
    height: Dimensions.get('window').height * 0.9,
  },
});

export default App;


















/*

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

*/
