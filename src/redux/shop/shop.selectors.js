import { createSelector } from "reselect";

// this maps the string value to the collection id
//here we use an object

const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
};

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

//now as we have changed shop data into an object, electCollections doesnot work anymore since it takes in arrays
// we will use Object.keys passing in collections
//and map overteh aeeay of keys and return the value of the collections object at that key
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);

//this function takes in the collectionUrlParam
// it will return createselector call
//this gets selectCollections
//and then collections.find, which looks for the same collection id that matches with the COLLECTION_ID_MAP
//thei is an example of a curried function; function that returns another function
export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  );
