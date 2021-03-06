import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Button, Alert } from "react-native";
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes
} from "react-native-sensors";

import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";

import randomInt from "random-int";
import randomColor from "randomcolor";

import Circle from "./components/circle";
import Box from "./components/box";

import getRandomDecimal from "./helpers/getRandomDecimal";

import { connect } from 'react-redux'
import { winning } from '../../store/action'

const mapDispatchToProps = { winning }

const { height, width } = Dimensions.get('window');

const BALL_SIZE = 20;
const DEBRIS_HEIGHT = 70;
const DEBRIS_WIDTH = 20;

const mid_point = (width / 2) - (BALL_SIZE / 2);

const ballSettings = {
  isStatic: true
};

const debrisSettings = {
  isStatic: false,
  density: 50
};

const ball = Matter.Bodies.circle(0, height - 30, BALL_SIZE, {
  ...ballSettings,
  label: "ball"
});

const floor = Matter.Bodies.rectangle(width / 2, height, width, 10, {
  isStatic: true,
  isSensor: true,
  label: "floor"
});
let accel
setUpdateIntervalForType(SensorTypes.accelerometer, 15);

class BoxFall extends Component {

  state = {
    x: 0,
    y: height - 45,
    isGameReady: false,
    score: 0,
    won: false
  }


  constructor(props) {
    super(props);

    this.debris = [];

    const { engine, world } = this._addObjectsToWorld(ball);
    this.entities = this._getEntities(engine, world, ball);

    this._setupCollisionHandler(engine);

    this.physics = (entities, { time }) => {
      let engine = entities["physics"].engine;
      engine.world.gravity.y = 0.5;
      Matter.Engine.update(engine, time.delta);
      return entities;
    };
  }

  _isMounted = false

  componentDidMount() {
    this._isMounted = true
    if (this._isMounted) {
      accel = accelerometer.subscribe(({ x }) => {
        Matter.Body.setPosition(ball, {
          x: this.state.x - x,
          y: height - 30
        });
        this.setState(state => ({
          x: state.x - x
        }), () => {
          if (this.state.x < 0) {
            Matter.Body.setPosition(ball, {
              x: width,
              y: height - 45
            });

            this.setState({
              x: width
            });
          }
          else if (this.state.x > width) {
            Matter.Body.setPosition(ball, {
              x: 0,
              y: height - 45
            });

            this.setState({
              x: 0
            });
          }
        });
      });

      this.setState({
        isGameReady: true
      });
    }
  }

  componentDidUpdate() {
    if (this.state.score === 20 && this.state.won === false && this._isMounted) { // KONDISI MENANG
      // Alert.alert('You win', 'Next game');
      this.debris.forEach((debris) => {
        Matter.Body.set(debris, {
          isStatic: true
        });
      });
      this.setState({
        won: true,
        isGameReady: false
      })
    } else if (this.state.won === true && !this.state.isGameReady && this.state.score === 20){
      this._isMounted =false
      console.log('win fallbox')
      this.setState({
        score: 0
      })
      this.props.winning(this.props.gameId)
    }
  }


  _addObjectsToWorld = (ball) => {
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;

    let objects = [
      ball,
      floor
    ];

    for (let x = 0; x <= 5; x++) {
      const debris = Matter.Bodies.rectangle(
        randomInt(1, width - 30),
        randomInt(0, 200),
        DEBRIS_WIDTH,
        DEBRIS_HEIGHT,
        {
          frictionAir: getRandomDecimal(0.03, 0.08),
          label: 'debris'
        }
      );

      this.debris.push(debris);
    }

    objects = objects.concat(this.debris);

    Matter.World.add(world, objects);

    return {
      engine,
      world
    }
  }


  _getEntities = (engine, world, ball) => {
    const entities = {
      physics: {
        engine,
        world
      },

      playerBall: {
        body: ball,
        size: [BALL_SIZE, BALL_SIZE],
        renderer: Circle
      },

      gameFloor: {
        body: floor,
        size: [width, 10],
        color: '#414448',
        renderer: Box
      }
    };

    for (let x = 0; x <= 5; x++) {

      Object.assign(entities, {
        ['debris_' + x]: {
          body: this.debris[x],
          size: [DEBRIS_WIDTH, DEBRIS_HEIGHT],
          color: randomColor({
            // luminosity: 'light',
          }),
          renderer: Box
        }
      });

    }

    return entities;
  }


  _setupCollisionHandler = (engine) => {
    Matter.Events.on(engine, "collisionStart", (event) => {
      var pairs = event.pairs;

      var objA = pairs[0].bodyA.label;
      var objB = pairs[0].bodyB.label;

      if (objA === 'floor' && objB === 'debris' && this._isMounted) {
        Matter.Body.setPosition(pairs[0].bodyB, {
          x: randomInt(1, width - 30),
          y: randomInt(0, 200)
        });

        this.setState(state => ({
          score: state.score + 1
        }));
      }

      if (objA === 'ball' && objB === 'debris') {
        this.reset()
      }

    });
  }

  componentWillUnmount() {
    this._isMounted = false
    accel.unsubscribe()
  }

  render() {
    const { isGameReady, score } = this.state;

      return (
        <>
        {
          isGameReady &&
            <GameEngine
              style={styles.container}
              systems={[this.physics]}
              entities={this.entities}
            >
              <View style={styles.header}>
                {/* <Button
                  onPress={this.reset}
                  title="Reset"
                  color="#841584"
                /> */}
                <View style={{ backgroundColor: '#F2F2F2', borderRadius: 10, padding: 10, elevation: 3 }}>
                  <Text style={styles.scoreText}>Score: {score}</Text>
                  <Text style={{ color: '#737373', fontSize: 20 }}>Reach 20 points to win!</Text>
                </View>
              </View>
            </GameEngine>

        }
        </>
      );


  }


  reset = () => {

    this.debris.forEach((debris) => {
      Matter.Body.set(debris, {
        isStatic: false
      });
      Matter.Body.setPosition(debris, {
        x: randomInt(1, width - 30),
        y: randomInt(0, 200)
      });
    });
    if (this._isMounted) {
      this.setState({
        score: 0
      });
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff8b17',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#454545'
  }
});

export default connect(null, mapDispatchToProps)(BoxFall)