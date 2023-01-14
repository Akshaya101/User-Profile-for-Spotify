import React from 'react'
import { useState, useEffect } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom'
import styles from '../styles';
import { IconMicrophone, IconSpotify, IconTime, IconUser } from './flaticon';

const Component = ({ to, PassedIcon, title }) => {
  const Icon = () => {
    return <PassedIcon />
  }
  return (
    <div className={styles.iconBox}>
      <Link to={to}>
        <button className='w-full focus:border-l-4 focus:border-site-green focus:bg-site-grey'>
          <div className={`${styles.eachIcon} ${styles.iconBorder}`}>
            <Icon className={styles.icon} />
            <p className={styles.iconName}>{title}</p>
          </div>
        </button>
      </Link>
    </div>
  )
}

const Nav = () => {

  return (
    <div className={styles.navContainer}>
      <Link to='/'>
        <IconSpotify className={styles.logo} />
      </Link>
      <div className={styles.iconContainer}>
        <Component to='/top-artists' PassedIcon={IconUser} title='Top Artists' />
        <Component to='/top-tracks' PassedIcon={IconMicrophone} title='Top Tracks' />
        <Component to='/recently-played' PassedIcon={IconTime} title='Recently Played' />
      </div>
    </div>
  )
}
export default Nav