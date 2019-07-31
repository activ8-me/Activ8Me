import React, {useState, useEffect, Fragment} from 'react'
import { StyleSheet, View, Text, Image, TouchableHighlight, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import {winning} from '../../store/action'
import ProgressBarAnimated from 'react-native-progress-bar-animated'
let winCount = 10
const mapDispatchToProps = {winning}

let screenWidth = Dimensions.get('screen').width
let screenHeight = Dimensions.get('screen').height

const game = (props) => {
  const [wake, setWake] = useState(false)
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(0)
  const [zzz, setZzz] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (wake) {
      setTimeout (() => {
        setZzz(false)
        setTimeout(() => {
          props.winning(props.gameId)
        }, 1600)
      }, 300)
    }
  }, [wake, progress])

  useEffect(() => {
    let rate = count/winCount
    if (progress < 100 ) {
      setProgress(Math.floor(rate * 100))
    } else {
      setProgress(100)
      setTimeout(() => {
        setWake(true)
      }, 500)
      clearInterval(interval)
    }
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 0.1)
      setCount(prevCount => prevCount <= 0.7 ? 0 : prevCount - 0.65)
    }, 100);
    return () => clearInterval(interval);
  }, [time])

  function countClick () {
    setCount(count + 1)
  }


  return (
    <View style={styles.game}>
      {/* <View style={{ height: 100 , backgroundColor: 'white'}}> */}
      
      {/* </View> */}

        {
          zzz &&   
          <Image
          source={require('../../assets/pics/zzz3.gif')}
          style={{ width: 100, height: 100, position: 'absolute', top: screenHeight - 430, right: 15, zIndex: 99 }}
          />
        }

        <Image
        source={wake ? require('../../assets/game/wakemeup/wakeMe2.gif') : require('../../assets/game/wakemeup/wakeMe1.gif')}
        style={{ width: 350, resizeMode: 'contain', position: 'absolute', top: screenHeight - 400, zIndex: wake ? 2 : 1}}
        fadeDuration={0}
          />
          
       <Image
          source={require('../../assets/game/wakemeup/wakeMe1.gif')}
          style={{ width: 350, resizeMode: 'contain', position: 'absolute', top: screenHeight - 400, zIndex: wake ? 1 : 2}}
        />


      <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
        <View style={{ backgroundColor: '#F2F2F2', padding: 10, marginTop: 20, elevation: 3, width: '85%', borderRadius: 10, alignItems: 'center'}}>
          <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: '#454545'}}> Wake me up! </Text>
          <ProgressBarAnimated
            width={Dimensions.get('screen').width - 70}
            value={progress}
            backgroundColorOnComplete="#00FFFA"
            height={30}
            backgroundColor='#38DDFF'
          />
        </View>
        <TouchableHighlight underlayColor='#E8E8E8' style={styles.button} onPress={countClick}>
          <Text style={styles.buttonText}>Wake me!</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  game: {
    flexDirection: "column",
    backgroundColor: '#FF8B17',
    alignItems: "center",
    height: '100%',
    flex: 1
  },
  title: {
    fontSize: 50,
    padding: 10,
    fontWeight: 'bold',
    color: '#00D4FF'
  },
  buttonText: {
    fontSize: 20,
    padding: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#454545'
  },
  button: {
    width: 100,
    height: 100,
    marginBottom: 20,
    backgroundColor: '#F2F2F2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFCEA3',
    elevation: 3
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
