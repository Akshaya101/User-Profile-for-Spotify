import React, { useState, useEffect } from 'react'
import styles from '../styles'
import { catchErrors } from '../utils'
import { getTopArtistsLong, getTopArtistsMedium, getTopArtistsShort } from '../spotify'
import Loading from './Components/Loading'
import { Link } from 'react-router-dom'

const TopArtists = () => {
    const [topArtists, setTopArtists] = useState(null);
    const [activeRange, setActiveRange] = useState('long');

    const apiCalls = {
        long: getTopArtistsLong(),
        medium: getTopArtistsMedium(),
        short: getTopArtistsShort(),
    };

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getTopArtistsLong();
            setTopArtists(data);
        };
        catchErrors(fetchData());
    }, []);

    const changeRange = async range => {
        const { data } = await apiCalls[range];
        setTopArtists(data);
        setActiveRange(range);
    };

    const setRangeData = range => catchErrors(changeRange(range));

    return (
        <div className={styles.contentPageContainer}>
            <div className={styles.subPageContainer}>
                <span className={styles.subPageHeading}>Top Artists</span>
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
            </div>
            {
                topArtists ? (
                    <div className={styles.artistContainer}>
                        {
                            topArtists.items.map(({ id, external_urls, images, name, uri }) => (
                                <div key={uri} className={styles.contentContainer}>
                                    {/* {console.log(topArtists.items[0])} */}
                                    <a href={external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                        {images.length && <div className='filter hover:opacity-[0.5]'>
                                            <img src={images[0].url} className={`${styles.artistImages}`} alt="Artist" />
                                        </div>}
                                        {/* {images.length == 0 && <Letter letter={name[0]} />} */}
                                        <div className={styles.nameContainer}>
                                            <span className={styles.individualArtistName}>{name}</span>
                                        </div>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <Loading className='grid-cols-none' />
                )
            }
        </div>
    );
};

export default TopArtists;