import '@testing-library/jest-dom'
import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react' 
import GameDisplay from './GameDisplay';
import { useParams, useLocation } from 'react-router';
import { addUserIDToGame } from '../gameLogic/Controllers/requests';

jest.mock('../gameLogic/Controllers/requests');
jest.mock('react-router');

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
    
    expect(addUserIDToGame).toHaveBeenCalledWith(mockGameID);
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
