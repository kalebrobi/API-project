import { csrfFetch } from './csrf';

//action constants
const LOAD_SPOTS = 'spots/loadSpots'
const LOAD_A_SPOT = 'spots/loadASpot'
const ADD_SPOT = 'spots/addASpot'
const UPDATE_SPOT = 'spots/updateSpot'
const DELETE = 'spots/deleteSpot'


//action creators
const loadSpots = (list) => {
  return {
    type: LOAD_SPOTS,
    list
  }

}
const loadASpot = (spot) => {
  return {
    type: LOAD_A_SPOT,
    spot
  }
}

const addOneSpot = (newSpot) => {
  return {
    type: ADD_SPOT,
    newSpot
  }
}

const updateSpot = (updatedSpot) => {
  return {
    type: UPDATE_SPOT,
    updatedSpot
  }
}

export const deleteSpot = (spotId) => ({
  type: DELETE,
  spotId
})

//thunk function

export const deleteASpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`,{
    method: 'DELETE'
  })
  if(response.ok) {
    const spot = await response.json()
    dispatch(deleteSpot(spot))
  }
}



export const updateASpot = (payload,spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)

  })
  if(response.ok) {
    const editedSpot = await response.json()
    dispatch(updateSpot(editedSpot))
  return editedSpot
  }

}




export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSpots(data.Spots))
  }
}


export const getASpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`)

  if(response.ok) {
    const data = await response.json()
    dispatch(loadASpot(data))
  }
}


export const createSpot = (newSpot, createdSpotImage) => async dispatch => {
  const newSpotResponse = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSpot)
  })

  if(newSpotResponse.ok) {
    const newSpot = await newSpotResponse.json()

    createdSpotImage['spotId'] = newSpot.id

    const resSpotImage = await csrfFetch(`/api/spots/${newSpot.id}/images`,{
      method: 'POST',
      headers:  { 'Content-Type': 'application/json' },
      body: JSON.stringify(createdSpotImage)
    })

    if(resSpotImage.ok){
      const newImage = await resSpotImage.json()

      const completedObj = {...newSpot, 'previewImage':newImage.url}
      dispatch(addOneSpot(completedObj))
      return completedObj
    }
  }

}




const initialState = {allSpots: {}, singleSpot:{}};

const spotsReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_SPOTS:
      const loadState = {allSpots:{}, singleSpot:{}}
      // const loadState = {...state}
      action.list.forEach(spot => {
        loadState.allSpots[spot.id] = spot
      });
      return loadState;
    case LOAD_A_SPOT:
      // const loadSpot = {allSpots: {}, singleSpot:{}}
      const loadSpot = {...state}
      loadSpot.singleSpot = action.spot
      return loadSpot
    case ADD_SPOT:
      const newState = {...state}
      const newAllSpots = {...state.allSpots}
      newAllSpots[action.newSpot.id] = action.newSpot
      newState.allSpots = newAllSpots
      return newState
    case UPDATE_SPOT:
      const newStateCopy = {...state}
      const newSpotsUpdated = {...state.allSpots}
      newSpotsUpdated[action.updatedSpot.id] = action.updatedSpot
      newStateCopy.allSpots = newSpotsUpdated
      return newStateCopy
    case DELETE:
        const newCopy = {...state, allSpots: {...state.allSpots}};
        delete newCopy.allSpots[action.spotId];
        return newCopy;
    default:
       return state
  }
}

export default spotsReducer;
