import { useParams } from 'react-router-dom';
import Shimmer from './Shimmer';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';
import { useState } from 'react';

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (!resInfo) {
    return <Shimmer />;
  }

  const { name, costForTwoMessage, cuisines } =
    resInfo?.cards[2]?.card?.card?.info;
  const cards = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  const itemCards = [2, 1, 6, 4, 9]
    .map((index) => cards?.[index]?.card?.card?.itemCards)
    .find((item) => item !== undefined);

  const categories =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card?.['@type'] ===
        'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
    );
  //   const itemCards =
  //     resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
  //       .itemCards ||
  //     resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1].card?.card
  //       .itemCards ||
  //     resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[6]?.card?.card
  //       .itemCards ||
  //     resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card
  //       .itemCards;
  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(', ')}: {costForTwoMessage}
      </p>
      {/* categories accordian */}
      {categories.map((category, index) => (
        // This is a controlled component
        <RestaurantCategory
          key={category?.card?.card.title}
          cardCategory={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex = {() => setShowIndex(showIndex === index ? null : index)}
        ></RestaurantCategory>
      ))}
      {/* <ul> */}
      {/* {itemCards.map((item) => {
          const { id, name, defaultPrice, finalPrice, price } =
            item?.card?.info || {};
          const displayPrice = (defaultPrice || finalPrice || price) / 100;

          return (
            <li key={id}>
              {name} - Rs {displayPrice}
            </li>
          );
        })} */}
      {/* </ul> */}
    </div>
  );
};

export default RestaurantMenu;
