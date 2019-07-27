import React, {useState, useEffect} from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import {connect} from 'react-redux'
import {winning} from '../../store/action'

const mapDispatchToProps = {winning}

const game = (props) => {
  const image = [
    require('../../assets/game/memorygame/card.jpg'),
    require('../../assets/game/memorygame/ninja.png'),
    require('../../assets/game/memorygame/candy.png'),
    require('../../assets/game/memorygame/diamond.png'),
    require('../../assets/game/memorygame/pikachu.png')
  ]
  const [count, setCount] = useState(0)
  const [pair1, setPair1] = useState(null)
  const [pair2, setPair2] = useState(null)
  const [answer, setAnswer] = useState([])
  const [open, setOpen] = useState([])

  useEffect(() => {
    if (count === 4) {
      setTimeout(() => {
        props.winning(props.gameId)
      }, 500)
    }
  }, [count])

  useEffect(() => {
    let arrAnswer = []
    let arr = []
    for (let i = 0; i < 8; i++) {
      arr.push(Math.floor(i / 2) + 1)
    }
    while (arr.length > 0) {
      let index = Math.floor(Math.random()*arr.length)
      arrAnswer.push(arr[index])
      arr.splice(index, 1)
    }
    setAnswer([...arrAnswer])
  }, [])

  function setPair (i) {
    if (open.indexOf(i) < 0) {
      if (pair1 === null) {
        setPair1(i)
        setOpen(open.concat(i))
      } else if (pair2 === null) {
        setPair2(i)
        setOpen(open.concat(i))
      }
    }
  }

  useEffect(() => {
    if (answer[pair1] === answer[pair2] && typeof answer[pair1] === 'number') {
      setCount(count + 1)
      setPair1(null)
      setPair2(null)
    } else if (pair1 != null && pair2 != null) {
      setTimeout(() => {
        setOpen([...open].slice(0, open.length-2))
        setPair1(null)
        setPair2(null)
      }, 1000)
    }
  }, [pair1, pair2])

  return (
    <View>
      <Text>Memory Game</Text>
      {
        answer.map((pic, i) => {
          return (
            <TouchableHighlight key={i} onPress={() => setPair(i)}>
              <View>
                {
                  open.indexOf(i) < 0 ? <Image source={image[0]} style={{width: 50, height: 50}}/> : <Image source={image[pic]} style={{width: 50, height: 50}}/>
                }
              </View>
            </TouchableHighlight>
          )
        })
      }
    </View>
  )
}

export default connect (null, mapDispatchToProps) (game)
