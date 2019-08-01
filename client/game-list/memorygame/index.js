import React, {useState, useEffect} from 'react'
import { View, Text, Image, TouchableHighlight, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import {winning} from '../../store/action'
import CardFlip from 'react-native-card-flip'

const mapDispatchToProps = {winning}

const game = (props) => {
  const image = [
    require('../../assets/game/memorygame/cardback2.jpg'),
    require('../../assets/game/memorygame/jack.png'),
    require('../../assets/game/memorygame/king2.jpeg'),
    require('../../assets/game/memorygame/queen.jpg'),
    require('../../assets/game/memorygame/ace.png')
  ]
  const [count, setCount] = useState(0)
  const [pair1, setPair1] = useState(null)
  const [pair2, setPair2] = useState(null)
  const [answer, setAnswer] = useState([])
  const [open, setOpen] = useState([])

  useEffect(() => {
    if (count === 4) {
      console.log('win memory game')
      setTimeout(() => {
        props.winning(props.gameId, props.gameDone)
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
    this['card' + i].flip()
  }

  function handleFlip(i) {
    this['card' + i].flip()
    setTimeout(() => {
      this['card' + i].flip()
    }, 500)
  }

  useEffect(() => {
    if (answer[pair1] === answer[pair2] && typeof answer[pair1] === 'number') {
      setCount(count + 1)
      setPair1(null)
      setPair2(null)
    } else if (pair1 != null && pair2 != null) {
      setTimeout(() => {
        this['card' + pair1].flip()
        this['card' + pair2].flip()
        
        setOpen([...open].slice(0, open.length-2))
        setPair1(null)
        setPair2(null)
      }, 500)
    }
  }, [pair1, pair2])

  return (
    <View style={styles.game}>
      <View style={{ backgroundColor: '#f2f2f2', padding: 15, borderRadius: 10, elevation: 3, marginTop: 10}}>
        <Text style={styles.title}>Mix and match!</Text>
      </View>
      <View style={styles.content}>
        
        {
          answer.map((pic, i) => {
            return (
              <>
              <CardFlip duration={500} style={{ ...styles.cardSize, margin: 10}} ref={(card) => this['card' + i] = card}>
                <TouchableOpacity onPress={() => pair1 === null ? setPair(i) : pair2 === null && setPair(i)}><Image source={image[0]} style={{...styles.cardSize, ...styles.card}} /></TouchableOpacity>
                <TouchableOpacity ><Image source={open.indexOf(i) >=0 ? image[pic] : image[0]} style={{ ...styles.cardSize, ...styles.card }} /></TouchableOpacity>
              </CardFlip>
              </>
            )
          })

        }
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

    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  card: {
    // resizeMode: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#FFE8D6",
    backgroundColor: "#C1F0FE"
  },
  cardContainer: {
    margin: 5,
  },
  cardSize: {
    width: Dimensions.get('window').width*3/12,
    height: Dimensions.get('window').width*3/12*11/8,
  }
});

export default connect (null, mapDispatchToProps) (game)
