import '@testing-library/jest-dom'
import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import Risk from './Risk';
import { saveGame } from "../gameLogic/Controllers/requests";
import { MemoryRouter } from 'react-router-dom'; 

jest.mock('../gameLogic/Controllers/requests');

it('renders Risk correctly', async () => {
    const { container } = render(<Risk />);
    expect(container).toMatchSnapshot();
});

it('handles game setup', async () => {
    const mockGameID = 'asdf';
    const numberOfPlayers = 3;
    const mockResponse = {
        json: async () => ({ data: { uuid: mockGameID } }),
      };
      (saveGame as jest.Mock).mockResolvedValueOnce(mockResponse);

    jest.mock('react-router-dom', () => {
        return {
          Redirect: jest.fn(({ to }) => `Redirected to ${to}`),
        };
    });

    const { rerender, getByText } = render(
        <MemoryRouter>
            <Risk />
        </MemoryRouter>
    );
    
    const localGameTypeButton = await screen.findByTestId('game-type-selector--option_local');
    fireEvent.click(localGameTypeButton);
    
    const submitButton = await screen.findByTestId('game-type-selector--button');
    fireEvent.click(submitButton);
    
    rerender(
        <MemoryRouter>
            <Risk />
        </MemoryRouter>
    );
    
    const numberOfPlayersSelector = await screen.findByTestId('number-of-players--selector');
    fireEvent.change(numberOfPlayersSelector, { target: { value: numberOfPlayers} });
    
    const submitNumberOfPlayersButton = await screen.findByTestId('number-of-players--button');
    fireEvent.click(submitNumberOfPlayersButton);
    
    await act(async () => {
        // Verify that "Loading..." is displayed before the data is fetched
        expect(getByText('Loading...')).toBeInTheDocument();
    
        // Wait for the data to be fetched and state update to happen
        await waitFor(() => expect(saveGame).toHaveBeenCalledTimes(1));
    
        // Verify that the saveGame function was called with the correct argument
        expect(saveGame).toHaveBeenCalledWith(numberOfPlayers);

        // TODO: test that it redirects correctly
        
    })
});