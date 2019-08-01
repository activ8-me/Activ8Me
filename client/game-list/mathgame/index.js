import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import RandomNumber from './RandomNumber';
import {connect} from 'react-redux'
import {winning} from '../../store/action'

const mapDispatchToProps = {winning}

class Game extends React.Component {
  state = {
    selectedIds: [],
    remainingSeconds: 10,
  };
  isNumSelected = (i) => {
    return this.state.selectedIds.indexOf(i) >= 0
  };
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        return { remainingSeconds: prevState.remainingSeconds - 1 }
      }, () => {
        if (this.state.remainingSeconds === 0) {
          clearInterval(this.intervalId)
        }
      })
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.intervalId)
  }
  componentWillUpdate(nextProps, nextState) {
    if(nextState.remainingSeconds === 1){
      this.setState({
        remainingSeconds:10,
        selectedIds:[]
      })
      this.randNumArray = Array
        .from({ length: 6 })
        .map(() => 1 + Math.floor(10 * Math.random()));
      this.target = this.randNumArray
        .slice(0, 6 - 2)
        .reduce((acc, curr) => acc + curr, 0);
    }
    if (nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0) {
      this.gameStatus = this.calcGameStatus(nextState)
    }
  }
  calcGameStatus(nextState) {
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => { return acc + this.randNumArray[curr] }, 0)
    if (sumSelected === this.target) {
      setTimeout(() => {
        console.log('win mathgame')
        this.props.winning(this.props.gameId)
      }, 1000)
      return "WIN"
    } else {
      return "PLAYING"
    }
  };

  gameStatus = "PLAYING"
  selectNum = (i) => {
    this.setState((prevState) => ({ selectedIds: [...prevState.selectedIds, i] }))
  };
  randNumArray = Array
    .from({ length: 6 })
    .map(() => 1 + Math.floor(10 * Math.random()));
  target = this.randNumArray
    .slice(0, 6 - 2)
    .reduce((acc, curr) => acc + curr, 0);

  render() {
    const gameStatus = this.gameStatus;
    return (
      <View style={{backgroundColor:'#FF8000',flex:1}}>
         <Text style={{alignSelf:'center',fontSize:20, textAlign:'center'}}>Sum The Number To Match Target Number</Text>
         <Image
          style={{width: 55, height: 55, alignSelf:'center', marginVertical:15}}
          source={require('../../assets/game/mathgame/game-logo.png')}
        />
         <Text style={{alignSelf:'center',fontSize:30, textAlign:'center',marginVertical:6}}>Target</Text>
        <Text style={[styles.target, styles[`${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.randNumList}>
          {this.randNumArray.map((num, i) =>
            <RandomNumber
              key={i}
              num={num}
              id={i}
              isDisabled={this.isNumSelected(i) || gameStatus !== 'PLAYING'}
              onPress={this.selectNum}
            />
          )}
        </View>
        <Text style={styles.time}>Time Remaining: {this.state.remainingSeconds}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  target: {
    color:'white',
    fontSize: 30,
    marginHorizontal: 50,
    textAlign: 'center',
  },
  randNumList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  WIN: {
    backgroundColor: 'green'
  },
  LOST: {
    backgroundColor: 'red'
  },
  PLAYING: {
    backgroundColor: '#333b3d',
  },
  time: {
    color:'white',
    fontSize: 30,
    textAlign: 'center'
  }
});

export default connect (null, mapDispatchToProps) (Game)
