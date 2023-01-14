import { useEffect, useState } from 'react'
import React from 'react'
import { getTopArtistsLong, getTopArtistsShort, getTopTracksLong, getTopTracksShort, logout } from '../spotify';
import { getUserInfo, getRecentlyPlayedTracks, getFollowing, getPlaylists } from '../spotify';
import { catchErrors } from '../utils'
import styles from '../styles';
import TopTracks from './TopTracks';
import TopArtistsMonth from './Components/TopArtistsMonth';
import Error from './Error';
import Loading from './Components/Loading';
import TopTracksMonth from './Components/TopTracksMonth';

const Letter = ({ letter }) => {
    return (
        <div className=''>
            <p className={`${styles.backgroundLetter} md:w-44 md:h-44 w-32 h-32 border-0 rounded-full text-center m-auto py-8 md:py-14`}>{letter}</p>
        </div>
    )
}

const Content = ({ number, description }) => {
    return (
        <div className={styles.descriptionData}>
            <p className={styles.number}>{number}</p>
            <label className={styles.description}>{description}</label>
        </div>
    )
}

const Home = () => {
    const [profile, setProfile] = useState(null)
    const [artists, setArtists] = useState(null)
    const [error, setError] = useState(null)
    const [tracks, setTracks] = useState(null)
    const [following, setFollowing] = useState(null)
    const [playlists, setPlaylists] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const { user } = await getUserInfo()
            const { data: followingData } = await getFollowing()
            const { data: trackData } = await getTopTracksShort()
            const { data: artistData } = await getTopArtistsShort()
            const { data: playlistData } = await getPlaylists()
            setProfile(user)
            setFollowing(followingData)
            setTracks(trackData)
            setArtists(artistData)
            setPlaylists(playlistData)
        }
        catchErrors(fetchData())

    }, [])
    return (
        <div className={styles.mainContainer}>
            <div className={styles.logout}>
                <button className={styles.whiteButton} onClick={logout}>Logout</button>
            </div>
            <div className={styles.pageContainer}>
                {console.log(profile)}
                {
                    profile && (
                        <>
                            <div className={styles.topSection}>
                                <a href={profile.external_urls.spotify} target='_blank'>
                                    {
                                        profile.images.length ? profile.images[0].url && (
                                            <img src={profile.images[0].url} className={styles.backgroundImage} alt='Avatar' />
                                        ) : <Letter letter={profile.display_name[0]} />
                                    }
                                </a>
                                <h1 className={styles.name}>{profile.display_name}</h1>
                                <div className={styles.descriptionContainer}>
                                    <Content number={profile.followers.total} description="Followers" />
                                    {
                                        playlists && <Content number={playlists.total} description="Playlists" />
                                    }
                                    {
                                        following && <Content number={following.artists.total} description="Following" />
                                    }
                                </div>
                            </div>
                        </>
                    )
                }
                <div>
                    {/*error is being generated here because the value of artists is being sent directly to the component, and when we are trying to operate iteratively on that component, it is showing an error because the props is null until the promise is resolve so we have to write an error handling case here*/}
                    {
                        artists ? (
                            <div className={styles.dataSection}>
                                {console.log(artists.total)}
                                <TopArtistsMonth artists={artists} />
                                <TopTracksMonth len={artists.total} tracks={tracks} />
                            </div>
                        ) : <Loading />
                    }
                </div>
            </div>
        </div>
    )
}

export default Home

