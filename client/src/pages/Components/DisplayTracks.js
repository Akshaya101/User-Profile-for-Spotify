import React from 'react'
import styles from '../../styles'
import { v4 as uuid } from 'uuid'

const time = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
const getName = (arr) => {
    let names = []
    arr.map(a => {
        let { name } = a
        names.push(name)
    })
    return names.join(', ')
}
const DisplayTracks = ({ tracks }) => {
    let keyList = []
    return (
        tracks.items.map(({ track = track.track }) => {
            let artistName = getName(track.artists)
            return (
                <a key={uuid()} href={track.external_urls.spotify} target='_blank'>
                    {
                        !keyList.includes(track.id) &&
                        <div key={track.uri} className={styles.boxContainer}>
                            <div className='hidden'>
                                {keyList.push(track.id)}
                                {/* {console.log(track)} */}
                            </div>
                            <img src={track.album.images[2].url} alt='artist-photo' className={`${styles.boxSq}`} />
                            <div className={styles.details}>
                                <div className={`pl-8 col-start-1 col-end-3 grid grid-rows-2 w-full ${styles.labelSize}`}>
                                    <span className={styles.trackName}>{track.name}</span>
                                    <span className={styles.artistName}>{artistName}</span>
                                </div>
                                <div className={`${styles.labelSize} ${styles.timeStamp} flex col-end-4 justify-end`}>{time(track.duration_ms)}</div>
                            </div>
                        </div>
                    }
                </a>
            )
        }
        )
    )
}

export default DisplayTracks

/**
 * data that is received is in the form of an array
 * the data recieved is from data.items
 * array element = data.items[i]
 * element.name = artist name
 * element.images[2].url = image of the artist
 * element.external_urls.spotify = link to artist profile //if you want you can always create a separate page for each artist. RN it is not necessary.
*/