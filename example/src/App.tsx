import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import { MultiSwitch } from 'react-native-multiswitch-selector'

// EXAMPLE 1
export const Example1 = () => {
  const [switchState1, setSwitchState1] = useState('Male')
  const [switchState2, setSwitchState2] = useState('Father')
  const [switchState3, setSwitchState3] = useState('React')
  const [switchState4, setSwitchState4] = useState('1')

  const [switchState5, setSwitchState5] = useState('Male')
  const [switchState6, setSwitchState6] = useState('Father')
  const [switchState7, setSwitchState7] = useState('React')
  const [switchState8, setSwitchState8] = useState('1')

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle='dark-content' hidden />
      <View style={styles.container}>
        <View>
          {/* default */}
          <MultiSwitch
            allStates={['Male', 'Female']}
            currentState={switchState1}
            changeState={setSwitchState1}
            styleRoot={{ marginBottom: 20 }}
            styleActiveStateText={styles.text}
            styleInactiveStateText={styles.text}
          />
          <MultiSwitch
            allStates={['Father', 'Mother', 'Brother']}
            currentState={switchState2}
            changeState={setSwitchState2}
            styleRoot={{ marginBottom: 20 }}
            styleActiveStateText={styles.text}
            styleInactiveStateText={styles.text}
          />
          <MultiSwitch
            allStates={['React', 'Vue', 'Svelte', 'Angular']}
            currentState={switchState3}
            changeState={setSwitchState3}
            styleRoot={{ marginBottom: 20 }}
            styleActiveStateText={styles.text}
            styleInactiveStateText={styles.text}
          />
          <MultiSwitch
            allStates={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
            currentState={switchState4}
            changeState={setSwitchState4}
            styleRoot={{ marginBottom: 100 }}
            styleActiveStateText={styles.text}
            styleInactiveStateText={styles.text}
          />

          {/* white */}
          <MultiSwitch
            allStates={['Male', 'Female']}
            currentState={switchState5}
            changeState={setSwitchState5}
            mode='white'
            styleRoot={{ marginBottom: 20 }}
            styleActiveStateText={styles.text}
            styleInactiveStateText={styles.text}
          />
          <MultiSwitch
            allStates={['Father', 'Mother', 'Brother']}
            currentState={switchState6}
            changeState={setSwitchState6}
            mode='white'
            styleRoot={{ marginBottom: 20 }}
            styleActiveStateText={styles.text}
            styleInactiveStateText={styles.text}
          />
          <MultiSwitch
            allStates={['React', 'Vue', 'Svelte', 'Angular']}
            currentState={switchState7}
            changeState={setSwitchState7}
            mode='white'
            styleRoot={{ marginBottom: 20 }}
            styleActiveStateText={styles.text}
            styleInactiveStateText={styles.text}
          />
          <MultiSwitch
            allStates={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
            currentState={switchState8}
            changeState={setSwitchState8}
            mode='white'
            styleActiveStateText={styles.text}
            styleInactiveStateText={styles.text}
          />
        </View>
      </View>
    </View>
  )
}

// EXAMPLE 2 (synced with scrollView)
const reactLogo = require('../assets/reactLogo.png')
const vueLogo = require('../assets/vueLogo.png')
const emberLogo = require('../assets/emberLogo.png')
const screenWidth = Dimensions.get('window').width

export const Example2 = () => {
  const [allStates] = useState(['React', 'Ember', 'Vue'])
  const [switchState, setSwitchState] = useState(allStates[0])

  const [scrollPos, setScrollPos] = useState<number>()
  useEffect(() => {
    if (!scrollPos) return
    const offset = scrollPos
    const first = screenWidth / 2
    const second = screenWidth * 1.5
    if (offset < first) {
      setSwitchState(allStates[0])
    } else if (offset < second && offset > first) {
      setSwitchState(allStates[1])
    } else if (offset > second) {
      setSwitchState(allStates[2])
    }
  }, [scrollPos])

  const scrollView = useRef<ScrollView>(null)
  const scrollTo = useCallback(
    (switchState: string, animated: boolean) => {
      let offset = 0
      if (switchState === allStates[0]) {
        offset = 0
      } else if (switchState === allStates[1]) {
        offset = screenWidth
      } else if (switchState === allStates[2]) {
        offset = screenWidth * 2
      }
      if (scrollView.current) {
        scrollView.current.scrollTo({
          x: offset,
          y: 0,
          animated,
        })
      }
    },
    [scrollView]
  )

  return (
    <View style={[styles.appContainer, { padding: 0 }]}>
      <StatusBar barStyle='dark-content' hidden />
      <View style={styles.container}>
        <View>
          <ScrollView
            ref={scrollView}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            contentOffset={{ x: screenWidth, y: 0 }}
            onScroll={(e) => setScrollPos(e.nativeEvent.contentOffset.x)}
            pagingEnabled
            style={{ marginBottom: 20 }}
          >
            {allStates.map((state, index) => (
              <View style={styles.stateContainer} key={index}>
                <View style={styles.imgContainer}>
                  <ImageBackground
                    source={
                      state === allStates[0]
                        ? reactLogo
                        : state === allStates[1]
                        ? emberLogo
                        : vueLogo
                    }
                    resizeMode='contain'
                    style={{ flex: 1 }}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
          <MultiSwitch
            allStates={allStates}
            currentState={switchState}
            mode='white'
            styleRoot={{ marginHorizontal: 18 }}
            styleActiveStateText={styles.text}
            styleInactiveStateText={styles.text}
            activePositionManual={scrollPos}
            changeState={(s: string) => {
              scrollTo(s, true)
            }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#191A19',
    padding: 18,
    height: '100%',
  },
  container: {
    paddingTop: 45,
    height: '90%',
    justifyContent: 'center',
  },
  text: { fontFamily: 'SFProRounded-Bold' },
  stateContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: screenWidth,
    paddingBottom: 5,
    height: 200,
  },
  imgContainer: {
    flex: 1,
    marginHorizontal: 50,
  },
})
