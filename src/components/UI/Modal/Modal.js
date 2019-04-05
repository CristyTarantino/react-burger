import React from 'react'
import PropTypes from 'prop-types'
import Backdrop from '../Backdrop/Backdrop'

import style from './Modal.module.scss'

const modal = (props) => (
  <>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className={style.modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-1000vh)',
        opacity: props.show ? '1': '0'
      }}>
      {props.children}
    </div>
  </>
)

modal.propTypes = {
  children: PropTypes.node.isRequired
}

export default modal
