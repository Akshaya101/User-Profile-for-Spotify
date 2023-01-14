import React from 'react'
import styles from '../styles'

const LOGIN_URI =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8888/login'
        : 'https://spotify-user-profile.vercel.app/login';

const Login = () => {
    return (
        <div className={styles.box}>
            <div className={styles.contentCenter}>
                <h1 className={`${styles.title} mb-1`}>Spotify User Profile</h1>
                <p className={`text-sm mb-8 text-site-icon`}>Deep dive into your Spotify Profile!</p>
                <a
                    className={styles.greenButton}
                    href={LOGIN_URI}
                >
                    LOG IN TO SPOTIFY
                </a>
            </div>
        </div>
    )
}

export default Login