import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Routes,
    Link,
    Redirect
} from 'react-router-dom'
import Home from './Home'
import Nav from './Nav'
import styles from '../styles'
import TopArtists from './TopArtists'
import TopTracks from './TopTracks'
import RecentlyPlayed from './RecentlyPlayed'
import Error from './Error'



const Profile = () => {
    return (
        <Router primary={false}>
            <div className={styles.screenContainer}>
                <div className={styles.navContainer}>
                    <Nav />
                </div>
                <div className={styles.mainContainer}>
                    <Switch>
                        <Route path='/top-artists' component={TopArtists}></Route>
                        <Route path='/top-tracks' component={TopTracks}><TopTracks /></Route>
                        <Route path='/recently-played' component={RecentlyPlayed}><RecentlyPlayed /></Route>
                        <Route path='/'><Home /></Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default Profile