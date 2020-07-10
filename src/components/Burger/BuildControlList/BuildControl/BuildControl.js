import React from 'react'
import PropTypes from 'prop-types'

import classes from './BuildControl.module.scss'

const BuildControl = ({label, removed, disabled, added}) => (
  <div className={classes['build-control']}>
    <div className={classes.label}>{label}</div>
    <button className={classes.less} onClick={removed} disabled={disabled}>
      Less
    </button>
    <button className={classes.more} onClick={added}>
      More
    </button>
  </div>
)

BuildControl.propTypes = {
  label: PropTypes.string.isRequired,
  added: PropTypes.func.isRequired,
  removed: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default BuildControl
