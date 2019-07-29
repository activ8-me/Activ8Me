import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableHighlight, ScrollView, Text, Image } from 'react-native';
import {connect} from 'react-redux'
import {winning} from '../../store/action'

const mapDispatchToProps = {winning}

function game(props) {
  const [find, setFind] = useState(0)
  const [arr, setArr] = useState([])
  const [totalButton, setTotalButton] = useState(300)

  const image = [
    require('../../assets/game/findme/bulbaditto.png'),
    require('../../assets/game/findme/bulbasaur.png')
  ]

  useEffect(() => {
    let randomFind = Math.floor(Math.random() * Math.floor(totalButton - 100)) + 100
    let newArr = []
    for(let i = 0; i < totalButton; i++){
      if (i === randomFind) {
        newArr.push(1)
      } else {
        newArr.push(0)
      }
    }
    setArr(newArr)
    setFind(randomFind)
  }, []);

  const finished = (num) => {
    if (find === num){
      props.winning(props.gameId)
    }
  }

  return (
    <View style={styles.container}>    
      <Text style={styles.title}>Find Me</Text>
      <Image source={image[1]} style={{width: 125, height: 118, marginBottom: 5}}/>
      <ScrollView>
        <View style={styles.content}>
        {
          arr.map((item, i) => {
            return (
              <View style={styles.buttonStyle} key={i}>
                <TouchableHighlight
                  onPress={() => {finished(i)}}
                  activeOpacity={0.2}
                  underlayColor={'#FFA14D'}
                  style={styles.card}
                >
                  <Image source={image[item]} style={{width: 125, height: 115}}/>
                </TouchableHighlight>
              </View>
            )
          })
        }
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 60,
    fontFamily: "Iceberg-Regular",
    padding: 15,
    paddingBottom: 0,
    width: '100%',
    textAlign: 'center'
  },
  container: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: '#ff8b17',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  card: {
    height: 130,
    width: 130,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#FFE8D6",
    backgroundColor: "#FFC08A",
  }
});

export default connect (null, mapDispatchToProps) (game)
