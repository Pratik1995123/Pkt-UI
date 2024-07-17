import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { URL } from '../../constants';
import './FormComponent.scss';

const FormComponent = () => {
  const [items, setItems] = useState([
    { id: Math.random().toString(), title: '', cost: '' },
  ]);

  const [customTitle, setCustomTitle] = useState('');
  const [pass, setPass] = useState('');
  const [date, setDate] = useState(new Date());

  const addNewItem = () => {
    setItems([...items, { id: Math.random().toString(), title: '', cost: '' }]);
  };

  const handleInputChange = (id, field, value) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleSubmit = async (items) => {
    try {
      toast.info('Submitting...', { autoClose: false });

      const itemWithoutEmptyFields = items.filter(item => {
        return item.title !== '' && item.cost !== '';
      });

      if (itemWithoutEmptyFields.length === 0 || !date || !pass) {
        toast.error(
          `Please fill ${!pass ? 'password ' : ''}${!date ? 'date' : ''} ${!itemWithoutEmptyFields.length ? 'items' : ''}`
        );
        return;
      }

      const dateObject = new Date(date);
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, '0');
      const day = String(dateObject.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;

      const data = {
        pass: pass,
        date: formattedDate,
        items: items,
      };

      const response = await axios.post(`${URL}/add_data`, data);

      toast.dismiss();
      toast(response.data.message || response.data.error, {
        type: response.data.type || 'info',
      });
    } catch (e) {
      console.error(e);
      toast.dismiss();
      toast.error('There was an error submitting the data.');
    }
  };

  const renderItem = (item) => (
    <div className="form-item" key={item.id}>
      <button
        className="clear-button"
        onClick={() => {
          setItems(prevItems => prevItems.filter(i => i.id !== item.id));
        }}
      >
        Clear
      </button>
      <input
        className="input"
        placeholder="Enter Title"
        value={item.title}
        onChange={e => {
          setCustomTitle(e.target.value);
          handleInputChange(item.id, 'title', e.target.value);
        }}
      />
      <input
        className="input"
        placeholder="Cost"
        type="number"
        value={item.cost}
        onChange={e => handleInputChange(item.id, 'cost', e.target.value)}
      />
    </div>
  );

  return (
    <div className="container">
      <h1 className="title">Submit Data</h1>

      <input
        className="input"
        placeholder="Enter Password"
        type="password"
        value={pass}
        onChange={e => setPass(e.target.value)}
      />
      <DatePicker
        className="date-selector"
        selected={date}
        onChange={(date) => setDate(date)}
      />
      {items.map(item => renderItem(item))}
      <button className="add-button" onClick={addNewItem}>
        Add New Item
      </button>
      <button className="submit-button" onClick={() => handleSubmit(items)}>
        Submit
      </button>
    </div>
  );
};

export default FormComponent;
