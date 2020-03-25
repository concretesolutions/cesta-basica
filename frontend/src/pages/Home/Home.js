import React from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'

import { LogoHorizontal } from '../../components/Logo'
import { Button, ButtonTypes } from '../../components/Button'
import { GroupIcons } from '../../components/HomeIcons'
import { homeContentTitle, homeContentSubTitle, homeContent } from '../../utils/strings'

const Home = () => {
  return (
    <div style={{ width: '100vw' }}>
      <div className="headerHome">
        <LogoHorizontal />
        <Link to="/login" className="headerHome__button">
          <Button className="headerHome--button" type={ButtonTypes.FILLHOME} message="Entrar" />
        </Link>
      </div>
      <div className="contentHome">
        <h3>{homeContentTitle}</h3>
        <GroupIcons />
      </div>
      <div className="footerHome">
        <h3 className="footerHome--subtitle">{homeContentSubTitle}</h3>
        <p>{homeContent}</p>
      </div>
    </div>
  )
}

export default Home
