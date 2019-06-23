import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import collectionMetadataReducer from './collectionMetadata'
import granuleMetadataReducer from './granuleMetadata'
import collectionsResultsReducer from './collectionsResults'
import authTokenReducer from './authToken'
import facetsReducer from './facets'
import {
  cmrFacetsReducer,
  featureFacetsReducer,
  viewAllFacetsReducer
} from './facetsParams'
import focusedCollectionReducer from './focusedCollection'
import granuleResultsReducer from './granuleResults'
import mapReducer from './map'
import queryReducer from './query'
import timelineReducer from './timeline'
import uiReducer from './ui'
import viewAllFacetsRequestReducer from './viewAllFacets'
import focusedGranuleReducer from './focusedGranule'
import projectPanelsReducer from './projectPanels'

export default history => combineReducers({
  authToken: authTokenReducer,
  facetsParams: combineReducers({
    feature: featureFacetsReducer,
    cmr: cmrFacetsReducer,
    viewAll: viewAllFacetsReducer
  }),
  focusedCollection: focusedCollectionReducer,
  focusedGranule: focusedGranuleReducer,
  map: mapReducer,
  metadata: combineReducers({
    collections: collectionMetadataReducer,
    granules: granuleMetadataReducer
  }),
  query: queryReducer,
  router: connectRouter(history),
  searchResults: combineReducers({
    collections: collectionsResultsReducer,
    facets: facetsReducer,
    granules: granuleResultsReducer,
    viewAllFacets: viewAllFacetsRequestReducer
  }),
  timeline: timelineReducer,
  ui: uiReducer,
  projectPanels: projectPanelsReducer
})