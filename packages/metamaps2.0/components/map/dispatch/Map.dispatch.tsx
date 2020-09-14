import Box from '3box';

declare const window: any;

export async function LoadMap(account: string, url: string | string[]) {
    return async function(dispatch: any) {
        try {
            dispatch({ type: 'LOADING', value: true });

            const box = await Box.openBox(account, window.ethereum);
            const space = await box.openSpace(url);

            const data = await space.public.get('items');
            const counter = await space.public.get('counter');

            dispatch({ type: 'LOADED_3BOX_URL', data: data ? JSON.parse(data) : [], counter: counter ? Number(counter) : 0 });
            dispatch({ type: 'LOADING', value: false });
        } catch (error) {
            console.error(error);
            dispatch({ type: 'LOADED_3BOX_URL', data: [] });
            dispatch({ type: 'LOADING', value: false });
        }
    }
}

export async function SaveMap(account: string, url: string, data: any, counter: number) {
    return async function(dispatch: any) {
        try {
            dispatch({ type: 'LOADING', value: true });

            const box = await Box.openBox(account, window.ethereum);
            const space = await box.openSpace(url);

            await space.public.set('items', JSON.stringify(data));
            await space.public.set('counter', counter.toString());

            dispatch({ type: 'SAVED_3BOX_URL' });
        } catch (error) {
            console.error(error);
            dispatch({ type: 'SAVED_3BOX_URL_ERROR' });
        }

        dispatch({ type: 'LOADING', value: false });
    }
}