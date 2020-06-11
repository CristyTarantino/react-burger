import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItemList from './NavigationItemList'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new Adapter()})

describe('<NavigationItemList />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<NavigationItemList />)
  })

  it('should render the link to the home page', () => {
    expect(
      wrapper.contains(
        <NavigationItem link="/" exact>
          Burger Builder
        </NavigationItem>
      )
    ).toEqual(true)
  })

  it('should render two <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2)
  })

  it('should contain a login button if not authenticated', () => {
    expect(
      wrapper.contains(<NavigationItem link="/auth">Log In</NavigationItem>)
    ).toEqual(true)
  })

  it('should render three <NavigationItem /> elements if authenticated', () => {
    wrapper.setProps({isAuth: true})
    expect(wrapper.find(NavigationItem)).toHaveLength(3)
  })

  it('should contain a logout button if authenticated', () => {
    wrapper.setProps({isAuth: true})
    expect(
      wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>)
    ).toEqual(true)
  })

  it('should contain an orders button if authenticated', () => {
    wrapper.setProps({isAuth: true})
    expect(
      wrapper.contains(<NavigationItem link="/orders">Orders</NavigationItem>)
    ).toEqual(true)
  })
})
