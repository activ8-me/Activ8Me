import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, Button, View, TouchableHighlight, Dimensions, Image} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, CheckBox } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-ionicons'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

export default class AlarmList extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
        },
        {
          title: 'Go to work',
          time: '09:10 AM',
          days: ['Saturday', 'Sunday'],
          status: true
        }
      ]
    }
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', fontSize: 16 }}>
          Next alarm
        </Text>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 26 }}>
          1h 10m remaining
        </Text>
        <ScrollView>

          {this.state.alarmList.map((alarm, index) => {

            return (
              <SwipeRow
                disableRightSwipe
                rightOpenValue={-75}
                style={{ marginTop: 10 }}
                key={index}
              >
                <View style={styles.standaloneRowBack}>
                  <Text></Text>
                  <View style={{ height: '100%', width: 75, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableHighlight onPress={() => console.log('edit')} style={{margin: 5}} activeOpacity={1} underlayColor={'#FFA14D'}>
                      <Image 
                        source={require('../assets/pics/edit.png')}
                        style={{ height: 37, width: 37}}
                      />

                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => console.log('delete')} style={{margin: 5 }} activeOpacity={1} underlayColor={'#FFA14D'}>
                      <Image
                        source={require('../assets/pics/trash.png')}
                        style={{ height: 37, width: 37 }}
                      />
                    </TouchableHighlight>

                  </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <View key={index} style={{ height: 100, width: '100%', backgroundColor: alarm.status ? "#fff" : "#F2F2F2" }}>
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


         
        </ScrollView>
        <TouchableHighlight
          style={{
            borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
            width: Dimensions.get('window').width * 0.13,
            height: Dimensions.get('window').width * 0.13,
            backgroundColor: '#FF8B17',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 20,
            right: 20

          }}
          underlayColor='#ccc'
          onPress={() => this.props.navigation.navigate('AlarmForm')}
        >
          <Icon name="add" color="white" />
        </TouchableHighlight>
{/* 
          <Button
            onPress={() => {
                this.props.navigation.navigate('AlarmLanding')
            }}
            title="ke alarm landing"
          /> */}
      </View>
    );
  }
}

AlarmList.navigationOptions = {
  title: 'AlarmList',
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
    backgroundColor: '#F9F3D1',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
});

