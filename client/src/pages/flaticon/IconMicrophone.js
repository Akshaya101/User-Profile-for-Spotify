import React from 'react'
import user from '../images/user.png'
import styles from '../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/fontawesome-free-solid'

const IconMicrophone = () => {
    return (
        <div className={`m-auto`}>
            <FontAwesomeIcon icon={faMusic} size='xl' />
        </div>
    )
}

export default IconMicrophone