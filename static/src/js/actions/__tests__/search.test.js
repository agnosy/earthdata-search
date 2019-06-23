import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import actions from '../index'
import { updateCollectionQuery, updateGranuleQuery } from '../search'
import { UPDATE_COLLECTION_QUERY, UPDATE_GRANULE_QUERY } from '../../constants/actionTypes'

const mockStore = configureMockStore([thunk])

beforeEach(() => {
  jest.clearAllMocks()
})

describe('updateCollectionQuery', () => {
  test('should create an action to update the search query', () => {
    const payload = {
      keyword: 'new keyword',
      pageNum: 1,
      spatial: {
        point: '0,0'
      }
    }
    const expectedAction = {
      type: UPDATE_COLLECTION_QUERY,
      payload
    }
    expect(updateCollectionQuery(payload)).toEqual(expectedAction)
  })
})

describe('updateGranuleQuery', () => {
  test('should create an action to update the search query', () => {
    const payload = {
      pageNum: 1
    }
    const expectedAction = {
      type: UPDATE_GRANULE_QUERY,
      payload
    }
    expect(updateGranuleQuery(payload)).toEqual(expectedAction)
  })
})

describe('changeQuery', () => {
  test('should update the search query and call getCollections', () => {
    const newQuery = {
      keyword: 'new keyword',
      spatial: {
        point: '0,0'
      },
      temporal: {}
    }

    // mock getCollections
    const getCollectionsMock = jest.spyOn(actions, 'getCollections')
    getCollectionsMock.mockImplementation(() => jest.fn())

    // mockStore with initialState
    const store = mockStore({
      focusedCollection: '',
      query: {
        collection: {
          keyword: 'old stuff'
        }
      },
      metadata: {},
      router: {
        location: {
          pathname: ''
        }
      }
    })

    // call the dispatch
    store.dispatch(actions.changeQuery({ ...newQuery }))

    // Is updateCollectionQuery called with the right payload
    const storeActions = store.getActions()
    expect(storeActions[0]).toEqual({
      type: UPDATE_COLLECTION_QUERY,
      payload: {
        keyword: 'new keyword',
        pageNum: 1,
        spatial: {
          point: '0,0'
        },
        temporal: {}
      }
    })

    // was getCollections called
    expect(getCollectionsMock).toHaveBeenCalledTimes(1)
  })
})

describe('changeCollectionPageNum', () => {
  test('should update the collection query and call getCollections', () => {
    const pageNum = 2

    // mock getCollections
    const getCollectionsMock = jest.spyOn(actions, 'getCollections')
    getCollectionsMock.mockImplementation(() => jest.fn())

    // mockStore with initialState
    const store = mockStore({
      query: {
        collection: { pageNum: 1 }
      }
    })

    // call the dispatch
    store.dispatch(actions.changeCollectionPageNum(pageNum))

    // Is updateCollectionQuery called with the right payload
    const storeActions = store.getActions()
    expect(storeActions[0]).toEqual({
      type: UPDATE_COLLECTION_QUERY,
      payload: {
        pageNum: 2
      }
    })

    // was getCollections called
    expect(getCollectionsMock).toHaveBeenCalledTimes(1)
  })
})

describe('changeGranulePageNum', () => {
  test('should update the collection query and call getCollections', () => {
    const pageNum = 2

    // mock getGranules
    const getGranulesMock = jest.spyOn(actions, 'getGranules')
    getGranulesMock.mockImplementation(() => jest.fn())

    // mockStore with initialState
    const store = mockStore({
      query: {
        collection: {},
        granule: { pageNum: 1 }
      }
    })

    // call the dispatch
    store.dispatch(actions.changeGranulePageNum(pageNum))

    // Is updateGranuleQuery called with the right payload
    const storeActions = store.getActions()
    expect(storeActions[0]).toEqual({
      type: UPDATE_GRANULE_QUERY,
      payload: {
        pageNum: 2
      }
    })

    // was getCollections called
    expect(getGranulesMock).toHaveBeenCalledTimes(1)
  })
})

describe('clearFilters', () => {
  test('clears the query and calls getCollections', () => {
    const query = {
      focusedCollection: '',
      collection: {
        keyword: 'keyword search',
        spatial: {
          point: '0,0'
        }
      },
      metadata: {},
      router: {
        location: {
          pathname: ''
        }
      }
    }
    const emptyQuery = {
      keyword: '',
      pageNum: 1,
      spatial: {},
      temporal: {}
    }

    // mockStore with initialState
    const store = mockStore(query)

    // mock getCollections
    const getCollectionsMock = jest.spyOn(actions, 'getCollections')
    getCollectionsMock.mockImplementation(() => jest.fn())

    // call the dispatch
    store.dispatch(actions.clearFilters())

    // Is changeUrl called with the right payload
    const storeActions = store.getActions()
    expect(storeActions[0]).toEqual({
      type: '@@router/CALL_HISTORY_METHOD',
      payload: {
        args: [{}],
        method: 'push'
      }
    })

    // Is updateCollectionQuery called with the right payload
    expect(storeActions[1]).toEqual({
      type: UPDATE_COLLECTION_QUERY,
      payload: emptyQuery
    })

    // was getCollections called
    expect(getCollectionsMock).toHaveBeenCalledTimes(1)
  })
})