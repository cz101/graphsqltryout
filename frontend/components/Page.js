import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import createGlobalStyle from 'styled-components'



export default function Page({children}){
  return (
  <div>
    <Header/>
    <h2> im in page comonent</h2>
    {children}
  </div>
  )
}

Page.prototypes ={
  children: PropTypes.any
 // children: PropTypes.arrayOf(PropTypes.node)

}


 