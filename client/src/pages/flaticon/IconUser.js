import React from 'react'
import user from '../images/user.png'
import styles from '../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'

const IconUser = () => {
    return (
        <div className={`m-auto`}>
            <FontAwesomeIcon icon="fa-solid fa-user" size='xl' />
        </div>
    )
}

export default IconUser