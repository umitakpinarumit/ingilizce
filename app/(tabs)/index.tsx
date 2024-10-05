import { AppRegistry } from 'react-native';
import App from '../../App';
const appName = require('../../app.json').expo.name;

AppRegistry.registerComponent(appName, () => App);
