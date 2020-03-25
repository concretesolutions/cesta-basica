import React from 'react'
import { SubTitle, SubTitleTypes } from '../SubTitle'
import { Paragraph } from '../Paragraph'
import './Terms.scss'

function Terms() {
  return (
    <>
      <SubTitle size={SubTitleTypes.SMALL} type={SubTitleTypes.STRONG} message="1.1 Introducao" />
      <Paragraph content="introductionCompromise" />
      <SubTitle size={SubTitleTypes.SMALL} type={SubTitleTypes.STRONG} message="1.2 Target" />
      <Paragraph content="tartargetCompromiseget" />
      <SubTitle size={SubTitleTypes.SMALL} type={SubTitleTypes.STRONG} message="2 Conclusion" />
      <Paragraph content="conclusionCompromise" />
      <SubTitle size={SubTitleTypes.SMALL} type={SubTitleTypes.STRONG} message="2 Conclusion" />
      <Paragraph content="conclusionCompromise" />
      <SubTitle size={SubTitleTypes.SMALL} type={SubTitleTypes.STRONG} message="2 Conclusion" />
      <Paragraph content="conclusionCompromise" />
    </>
  )
}

export default Terms
