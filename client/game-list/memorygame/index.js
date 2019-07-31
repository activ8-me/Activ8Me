import React, {useState, useEffect} from 'react'
import { View, Text, Image, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native'
import {connect} from 'react-redux'
import {winning} from '../../store/action'
import CardFlip from 'react-native-card-flip'

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
    <View style={styles.game}>
      <View style={{ backgroundColor: '#f2f2f2', padding: 10, borderRadius: 10, elevation: 3}}>
        <Text style={styles.title}>Mix and match!</Text>
      </View>
      <View style={styles.content}>

        <CardFlip style={{ height: 200, width: 300 }} ref={(card) => this.card = card}>
          <TouchableOpacity style={{ height: 100, width: 100}} onPress={() => this.card.flip()} ><Text>AB</Text></TouchableOpacity>
          <TouchableOpacity style={{ height: 100, width: 100}} onPress={() => this.card.flip()} ><Text>CD</Text></TouchableOpacity>
        </CardFlip>
        {/* {
          answer.map((pic, i) => {
            return (
              <View style={styles.cardContainer} key={i}>
                {
                  open.indexOf(i) < 0 ? 
                  <TouchableHighlight onPress={() => setPair(i)} activeOpacity={0.2} underlayColor={'#FFA14D'}>
                    <Image source={image[0]} style={styles.card}/> 
                  </TouchableHighlight> :
                  <Image source={image[pic]} style={styles.card}/>
                }
              </View>
            )
          })
        } */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  game: {
    display: 'flex',
    flexDirection: "column",
    backgroundColor: '#ff8b17',
    justifyContent: 'flex-start',
    alignItems: "center",
    height: '100%'
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  content: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  card: {
    width: 125,
    height: 125,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#FFE8D6",
    backgroundColor: "#FFC08A",
  },
  cardContainer: {
    margin: 10
  }
});

export default connect (null, mapDispatchToProps) (game)
