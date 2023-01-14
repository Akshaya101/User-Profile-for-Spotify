import React, { useState, useEffect } from 'react'
import { addTracksToPlaylist } from '../../spotify'
import { catchErrors } from '../../utils'

//removing duplicates from the array

const getTracksURI = (tracks, source) => {
    const arr = []
    switch (source) {
        case "RecentlyPlayed":
            tracks.items.map(track => {
                if (!arr.includes(track.track.uri)) {
                    arr.push(track.track.uri)
                }
                // arr.push(track.track.uri)
            })
            break;
        case "TopTracks":
            tracks.items.map(track => {
                if (!arr.includes(track.uri)) {
                    arr.push(track.uri)
                }
                // arr.push(track.track.uri)
            })
            break;
    }
    // tracks.items.map(track => {
    //     if (!arr.includes(track.track.uri)) {
    //         arr.push(track.track.uri)
    //     }
    //     // arr.push(track.track.uri)
    // })
    return arr.toString()
}

const AddTracksToPlaylist = ({ playlistId, tracks, source }) => {
    const [addTracks, setAddTracks] = useState(null)
    const tracksURI = getTracksURI(tracks, source)
    console.log(tracks)
    console.log(playlistId)
    console.log(tracksURI)
    console.log(source)
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await addTracksToPlaylist(playlistId, tracksURI)
            setAddTracks(data)
        }
        catchErrors(fetchData())
    }, [])
}

export default AddTracksToPlaylist