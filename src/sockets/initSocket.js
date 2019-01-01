

export function initSocket({ socketUrl, user_id, onMessage }) {

  if (!socketUrl) {
    console.log('SocketUrl not defined');
    return () => undefined;
  }

  const wsSupport = 'WebSocket' in window;
  if (!wsSupport) {
    console.log('WebSocket not supported');
    return () => undefined;
  }

  const ws = new window.WebSocket(socketUrl);

  const sendJSON = obj => ws.send(JSON.stringify(obj));

  ws.onopen = () => {
    console.log('WebSocket opened');
    // tell the server user_id is connected
    if (user_id) sendJSON({ user_id, isInitial: true });
  };

  ws.onclose = x => console.log('WebSocket closed', x);
  ws.onmessage = obj => {
    onMessage(JSON.parse(obj.data));
  };


  return sendJSON;

}

