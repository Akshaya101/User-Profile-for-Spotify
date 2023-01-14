import React from 'react'
import user from '../images/user.png'
import styles from '../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserClock, faClock, faMusic } from '@fortawesome/fontawesome-free-solid'

const IconTime = () => {
    return (
        <div className={`m-auto`}>
            <FontAwesomeIcon icon={faUserClock} size='xl' />
        </div>
    )
}

export default IconTime