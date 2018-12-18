

export function resolveArgs(stepArgs = {}, prevArgs = {}) {

  return Object.keys(stepArgs).reduce((acum, key) => {
    const argIsFunction = typeof stepArgs[key] === 'function';
    return {
      ...acum,
      [key]: argIsFunction ? stepArgs[key](prevArgs) : stepArgs[key],
    };
  }, {});

}
