import React from 'react'
import styles from '../../styles'
import Error from '../Error'

const Artist = ({ artists }) => {
    return (
        artists.items.map((artist) => {
            // let key = artist.indexOf(artist)
            //console.log(artist)
            return (
                // <div key={artist.uri} className={styles.boxContainer}>
                //     <img src={artist.images[2].url} alt='artist-photo' className={`${styles.boxImage} ${styles.imgOnHover}`} />
                //     <a href={artist.external_urls.spotify} target='_blank' className={`pl-8 text-title ${styles.labelSize}  hover:underline`}>{artist.name}</a>
                //     <span ></span>
                // </div>
                <a key={artist.uri} href={artist.external_urls.spotify} target='_blank'>
                    <div className={styles.boxContainer}>
                        <img src={artist.images[2].url} alt='artist-photo' className={`${styles.boxImage} hover:bg-site-grey`} />
                        <span className={`pl-8 text-title ${styles.labelSize} hover:underline`}>{artist.name}</span>
                    </div>
                </a>
            )
        })
    )
}
let c = 0;
const TopArtistsMonth = ({ artists }) => {
    if (artists == null) {
        setInterval(() => {
            return <Error />
        }, 5000)
    }
    //console.log(artists)
    return (
        <>
            <div className={styles.dataContainer}>
                <div className={styles.dataHeading}>
                    <p className={styles.userTitle}>Top Artists of the Month</p>
                    <a href='/top-artists'><button className={styles.whiteButton}>See More</button></a>
                </div>
                <Artist artists={artists} />
            </div>
        </>
    )
}

export default TopArtistsMonth

/**
 * tracks.items[0].name = name of song
 * tracks.items[0].external_url = link to the track on spotify
 * tracks.items[0].artists = an array of artist names
 * tracks.items[0].artists.name = name of the artist
 * tracks.items[0].artists.external_url.spotify = opens the artist on spotify
 * tracks.items[0].album.images (640, 300, 64)[].url = image of track
*/

/**
 * data that is received is in the form of an array
 * the data recieved is from data.items
 * array element = data.items[i]
 * element.name = artist name
 * element.images[2].url = image of the artist
 * element.external_urls.spotify = link to artist profile //if you want you can always create a separate page for each artist. RN it is not necessary.
*/