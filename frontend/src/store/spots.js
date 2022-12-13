// import { csrfFetch } from './csrf';

//action constants
const LOAD_SPOTS = 'spots/loadSpots'
// const ADD_SPOT = 'spots/addASpot'
// const DELETE_SPOT = 'spots/deleteSpot'


//action creators
const loadSpots = (list) => {
  return {
    type: LOAD_SPOTS,
    list
  }

}


// const addASpot = (spot) => {
//   return {
//     type: ADD_SPOT,
//     payload: spot
//   }
// }

// export const deleteSpot = () => {
//   return {
//     type: DELETE_SPOT,
//   }
// }

//thunk function
export const getSpots = () => async (dispatch) => {
  const response = await fetch('/api/spots');

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSpots(data.Spots))
  }
}



const initialState = {allSpots: {}, singleSpot:{}};

const spotsReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_SPOTS:
      const loadState = {allSpots:{}}
      // const loadState = {...state}
      action.list.forEach(spot => {
        loadState.allSpots[spot.id] = spot
      });
      return loadState;
    default:
       return state
  }
}

export default spotsReducer;
