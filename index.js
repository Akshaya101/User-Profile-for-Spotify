require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const history = require('connect-history-api-fallback')
const app = express();
const querystring = require('querystring')
const axios = require('axios');
const path = require('path')

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
let REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:8888/callback';
let FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:3000';
const PORT = process.env.PORT || 8888

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const stateKey = 'spotify_auth_state';

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, './client/build')));

app
    .use(express.static(path.resolve(__dirname, '../client/build')))
    .use(cors())
    .use(cookieParser())
    .use(
        history({
            verbose: true,
            rewrites: [
                { from: /\/login/, to: '/login' },
                { from: /\/callback/, to: '/callback' },
                { from: /\/refresh_token/, to: '/refresh_token' },
            ],
        }),
    )
    .use(express.static(path.resolve(__dirname, '../client/build')));


app.get('/login', (req, res) => {
    //used to generate random cookie
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = 'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope,
    });

    // console.log(queryParams);

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/callback', (req, res) => {
    const code = req.query.code || null;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
        .then(response => {
            if (response.status === 200) {

                const { access_token, refresh_token, expires_in } = response.data;

                const queryparams = querystring.stringify({
                    access_token,
                    refresh_token,
                    expires_in
                })

                //redirect to react app
                res.redirect(`${FRONTEND_URI}/?${queryparams}`)
                //pass the query parameters

            } else {
                res.redirect(`/?${querystring.stringify({
                    error: 'invalid_token'
                })}`)
            }
        })
        .catch(error => {
            res.send(error);
        });
});

app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error);
        });
});

app.get('/', (req, res) => {
    const data = {
        name: 'Harry',
        age: 28
    }
    res.json(data)
})

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Server listenin of port ' + PORT)
})