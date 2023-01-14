import React from 'react'
import { Audio } from 'react-loader-spinner'
import styles from '../../styles'

const Loading = ({ state }) => {
    return (
        <div className={styles.spinner}>
            <Audio
                height="50"
                width="50"
                color="#1DB954"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
            />
        </div>
    )
}

export default Loading