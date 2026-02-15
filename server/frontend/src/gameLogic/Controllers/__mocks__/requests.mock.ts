export const saveGame = jest.fn().mockImplementation(async (numPlayers: number) => {
    try {
        const body = {
            numPlayers: numPlayers,
            userID: 'mocked-user-id'
        };

        return Promise.resolve({
            json: () => Promise.resolve({data: {uuid: '1234'}}),
        });
    } catch (err) {
        console.error(err);
        return;
    }
});