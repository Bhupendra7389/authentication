const initialState = {
  data: [],
  members: []
};
const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "SHOW_DATA_ASYNC": {
      newState.data = action.payload;
      break;
    }
    case "ADD_MEM": {
      newState.members = action.payload;
      break;
    }

    default:
  }
  return newState;
};
export default reducer;
