import React from 'react';

const state = {
  tabbarIndex: 0, // tabbar index
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ModifyTabbarIndex':
      return {
        ...state,
        tabbarIndex: payload,
      };

    default: {
      return state;
    }
  }
};

const GlobalContext = React.createContext(null);

export { state, reducer, GlobalContext };
