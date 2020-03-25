import React from 'react'
import PropsType from 'prop-types'
import './Paragraph.scss'

import { ParagraphTypes } from './ParagraphTypes'

import * as strings from '../../utils/strings'

function Paragraph({ size, content }) {
  return <p className={`paragraph font-${size} `}>{strings[content]}</p>
}

Paragraph.propTypes = {
  content: PropsType.string.isRequired,
  size: PropsType.string,
}
Paragraph.defaultProps = {
  size: ParagraphTypes.SMALL,
}
export default Paragraph
