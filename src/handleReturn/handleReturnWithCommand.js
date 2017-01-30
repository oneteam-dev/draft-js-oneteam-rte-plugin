// @flow

import { KeyBindingUtil } from 'draft-js';
import isFunction from 'lodash/isFunction';

import type { Config } from '../types/Config';

const handleReturnWithCommand = (event: SyntheticKeyboardEvent, config: Config): boolean => {
  const { onReturnWithCommand } = config;
  if (isFunction(onReturnWithCommand) && KeyBindingUtil.hasCommandModifier(event)) {
    onReturnWithCommand(event);
    return true;
  }
  return false;
};

export default handleReturnWithCommand;
