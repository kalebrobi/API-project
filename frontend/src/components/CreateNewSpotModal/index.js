import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { createSpot } from "../../store/spots";
import './CreateNewSpot.css'

function CreateNewSpot() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState ] = useState('')
  const [country, setCountry ] = useState('')
  const [lat, setLat ] = useState('123231')
  const [lng, setLng ] = useState('774634')
  const [name, setName ] = useState('')
  const [description, setDescription ] = useState('')
  const [price, setPrice ] = useState('')
  const [url, setUrl] = useState('')
  const [preview, setPreview] = useState(true)
  const [errors, setErrors] = useState([]);

  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    const newSpot = {
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

    const createdSpotImage = {
      url,
      preview
    }


  const createdSpot = await dispatch(createSpot(newSpot, createdSpotImage)).catch(
    async (res) => {
      const data = await res.json()
      if(data && data.errors) setErrors(data.errors)
    }
  )

  if(createdSpot) {
   (closeModal)
    (history.push(`/spots/${createdSpot.id}`))
    // reset()
  }
}


  return (
  <form onSubmit={handleSubmit} className='addSpotModal'>
    <div className="newHomeForm">
      <h1>Lets Add Your Home</h1>
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
          disabled={true}
          className="newHome-modalInput"
        />
      </div>
      <div>
          <input
          type='text'
          onChange={(e) => setLng(e.target.value)}
          value={lng}
          name='lng'
          disabled={true}
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
           <input
          type='text'
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          placeholder='Image Url'
          name='url'
          className="newHome-modalInput"
        />
      </div>
      <div>
           <input
          type='text'
          onChange={(e) => setPreview(e.target.value)}
          value={preview}
          placeholder='True'
          disabled={true}
          name='preview'
          className="newHome-modalInput"
        />
      </div>
    <div>
      <button className="newHome-button" type='submit'>Submit</button>
    </div>
    </div>
  </form>
  )
}

export default CreateNewSpot
