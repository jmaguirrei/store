export function alertOff(Store) {  return ({ _id }) => {    const findAlert = Store.objects.alerts.find(item => item._id === _id);    if (findAlert) {      findAlert.isVisible = false;      // Maybe later we are going to notify only the exact component using alerts      Store.methods.notify(null);    }  };}