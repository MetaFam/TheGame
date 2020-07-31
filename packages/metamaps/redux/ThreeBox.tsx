declare const window: any;

import Box from '3box';

export async function Load3BoxUrl(account: string, url: string) {
    return async function(dispatch: any) {
        try {
            const box = await Box.openBox(account, window.ethereum);
            await box.syncDone;
            const space = await box.openSpace(url);
            const data = await space.public.get('items');

            console.log(data);

            dispatch({ type: 'LOADED_3BOX_URL', data: data ? JSON.parse(data) : [] });
        } catch (error) {
            console.error(error);
            dispatch({ type: 'LOADED_3BOX_URL', data: [] });
        }
    }
}

export async function Save3BoxUrl(account: string, url: string, data: any) {
    return async function(dispatch: any) {
        try {
            const box = await Box.openBox(account, window.ethereum);
            await box.syncDone;
            const space = await box.openSpace(url);
            await space.public.set('items', JSON.stringify(data));

            dispatch({ type: 'SAVED_3BOX_URL' });
        } catch (error) {
            console.error(error);
            dispatch({ type: 'SAVED_3BOX_URL_ERROR' });
        }
    }
}