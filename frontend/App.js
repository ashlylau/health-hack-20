// In App.js in a new project

// In App.js in a new project

import * as React from 'react';
import MapView from 'react-native-maps';
import { View, Button, Text, Dimensions, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Alert from "react-native-web";

var PLAYER_SCORE = 0;

const region = {
    latitude: 51.4995933,
    longitude: -0.1748108,
    latitudeDelta: 0.000002,
    longitudeDelta: 0.0021,
};

const marker = [{
    latlng: {
        latitude: 51.499842,
        longitude: -0.1737106,
    },
    latitude: 51.499842,
    longitude: -0.1737106,
    title: "my location",
    description: "description",
    image: require('./assets/silver.png')
}, {
    latlng: {
        latitude: 51.4999775,
        longitude: -0.1722874,
    },
    latitude: 51.4999775,
    longitude: -0.1722874,
    title: "my location",
    description: "description",
    image: require('./assets/cherry.png')
},{
    latlng: {
        latitude: 51.4987904,
        longitude: -0.1722485,
    },
    latitude: 51.4987904,
    longitude: -0.1722485,
    title: "my location",
    description: "description",
    image: require('./assets/banana.png')
},{
    latlng: {
        latitude: 51.498563,
        longitude: -0.1733593,
    },
    latitude: 51.498563,
    longitude: -0.1733593,
    title: "my location",
    description: "description",
    image: require('./assets/gold.png')},{
    latlng: {
        latitude: 51.4832084,
        longitude: -0.2045351,
    },
    latitude: 51.4832084,
    longitude: -0.2045351,
    title: "my location",
    description: "description",
    image: require('./assets/snake.png')},{
    latlng: {
        latitude: 51.4979749,
        longitude: -0.1764943,
    },
    latitude: 51.4979749,
    longitude: -0.1764943,
    title: "my location",
    description: "description",
    image: require('./assets/apple.png')}
    ];

function dist(x1, y1, x2, y2) {
    return (x1  - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
}

export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.nav
        }
    }

    render() {
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{fontSize: 40}}>Welcome back</Text>
                <Text style={{fontSize: 40}}>Jason</Text>
                <Text style={{padding: 20}}/>
                <Button
                    color={"green"}
                    title={"Points earned today: " + PLAYER_SCORE.toString()}
                    onPress={() => navigation.navigate('Map')}
                />
            </View>
        );
    }
}

export class Map extends React.Component {
  componentDidMount() {
    window.setInterval(this.findCoordinates, 100);
  }
  
  constructor(props) {
      super(props);
      this.state = {
          title: "Claim!",
          region: props.region,
          marker: props.marker,
          swap: true,
          x: "Unknown",
          y: "Unknown",
          claims: ""
      }
  }

    claimF() {
        var fail = true;
        for (var i = 0; i < this.state.marker.length ; i++) {
            if (dist(this.state.x, this.state.y, this.state.marker[i].longitude, this.state.marker[i].latitude) < 0.0000015) {
                this.setState({claims: "Congrats! You earned 10 points!"});
                this.setState({marker: this.state.marker.filter(mark => this.state.marker[i] !== mark)});
                fail = false;
                PLAYER_SCORE = PLAYER_SCORE +  10;
            }
        }
        if (fail) {
            this.setState({claims: "No joy!"});
        }
    };

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ x: position.coords.longitude, y: position.coords.latitude });                
                console.log(this.state.x);
              },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };


    changePic() {
        if (this.state.swap) {
            this.state.marker[0].image = require('./assets/banana.png');
            this.state.swap = false
        } else {
            this.state.marker[0].image = require('./assets/cherry.png');
            this.state.swap = true
        }
        this.findCoordinates();
        this.claimF();
    }


  render() {
      return (
        <View style={styles.container}>
          <MapView style={styles.mapStyle}
                   initialRegion={this.state.region}>
                  {this.state.marker.map(mark => <MapView.Marker
                      image={mark.image}
                      coordinate={mark.latlng}/>)}
        </MapView>
            <Button
                title={this.state.title}
                onPress={() => {this.changePic();}}
            />
            <Text>{this.state.claims}</Text>
        </View>
    );
  }
}

function HomeScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Home nav = {navigation}/>
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
        <Map marker={marker} region = {region}/>
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
