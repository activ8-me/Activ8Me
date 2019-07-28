import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, Button, View, TouchableHighlight, Dimensions, Image, Alert} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, CheckBox, Fab } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-ionicons'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-community/async-storage';

export default class AlarmList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      alarmList: [
        {
          title: 'Go to work',
          time: '09:10 AM',
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          status: true
        },
        {
          title: 'Workout',
          time: '12:15 PM',
          days: ['Tuesday', 'Thursday', 'Friday'],
          status: true
        },
        {
          title: 'Lorem ipsum sit amet',
          time: '02:30 AM',
          days: ['Thursday', 'Friday'],
          status: false
        }
      ]
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('alarms')
    .then(alarms => {
      if (alarms) {
        this.setState({
          alarmList: alarms
        })
      }
    })
  }

  getDays(days) {
    let weekdays = "Mo Tu We Th Fr"
    let weekends = "Sa Su"
    let temp = []
    for(let day of days) {
      temp.push(day.slice(0, 2)) 
    }

    let showDays = temp.join(' ')

    if(showDays === weekdays) return 'Weekdays'
    else if(showDays === weekends) return 'Weekends'
    else return showDays
  }

  handleCheck(index){
    let list = this.state.alarmList

    list[index].status ? list[index].status = false : list[index].status = true

    this.setState({
      alarmList: list
    })

  } 

  timeRemaining() {
    let d = new Date()
    let t = d.getTime()
    console.log(t)
  }

  handleDelete() {
    Alert.alert(
      'Delete alarm?',
      'This action cannot be undone',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={{ textAlign: 'center', fontSize: 16 }}>
            Next alarm
          </Text>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 26, marginBottom: 5 }}>
            1h 10m remaining
          </Text>
          {/* <Button title="Clear all" color="#007991" onPress ={() => this.timeRemaining()}/> */}
        </View>
        
        <ScrollView>
        <View style={{ alignItems: 'center', marginTop: 10}}>
          {this.state.alarmList.map((alarm, index) => {
            
            return (
              <SwipeRow
                disableRightSwipe
                rightOpenValue={-75}
                style={{ marginBottom: 10, width: '95%' }}
                key={index}
              >
                <View style={styles.standaloneRowBack}>
                  <Text></Text>
                  <View style={{ height: '100%', width: 75, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('AlarmForm', { type: 'update'})} style={{margin: 5}} activeOpacity={1} underlayColor={'#FFA14D'}>
                      <Image 
                        source={require('../assets/pics/edit.png')}
                        style={{ height: 37, width: 37}}
                      />

                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.handleDelete()} style={{margin: 5 }} activeOpacity={1} underlayColor={'#FFA14D'}>
                      <Image
                        source={require('../assets/pics/trash.png')}
                        style={{ height: 37, width: 37 }}
                      />
                    </TouchableHighlight>

                  </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <View key={index} style={{ height: 100, width: '100%', backgroundColor: alarm.status ? "#fff" : "#F2F2F2", elevation: 3}}>
                    <Text style={{ position: 'absolute', textAlign: 'center', fontWeight: 'bold', color: alarm.status ? '#007991' : '#588791', alignSelf: 'center', top: 5 }}>{ alarm.title }</Text>
                    <Grid>
                      <Col style={{ justifyContent: 'center' }} size={2}>
                        <CheckBox style={{ marginLeft: 5 }} checked={alarm.status ? true : false} color="#FF8B17" onPress={() => this.handleCheck(index)} />
                      </Col>
                      <Col style={{ justifyContent: 'center'}} size={3}>
                        <Text style={{ color: alarm.status ? "#000" : "#9F9C9C" }}>{this.getDays(alarm.days)}</Text>
                      </Col>
                      <Col style={{ alignItems: 'flex-start', justifyContent: 'center' }} size={5}>
                        <Text style={{ fontSize: 35, fontWeight: 'bold', color: alarm.status ? "#000" : "#9F9C9C" }}>{alarm.time}</Text>
                      </Col>
                    </Grid>
                  </View>
                </View>
              </SwipeRow>
            )
          })}


          </View>
        </ScrollView>
        <TouchableHighlight
          style={styles.circleContainer}
          underlayColor='#ccc'
          onPress={() => {
            AsyncStorage.getItem('token')
            .then(token => {
              if (!token) {
                this.props.navigation.navigate('Landing')
              } else {
                this.props.navigation.navigate('AlarmForm')
              }
            })
          }}
        >
          <Icon name="add" color="white" />
        </TouchableHighlight>
          
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#454545' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}>
          <Icon name="person" color="white"/>
          <Button style={{ backgroundColor: '#888888' }}>
            <Icon name="log-out" color="white"/>
          </Button>
        </Fab>
        
{/*         
          <Button
            onPress={() => {
                this.props.navigation.navigate('AlarmLanding')
            }}
            title="ke alarm landing"
          />  */}
       
      </View>
    );
  }
}

AlarmList.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#F7F7F7',
  },
  active: {
    justifyContent: 'center'
  },
  inactive: {
    justifyContent: 'center',
    
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#E5F8FC',
    flex: 1,
    borderWidth:1, 
    borderColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50,
  },
  backTextWhite: {
    color: '#FFF'
  },

  circleContainer: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.153,
    height: Dimensions.get('window').width * 0.153,
    backgroundColor: '#FF8B17',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 85
  }
});

