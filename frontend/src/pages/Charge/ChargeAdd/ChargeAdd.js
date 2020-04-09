import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Select } from '../../../components/Select'
import { File } from '../../../components/File'
import { SubTitle, SubTitleTypes } from '../../../components/SubTitle'
import { Button, ButtonTypes } from '../../../components/Button'

import { Loader } from '../../../components/Loader'

import { ChargeUpload } from '../../../services/API/chargeUpload'

import './ChargeAdd.scss'

import {
  confirm,
} from '../../../utils/strings'

function ChargeAdd() {
  const history = useHistory()

  const [file, setFile] = useState('')
  const [chargeType, setChargeType] = useState('')
  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)

  const handleFile = (event) => {
    setFile(...file, event.target.files[0])
    setError('')
  }

  const handleClickButton = async () => {
    setLoading(true)
    const response = await ChargeUpload({ file, type: chargeType })
    const { status } = response

    setLoading(false)

    if (status === 200) {
      history.push(`/charge`)
    } else {
      setFile('')
      setError(response.data.message)
    }
  }

  const optionsList = [
    {
      value: '',
      string: 'Selecione o tipo de carga',
    },
    {
      value: 'donation',
      string: 'Bordero',
    },
    {
      value: 'user',
      string: 'Líder',
    },
    {
      value: 'transfer',
      string: 'Transferência',
    },
    {
      value: 'site',
      string: 'Unidade',
    },
    {
      value: 'voucher',
      string: 'Voucher',
    }
  ]

  const handleOnchangeSelect = (value) => {
    setChargeType(value)
    setError('')
  }

  return (
    <div className="chargeAdd container-donation-prof">
      {loading && <Loader />}

      <Select
        value={chargeType}
        placeholder="Tipo de Carga"
        getValue={handleOnchangeSelect}
        optionsList={optionsList}
      />

      <div className="main-donation-prof">
        <SubTitle type={SubTitleTypes.LIGHT} width={SubTitleTypes.SIZE_SMALL} message="Carga da planilha" />

        <File type=".csv" file={file} handleImage={handleFile} placeholder="adicionar arquivo" />
      </div>

      {error && (
        <p style={{ color: 'red', maxHeight: 250, overflow: 'auto', }}>
          {error}
        </p>
      )}

      <div className="footer-donation-prof">
        <Button
          handleClick={handleClickButton}
          disable={!file || !chargeType || error}
          size={ButtonTypes.LARGE}
          message={confirm}
        />
      </div>
    </div>
  )
}

export default ChargeAdd
