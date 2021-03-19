import Box from '3box';

declare const window: Record<string, unknown>;

export async function Load3BoxUrl(account: string, url: string) {
    return async (dispatch: (unknown) => void): Promise<void> => {
        try {
            dispatch({ type: 'LOADING', value: true });

            const box = await Box.openBox(account, window.ethereum);
            await box.syncDone;
            const space = await box.openSpace(url);
            const data = await space.public.get('items');

            dispatch({ type: 'LOADED_3BOX_URL', data: data ? JSON.parse(data) : [] });
            dispatch({ type: 'LOADING', value: false });
        } catch (error) {
            console.error(error); // eslint-disable-line no-console
            dispatch({ type: 'LOADED_3BOX_URL', data: [] });
            dispatch({ type: 'LOADING', value: false });
        }
    }
}

export async function Save3BoxUrl(account: string, url: string, data: unknown) {
    return async (dispatch: (unknown) => void): Promise<void> => {
        try {
            const box = await Box.openBox(account, window.ethereum);
            await box.syncDone;
            const space = await box.openSpace(url);
            await space.public.set('items', JSON.stringify(data));

            dispatch({ type: 'SAVED_3BOX_URL' });
        } catch (error) {
            console.error(error); // eslint-disable-line no-console
            dispatch({ type: 'SAVED_3BOX_URL_ERROR' });
        }
    }
}