import LoadAllSpots from "../LoadAllSpots";

import { useParams } from "react-router-dom";





const ShowSpot = () => {
  const {spotId} = useParams()

  return (
    <div>
    {/* <div>{spot.previewImage}</div>
    <div>{spot.city},{spot.state}</div>
    <div>{spot.avgRating}</div>
    <div>{spot.price} night</div> */}
    </div>
  )
}

export default ShowSpot
