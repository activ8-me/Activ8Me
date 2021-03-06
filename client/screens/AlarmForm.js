import React, { Component }from 'react';
import { Card } from 'native-base'
import { Text, View, ScrollView, StyleSheet, TouchableHighlight, TextInput, Image } from 'react-native'
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment"
import server from '../api/server'
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux'
import {repopulate} from '../store/action'

const mapDispatchToProps = {repopulate}

class AlarmForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDateTimePickerVisible: false,
      time: '',
      modalVisible: false,
      days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      daysChecked: [false, false, false, false, false, false , false],
      title: '',
      type: '',
      id: '',
      weekdays: false,
      weekends: false,
      everyday: false
    }
  }

  componentDidMount() {
    const type = this.props.navigation.getParam('type')

    let d = new Date()
    let time = moment(d).format('LT')

    if (type === 'update'){
      let alarm = this.props.navigation.getParam('alarm')
      let check = this.state.daysChecked

      for (let i = 0 ; i < this.state.days.length; i++){
        for (let j = 0; j < alarm.days.length; j++){
          if (alarm.days[j] === this.state.days[i]) {
            check[i] = true
          }
        }
      }

      this.setState({
        time: alarm.originTime,
        daysChecked: check,
        title: alarm.title,
        id: alarm._id,
        type
      })
    } else {
      this.setState({
        time
      })
    }
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    let time = moment(date).format('LT')
    
    this.setState({
      time
    })

    this.hideDateTimePicker();
  };

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible
    })
  }

  handleChecked = (index) => {
    let checked = this.state.daysChecked
    if(checked[index] === true) checked.splice(index, 1, false)
    else checked.splice(index, 1, true)
  
    this.state.daysChecked.splice() 
    this.setState({
      daysChecked: checked
    })
  }

  handleChange = (text) => {
    this.setState({
      title: text
    })
  }

  handleTypeSelect = (type) => {
    let daysChecked = [false, false, false, false, false, false, false]

    if (type === 'weekdays' && !this.state.weekdays) daysChecked = [true, true, true, true, true, false, false]
    else if (type === 'weekends' && !this.state.weekends) daysChecked = [false, false, false, false, false, true, true]
    else if(type === 'everyday' && !this.state.everyday) daysChecked = [true, true, true, true, true, true, true]

    this.setState({
      daysChecked,
      weekdays: this.state.weekdays ? false : true,
      weekends: this.state.weekends ? false : true,
      everyday: this.state.everyday ? false : true
    })
  } 

  handleSubmit = async () => {
    let inputDays = []

    this.state.daysChecked.forEach((day, index) => {
      if(day) {
        inputDays.push(this.state.days[index])
      }
    })
    
      const { time, title } = this.state

      let fcmToken = await AsyncStorage.getItem('fcmToken')

      const input = { time, title, status: true, days: inputDays, fcmToken} 
      let userToken

      AsyncStorage.getItem('tokenActiv8Me')
      .then(token => {
        userToken = token
        if (token) {
          if (this.state.type === 'update') {
            return server({
              method: 'patch',
              url: `/alarm/${this.state.id}`,
              data: {
                ...input,
                type: this.state.type
              },
              headers: {
                token
              }
            })
          } else {
            return server({
              method: 'post',
              url: '/alarm/',
              data: input,
              headers: {
                token
              }
            })
          }
        }
      })
      .then(() => {
        return server({
          method: 'get',
          url: '/alarm/',
          headers: {
            token: userToken
          }
        })
      })
      .then(async ({data}) => {
        return AsyncStorage.setItem('alarmActiv8Me', `${JSON.stringify(data)}`)
      })
      .then(() => {
        return AsyncStorage.getItem('alarmActiv8Me')
      })
      .then(alarms => {
        this.props.repopulate(true)
        this.props.navigation.navigate('AlarmList')
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <Card style={styles.cardContainer}>
              <TextInput placeholder='Enter alarm title' value={this.state.title} onChangeText={(text) => this.handleChange(text)} style={{marginLeft: 10}}/>
            </Card>

            <Card style={styles.cardContainer}>
              <TouchableHighlight underlayColor="#F7F7F7" onPress={this.showDateTimePicker}>
                <Text style={{ fontSize: 60, fontWeight: 'bold', textAlign: 'center', padding: 30 }}> {this.state.time} </Text>
              </TouchableHighlight>
              <DateTimePicker
                mode='time'
                date={new Date(moment(this.state.time, ["h:mm A"]))}
                is24Hour={false}
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
              />
            </Card>

            <Card style={{ padding: 10, width: '95%' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}t>Repeat</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
              { this.state.days.map((day, index) => {
                return (
                      <TouchableHighlight underlayColor='#F7F7F7' key={index} style={{ padding: 10 }} onPress={() => this.handleChecked(index)}>
                        <Text  style={this.state.daysChecked[index] === true ? styles.checked : styles.unchecked }>{day.slice(0,2)}</Text>
                      </TouchableHighlight>
                    )
                  })}

              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>

                <TouchableHighlight underlayColor='#F7F7F7' style={styles.typeButton} onPress={() => this.handleTypeSelect('weekends')}>
                  <Text style={styles.typeText}>Weekends</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='#F7F7F7' style={styles.typeButton} onPress={() => this.handleTypeSelect('weekdays')}>
                  <Text style={styles.typeText}>Weekdays</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='#F7F7F7' style={styles.typeButton} onPress={() => this.handleTypeSelect('everyday')}>
                  <Text style={styles.typeText}>Everyday</Text>
                </TouchableHighlight>
              </View>
            </Card>

            <Card style={{ padding: 10, width: '95%' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginBottom: 10}}>Available games</Text>
              {/* <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>PRO FEATURE</Text> */}


              <View style={{ flexDirection: 'row'}}>
                <View style={styles.gameBox}>
                  <View style={{ width: 50, height: 50, alignItems: 'center'}}>
                    <Image source={require('../assets/game/boxfall/building.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
                  </View>
                  <Text style={styles.gameText}>Box Fall</Text>
                </View>
                <View style={styles.gameBox}>
                  <View style={{ width: 50, height: 50, alignItems: 'center' }}>
                    <Image source={require('../assets/game/memorygame/memory.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
                  </View>
                  <Text style={styles.gameText}>Memory</Text>
                </View>
                <View style={styles.gameBox}>
                  <Image source={require('../assets/game/mathgame/sum-up.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
                  <Text style={styles.gameText}>Sum up</Text>
                </View>
                <View style={styles.gameBox}> 
                  <Image source={require('../assets/game/wakemeup/catsleep.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
                  <Text style={styles.gameText}>Wake me</Text>
                </View>
                <View style={styles.gameBox}>
                  <Image source={require('../assets/game/findme/nyan-awake.png')} style={{ width: 50, height: 50, resizeMode: 'contain'}}/>
                  <Text style={styles.gameText}>Find me</Text>
                </View>
              </View>
            </Card>
          </View>

        </ScrollView>
       <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#007991', justifyContent: 'space-evenly'}}>
          <View style={{ flex: 1 }}>
            <TouchableHighlight underlayColor='#424242' onPress={() => this.props.navigation.goBack()} style={{ backgroundColor: '#646464', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.touchableText}>CANCEL</Text>
          </TouchableHighlight>
          </View>

          <View style={{ flex: 1}}>
            <TouchableHighlight underlayColor='#D37619' style={{ backgroundColor: '#E8811B', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={this.handleSubmit}> 
            <Text style={styles.touchableText}>SET ALARM</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#F7F7F7',
  },
  unchecked: {
    fontSize: 20,
    color: '#ADADAD'
  },
  checked: {
    fontSize: 20,
    color: '#FF8B17',
  },
  cardContainer: {
    width: '95%'
  },

  typeButton : {
    padding: 10,
  },

  typeText: {
    color: '#007991'
  },
  touchableText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: "FredokaOne-Regular",
  },
  gameBox: {
    // style={ styles.gameBox }
    flex: 1,
    alignItems: 'center'
  },
  gameText: {
    fontSize: 15
  }

});

export default connect (null, mapDispatchToProps) (AlarmForm)
