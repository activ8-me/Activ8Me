import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import RandomNumber from './RandomNumber';

class Game extends React.Component {
  state = {
    selectedIds: [],
    remainingSeconds: 10,
  };
  
  render() {
    const gameStatus = this.gameStatus;
    return (
      <View>
         <Text style={{alignSelf:'center',fontSize:30, textAlign:'center'}}>Sum The Number To Match Target Number</Text>
         <Image
          style={{width: 70, height: 70, alignSelf:'center', marginVertical:25}}
          source={{uri: 'https://image.flaticon.com/icons/png/512/227/227922.png'}}
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
    fontSize: 40,
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

export default Game;