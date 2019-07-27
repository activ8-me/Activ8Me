import React, {useState, useEffect} from 'react'
import { View, Text, Image, Button } from 'react-native'

const game1 = (props) => {
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
      console.log(wake, "awake")
    }
  }, [wake])

  useEffect(() => {
    console.log(count, "di use effect count")
    let winCount = 10
    let rate = Math.floor(count/winCount)
    console.log(rate)
    console.log(time)
    if (rate >= winCount) {
      setEye(image[4])
    } else if (rate >= 0.75*winCount) {
      setEye(image[3])
    } else if (rate >= 0.5*winCount) {
      setEye(image[2])
    } else if (rate >= 0.25*winCount) {
      setEye(image[1])
    } else {
      setEye(image[0])
    }
    console.log(eye)
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1)
      setCount(0)
    }, 1000);
    return () => clearInterval(interval);
  }, [time])

  useEffect(() => {
    if (eye === image[4]) {
      setTimeout(() => {
        setWake(true)
      }, 500)
    }
  }, [eye])
  function countClick () {
    console.log (count, "di on function")
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

export default game1
