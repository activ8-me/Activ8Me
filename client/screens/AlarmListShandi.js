import React, { Component } from 'react'
import { Container, Header, Content, Card, CardItem, Text, Body, CheckBox } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, TouchableHighlight, Dimensions, ScrollView } from 'react-native'
import Icon from 'react-native-ionicons'



export default class AlarmList extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#EDEDED' }}>
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
                <CheckBox checked={true} color="#FF8B17"/>
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


          <Card style={{ height: 100, backgroundColor: '#E8E8E8'}}>
            <Grid>
              <Col style={{ justifyContent: 'center' }} size={15}>
                <CheckBox checked={false} color="#FF8B17"/>
              </Col>
              <Col style={{ alignItems: 'flex-start', justifyContent: 'center' }} size={30}>
                <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#9F9C9C'  }}>11:10</Text>
                <Text style={{ color:"#9F9C9C" }}>Weekends</Text>
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
                <CheckBox checked={true} color="#FF8B17"/>
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
          onPress={() => alert('aaassyiaappp')}
        >
          <Icon name="add" color="white"/>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  slider: {
    height: 30,
    marginLeft: 7,
  }
});
