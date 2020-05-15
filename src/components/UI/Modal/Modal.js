import React from 'react'
import PropTypes from 'prop-types'
import Backdrop from 'components/UI/Backdrop/Backdrop'

import classes from './Modal.module.scss'

/*
 * V1 Below is a version of React memo.
 * As we now need to check if there is a change in the children
 * as we need to know when to display the spinner
 * we need to check if children change
 * Therefore there is no need to use React memo
 */

// const modal = React.memo(({ show, modalClosed, children }) => (
//   <>
//     <Backdrop show={show} clicked={modalClosed} />
//     <div
//       className={classes.modal}
//       style={{
//         transform: show ? 'translateY(0)' : 'translateY(-1000vh)',
//         opacity: show ? '1' : '0'
//       }}>
//       {children}
//     </div>
//   </>
//   // We want to update this component only if the show prop is true
//   // if we do React.memo(modal) as one of the props is children
//   // children is price and ingredients that update continuously
//   // so we need to write our own comparison function as a second argument to the method
//   // to just check the show.
//   // This method needs to return a boolean value to conditionally evaluate if the component should re-render or not.
// ), (prevProps, nextProps) => prevProps.show === nextProps.show)

const modal = ({show, modalClosed, children}) => (
  <>
    <Backdrop show={show} clicked={modalClosed} />
    <div
      className={classes.modal}
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-1000vh)',
        opacity: show ? '1' : '0',
      }}
    >
      {children}
    </div>
  </>
  // We want to update this component only if the show prop is true
  // if we do React.memo(modal) as one of the props is children
  // children is price and ingredients that update continuously
  // so we need to write our own comparison function as a second argument to the method
  // to just check the show.
  // This method needs to return a boolean value to conditionally evaluate if the component should re-render or not.
)

modal.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  modalClosed: PropTypes.func.isRequired,
}

export default modal
