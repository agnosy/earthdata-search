import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Alert } from 'react-bootstrap'

import CollectionResultsTable.js from '../CollectionResultsTable.js'

Enzyme.configure({ adapter: new Adapter() })

function setup(overrideProps) {
  const props = {
    bootstrapVariant: 'primary',
    ...overrideProps
  }

  const enzymeWrapper = shallow(<CollectionResultsTable.js {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('CollectionResultsTable.js component', () => {
  const { enzymeWrapper } = setup()

  test('should render the alert', () => {
    expect(enzymeWrapper.type()).toEqual(Alert)
    expect(enzymeWrapper.prop('className')).toContain('edsc-alert')
  })

  describe('when a variant is declared', () => {
    const { enzymeWrapper } = setup({
      variant: 'test-variant'
    })

    test('should add the variant class name', () => {
      expect(enzymeWrapper.prop('className')).toContain('edsc-alert--test-variant')
    })
  })

  describe('when children are provided', () => {
    const { enzymeWrapper } = setup({
      children: <div className="test-child">Test</div>
    })

    test('should render the children', () => {
      expect(enzymeWrapper.find('.test-child').length).toEqual(1)
    })
  })

  describe('when an icon is provided', () => {
    const { enzymeWrapper } = setup({
      icon: 'question-circle'
    })

    test('should render the icon', () => {
      expect(enzymeWrapper.find('.fa-question-circle').length).toEqual(1)
    })
  })
})