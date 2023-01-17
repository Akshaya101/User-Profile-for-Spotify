import React, { useEffect, useState } from 'react'
import { getRecentlyPlayed } from '../spotify'
import { catchErrors } from '../utils'
import styles from '../styles'
import DisplayTracks from './Components/DisplayTracks'
import Loading from './Components/Loading'
import SaveToSpotify from './Components/SaveToSpotify'
import { toast, Toaster } from 'react-hot-toast'


const RecentlyPlayed = () => {
    const [tracks, setTracks] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getRecentlyPlayed()
            setTracks(data)
        }
        catchErrors(fetchData())
    }, [])
    return (
        <div className={styles.contentPageContainer}>
            <div className={styles.subPageContainer}>
                <span className={styles.subPageHeading}>Recently Played</span>
                <div>
                    {tracks && <SaveToSpotify tracks={tracks} source="RecentlyPlayed" />}
                </div>
            </div>
            {
                tracks ? <div className='mt-6'><DisplayTracks tracks={tracks} /></div> : <Loading />
            }
        </div>
    )
}

export default RecentlyPlayed
