import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './DonationList.scss'
import { connect, types } from '../../store'

import { Loader } from '../../components/Loader'

import { DonationHeader, DonationIsEmpty, DonationItem } from './CommonComponents'
import { Button, ButtonTypes } from '../../components/Button'
import { BottomMenu } from '../../components/BottomMenu'

import { FilteredDonationList, DonationsList } from '../../services/API/donationList'
import { CommitmentCheck } from '../../services/API/terms'

import { registerNewDonation, locationPermission } from '../../utils/strings'
import { handleReloadLocation } from '../../services/handles'
function DonationList({ store, dispatch, history }) {
  const [loading, setLoading] = useState()
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const {
    donationList,
    user: { role },
    filters,
  } = store

  function getGeoLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)

      const userLocation = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      }

      dispatch({ type: types.SET_USER_LOCATION, payload: userLocation })
    })
  }

  function handleClickNewDonation() {
    history.push('/donation/register')
  }

  async function getDonationList() {
    setLoading(true)
    if (isAdmin()) {
      await FilteredDonationList(dispatch, filters)
    } else {
      await DonationsList(dispatch)
    }
    await CommitmentCheck(history)
    setLoading(false)
  }

  useEffect(() => {
    getGeoLocation()
    getDonationList()
  }, [])

  const isAdmin = () => role === 'admin'

  return (
    
    <div className="containerDonation">

      {(latitude && longitude) === null ? 
        (
          <div className="alert warning">{locationPermission} Habilite sua localização e <a className="containerDonation__clickHere" onClick={() => handleReloadLocation()}>clique aqui</a>.</div>
        
        ) : 
        (
          <div>
            {loading && !donationList && <Loader />}
      
            <DonationHeader isAdmin={isAdmin()} qntd={filters.filterQnt} />

            {donationList.length > 0 ? (
              <div className={`containerDonation__list containerDonation__list--${role}`}>
                {donationList.map((item) => {
                  const { quantity, status, donationId } = item
                  return (
                    <DonationItem
                      title={donationId}
                      quantity={quantity}
                      key={donationId}
                      stateDonation={status}
                      donationId={donationId}
                      userRole={role}
                    />
                  )
                })}
              </div>
            ) : (
              <DonationIsEmpty whichMessage={role} />
            )}

            {isAdmin() && (
              <div className="containerDonation__button">
                <Button
                  size={ButtonTypes.LARGE}
                  typeButton="button"
                  message={registerNewDonation}
                  handleClick={handleClickNewDonation}
                />
              </div>
            )}
            <BottomMenu isAdmin={isAdmin()} />
          </div>
        )
      }
    </div>
  )
}

DonationList.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

export default connect(DonationList)