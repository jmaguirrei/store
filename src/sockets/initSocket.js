

export function initSocket(url, { user_id, onMessage }) {

  const wsSupport = 'WebSocket' in window;
  if (!wsSupport) return console.log('WebSocket not supported');

  const ws = new window.WebSocket(url);

  const sendJSON = obj => ws.send(JSON.stringify(obj));

  ws.onopen = () => {
    console.log('WebSocket opened');
    // tell the server user_id is connected
    sendJSON({ user_id, isInitial: true });
  };

  ws.onclose = x => console.log('WebSocket closed', x);
  ws.onmessage = obj => {
    onMessage(JSON.parse(obj.data));
  };


  return {
    sendJSON,
  };

}

