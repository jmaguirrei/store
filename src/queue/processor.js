
import { resolveArgs } from './resolveArgs';
import { processStep } from './processStep';

export function processor(Store) {

  return ({ steps, onError }) => {

    // Promise build
    const promises = steps.map(step => {

      return prevArgs => {
        const args = resolveArgs(step.args, prevArgs);
        console.log("args", args);
        processStep(Store, step, args);
      };

    });

    // Promise execution
    let proceed = true;

    promises.reduce((p, fn) => {
      return p
        .then(res => {
          if (proceed) return fn(res);
        })
        .catch(e => {
          onError(e);
          proceed = false;
        });
    }, Promise.resolve({}));

  };

}
