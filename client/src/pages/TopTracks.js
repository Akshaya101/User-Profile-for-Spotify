import React, { useEffect, useState } from 'react'
import { getTopTracksLong, getTopTracksMedium, getTopTracksShort } from '../spotify'
import { catchErrors } from '../utils'
import styles from '../styles'
import Loading from './Components/Loading'
import SaveToSpotify from './Components/SaveToSpotify'

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

const DisplayTracks = ({ topTracks }) => {
    return (
        <>
            {
                topTracks.items.map((track) => {
                    let artistName = getName(track.artists)
                    // console.log(track)
                    return (
                        <div key={track.uri}>
                            <a href={track.external_urls.spotify} target='_blank'>
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
                        </div>
                    )
                })
            }
        </>
    )
}

const TopTracks = () => {
    const [topTracks, setTopTracks] = useState(null)
    const [activeRange, setActiveRange] = useState('long');

    const apiCalls = {
        long: getTopTracksLong(),
        medium: getTopTracksMedium(),
        short: getTopTracksShort(),
    };
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getTopTracksLong();
            setTopTracks(data);
        };
        catchErrors(fetchData());
    }, []);

    const changeRange = async range => {
        const { data } = await apiCalls[range];
        setTopTracks(data);
        setActiveRange(range);
    };

    const setRangeData = range => catchErrors(changeRange(range));
    return (
        <>
            {/* <div className={styles.logout}>
                <SaveToSpotify tracks={topTracks} source="TopTracks" />
            </div> */}
            <div className={styles.contentPageContainer}>
                <div className={styles.subPageContainer}>
                    <span className={styles.subPageHeading}>Top Tracks</span>
                    <div className={styles.links}>
                        {
                            activeRange === 'long' ? <button className='border-white border-b-2 mt-2 ml-2 mr-2' isActive={activeRange === 'long'} onClick={() => setRangeData('long')}>
                                <span className='text-white'>All Time</span>
                            </button> : <button className={styles.linkButtons} isActive={activeRange === 'long'} onClick={() => setRangeData('long')}>
                                <span>All Time</span>
                            </button>
                        }
                        {/* <button className={styles.linkButtons} isActive={activeRange === 'long'} onClick={() => setRangeData('long')}>
                        {activeRange === 'long' ? <span className='border-white border-b-2 text-white'>All Time</span> : <span>All Time</span>}
                    </button> */}
                        <button className={styles.linkButtons} isActive={activeRange === 'medium'} onClick={() => setRangeData('medium')}>
                            <span>Last 6 Months</span>
                        </button>
                        <button className={styles.linkButtons} isActive={activeRange === 'short'} onClick={() => setRangeData('short')}>
                            <span>Last 4 Weeks</span>
                        </button>
                    </div>
                    <SaveToSpotify tracks={topTracks} source="TopTracks" />
                </div>
                {
                    topTracks ? (
                        <>
                            <div className='mt-6'>
                                <DisplayTracks topTracks={topTracks} />
                            </div>
                        </>
                    ) : <Loading />
                }
            </div>
        </>
    )
}

export default TopTracks

/**
 * tracks.items[0].name = name of song
 * tracks.items[0].external_url = link to the track on spotify
 * tracks.items[0].artists = an array of artist names
 * tracks.items[0].artists.name = name of the artist
 * tracks.items[0].artists.external_url.spotify = opens the artist on spotify
 * tracks.items[0].album.images (640, 300, 64)[].url = image of track
*/

// { id, external_urls, images, name, uri }