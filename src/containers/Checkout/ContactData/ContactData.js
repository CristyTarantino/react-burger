import React, { Component } from 'react'
import Button from 'components/UI/Button/Button'

import classes from './ContactData.module.scss'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postcode: ''
    }
  }

  render() {
    return (
      <div className={classes['contact-data']}>
        <h4>Enter your contact data</h4>
        <form>
          <input type='text' name='name' placeholder='Your Name' />
          <input type='text' name='email' placeholder='Your Mail' />
          <input type='text' name='street' placeholder='Street' />
          <input type='text' name='postcode' placeholder='Postcode' />
          <Button btnType='success'>ORDER</Button>
        </form>
      </div>
    )
  }
}

export default ContactData
