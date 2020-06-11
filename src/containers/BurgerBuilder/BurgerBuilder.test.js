import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {BurgerBuilder} from './BurgerBuilder'
import BuildControlList from 'components/Burger/BuildControlList/BuildControlList'

configure({adapter: new Adapter()})

describe('', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />)
  })

  it('should render <BuildControlList /> when receiving ingredients', () => {
    wrapper.setProps({ings: {salad: 0}})

    expect(wrapper.find(BuildControlList)).toHaveLength(1)
  })
})
