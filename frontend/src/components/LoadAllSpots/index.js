import React, {useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getSpots } from '../../store/spots';


const LoadAllSpots = () => {
  const dispatch = useDispatch();

  const spots = useSelector(state => state.spots.allSpots)
  const spotsArr = Object.values(spots)



  useEffect(() => {
    dispatch(getSpots())
  },[])



  if(!spots) return null

return (
  <div>
    <div>
      <h1>List all spots</h1>
      <ol>
        {spotsArr.map(({id, address}) => (
          <li key={id}>{address}</li>
        ))}
      </ol>

    </div>
  </div>
)

}


export default LoadAllSpots;
