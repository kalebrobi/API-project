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

  const { closeModal } = useModal();



  const handleSubmit = async (e) => {
    e.preventDefault()

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

  const createdSpot = await dispatch(createSpot(newSpot, createdSpotImage))
  // return dispatch(createSpot(newSpot, createdSpotImage))
  //   .then(closeModal).then( history.push(`/spots/${createdSpot.id}`))

  if(createdSpot) {
    closeModal()
    (history.push(`/spots/${createdSpot.id}`))
    // reset()
  }
  }

  // const reset = () => {
  //   setAddress('')
  //   setCity('')
  //   setState('')
  //   setCountry('')
  //   setLat('123231')
  //   setLng('774634')
  //   setName('')
  //   setDescription('')
  //   setPrice('')
  //   setUrl('')
  //   setPreview('')
  // }


  return (

    <div className="newHomeModal">
      <h1>Lets Add Your Home</h1>

      <form onSubmit={handleSubmit} className='addSpotModal'>
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
           <input
          type='text'
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          placeholder='Image Url'
          name='url'
        />
           <input
          type='text'
          onChange={(e) => setPreview(e.target.value)}
          value={preview}
          placeholder='True'
          name='preview'
        />
        <button type='submit'>Submit</button>
      </form>
    </div>

  )
}

export default CreateNewSpot
