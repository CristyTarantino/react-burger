import React from 'react'
import PropTypes from 'prop-types'
import Backdrop from '../Backdrop/Backdrop'

import style from './Modal.module.scss'

const modal = ({ show, modalClosed, children }) => (
  <>
    <Backdrop show={show} clicked={modalClosed} />
    <div
      className={style.modal}
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-1000vh)',
        opacity: show ? '1' : '0'
      }}>
      {children}
    </div>
  </>
)

modal.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(modal)
