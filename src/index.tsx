import * as React from 'react';
import {
  Animated,
  Easing,
  NativeModules,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const getPosition = (
  animContainerWidth: number,
  allStates: string[],
  currentState: string,
  mode: 'white' | 'default'
) => {
  const stepWidth = animContainerWidth / allStates.length;
  const currentStateIndex = allStates.findIndex((s) => currentState === s);
  let pos = currentStateIndex * stepWidth;
  if (mode === 'white') {
    if (currentStateIndex === 0) {
      pos += 3;
    } else if (currentStateIndex === allStates.length - 1) {
      pos -= 3;
    }
  }
  return pos;
};

interface TProps {
  allStates: string[];
  currentState: string;
  changeState: (s: string) => void;
  mode?: 'default' | 'white';
  disabled?: boolean;
  activePositionManual?: number;
  animationConfig?: Animated.TimingAnimationConfig;
  renderStateText?: (s: string) => string;
  styleRoot?: StyleProp<ViewStyle>;
  styleAllStatesContainer?: StyleProp<ViewStyle>;
  styleActiveState?: StyleProp<ViewStyle>;
  styleActiveStateText?: StyleProp<TextStyle>;
  styleActiveStateGradient?: [string, string];
  styleInactiveState?: StyleProp<ViewStyle>;
  styleInactiveStateText?: StyleProp<TextStyle>;
}

export const MultiSwitch: React.FC<TProps> = ({
  allStates,
  currentState,
  changeState,
  mode = 'default',
  disabled = false,
  activePositionManual,
  animationConfig = {
    duration: 300,
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    useNativeDriver: false,
  },
  renderStateText = (s: string) => s,
  styleRoot = {},
  styleAllStatesContainer = {},
  styleActiveState = {},
  styleActiveStateText = {},
  styleActiveStateGradient = ['#81cf34', '#619c27'],
  styleInactiveState = {},
  styleInactiveStateText = {},
}) => {
  const [animContainerWidth, setAnimContainerWidth] = React.useState<any>();
  const [activePosition, setActivePosition] = React.useState<Animated.Value>();

  // set initial active position, after anim container width avaliable
  React.useEffect(() => {
    if (animContainerWidth) {
      setActivePosition(
        new Animated.Value(
          getPosition(animContainerWidth, allStates, currentState, mode)
        )
      );
    }
  }, [animContainerWidth]);

  const runAnimation = React.useCallback(
    (activePositionParam, currentStateParam) => {
      if (!activePositionParam) {
        return;
      }
      const toValue = getPosition(
        animContainerWidth,
        allStates,
        currentStateParam,
        mode
      );
      Animated.timing(activePositionParam!, {
        ...animationConfig,
        toValue,
      }).start();
    },
    [animContainerWidth, allStates]
  );

  React.useEffect(() => {
    if (activePosition && activePositionManual) {
      activePosition.setValue(activePositionManual / 3.4);
    }
  }, [activePosition, activePositionManual]);

  React.useEffect(() => {
    if (animContainerWidth && activePosition) {
      runAnimation(activePosition, currentState);
    }
  }, [animContainerWidth, currentState, activePosition, allStates]);

  const activeTextColor = mode === 'white' ? '#171f0a' : '#fff';

  return (
    <View style={[styles.container, styleRoot]}>
      <View style={{ flex: 1 }}>
        <View
          style={[
            styles.wrap,
            mode === 'white' ? styles.wrapPadding : {},
            styleAllStatesContainer,
          ]}
          onLayout={(e) => setAnimContainerWidth(e.nativeEvent.layout.width)}
        >
          {activePosition && (
            <Animated.View
              style={[
                styles.activeBox,
                mode === 'white' ? styles.shadow : {},
                { width: `${100 / allStates.length}%` },
                { left: activePosition },
                styleActiveState,
              ]}
            >
              {mode === 'default' && (
                <LinearGradient
                  colors={styleActiveStateGradient}
                  style={[styles.fullSize, { borderRadius: 7 }]}
                />
              )}
            </Animated.View>
          )}
          {allStates.map((state, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.inactiveState, styleInactiveState]}
              onPress={() => changeState(state)}
              disabled={disabled || state === currentState}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.stateText,
                  {
                    color: currentState === state ? activeTextColor : '#8b8f84',
                  },
                  currentState === state
                    ? styleActiveStateText
                    : styleInactiveStateText,
                ]}
              >
                {renderStateText(state)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    height: 44,
    backgroundColor: 'white',
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  wrap: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 7,
    backgroundColor: '#eee',
  },
  wrapPadding: {
    paddingTop: 3,
    paddingBottom: 3,
  },
  inactiveState: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  stateText: {
    lineHeight: 15,
    fontSize: 15,
    letterSpacing: -0.24,
    textAlign: 'center',
  },
  activeBox: {
    backgroundColor: 'white',
    position: 'absolute',
    height: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  fullSize: {
    width: '100%',
    height: '100%',
  },
});

export default NativeModules.RNMultiSwitchSelectorModule;
