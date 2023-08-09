export default function makeWebSocket(gameID: string): WebSocket {
    return new WebSocket(`ws://${process.env.REACT_APP_BASE_URL}/api/game/${gameID}`);
}