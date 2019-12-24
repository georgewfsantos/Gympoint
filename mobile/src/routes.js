import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Sign from '~/pages/Sign';

export default createAppContainer(
  createSwitchNavigator({
    Sign,
  }),
);
