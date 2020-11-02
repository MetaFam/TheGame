import { get, post } from 'superagent';
export const API_URL = 'http://localhost:4000';

export async function LoadMap(account: string, url: string | string[]) {
    return async function(dispatch: any) {
        try {
            dispatch({ type: 'LOADING', value: true });

            const response = await get(`${API_URL}/actions/metamaps/data?name=${account}_${url}`);

            const payload = response.body.data;
            const data = payload.items;
            const counter = payload.counter;

            console.log('counter', counter);

            dispatch({ type: 'LOADED_3BOX_URL', data: data ? data : [], counter: counter ? Number(counter) : 0 });
            dispatch({ type: 'LOADING', value: false });
        } catch (error) {
            console.error(error);
            dispatch({ type: 'LOADED_3BOX_URL', data: [], counter: 0 });
            dispatch({ type: 'LOADING', value: false });
        }
    }
}

export async function SaveMap(account: string, url: string, data: any, counter: number) {
    return async function(dispatch: any) {
        try {
            dispatch({ type: 'LOADING', value: true });

            await post(`${API_URL}/actions/metamaps/data?name=${account}_${url}`)
                .send({ data: { items: data, counter } });

            dispatch({ type: 'SAVED_3BOX_URL' });
        } catch (error) {
            console.error(error);
            dispatch({ type: 'SAVED_3BOX_URL_ERROR' });
        }

        dispatch({ type: 'LOADING', value: false });
    }
}