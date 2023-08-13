import React, { useState } from 'react';
import styles from './foodIcon.module.css';

function FoodIcons({ onClick }) {
  const [clickedItems, setClickedItems] = useState(new Set());
  const [inputValue, setInputValue] = useState(''); // Fixed: added state for inputValue

  const foodItems = [
    { name: 'Bread', image: styles.breadIcon },
    { name: 'Cheese', image: styles.cheeseIcon },
    { name: 'Lettuce', image: styles.lettuceIcon },
    { name: 'banana', image: styles.bananaIcon },
    { name: 'beef', image: styles.beefIcon },
    { name: 'celery', image: styles.celeryIcon },
    { name: 'chicken', image: styles.chickenIcon },
    { name: 'ketchup', image: styles.ketchupIcon },
    { name: 'noodles', image: styles.noodlesIcon },
    { name: 'pasta', image: styles.pastaIcon },
    { name: 'rice', image: styles.riceIcon },
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
          placeholder="Add Ingredients"
          className={styles.userInput}
        />
      </div>
    </div>
  );
}

export default FoodIcons;



