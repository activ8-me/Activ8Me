import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Image, TouchableHighlight, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import {winning} from '../../store/action'
import ProgressBarAnimated from 'react-native-progress-bar-animated'
let winCount = 10
const mapDispatchToProps = {winning}

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
        }, 1700)
      }, 600)
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
      <Text style={styles.title}>Wake me up!</Text>

        {
          zzz &&   
          <Image
          source={require('../../assets/pics/zzz.gif')}
          style={{ width: 100, height: 100, position: 'absolute', top: 320, right: 15, zIndex: 99 }}
          />
        }

        <Image
        source={wake ? require('../../assets/game/wakemeup/wakeMe2.gif') : require('../../assets/game/wakemeup/wakeMe1.gif')}
        style={{ width: 350, resizeMode: 'contain', position: 'absolute', top: 350, zIndex: wake ? 2 : 1}}
        fadeDuration={0}
          />
          
       <Image
          source={require('../../assets/game/wakemeup/wakeMe1.gif')}
          style={{ width: 350, resizeMode: 'contain', position: 'absolute', top: 350, zIndex: wake ? 1 : 2}}
        />

      <View style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
        <ProgressBarAnimated
          width={Dimensions.get('screen').width - 30}
          value={progress}
          backgroundColorOnComplete="#6CC644"
        />
        <TouchableHighlight style={styles.button} onPress={countClick} activeOpacity={0.2} underlayColor={'#FFA14D'}>
          <Text style={styles.buttonText}>Wake me!</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  game: {
    display: 'flex',
    flexDirection: "column",
    backgroundColor: '#FF8B17',
    alignItems: "center",
    height: '100%'
  },
  title: {
    fontSize: 50,
    padding: 10,
    fontWeight: 'bold'
  },
  buttonText: {
    fontSize: 20,
    padding: 20,
    fontWeight: 'bold',
    textAlign: 'center'
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
