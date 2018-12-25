
// import { resolveArgs } from './resolveArgs';
import { processStep } from './processStep';

export function processor(Store) {

  return steps => {

    // Promise build
    const promises = steps.map(step => {

      return previousArgs => {
        // const args = resolveArgs(step.args, prevArgs);
        // processStep(Store, step, args);
        return processStep(Store, step, previousArgs);
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
          console.log('Error in Promise chain execution', e);
          proceed = false;
        });
    }, Promise.resolve({}));

  };

}
