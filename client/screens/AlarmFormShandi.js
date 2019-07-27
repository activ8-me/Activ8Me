import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { Container, Content, Input, Item, Card, Header, Title, Left, Body} from 'native-base'

import DateTimePicker from "react-native-modal-datetime-picker";


export default class AlarmForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDateTimePickerVisible: false,
      time: ''
    }
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    // console.log("A date has been picked: ", date);
    // console.log(typeof(date.getHours())
    // console.log(date.getHours())
    // let time = `${date.getHours()}:${date.getMinutes()}`
    // console.log(time)
    // this.hideDateTimePicker();
  };

  test() {
    console.log('halooo')
  }

  render() {
    const { show, date, mode } = this.state;

    return (
     
      <View style={{flex : 1}}>
        <Header>
          <Body>

            <Title>Alarm form</Title>
          </Body>
        </Header>
        <Card>
          <Item regular>
            <Input placeholder='Enter alarm title' />
          </Item>
        </Card>

        <Card style={{ height: 300}}>
          <Button title="Show DatePicker" onPress={this.showDateTimePicker}/>
        <DateTimePicker
          mode='time'
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        </Card>

        <Button title="test" onPress={() => {this.test()}}/>
      </View>
    )
  }
}
