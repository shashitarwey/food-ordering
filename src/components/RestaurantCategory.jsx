import { useState } from 'react';
import ItemList from './ItemList';

const RestaurantCategory = ({ cardCategory, showItems, setShowIndex }) => {
  // const [showItems, setShowItems] = useState(false);

  const handleClick = () => {
    setShowIndex(null)
  }
  return (
    <div>
      {/* Accordian Header */}
      <div className="w-6/12 mx-auto my-4 bg-gray-100 shadow-lg p-4">
        <div className='flex justify-between cursor-pointer' onClick={handleClick}>
          <span className="font-bold text-lg">
            {cardCategory.title} ({cardCategory.itemCards.length})
          </span>
          {showItems ?  <span>⬆️</span> : <span>⬇️</span>}
        </div>

        {/* Accordian Body */}
        {showItems && <ItemList items={cardCategory.itemCards}></ItemList>}
        {/* <ItemList items={cardCategory.itemCards}></ItemList> */}
      </div>
    </div>
  );
};

export default RestaurantCategory;
