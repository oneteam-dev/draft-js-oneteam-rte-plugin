// @flow

import { KeyBindingUtil } from 'draft-js';

import type { Config } from '../types/Config';

const handleReturnWithCommand = (event: SyntheticKeyboardEvent, config: Config): boolean => {
  const { onReturnWithCommand } = config;
  if (typeof onReturnWithCommand === 'function' && KeyBindingUtil.hasCommandModifier(event)) {
    onReturnWithCommand(event);
    return true;
  }
  return false;
};

export default handleReturnWithCommand;
