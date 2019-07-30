import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, Button, View, TouchableHighlight, Dimensions, Image, Alert} from 'react-native';
import { CheckBox, Fab } from "native-base";
import { Col, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-ionicons'
import { SwipeRow } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-community/async-storage';
import server from '../api/server'
import {connect} from 'react-redux'
import {repopulate, setAlarm} from '../store/action'
import moment from 'moment';
import { FloatingAction } from 'react-native-floating-action'

const mapStateToProps = state => {
  return {
    repopulateState: state.repopulate
  }
}

const mapDispatchToProps = {repopulate, setAlarm}
let check

class AlarmList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      alarmList: [],
      time: moment().format('LT')
    }
  }

  componentDidMount() {
    check = setInterval (() => {
      let redirect = false
      AsyncStorage.getItem('alarmTrigger')
      .then(data => {
        console.log('interval')
        console.log(data)
        if (data !== null && data) {
          let trigger = JSON.parse(data)
          console.log(trigger.alarmId)
          if (trigger.alarmId && trigger.alarmId.length > 0) {
            console.log(trigger.alarmId, "ini trigger data")
            let alarmList = this.state.alarmList
            let alarmPlay = trigger.alarmId
            console.log(moment().format('LT'))
            let found = false
            for (let i = 0; i < alarmList.length; i++){
              for (let j = 0; j < alarmPlay.length; j++){
                if (alarmPlay[j] === alarmList[i]._id) {
                  console.log('found alarm')
                  if (alarmList[i].time === moment().format('LT')) {
                    console.log('found alarm now')
                    if (alarmList[i].days.length === 0 && alarmList[i].status){
                      console.log("one time")
                      found = true
                      redirect = true
                      this.props.setAlarm(alarmPlay[j])
                      return AsyncStorage.removeItem('alarmTrigger')
                    } else {
                      for (let k = 0; k < alarmList[i].days.length; k++){
                        if (alarmList[i].days[k] === moment().format('dddd') && alarmList[i].status) {
                          console.log("day")
                          redirect = true
                          this.props.setAlarm(alarmPlay[j])
                          return AsyncStorage.removeItem('alarmTrigger')
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      })
      .then(() => {
        if (redirect) {
          redirect = false
          this.props.navigation.navigate('AlarmLanding')
        }
      })
    }, 1000)

    AsyncStorage.getItem('alarmActiv8Me')
    .then(alarms => {
      if (alarms !== null && alarms) {
        let alarmList = JSON.parse(alarms)
        if (alarmList.length >= 0) {
          this.setState({
            alarmList: [...alarmList]
          })
        } else {
          return AsyncStorage.getItem('tokenActiv8Me')
        }
      }
    })
    .then(token => {
      if (token === null && token) {
        return server ({
          method: 'get',
          url: '/alarm/',
          headers: {
            token
          }
        })
      }
    })
    .then(({data}) => {
      this.setState({
        alarmList: data
      })
      return AsyncStorage.setItem('alarmActiv8Me', JSON.stringify(data))
    })
    .then(() => {
      console.log('done saving alarm')
    })
    .catch(err => {
      console.log(err)
    })
  }

  componentDidUpdate(prevProps) {
    AsyncStorage.getItem('alarmActiv8Me')
    .then(alarms => {
      console.log('update')
      if (alarms !== null && alarms) {
        let alarmList = JSON.parse(alarms)
        if (alarmList.length >= 0 && this.props.repopulateState) {
          this.props.repopulate(false)
          this.setState({
            alarmList: [...alarmList]
          })
        }
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  componentWillUnmount() {
    clearInterval(check);
  }

  getDays(days) {
    let weekdays = "Mo Tu We Th Fr"
    let weekends = "Sa Su"
    let everyday = weekdays + ' ' + weekends
    let temp = []
    for(let day of days) {
      temp.push(day.slice(0, 2)) 
    }

    let showDays = temp.join(' ')

    if(showDays === weekdays) return 'Weekdays'
    else if(showDays === weekends) return 'Weekends'
    else if(showDays === everyday) return 'Everyday'
    else return showDays
  }

  handleCheck(index){
    let list = this.state.alarmList
    let userToken
    list[index].status ? list[index].status = false : list[index].status = true

    console.log(list[index])
    
    AsyncStorage.getItem('tokenActiv8Me')
    .then(token => {
      userToken = token
      let data = list[index]
      return server({
        method: 'patch',
        url: `/alarm/${list[index]._id}`,
        data: {
          ...data,
          type: 'update'
        },
        headers: {
          token
        }
      })
    })
    .then(() => {
      return server ({
        method: 'get',
        url: '/alarm/',
        headers: {
          token: userToken
        }
      })
    })
    .then(({data}) => {
      return AsyncStorage.setItem('alarmActiv8Me', JSON.stringify(data))
    })
    .then(() => {
      this.props.repopulate(true)
    })
    .catch(err => {
      console.log(err)
    })
  } 

  timeRemaining() {
    let d = new Date()
    let t = d.getTime()
    console.log(t)
  }

  handleDelete(alarm) {
    Alert.alert(
      'Delete alarm?',
      'This action cannot be undone',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.deleted(alarm)
        },
      ],
      { cancelable: false },
    );
  }

  deleted(alarm) {
    let userToken
    AsyncStorage.getItem('tokenActiv8Me')
    .then(token => {
      userToken = token
      let data = alarm
      return server({
        method: 'delete',
        url: `/alarm/${alarm._id}`,
        headers: {
          token
        }
      })
    })
    .then(() => {
      return server ({
        method: 'get',
        url: '/alarm/',
        headers: {
          token: userToken
        }
      })
    })
    .then(({data}) => {
      return AsyncStorage.setItem('alarmActiv8Me', JSON.stringify(data))
    })
    .then(() => {
      console.log('done saving alarm')
      this.props.repopulate(true)
    })
    .catch(err => {
      console.log(err)
    })
  }

  logout() {
    console.log('logging out')
    AsyncStorage.removeItem('tokenActiv8Me')
    .then(() => {
      return AsyncStorage.removeItem('alarmActiv8Me')
    })
    .then(() => {
      this.props.navigation.navigate('Landing')
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View>
          <Text style={{ textAlign: 'center', fontSize: 16 }}>
            Next alarm
          </Text>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 26, marginBottom: 5 }}>
            1h 10m remaining
          </Text>
          <Button title="Clear all" color="#007991" onPress ={() => this.timeRemaining()}/>
        </View> */}
        
        <ScrollView>
        <View style={{ alignItems: 'center', marginTop: 10}}>
          {this.state.alarmList.map((alarm, index) => {
            
            return (
              <SwipeRow
                disableRightSwipe
                rightOpenValue={-75}
                style={{ marginBottom: 10, width: '95%' }}
                key={index}
                tension={40}
                preview
                previewOpenValue={-75}
                swipeToOpenPercent={80}
                swipeToOpenVelocityContribution={30}
                friction={10}
              >
                <View style={styles.standaloneRowBack}>
                  <Text></Text>
                  <View style={{ height: '100%', width: 75, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('AlarmForm', { type: 'update', alarm})} style={{margin: 5}} activeOpacity={1} underlayColor={'#FFA14D'}>
                      <Image 
                        source={require('../assets/pics/edit.png')}
                        style={{ height: 37, width: 37}}
                      />

                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.handleDelete(alarm)} style={{margin: 5 }} activeOpacity={1} underlayColor={'#FFA14D'}>
                      <Image
                        source={require('../assets/pics/trash.png')}
                        style={{ height: 37, width: 37 }}
                      />
                    </TouchableHighlight>

                  </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <View key={index} style={{ height: 100, width: '100%', backgroundColor: alarm.status ? "#fff" : "#F2F2F2", elevation: 3}}>
                    
                    <Grid>
                      <Col style={{ justifyContent: 'center' }} size={17}>
                        <CheckBox style={{ marginLeft: 5 }} checked={alarm.status ? true : false} color="#FF8B17" onPress={() => this.handleCheck(index)} />
                      </Col>
                      <Col style={{ justifyContent: 'center', padding: 5}} size={33}>
                        <Text style={{ fontSize: 17,  fontWeight: 'bold', color: alarm.status ? '#007991' : '#588791'}}>{alarm.title}</Text>
                      </Col>
                      <Col style={{ alignItems: 'flex-start', justifyContent: 'center' }} size={50}>
                        <Text style={{ fontSize: 35, fontWeight: 'bold', color: alarm.status ? "#000" : "#9F9C9C" }}>{alarm.originTime}</Text>
                        <Text style={{ color: alarm.status ? "#000" : "#9F9C9C" }}>{this.getDays(alarm.days)}</Text>
                      </Col>
                    </Grid>
                  </View>
                </View>
              </SwipeRow>
            )
          })}

            <View style={{ height: 100, width: '100%' }}></View>

          </View>
        </ScrollView>

        <FloatingAction
          overlayColor="rgba(68, 68, 68, 0.5)"
          color="#F28213"
          actions={
            [
              {
                text: "Log out",
                icon: require("../assets/pics/logout.png"),
                name: "logOut",
                position: 1,
                color: '#424242',
                textBackground: '#424242',
                textColor: '#fff'
              },
              {
                text: "Set alarm",
                icon: require("../assets/pics/set-alarm.png"),
                name: "setAlarm",
                position: 2,
                color: '#3B8EA5',
                textBackground: '#3B8EA5',
                textColor: '#fff'
              },

            ]
          }
          onPressItem={name => {
            if(name === 'setAlarm') {
              AsyncStorage.getItem('tokenActiv8Me')
                .then(token => {
                  console.log('add')
                  if (!token) {
                    this.props.navigation.navigate('Landing')
                  } else {
                    this.props.navigation.navigate('AlarmForm')
                  }
                })
            }
          }}
        />
        {/* <TouchableHighlight
          style={styles.circleContainer}
          underlayColor='#ccc'
          onPress={() => {
            AsyncStorage.getItem('tokenActiv8Me')
            .then(token => {
              console.log('add')
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
          <Button style={{ backgroundColor: '#888888' }} onPress={() => this.logout()}>
            <Icon name="log-out" color="white"/>
          </Button>
        </Fab> */}
            
          {/* <Button
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
    right: 85,
    elevation: 3
  }
});

export default connect (mapStateToProps, mapDispatchToProps) (AlarmList)
