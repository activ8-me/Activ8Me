import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableHighlight, ScrollView, Text, Image } from 'react-native';
import {connect} from 'react-redux'
import {winning} from '../../store/action'

const mapDispatchToProps = {winning}

function game(props) {
  const [find, setFind] = useState(0)
  const [arr, setArr] = useState([])
  const [totalButton, setTotalButton] = useState(60)

  const image = [
    // require('../../assets/game/findme/bulbaditto.png'),
    require('../../assets/game/findme/nyanpixel.gif'),
    require('../../assets/game/findme/nyanhd.gif')
  ]

  useEffect(() => {
    let randomFind = Math.floor(Math.random() * Math.floor(totalButton - 5)) + 5
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
    <View style={{ justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#D2F3F2', flex: 1}}> 
      <View style={{ alignItems: 'center'}}>
        <Text style={styles.title}>Find me!</Text>
        <Image source={image[1]} style={{ width: 125, height: 118, resizeMode: 'contain'}} />
      </View>

      <View style={{ alignItems: 'center', backgroundColor: '#f2f2f2', width: '95%', borderRadius: 10, elevation: 3}}>
        {/* <Text> TEST</Text> */}
          <ScrollView style={{ width: '95%', margin: 10, height: '57%'}}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}> 
              { arr.map((item, i) => {
                return (
                  <TouchableHighlight onPress={() => finished(i)} underlayColor='#D8D8D8'>
                      <Image source={image[item]} style={item === 0 ? styles.pixel : styles.hd} />
                    </TouchableHighlight>
                )
                
              })}
            </View>
          </ScrollView>


      </View>
    </View>
    // <View style={styles.container}>    
    //   <Text style={styles.title}>Find Me</Text>
    //   <Image source={image[1]} style={{width: 125, height: 118, marginBottom: 5}}/>
    

    //     <View style={styles.content}>
    //   <ScrollView >
    //     {
    //       arr.map((item, i) => {
    //         return (
    //           <View style={styles.buttonStyle} key={i}>
    //             <TouchableHighlight
    //               onPress={() => {finished(i)}}
    //               underlayColor='#ABEAE8'
    //               style={styles.card}
    //             >
    //               <Image source={image[item]} style={{width: 80, height: 80,  resizeMode: 'contain'}}/>
    //             </TouchableHighlight>
    //           </View>
    //         )
    //       })
    //     }
    //     </View>
    //   </ScrollView>
    // </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    padding: 15,
    textAlign: 'center',
    color: '#454545',
    fontWeight: 'bold'
  },
  container: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: '#FFAA56',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10
  },
  card: {
    height: 100,
    width: 100,
    margin: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFE8D6",
    backgroundColor: "#B9FFFD",
    alignItems: 'center',
    justifyContent: 'center'
  },
  pixel : {
    width: 80, 
    height: 80, 
    resizeMode: 'contain'
  },
  hd: {
    width: 105,
    height: 105, 
    resizeMode: 'contain'
  }
});

export default connect (null, mapDispatchToProps) (game)

  // < ScrollView style = {{ backgroundColor: '#fff', width: '90%', padding: 10, borderRadius: 10, elevation: 3 }}>
  //   <View style={styles.content}>
  //     {
  //       arr.map((item, i) => {
  //         return (
  //           <View style={styles.buttonStyle} key={i}>
  //             <TouchableHighlight
  //               onPress={() => { finished(i) }}
  //               underlayColor='#ABEAE8'
  //               style={styles.card}
  //             >
  //               <Image source={image[item]} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
  //             </TouchableHighlight>
  //           </View>
  //         )
  //       })
  //     }
  //   </View>
  //     </ScrollView >