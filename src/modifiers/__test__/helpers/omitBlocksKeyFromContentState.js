const omitBlocksKeyFromContentState = (contentState) => ({
  ...contentState,
  blocks: contentState.blocks.map((b) => (
    Object.keys(b).reduce((ret, k) => (
      k !== 'key' ? { ...ret, [k]: b[k] } : ret
    ), {})
  ))
});

export default omitBlocksKeyFromContentState;
