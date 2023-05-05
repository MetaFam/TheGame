import { CONFIG } from '../config';

export const LIMIT = 5;
export const URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${LIMIT}&playlistId=UU6gdZ6Q7Fwfvn-Uu4QKDyhg&key=${CONFIG.googleDataAPIKey}`;
