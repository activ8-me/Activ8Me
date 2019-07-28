import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, Button, View, TouchableHighlight, Dimensions, Image, Alert} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, CheckBox, Fab } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-ionicons'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-community/async-storage';
import server from '../api/server'
import {connect} from 'react-redux'
import {repopulate} from '../store/action'

const mapStateToProps = state => {
  return {
    repopulate: state.repopulate
  }
}

const mapDispatchToProps = {repopulate}

class AlarmList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      alarmList: []
    }
  }

  componentDidMount() {
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
      this.props.repopulate(false)
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
      if (alarms !== JSON.stringify(this.state.alarmList)) {
        if (alarms !== null && alarms) {
          let alarmList = JSON.parse(alarms)
          if (alarmList.length >= 0) {
            this.setState({
              alarmList: [...alarmList]
            })
          }
        }
      }
      this.props.repopulate(false)
    })
    .catch(err => {
      console.log(err)
    })
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
    else if(showDays === everyday) return 'Daily'
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
      console.log(data)
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
      console.log('done saving alarm')
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
      console.log(data)
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
      console.log('masuk then')
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
                    <Text style={{ position: 'absolute', textAlign: 'center', fontWeight: 'bold', color: alarm.status ? '#007991' : '#588791', alignSelf: 'center', top: 5 }}>{ alarm.title }</Text>
                    <Grid>
                      <Col style={{ justifyContent: 'center' }} size={2}>
                        <CheckBox style={{ marginLeft: 5 }} checked={alarm.status ? true : false} color="#FF8B17" onPress={() => this.handleCheck(index)} />
                      </Col>
                      <Col style={{ justifyContent: 'center'}} size={3}>
                        <Text style={{ color: alarm.status ? "#000" : "#9F9C9C" }}>{this.getDays(alarm.days)}</Text>
                      </Col>
                      <Col style={{ alignItems: 'flex-start', justifyContent: 'center' }} size={5}>
                        <Text style={{ fontSize: 35, fontWeight: 'bold', color: alarm.status ? "#000" : "#9F9C9C" }}>{alarm.originTime}</Text>
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
        </Fab>
            
          <Button
            onPress={() => {
                this.props.navigation.navigate('AlarmLanding')
            }}
            title="ke alarm landing"
          /> 
       
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

export default connect (mapStateToProps, mapDispatchToProps) (AlarmList)
