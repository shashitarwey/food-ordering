// import { restaurantList } from '../data/mockData';
import { useEffect, useState, useContext } from 'react'; // named Import
import RestaurentCard, { withPromotedLable } from './RestaurantCard'; // Deafult Import
import Shimmer from './Shimmer'; // Deafult Import
import { Link } from 'react-router-dom';
import { RESTAURANT_LIST_URL } from '../utils/constants';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';

// not using keys ( not acceptable ) <<<< index as key <<<<<<<<<<< unique id ( best practice )
const Body = () => {
  // Local State Variable - Super Powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState('');

  const RestaurantCardPromoted = withPromotedLable(RestaurentCard);

  // If no dependency array then useEffect is called on every render of the component.
  // If dependency array is empty ([]) then useEffect is called only on initial render i.e. only once.
  // If dependency array is non-empty then useEffect is called only when dependency array changes.
  useEffect(() => {
    fetchData();
  }, []);

  // whenever state variable changes/update, react triggers a reconciliation  cycle(re renders the component)
  const fetchData = async () => {
    // We can use corsrpoxy.io as well
    // const data = await fetch(
    //   'https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5997584&lng=77.3500049&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
    // );
    const data = await fetch(RESTAURANT_LIST_URL);
    const json = await data.json();
    // console.log('dddd', json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
    setListOfRestaurants(
      // Optional Chaining
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    // If we don't do this then after search if we refresh the page we see empty page
    setFilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  if (!onlineStatus) {
    return (
      <h1>Looks like you're Offline!! Please check your internet connection</h1>
    );
  }

  const { loggedInUser, setUserName } = useContext(UserContext);

  // This is known as conditional rendering
  // if(!listOfRestaurants.length) {
  //   return <Shimmer/>
  // }

  return !listOfRestaurants.length ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex">
        <div className="m-4 p-4">
          <input
            type="text"
            placeholder="Search for Restaurants"
            data-testid='searchInput'
            className="border border-solid border-black rounded-sm h-8 p-4"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            className="px-4 py-2 mx-4 bg-green-100 rounded-lg"
            onClick={() => {
              const filteredList = listOfRestaurants.filter((restaurant) => {
                const regex = new RegExp(searchText, 'i'); // 'i' for case-insensitive matching
                return regex.test(restaurant.info.name);
              });
              setFilteredRestaurant(filteredList);
            }}
          >
            Search
          </button>
        </div>
        <div className="m-4 p-4 flex items-center">
          <button
            className="px-4 bg-gray-100 rounded-lg h-8"
            onClick={() => {
              const filteredList = listOfRestaurants.filter((restaurant) => {
                // Filter only Restaurants having rating 4+
                return restaurant.info.avgRating > 4;
              });
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated Restaurant
          </button>
        </div>
        <div className="m-4 p-4 flex items-center">
          <label>UserName</label>
          <input
            placeholder="Enter User Name"
            className="border border-black rounded-md ml-2 px-4"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurant.map((restaurent) => (
          <Link
            to={'/restaurants/' + restaurent.info.id}
            key={restaurent.info.id}
          >
            {/* If a restaurant is open then add a open label to it */}
            {restaurent.info.isOpen ? (
              <RestaurantCardPromoted resData={restaurent.info} />
            ) : (
              <RestaurentCard resData={restaurent.info} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
