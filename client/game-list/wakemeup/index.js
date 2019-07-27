import React, {useState, useEffect} from 'react'
import { View, Text, Image, Button } from 'react-native'
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
  const [wake, setWake] = useState(false)
  const [eye, setEye] = useState(image[0])
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (wake) {
      setTimeout(() => {
        props.winning()
      }, 500)
    }
  }, [wake])

  useEffect(() => {
    let winCount = 8
    let rate = count/winCount
    if (rate >= 1) {
      setEye(image[4])
    } else if (rate >= 0.75) {
      setEye(image[3])
    } else if (rate >= 0.5) {
      setEye(image[2])
    } else if (rate >= 0.25) {
      setEye(image[1])
    } else {
      setEye(image[0])
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
    <View>
      <Text>Wake Me Up</Text>
      <Image source={eye}/>
      <Button
        title="Wake Me!"
        onPress={countClick}
      />
    </View>
  )
}

export default connect (null, mapDispatchToProps) (game)
