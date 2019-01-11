import { connectStoreToServer } from '../lifecycle/connectStoreToServer';export function startApp(Store) {  return ({ appData, routes }) => {    const {      currentPage,      query,      baseUrl,      baseFolder,      httpPort,      socketPort,      isProduction,      useServiceWorker,    } = appData;    const siteUrl = isProduction      ? `https://${baseUrl}/${baseFolder}`      : `http://${baseUrl}:${httpPort}`;    const socketUrl = !socketPort ? null : isProduction      ? `wss://${baseUrl}/${baseFolder}`      : `http://${baseUrl}:${socketPort}`;/* ------------------------------------------------------------------------------------------------  Register Service Worker------------------------------------------------------------------------------------------------ */    if (useServiceWorker && 'serviceWorker' in window.navigator) {      window.navigator.serviceWorker      .register('./sw.js', { scope: '/' })      .then(registration => {        console.log('Service Worker registration OK', registration);      })      .catch(error => {        console.log('Service Worker registration FAILED', error);      });    }/* ------------------------------------------------------------------------------------------------  First Render && Connect to Server data------------------------------------------------------------------------------------------------ */    const Container = routes['_root_'];    if (currentPage) Store.methods.set({ currentPage });    if (query.user) Store.methods.set({ user_id: query.user });    connectStoreToServer(Store, { user_id: query.user, siteUrl, socketUrl })    .then(() => {      Store.methods.render(Container, { currentPage }, 'root');      Store.methods.emit('MOUNTED');    });  };}