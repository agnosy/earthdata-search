import {
  TOGGLE_ABOUT_CWIC_MODAL,
  TOGGLE_ADVANCED_SEARCH_MODAL,
  TOGGLE_CHUNKED_ORDER_MODAL,
  TOGGLE_DRAWING_NEW_LAYER,
  TOGGLE_OVERRIDE_TEMPORAL_MODAL,
  TOGGLE_RELATED_URLS_MODAL,
  TOGGLE_SECONDARY_OVERLAY_PANEL,
  TOGGLE_SELECTING_NEW_GRID,
  TOGGLE_SHAPEFILE_UPLOAD_MODAL,
  TOGGLE_SPATIAL_POLYGON_WARNING,
  TOGGLE_TOO_MANY_POINTS_MODAL,
  TOGGLE_VIEW_ALL_FACETS_MODAL
} from '../constants/actionTypes'

export const toggleFacetsModal = state => ({
  type: TOGGLE_VIEW_ALL_FACETS_MODAL,
  payload: state
})

export const toggleOverrideTemporalModal = state => ({
  type: TOGGLE_OVERRIDE_TEMPORAL_MODAL,
  payload: state
})

export const toggleRelatedUrlsModal = state => ({
  type: TOGGLE_RELATED_URLS_MODAL,
  payload: state
})

export const toggleDrawingNewLayer = state => ({
  type: TOGGLE_DRAWING_NEW_LAYER,
  payload: state
})

export const toggleSecondaryOverlayPanel = state => ({
  type: TOGGLE_SECONDARY_OVERLAY_PANEL,
  payload: state
})

export const toggleSelectingNewGrid = state => ({
  type: TOGGLE_SELECTING_NEW_GRID,
  payload: state
})

export const toggleAdvancedSearchModal = state => ({
  type: TOGGLE_ADVANCED_SEARCH_MODAL,
  payload: state
})

export const toggleShapefileUploadModal = state => ({
  type: TOGGLE_SHAPEFILE_UPLOAD_MODAL,
  payload: state
})

export const toggleTooManyPointsModal = state => ({
  type: TOGGLE_TOO_MANY_POINTS_MODAL,
  payload: state
})

export const toggleChunkedOrderModal = state => ({
  type: TOGGLE_CHUNKED_ORDER_MODAL,
  payload: state
})

export const toggleAboutCwicModal = state => ({
  type: TOGGLE_ABOUT_CWIC_MODAL,
  payload: state
})

export const toggleSpatialPolygonWarning = state => ({
  type: TOGGLE_SPATIAL_POLYGON_WARNING,
  payload: state
})
