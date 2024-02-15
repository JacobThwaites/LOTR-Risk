export default function makeWebSocket(gameID: string): WebSocket {
    return new WebSocket(`ws://${process.env.REACT_APP_SERVER_URL}/game_event/${gameID}/`);
}