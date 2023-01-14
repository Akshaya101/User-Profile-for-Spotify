import React from 'react'
import styles from '../../styles'
import Home from '../Home'
import Error from '../Error'
import { v4 as uuidv4 } from 'uuid';

const Track = ({ tracks, len }) => {
    const getName = (arr) => {
        let names = []
        arr.map(a => {
            let { name } = a
            names.push(name)
        })
        return names.join(', ')
    }
    const time = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    return (
        tracks.items.slice(0, len).map((track) => {
            let artistName = getName(track.artists)
            // console.log(track)
            return (
                <a key={track.id} href={track.external_urls.spotify} target='_blank'>
                    <div className={styles.boxContainer}>
                        <img src={track.album.images[2].url} alt='artist-photo' className={`${styles.boxSq}`} />
                        <div className={styles.details}>
                            <div className={`pl-8 col-start-1 col-end-3 grid grid-rows-2 w-full ${styles.labelSize}`}>
                                <span className={styles.trackName}>{track.name}</span>
                                <span className={styles.artistName}>{artistName}</span>
                            </div>
                            <div className={`${styles.labelSize} ${styles.timeStamp} flex col-end-4 justify-end`}>{time(track.duration_ms)}</div>
                        </div>
                    </div>
                </a>
            )
        })
    )
}

const TopTracksMonth = ({ tracks, len }) => {
    if (tracks == null) {
        setInterval(() => {
            return <Error />
        }, 5000)
    }
    // console.log(len)
    return (
        <>
            <div className={styles.dataContainer}>
                <div className={styles.dataHeading}>
                    <p className={styles.userTitle}>Top tracks of the Month</p>
                    <a href='/top-tracks'><button className={`${styles.whiteButton}`}>See More</button></a>
                </div>
                <Track tracks={tracks} len={len} />
            </div>
        </>
    )
}

export default TopTracksMonth

/**
 * element = tracks.items[0]
 * element.name = name of song
 * element.external_url = link to the track on spotify
 * element.artists = an array of artist names
 * element.artists.name = name of the artist
 * element.artists.external_url.spotify = opens the artist on spotify
 * element.album.images (640, 300, 64)[].url = image of track
*/
