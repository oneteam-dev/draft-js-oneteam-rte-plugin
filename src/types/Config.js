// @flow

type AtomicBlockRenderMap = {
  [key: string]: ReactClass<*>
}

export type Config = {
  blockStyleMap?: ?Object,
  maxDepth: number,
  customBlockRendererFn?: ?() => ?Object,
  customAtomicBlockRendererFn?: ?() => ?Object,
  onReturnWithCommand?: ?() => void,
  onPastedFiles?: ?() => void,
  atomicBlockRenderMap: AtomicBlockRenderMap,
  disableWebCardCreation: ?boolean
}
