/**
 * @format
 */

import { AppRegistry } from 'react-native'

import { name as appName } from './app.json'
import {Example1, Example2} from './src/App'

AppRegistry.registerComponent(appName, () => Example1)
