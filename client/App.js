/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, CheckBox } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View } from 'react-native'
import AlarmList from './screens/AlarmListShandi'
import AlarmForm from './screens/AlarmFormShandi'

const App = () => {
  return (
    <Fragment>
      <AlarmList />
      {/* <AlarmForm /> */}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  slider: {
    height: 30,
    marginLeft: 7,
  }
});


export default App;
