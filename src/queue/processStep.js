
import { processOptimistic } from './processOptimistic';

export function processStep(Store, step, previousArgs = {}) {

  const {
    method,
    domain,
    args,
    sideEffect,
    optimistic = true,
  } = step(previousArgs);

  // Backend may return something valuable for the next step
  if (domain === '_Backend_') {

    const resolveOptimistic = optimistic
      ? processOptimistic(Store, args)
      : () => undefined;

    return new Promise((resolve, reject) => {
      return Store.methods.callServerMethod(method, args)
        .then(response => {
          const error = response.error;
          const data = response.data;
          resolveOptimistic(!error);
          resolve({
            error,
            data: {
              ...previousArgs.data,
              ...data,
            },
          });
        })
        .catch(err => {
          resolveOptimistic(false);
          reject(err);
        });
    });
  }

  // Store works like simple local State
  if (domain === '_Store_') {
    Store.methods[method](args);
    if (sideEffect) sideEffect();
    return Promise.resolve(previousArgs);
  }

}

