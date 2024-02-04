import React, { createContext, useReducer, ReactNode } from 'react';
import { UserActions, UserState } from '../types/userform';

const initialState: UserState = {
  info: {
    name: '',
    email: '',
    dob: '',
    phones: {
      home: '',
      mobile: '',
    },
  },
  autoenroll: true,
  address: {
    city: '',
    state: '',
    street: {
      line1: '',
      line2: '',
    },
  },
  permissions: {
    delete: false,
    edit: false,
  },
  role: 'user',
  friends: [],
};

const userReducer = (state: UserState, action: UserActions): UserState => {
  switch (action.type) {
    case 'UPDATE_INFO':
      return {
        ...state,
        info: { ...state.info, ...action.payload },
      };
    case 'UPDATE_ADDRESS':
      return {
        ...state,
        address: { ...state.address, ...action.payload },
      };
    case 'UPDATE_PERMISSIONS':
      return {
        ...state,
        permissions: { ...state.permissions, ...action.payload },
      };
    case 'UPDATE_ROLE':
      return {
        ...state,
        role: action.payload,
      };
    case 'UPDATE_FRIENDS':
      return {
        ...state,
        friends: action.payload,
      };
    case 'CREATE_NEW_USER':
      return initialState; // Reset state for a new user
    default:
      return state;
  }
};

type UserContextType = {
  state: UserState;
  dispatch: React.Dispatch<UserActions>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
    children: ReactNode;
  };
  
  const UserProvider = ({ children }: UserProviderProps) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
  
    return (
        <UserContext.Provider value={{ state, dispatch }}>
        {children}
      </UserContext.Provider>
    )
  }
  


export { UserProvider };
