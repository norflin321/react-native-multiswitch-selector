<img width="404" alt="Screenshot 2022-02-19 at 06 16 11" src="https://user-images.githubusercontent.com/33498670/154785524-1ae481dc-c03d-4219-a47e-11a4b0629044.png">

<details>
  <summary>Video 1</summary>

  https://user-images.githubusercontent.com/33498670/154785463-2a7fd8f5-a7aa-473c-892e-6fe86ec7ca95.mov
</details>
<details>
  <summary>Video 2</summary>

  https://user-images.githubusercontent.com/33498670/154785433-86e5e46d-b69c-4239-976e-d9c53ae5ebc2.mov
</details>

### Install
```Shell
yarn add react-native-multiswitch-selector
```
**peer dependency:**
```Shell
yarn add react-native-linear-gradient
```

### Usage
```js
import { MultiSwitch } from 'react-native-multiswitch-selector';

export const App = () => {
  const [allStates] = useState(['Father', 'Mother', 'Brother'])
  const [switchState, setSwitchState] = useState(allStates[0])
  return (
    <MultiSwitch
      allStates={allStates}
      currentState={switchState}
      changeState={setSwitchState}
    />
  )
}
```

| Prop                     | Explanation                             | Type                           | Default                | Required |
| ------------------------ | --------------------------------------- | ------------------------------ | ---------------------- | -------- |
| allStates                |                                         | string[]                       |                        | true     |
| currentState             |                                         | string                         |                        | true     |
| changeState              |                                         | (s: string) => void            |                        | true     |
| mode                     |                                         | 'default' or 'white'           | 'default'              | false    |
| disabled                 |                                         | boolean                        | false                  | false    |
| activePositionManual     |                                         | number                         | undefined              | false    |
| animationConfig          |                                         | Animated.TimingAnimationConfig |                        | false    |
| renderStateText          |                                         | (s: string) => string          | (s: string) => s       | false    |
| styleRoot                |                                         | ViewStyle                      | {}                     | false    |
| styleAllStatesContainer  |                                         | ViewStyle                      | {}                     | false    |
| styleActiveState         |                                         | ViewStyle                      | {}                     | false    |
| styleActiveStateText     |                                         | TextStyle                      | {}                     | false    |
| styleActiveStateGradient |                                         | [string, string]               | ['#81cf34', '#619c27'] | false    |
| styleInactiveState       |                                         | ViewStyle                      | {}                     | false    |
| styleInactiveStateText   |                                         | TextStyle                      | {}                     | false    |

[Examples from videos](https://github.com/norflin321/react-native-multiswitch-selector/blob/main/example/src/App.tsx)
