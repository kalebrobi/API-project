import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { updateASpot } from "../../store/spots";



function EditSpotModal({spot}) {
  const dispatch = useDispatch();
  const history = useHistory()

  const [address, setAddress] = useState(spot.spot.address);
  const [city, setCity] = useState(spot.spot.city);
  const [state, setState ] = useState(spot.spot.state)
  const [country, setCountry ] = useState(spot.spot.country)
  const [lat, setLat ] = useState('123231')
  const [lng, setLng ] = useState('774634')
  const [name, setName ] = useState(spot.spot.name)
  const [description, setDescription ] = useState(spot.spot.description)
  const [price, setPrice ] = useState(spot.spot.price)
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


const spotId = spot.spot.id

  // console.log("THISISSPOT",address)

  // useEffect(() => {
  //   dispatch(updateASpot())
  // }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])

    const payload = {
      ...spot,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    }


    const editedSpot = await dispatch(updateASpot(payload, spotId)).catch(
      async (res) => {
        const data = await res.json()
        if(data && data.errors) setErrors(data.errors)
      }
    )


    if(editedSpot) {
      (closeModal)
      (history.push(`/spots/${spotId}`))
    }



    // const editedSpot =  dispatch(updateASpot(payload, spotId))


    // if(editedSpot) {
    //   (closeModal)
    //   (history.push(`/spots/${spotId}`))
    // }




  }



  return (
    <div className="newHomeModal">
      <h1>Update Your Listing</h1>
      <form onSubmit={handleSubmit} className='addSpotModal'>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type='text'
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          placeholder='Address'
          name="address"
        />
        <input
          type='text'
          onChange={(e) => setCity(e.target.value)}
          value={city}
          placeholder='City'
          name='city'
        />
          <input
          type='text'
          onChange={(e) => setState(e.target.value)}
          value={state}
          placeholder='State'
          name='state'
        />
          <input
          type='text'
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          placeholder='Country'
          name='country'
        />
          <input
          type='text'
          onChange={(e) => setLat(e.target.value)}
          value={lat}
          name='lat'
        />
          <input
          type='text'
          onChange={(e) => setLng(e.target.value)}
          value={lng}
          name='lng'
        />
          <input
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder='Name'
          name='name'
        />
          <input
          type='text'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder='Text area for description'
          name='description'
        />
          <input
          type='text'
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          placeholder='Price'
          name='price'
        />
        <button type='submit'>Submit</button>
      </form>
    </div>

  )
}

export default EditSpotModal
