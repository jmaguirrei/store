let currentRegisterNumber = 1000;export function registerComponent(Store) {  return componentDef => {    // if (componentDef.id) return componentDef.id;    currentRegisterNumber++;    Store.objects.components[currentRegisterNumber] = {      definition: componentDef,      instances: {},    };    return currentRegisterNumber;  };}