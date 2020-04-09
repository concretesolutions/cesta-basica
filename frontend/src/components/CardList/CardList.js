import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

import { connect, types } from '../../store'

import { Items, ItemsTypes } from '../Items'
import { DonationStatus } from '../../utils/donationStatus'
import { CardList as CardListService } from '../../services/API/cardList'

import './CardList.scss'

function CardList({ setLoading, handleClick, store, dispatch }) {
  const { id } = useParams()
  const { cardList } = store

  async function retrieveCards() {
    await CardListService(dispatch, id)
  }

  function verifyIfCardsAreFilled() {
    const filteredCards = cardList.filter(
      (card) => card.status === DonationStatus.ENTREGUE.id || card.status === DonationStatus.NAO_ENTREGUE.id
    )
    return cardList.length === filteredCards.length
  }

  useEffect(() => {
    setLoading(true)
    dispatch({ type: types.CLEAN_CARD_LIST })
    retrieveCards()
    if (cardList) {
      verifyIfCardsAreFilled()
    }
    setLoading(false)
  }, [])

  return (
    <div className="component-cardList-container">
      {cardList &&
        cardList.map((card, i, arr) => {
          const state = arr[i - 1] ? (arr[i - 1].status > 1 ? 'filled' : 'unfilled') : 'first'

          return (
            <Items
              key={card.voucherId}
              state={state}
              statusId={card.status}
              type={ItemsTypes.BASKET}
              size={ItemsTypes.LARGE}
              handleClick={handleClick}
              title={card.voucherId}
            />
          )
        })}
    </div>
  )
}

CardList.propTypes = {
  handleClick: PropTypes.func,
  setLoading: PropTypes.func.isRequired,
}

CardList.defaultProps = {
  handleClick: () => { },
}

export default connect(CardList)
