import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

class RandomNumber extends React.Component{
  static propTypes={
    id:PropTypes.number.isRequired,
    num:PropTypes.number.isRequired,
    onPress:PropTypes.func.isRequired
  }
  handlePress=()=>{
    if(!this.props.isDisabled){
      this.props.onPress(this.props.id)
    }
  }
  render() {
    let {num, isDisabled} =this.props
    return (
      <TouchableOpacity  style={styles.button} onPress={this.handlePress}>
        <Text style={[styles.num, isDisabled ? styles.disabled : styles.active]}>{num}</Text>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  num:{
    paddingTop:6,
    fontSize: 30,
    color:'white',
    textAlign: 'center',
  },
  disabled:{
    opacity:0.3
  },
  active: {
    opacity: 1
  },
  button: {
    width:100,
    height:50,
    margin: 40,
    backgroundColor: '#333b3d',
    borderRadius:10
  },
});

export default RandomNumber;