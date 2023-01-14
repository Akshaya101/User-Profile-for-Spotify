import axios from 'axios'
const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_expire_time',
    timestamp: 'spotify_token_timestamp'
}
const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp)
}
/**
 * Clear out all localStorage items we've set and reload the page
 * @returns {void}
 */
export const logout = () => {
    // Clear all localStorage items
    for (const property in LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }
    // Navigate to homepage
    window.location = window.location.origin;
};
/**
 * Use the refresh token in localStorage to hit the /refresh_token endpoint
 * in our Node app, then update values in localStorage with data from response.
 * @returns {void}
 */
const refreshToken = async () => {
    try {
        // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
        if (!LOCALSTORAGE_VALUES.refreshToken ||
            LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
            (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000
        ) {
            console.error('No refresh token available');
            logout();
        }

        // Use `/refresh_token` endpoint from our Node app
        const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);

        // Update localStorage values
        window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

        // Reload the page for localStorage updates to be reflected
        window.location.reload();

    } catch (e) {
        console.error(e);
    }
};
/**
 * Checks if the amount of time that has elapsed between the timestamp in localStorage
 * and now is greater than the expiration time of 3600 seconds (1 hour).
 * @returns {boolean} Whether or not the access token in localStorage has expired
 */
const hasTokenExpired = () => {
    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
    if (!accessToken || !timestamp) {
        return false;
    }
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed / 1000) > Number(expireTime);
};
/**
 * Handles logic for retrieving the Spotify access token from localStorage
 * or URL query params
 * @returns {string} A Spotify access token
 */
const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };
    const hasError = urlParams.get('error');

    // If there's an error OR the token in localStorage has expired, refresh the token
    if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
        refreshToken();
    }

    // If there is a valid access token in localStorage, use that
    if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
        return LOCALSTORAGE_VALUES.accessToken;
    }

    // If there is a token in the URL query params, user is logging in for the first time
    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
        // Store the query params in localStorage
        for (const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property]);
        }
        // Set timestamp
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
        // Return access token from query params
        return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }

    // We should never get here!
    return false;
};

export const accessToken = getAccessToken()

/**
 * Axios global request headers
 * https://github.com/axios/axios#global-axios-defaults
 */


export const token = getAccessToken()

axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
};

/*
**
 * Get Current User's Profile
    * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 */
export const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers });

/**
 * Get User's Followed Artists
 * https://developer.spotify.com/documentation/web-api/reference/follow/get-followed/
 */
export const getFollowing = () =>
    axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers });

/**
 * Get Current User's Recently Played Tracks
 * https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/
 */
export const getRecentlyPlayed = () =>
    axios.get('https://api.spotify.com/v1/me/player/recently-played', { headers });

/**
 * Get a List of Current User's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/
 */
export const getPlaylists = () => axios.get('https://api.spotify.com/v1/me/playlists', { headers });

/**
 * Get a User's Top Artists
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
export const getTopArtistsShort = () =>
    axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term', {
        headers
    });
export const getTopArtistsMedium = () =>
    axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', {
        headers
    });
export const getTopArtistsLong = () =>
    axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers });

/**
 * Get a User's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
export const getTopTracksShort = () =>
    axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', { headers });
export const getTopTracksMedium = () =>
    axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', {
        headers
    });
export const getTopTracksLong = () =>
    axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers });

/**
 * Get an Artist
 * https://developer.spotify.com/documentation/web-api/reference/artists/get-artist/
 */
export const getArtist = artistId =>
    axios.get(`https://api.spotify.com/v1/artists/${artistId}`, { headers });

/**
 * Follow an Artist
 * https://developer.spotify.com/documentation/web-api/reference/follow/follow-artists-users/
 */
export const followArtist = artistId => {
    const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`;
    return axios({ method: 'put', url, headers });
};

/**
 * Check if Current User Follows Artists
 * https://developer.spotify.com/documentation/web-api/reference/follow/follow-artists-users/
 */
export const doesUserFollowArtist = artistId =>
    axios.get(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`, {
        headers
    });

/**
 * Check if Users Follow a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/follow/follow-artists-users/
 */
export const doesUserFollowPlaylist = (playlistId, userId) =>
    axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${userId}`, {
        headers
    });

/**
 * Create a Playlist (The playlist will be empty until you add tracks)
 * https://developer.spotify.com/documentation/web-api/reference/playlists/create-playlist/
 */
export const createPlaylist = (userId, name) => {
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const data = JSON.stringify({ name });
    return axios({ method: 'post', url, data, headers })
};

/**
 * Add Tracks to a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/
 */
export const addTracksToPlaylist = (playlistId, uris) => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uris}`;
    console.log(url)
    return axios({ method: 'post', url, headers });
};

/**
 * Follow a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/follow/follow-playlist/
 */
export const followPlaylist = playlistId => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers`;
    return axios({ method: 'put', url, headers });
};

/**
 * Get a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/
 */
export const getPlaylist = playlistId =>
    axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { headers });

/**
 * Get a Playlist's Tracks
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlists-tracks/
 */
export const getPlaylistTracks = playlistId =>
    axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { headers });

/**
 * Return a comma separated string of track IDs from the given array of tracks
 */
const getTrackIds = tracks => tracks.map(({ track }) => track.id).join(',');

/**
 * Get Audio Features for Several Tracks
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-audio-features/
 */
export const getAudioFeaturesForTracks = tracks => {
    const ids = getTrackIds(tracks);
    return axios.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, { headers });
};

/**
 * Get Recommendations Based on Seeds
 * https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/
 */
export const getRecommendationsForTracks = tracks => {
    const shuffledTracks = tracks.sort(() => 0.5 - Math.random());
    const seed_tracks = getTrackIds(shuffledTracks.slice(0, 5));
    const seed_artists = '';
    const seed_genres = '';

    return axios.get(
        `https://api.spotify.com/v1/recommendations?seed_tracks=${seed_tracks}&seed_artists=${seed_artists}&seed_genres=${seed_genres}`,
        {
            headers
        },
    );
};

/**
 * Get a Track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/
 */
export const getTrack = trackId =>
    axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, { headers });

/**
 * Get Audio Analysis for a Track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/
 */
export const getTrackAudioAnalysis = trackId =>
    axios.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`, { headers });

/**
 * Get Audio Features for a Track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/
 */
export const getTrackAudioFeatures = trackId =>
    axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, { headers });

export const getUserInfo = () =>
    axios
        .all([getUser(), getFollowing(), getPlaylists(), getTopArtistsLong(), getTopTracksLong()])
        .then(
            axios.spread((user, followedArtists, playlists, topArtists, topTracks) => ({
                user: user.data,
                followedArtists: followedArtists.data,
                playlists: playlists.data,
                topArtists: topArtists.data,
                topTracks: topTracks.data,
            })),
        );

export const getTrackInfo = trackId =>
    axios
        .all([getTrack(trackId), getTrackAudioAnalysis(trackId), getTrackAudioFeatures(trackId)])
        .then(
            axios.spread((track, audioAnalysis, audioFeatures) => ({
                track: track.data,
                audioAnalysis: audioAnalysis.data,
                audioFeatures: audioFeatures.data,
            })),
        );
