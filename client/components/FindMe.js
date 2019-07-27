import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, ScrollView, Text } from 'react-native';

export default function Game(props) {
  const [find, setFind] = useState(0)
  const [arr, setArr] = useState([])
  const [totalButton, setTotalButton] = useState(3)

  useEffect(() => {
    let randomFind = Math.floor(Math.random() * Math.floor(totalButton))
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
      props.navigation.navigate('Result')
    }
  }

  return (
    <>    
      <Text>Find Me 😄</Text>
      <ScrollView>
        <View style={styles.container}>
        {
          arr.map((item, i) => {
            return (
              <View style={styles.buttonStyle} key={i}>
                <Button
                  onPress={() => {
                    finished(i)
                  }}
                  title={item === 1 ? '😄' : '😭'}
                />
              </View>
            )
          })
        }
        </View>
      </ScrollView>
    </>
  );
}



const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    marginRight: 50,
    marginLeft: 50
  }
});
