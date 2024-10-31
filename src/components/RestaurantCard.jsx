// Named Import
import { RESTAURANT_LOGO_URL } from '../utils/constants';
const RestaurentCard = (props) => {
  const { resData } = props;
  const {
    name,
    cuisines,
    avgRating,
    costForTwo,
    sla: { deliveryTime },
  } = resData;
  return (
    <div data-testid="resCard" className="p-2 m-4 w-[250px] bg-gray-100 rounded-lg shadow-lg hover:bg-gray-300">
      <img
        className="rounded-md"
        alt="restaurent-logo"
        src={RESTAURANT_LOGO_URL}
      ></img>
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4 className="my-2">{cuisines.join(', ')}</h4>
      <h5 className="my-2">{avgRating} Stars</h5>
      <h5 className="my-2">{costForTwo}</h5>
      <h5 className="my-2">{deliveryTime} mins</h5>
    </div>
  );
};

// Highher Order Component

// Input - RestuarantCard => RestaurantCardPromoted

export const withPromotedLable = (RestaurentCard) => {
  return (props) => {
    return (
      <div>
        {props.resData.isOpen ? (
          <label className="p-2 m-2 absolute text-white bg-black rounded-md">
            Open
          </label>
        ) : (
          <label className="p-2 m-2 absolute text-white bg-red-400 rounded-md">
            Close
          </label>
        )}
        <RestaurentCard {...props} />
      </div>
    );
  };
};

export default RestaurentCard;
