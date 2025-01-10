import React, { useState } from 'react';
import axios from 'axios';

const SneakerForm = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([{ size: '', quantity: '' }]);

  const handleSizeChange = (index, e) => {
    const values = [...sizes];
    values[index][e.target.name] = e.target.value;
    setSizes(values);
  };

  const addSizeField = () => {
    setSizes([...sizes, { size: '', quantity: '' }]);
  };

  const removeSizeField = (index) => {
    const values = [...sizes];
    values.splice(index, 1);
    setSizes(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sneakerData = {
      name,
      brand,
      price,
      sizes,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/sneakers', sneakerData);
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
   <div className='container py-5'>
    <div className='row'>
        <div className='col-md-8 offset-md-3'>
        <form onSubmit={handleSubmit} className='d-flex'>
   
  


      <h3>Sizes</h3>
      {sizes.map((size, index) => (
        <div key={index}>
          <input
            type="number"
            name="size"
            value={size.size}
            onChange={(e) => handleSizeChange(index, e)}
            placeholder="Size"
            className='form-control'

          />
          <input
            type="number"
            name="quantity"
            value={size.quantity}
            onChange={(e) => handleSizeChange(index, e)}
            placeholder="Quantity"
            className='form-control'
          />
          <button type="button" onClick={() => removeSizeField(index)}>
            Remove Size
          </button>
        </div>
      ))}

      <button type="button" onClick={addSizeField}>
        Add Size
      </button>

      <button type="submit">Add Sneaker</button>
    </form>
        </div>
    </div>
   </div>
  );
};

export default SneakerForm;