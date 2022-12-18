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

  }
  return (
  <form onSubmit={handleSubmit} className='addSpotModal'>
    <div className="newHomeForm">
        <h1>Update Your Listing</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      <div>
        <input
          type='text'
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          placeholder='Address'
          name="address"
          className="newHome-modalInput"
        />
      </div>
      <div>
        <input
          type='text'
          onChange={(e) => setCity(e.target.value)}
          value={city}
          placeholder='City'
          name='city'
          className="newHome-modalInput"
        />
      </div>
      <div>
          <input
          type='text'
          onChange={(e) => setState(e.target.value)}
          value={state}
          placeholder='State'
          name='state'
          className="newHome-modalInput"
        />
      </div>
      <div>
          <input
          type='text'
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          placeholder='Country'
          name='country'
          className="newHome-modalInput"
        />
      </div>
      <div>
          <input
          type='text'
          onChange={(e) => setLat(e.target.value)}
          value={lat}
          name='lat'
          className="newHome-modalInput"
        />
      </div>
      <div>
          <input
          type='text'
          onChange={(e) => setLng(e.target.value)}
          value={lng}
          name='lng'
          className="newHome-modalInput"
        />
      </div>
      <div>
          <input
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder='Name'
          name='name'
          className="newHome-modalInput"
        />
      </div>
      <div>
          <input
          type='text'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder='Text area for description'
          name='description'
          className="newHome-modalInput"
        />
      </div>
      <div>
          <input
          type='text'
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          placeholder='Price'
          name='price'
          className="newHome-modalInput"
        />
      </div>
      <div>
        <button className="newHome-button"  type='submit'>Submit</button>
      </div>
      </div>
    </form>
  )
}

export default EditSpotModal
