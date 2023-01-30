const INITIAL_STATE = {
  buildings: [],
};

export const buildingsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};
