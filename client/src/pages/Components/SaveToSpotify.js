import React, { useState, useEffect } from 'react'
import { getUser } from '../../spotify'
import CreatePlaylist from './CreatePlaylist'
import styles from '../../styles'
import { catchErrors } from '../../utils'
import toast, { Toaster } from 'react-hot-toast'

const notify = () => toast("Playlist is created!")

const SaveToSpotify = ({ tracks, source }) => {
    const [user, setUser] = useState(null)
    const [click, setClick] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getUser()
            setUser(data)
        }
        catchErrors(fetchData())
    }, [])
    return (
        <div>
            {
                user && (
                    <>
                        <button className={styles.whiteButton} onClick={() => { setClick(true); toast.success('Saved to Spotify!') }}>save to spotify</button>
                    </>
                )
            }
            {
                user && (
                    click && (
                        <CreatePlaylist tracks={tracks} userID={user.id} username={user.display_name} source={source} />
                    )
                )
            }
            <div className='hidden'>
                {
                    click && setInterval(() => {
                        setClick(false);
                    }, 5000)
                }
            </div>
            <Toaster />
        </div>
    )
}

export default SaveToSpotify