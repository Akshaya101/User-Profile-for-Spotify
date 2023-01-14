import React, { useEffect, useState } from 'react'
import { getUser, createPlaylist } from '../../spotify'
import { catchErrors } from '../../utils'
import AddTracksToPlaylist from './AddTracksToPlaylist'
import Loading from './Loading'
import { addTracksToPlaylist } from '../../spotify'

const CreatePlaylist = ({ userID, username, tracks, source }) => {
    const [create, setCreate] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await createPlaylist(userID, username)
            setCreate(data)
        }
        catchErrors(fetchData())
    }, [])
    return (
        <>
            {create && console.log(create.id)}
            {create && <AddTracksToPlaylist playlistId={create.id} tracks={tracks} source={source} />}
            {/* {true && <AddTracksToPlaylist playlistId="48DyDMvQSlqx9FuqbIreoe" tracks={tracks} />} */}
        </>
    )
}

export default CreatePlaylist

/**
 * Add Tracks to a Playlist
 * playlist uri = create.uri
 * playlistID = create.id
*/