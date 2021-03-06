import axios from 'axios';
import { getHashParams } from '../utils';

// TOKENS ******************************************************************************************
const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds

const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalAccessToken = token => {
  setTokenTimestamp();
  window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

// Refresh the token
const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  // If token has expired
  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn('Access token has expired, refreshing...');
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();
  const localRefreshToken = getLocalRefreshToken();

  // If there is no REFRESH token in local storage, set it as `refresh_token` from params
  if (!localRefreshToken || localRefreshToken === 'undefined') {
    setLocalRefreshToken(refresh_token);
  }

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if (!localAccessToken || localAccessToken === 'undefined') {
    setLocalAccessToken(access_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

// API Calls

export const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

const getTrackIds = (tracks) => {
  return tracks.map(track => track.id).join();
}

const getUser = () => {
  return fetch('https://api.spotify.com/v1/me', { headers })
}

export const createPlaylist = async function (){
  const data = await getUser();
  const user = await data.json();
  const response = await fetch (`https://api.spotify.com/v1/users/${user.id}/playlists`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      name: 'Playlistify Playlist',
      description: 'Playlist created by Playlistify'
    })
  })
  return response
}

const getTrackUris = (tracks) => {
  return tracks.map(track => track.uri);
}

export const addTracksToPlaylist = async function (id, tracks){
  const trackUris = getTrackUris(tracks);
  fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      uris: trackUris
    })
  })
}

export const getTopTracksMedium = () => {
    return fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', { headers })
}

export const getRecommendations = (tracks) => {
    const shuffle = tracks.sort(() => 0.5 - Math.random());
    const seed_tracks = getTrackIds(shuffle.slice(0,5));
    const seed_artists = '';
    const seed_genres = '';
    return fetch (`https://api.spotify.com/v1/recommendations?seed_tracks=${seed_tracks}&seed_artists=${seed_artists}&seed_genres=${seed_genres}`, { headers });
}