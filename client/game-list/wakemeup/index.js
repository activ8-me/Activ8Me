import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native'
import {connect} from 'react-redux'
import {winning} from '../../store/action'

const mapDispatchToProps = {winning}

const game = (props) => {
  const image = [
    require('../../assets/game/wakemeup/closed.png'),
    require('../../assets/game/wakemeup/open-25.png'),
    require('../../assets/game/wakemeup/open-50.png'),
    require('../../assets/game/wakemeup/open-75.png'),
    require('../../assets/game/wakemeup/open-full.png')
  ]
  const imageFlip = [
    require('../../assets/game/wakemeup/closed-flip.png'),
    require('../../assets/game/wakemeup/open-25-flip.png'),
    require('../../assets/game/wakemeup/open-50-flip.png'),
    require('../../assets/game/wakemeup/open-75-flip.png'),
    require('../../assets/game/wakemeup/open-full-flip.png')
  ]
  const [wake, setWake] = useState(false)
  const [eye, setEye] = useState(image[0])
  const [eyeFlip, setEyeFlip] = useState(imageFlip[0])
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (wake) {
      setTimeout(() => {
        props.winning(props.gameId)
      }, 500)
    }
  }, [wake])

  useEffect(() => {
    let winCount = 10
    let rate = count/winCount
    if (rate >= 1) {
      setEye(image[4])
      setEyeFlip(imageFlip[4])
    } else if (rate >= 0.75) {
      setEye(image[3])
      setEyeFlip(imageFlip[3])
    } else if (rate >= 0.5) {
      setEye(image[2])
      setEyeFlip(imageFlip[2])
    } else if (rate >= 0.25) {
      setEye(image[1])
      setEyeFlip(imageFlip[1])
    } else {
      setEye(image[0])
      setEyeFlip(imageFlip[0])
    }
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1)
      setCount(0)
    }, 1000);
    return () => clearInterval(interval);
  }, [time])

  useEffect(() => {
    if (eye === image[4]) {
      setWake(true)
    }
  }, [eye])

  function countClick () {
    setCount(count + 1)
  }

  return (
    <View style={styles.game}>
      <Text style={styles.title}>Wake Me Up</Text>
      <View style={styles.image}>
        <Image source={eye} style={{width: 160, height: 80}}/>
        <View style={{padding: 10}}/>
        <Image source={eyeFlip} style={{width: 160, height: 80}}/>
      </View>
      {
        eye === image[4] ? 
        <Image source={require('../../assets/game/wakemeup/mouth.png')} style={{width: 300, height: 200}}/> :
        <View style={{width: 300, height: 200}}/>
      }
      <TouchableHighlight style={styles.button} onPress={countClick} activeOpacity={0.2} underlayColor={'#FFA14D'}>
        <Text style={styles.buttonText}>Wake Me!</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  game: {
    display: 'flex',
    flexDirection: "column",
    backgroundColor: '#ff8b17',
    justifyContent: 'space-between',
    alignItems: "center",
    height: '100%'
  },
  title: {
    fontSize: 60,
    fontFamily: "Iceberg-Regular",
    padding: 10
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Iceberg-Regular"
  },
  button: {
    width: 100,
    height: 100,
    marginBottom: 20,
    backgroundColor: '#FF9E47',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFCEA3'
  },
  image: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
});

export default connect (null, mapDispatchToProps) (game)
