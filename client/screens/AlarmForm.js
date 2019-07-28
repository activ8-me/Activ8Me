import React, { Component }from 'react';
import { Input, Item, Card } from 'native-base'
import { Text, View, Button, ScrollView, StyleSheet, TouchableHighlight } from 'react-native'
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment"

export default class AlarmForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDateTimePickerVisible: false,
      hour: '',
      minute: '',
      time: '',
      modalVisible: false,
      days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      daysChecked: [false, false, false, false, false, false , false],
      title: '',
      type: ''
    }
  }

  componentDidMount() {
    const type = this.props.navigation.getParam('type')

    let d = new Date()
    let time = moment(d).format('LT')

    this.setState({
      time,
      type
    })
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    let time = moment(date).format('LT')
    // let hour = date.getHours()
    // let minute = date.getMinutes()
    // if (minute < 10) minute = '0' + minute
    // if (hour < 10) hour = '0' + hour
    
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

  handleSubmit = () => {
    // console.log(this.state.daysChecked, this.state.time, this.state.title)
    let inputDays = []

    this.state.daysChecked.forEach((day, index) => {
      if(day) {
        inputDays.push(this.state.days[index])
      }
    })

    const { time, title } = this.state

    const input = { time, title, status: true, days: inputDays} 

    // axios({
    //   method: 'post',
    //   url: 'http://localhost:3000/alarm',
    //   data: input,
    //   // headers: 
    // })
  }

  render() {
    return (
      <View style={styles.container}>
        
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <Card style={styles.cardContainer}>
              <Item regular>
                <Input placeholder='Enter alarm title' value={this.state.title} onChangeText={(text) => this.handleChange(text)}/>
              </Item>
            </Card>

            <Card style={styles.cardContainer}>
              <TouchableHighlight underlayColor="#F7F7F7" onPress={this.showDateTimePicker}>
                <Text style={{ fontSize: 50, textAlign: 'center', fontWeight: 'bold', padding: 30 }}> {this.state.time} </Text>
              </TouchableHighlight>
              <DateTimePicker
                mode='time'
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
            </Card>

            <Card style={{ height: 180, padding: 10, width: '95%' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Available games</Text>
            </Card>
          </View>

        </ScrollView>
          <Button
            onPress={
                // this.props.navigation.navigate('AlarmList')
                this.handleSubmit
            }
            title="SET ALARM"
            color="#007991"
          />
      </View>
    );
  }
}

AlarmForm.navigationOptions = {
  title: 'Set alarm',
  headerTitleStyle: {
    fontWeight: 'bold'
  }
};

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
  }

});

{/* <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Select games (minimum 3): </Text>
  <TouchableHighlight onPress={() => this.setModalVisible(true)}>
    <Text>test</Text>
  </TouchableHighlight>

  // <Modal */}
  //   animationType="fade"
  //   transparent={true}
  //   visible={this.state.modalVisible}
  //   onRequestClose={() => {
  //     Alert.alert('Modal has been closed.');
  //   }}>
  //   <View style={{
  //     flex: 1,
  //     flexDirection: 'column',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: 'rgba(80,80,80,0.5)'
  //   }}>
  //     <View style={{ height: 300, width: 300, backgroundColor: '#fff' }}>
  //       <Grid>
  //         <Row>
  //           <Col style={{ borderWidth: 1, borderColor: 'black' }}>
  //             <Text>test</Text>
  //           </Col>
  //           <Col style={{ borderWidth: 1, borderColor: 'black' }}>
  //             <Text>test</Text>
  //           </Col>
  //           <Col style={{ borderWidth: 1, borderColor: 'black' }}>
  //             <Text>test</Text>
  //           </Col>

  //         </Row>

  //         <Row>
  //           <Col style={{ borderWidth: 1, borderColor: 'black' }}>
  //             <Text>test</Text>
  //           </Col>
  //           <Col style={{ borderWidth: 1, borderColor: 'black' }}>
  //             <Text>test</Text>
  //           </Col>
  //           <Col style={{ borderWidth: 1, borderColor: 'black' }}>
  //             <Text>test</Text>
  //           </Col>
  //         </Row>

  //       </Grid>
  //       <Text>Hello World!</Text>

  //       <TouchableHighlight

  //         onPress={() => {
  //           this.setModalVisible(!this.state.modalVisible);
  //         }}
  //         style={{ padding: 10, backgroundColor: 'red' }}
  //       >
  //         <Text>Cancel</Text>
  //       </TouchableHighlight>
  //     </View>
  //   </View>
  // </Modal>