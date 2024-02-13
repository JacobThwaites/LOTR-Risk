export default function makeWebSocket(gameID: string): WebSocket {
    // return new WebSocket(`ws://${process.env.REACT_APP_WEBSOCKETS_URL}/game_event/${gameID}`);
    return new WebSocket(`ws://localhost:8000/game_event/${gameID}/`);
}