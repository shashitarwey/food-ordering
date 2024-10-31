import { RESTAURANT_LOGO_URL } from '../utils/constants';
import { addItem } from '../utils/cartSlice';
import { useDispatch } from 'react-redux';

const ItemList = ({ items }) => {

  const dispatch = useDispatch()
  const handleAddItem = (item) => {
    // here pizza is action.payload in cartSlice
    dispatch(addItem(item));
  }
  return (
    <div>
      {items.map((item) => (
        <div
          data-testid="foodItems"
          key={item.card.info.id}
          className="p-2 m-2 border-gray-200 border-b-2 text-left"
        >
          <div className="py-2 flex justify-between items-start">
            <div className="w-9/12">
              <div>
                <span className="font-semibold">{item?.card?.info?.name}</span>
                <p className="mt-1">
                  ₹
                  {(item?.card?.info?.price || item?.card?.info?.defaultPrice) /
                    100}
                </p>
                <p className="mt-2 text-xs">
                  {item?.card?.info?.ratings?.aggregatedRating?.rating} (
                  {item.card.info.ratings.aggregatedRating.ratingCountV2})
                </p>
              </div>
              <p className="text-xs mt-2">{item?.card?.info?.description}</p>
            </div>

            <div className="w-3/12 p-4">
              <div className="absolute">
                <button
                  className="p-2 bg-white shadow-lg absolute mx-[44px] rounded-md mt-2"
                  onClick={() => handleAddItem(item)}
                >
                  Add+
                </button>
              </div>
              <img src={RESTAURANT_LOGO_URL} className="rounded-md" />

              {/* <p>Customisale</p> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
