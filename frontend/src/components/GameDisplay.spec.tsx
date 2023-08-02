import '@testing-library/jest-dom'
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react' 
import GameDisplay from './GameDisplay';
import { useParams, useLocation } from 'react-router';
import { addUserIDToGame } from '../gameLogic/Controllers/requests';
import makeWebSocketHandler from '../utils/makeWebSocketHandler';

jest.mock('react-router');
jest.mock('../gameLogic/Controllers/requests');
jest.mock('../utils/makeWebSocketHandler', () => {
    return (gameID: string, webSocket: any) => {
        return {
            sendMessage() {
                console.log('sending message');
            },

            socket: {
                close() {
                    console.log('inner close')
                }
            },

            sendPlayerJoinedNotification() {
                console.log('player asdfasdf');
            },
        }
    }
});

it('renders game not found page if invalid gameID is provided', async () => {
    const mockGameID = '1234';
    (useParams as jest.Mock).mockReturnValue({gameID: mockGameID});
    (useLocation as jest.Mock).mockReturnValue({location: {state: {gameType: 'local'}}});
    const mockResponse = {
        ok: false
    };
    (addUserIDToGame as jest.Mock).mockResolvedValueOnce(mockResponse);
    
    let container: any;
    await act(() => {
        container = render(<GameDisplay />).container;
    })

    const notFoundScreen = await screen.findByTestId('not-found');
    expect(notFoundScreen).toBeTruthy();
    expect(container).toMatchSnapshot();
});

it('renders waiting for players page after online game load', async () => {
    const mockGameID = '1234';
    (useParams as jest.Mock).mockReturnValue({gameID: mockGameID});
    (useLocation as jest.Mock).mockReturnValue({location: {state: {gameType: 'local'}}});
    const mockPlayer = {colour: 'Black', reinforcements: 2, areas:[]};
    const mockResponse = {
        ok: true, json: async () => ({ data: { uuid: mockGameID, players: [mockPlayer], maxTurns: 1 } }),
    };
    (addUserIDToGame as jest.Mock).mockResolvedValueOnce(mockResponse);
    
    let container: any;
    await act(() => {
        container = render(<GameDisplay />).container;
    })
    
    expect(addUserIDToGame).toHaveBeenCalledWith(mockGameID);
    const waitingForPlayersScreen = await screen.findByTestId('waiting-for-players-screen');
    expect(waitingForPlayersScreen).toBeTruthy();
    expect(container).toMatchSnapshot();
});

it('renders GameDisplay after all players are joined', async () => {
    const mockGameID = '1234';
    (useParams as jest.Mock).mockReturnValue({gameID: mockGameID});
    (useLocation as jest.Mock).mockReturnValue({location: {state: {gameType: 'local'}}});

    const mockPlayer = {colour: 'Black', reinforcements: 2, areas:[]};
    const mockResponse = {
        ok: true, json: async () => ({ data: { uuid: mockGameID, players: [mockPlayer], maxTurns: 1 } }),
    };
    (addUserIDToGame as jest.Mock).mockResolvedValueOnce(mockResponse);
    
    let rerender: any;
    await act(() => {
        const renderResponse = render(<GameDisplay />);
        rerender = renderResponse.rerender;
    })
    
    expect(addUserIDToGame).toHaveBeenCalledWith(mockGameID);
    rerender(<GameDisplay />);
    const gameDisplay = await screen.findByTestId('game-display');
    expect(gameDisplay).toBeTruthy();
});

it('renders game details from fetch response', async () => {
    // TODO: implement
    expect(true).toBeTruthy();
});
