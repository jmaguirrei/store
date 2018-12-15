
import { processOptimistic } from './processOptimistic';

export function processStep(Store, step, args) {

  const { method } = step;

  // Backend may return something valuable for the next step
  if (step.domain === '_Backend_') {

    const resolveOptimistic = processOptimistic(Store, step.args);

    return new Promise((resolve, reject) => {
      return Store.utils.xhrRequest(method, args)
        .then(response => {
          const error = response.error;
          const data = response.data;
          const returnObject = error ? { error } : { ...data };
          resolveOptimistic(!error);
          resolve(returnObject);
        })
        .catch(err => {
          resolveOptimistic(false);
          reject(err);
        });
    });
  }

  // Store works like simple local State
  if (step.domain === '_Store_') {
    Store.methods[method](args);
    if (step.sideEffect) step.sideEffect();
    return Promise.resolve();
  }

}

