import React, { useState } from 'react';
import styles from './toolIcons.module.css';

function FoodIcons({ onClick }) {
  const [clickedItems, setClickedItems] = useState(new Set());
  const [inputValue, setInputValue] = useState(''); // Fixed: added state for inputValue

  const foodItems = [
    { name: 'Stove', image: styles.stoveIcon },
    {name:'Air Fryer', image:styles.airfryerIcon},
   
    // Add more items as needed
  ];

  const handleIconClick = (name) => {
    const newClickedItems = new Set(clickedItems);
    newClickedItems.add(name);
    setClickedItems(newClickedItems);
    onClick(name);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = () => {
    onClick(inputValue);
    setInputValue(''); // Clear the input field after submitting
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleInputSubmit();
    }
  };

  return (
    <div>
      <div className={styles.foodIconContainer}>
        {foodItems.map((item, index) => (
          <div key={index} className={`${styles.foodIcon} ${clickedItems.has(item.name) ? styles.fadeOut : ''}`} onClick={() => handleIconClick(item.name)}>
            <div className={item.image} />
          </div>
        ))}
      </div>
      <div className={styles.userInputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          placeholder="Add Tools and Cuisine"
          className={styles.userInput}
        />
      </div>
    </div>
  );
}

export default FoodIcons;



