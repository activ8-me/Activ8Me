import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, Button, View, TouchableHighlight, Dimensions} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, CheckBox } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-ionicons'


export default class AlarmList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alarmList: []
    }
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
          <Card style={{ height: 100, }}>
            <Grid>
              <Col style={{ justifyContent: 'center' }} size={15}>
                <CheckBox checked={true} color="#FF8B17" />
              </Col>
              <Col style={{ alignItems: 'flex-start', justifyContent: 'center' }} size={30}>
                <Text style={{ fontSize: 35, fontWeight: 'bold' }}>12:21</Text>
                <Text>Weekdays</Text>
              </Col>
              <Col style={{ justifyContent: 'center' }} size={25}>
                <Icon name='volume-high' style={{ marginLeft: 15 }} />
              </Col>
              <Col style={{ justifyContent: 'center' }} size={30}>
                <Icon name='alarm' style={{ marginLeft: 15 }} />
              </Col>
            </Grid>
          </Card>

          <Card style={{ height: 100, }}>
            <Grid>
              <Col style={{ justifyContent: 'center' }} size={15}>
                <CheckBox checked={true} color="#FF8B17" />
              </Col>
              <Col style={{ alignItems: 'flex-start', justifyContent: 'center' }} size={30}>
                <Text style={{ fontSize: 35, fontWeight: 'bold' }}>09:21</Text>
                <Text>Mo Tu We Th</Text>
              </Col>
              <Col style={{ justifyContent: 'center' }} size={25}>
                <Icon name='volume-high' style={{ marginLeft: 15 }} />
              </Col>
              <Col style={{ justifyContent: 'center' }} size={30}>
                <Icon name='alarm' style={{ marginLeft: 15 }} />
              </Col>
            </Grid>
          </Card>


          <Card style={{ height: 100, backgroundColor: '#F2F2F2' }}>
            <Grid>
              <Col style={{ justifyContent: 'center' }} size={15}>
                <CheckBox checked={false} color="#FF8B17" />
              </Col>
              <Col style={{ alignItems: 'flex-start', justifyContent: 'center' }} size={30}>
                <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#9F9C9C' }}>11:10</Text>
                <Text style={{ color: "#9F9C9C" }}>Weekends</Text>
              </Col>
              <Col style={{ justifyContent: 'center' }} size={25}>
                <Icon name='volume-high' style={{ marginLeft: 15, color: "#9F9C9C" }} />
              </Col>
              <Col style={{ justifyContent: 'center' }} size={30}>
                <Icon name='alarm' style={{ marginLeft: 15, color: "#9F9C9C" }} />
              </Col>
            </Grid>
          </Card>

          <Card style={{ height: 100, }}>
            <Grid>
              <Col style={{ justifyContent: 'center' }} size={15}>
                <CheckBox checked={true} color="#FF8B17" />
              </Col>
              <Col style={{ alignItems: 'flex-start', justifyContent: 'center' }} size={30}>
                <Text style={{ fontSize: 35, fontWeight: 'bold' }}>08:02</Text>
                <Text>Mo Tu</Text>
              </Col>
              <Col style={{ justifyContent: 'center' }} size={25}>
                <Icon name='volume-high' style={{ marginLeft: 15 }} />
              </Col>
              <Col style={{ justifyContent: 'center' }} size={30}>
                <Icon name='alarm' style={{ marginLeft: 15 }} />
              </Col>
            </Grid>
          </Card>

          <Card style={{ height: 100, }}>
            <Grid>
              <Col style={{ justifyContent: 'center' }} size={15}>
                <CheckBox checked={true} color="#FF8B17" />
              </Col>
              <Col style={{ alignItems: 'flex-start', justifyContent: 'center' }} size={30}>
                <Text style={{ fontSize: 35, fontWeight: 'bold' }}>12:21</Text>
                <Text>Weekdays</Text>
              </Col>
              <Col style={{ justifyContent: 'center' }} size={25}>
                <Icon name='volume-high' style={{ marginLeft: 15 }} />
              </Col>
              <Col style={{ justifyContent: 'center' }} size={30}>
                <Icon name='alarm' style={{ marginLeft: 15 }} />
              </Col>
            </Grid>
          </Card>

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
          {/* <Button
            onPress={() => {
                this.props.navigation.navigate('AlarmForm')
            }}
            title="ke form alarm"
          /> */}


          {/* <Button
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

  },
  inactive: {

  },
});
