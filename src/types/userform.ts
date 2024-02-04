export type Phones = {
    home: string;
    mobile: string;
  };
  
  export type UserInfoType = {
    name: string;
    email: string;
    dob: string;
    phones: Phones;
  };
  
  export type AddressType = {
    city: string;
    state: string;
    street: {
      line1: string;
      line2: string;
    };
  };
  
  export type UserPermissionsType = {
    delete: boolean;
    edit: boolean;
  };

  export type RoleType = "user" | "admin";
  
  
  export type Friend = {
    name: string;
    phone: string;
    relationship: string;
  };
  
  export type UserState = {
    info: UserInfoType;
    autoenroll: boolean;
    address: AddressType;
    permissions: UserPermissionsType;
    role: RoleType;
    friends: Friend[];
  };
  
  export type UserActions =
    | { type: 'UPDATE_INFO'; payload: Partial<UserInfoType> }
    | { type: 'UPDATE_ADDRESS'; payload: Partial<AddressType> }
    | { type: 'UPDATE_PERMISSIONS'; payload: Partial<UserPermissionsType> }
    | { type: 'UPDATE_ROLE'; payload: Partial<RoleType> }
    | { type: 'UPDATE_FRIENDS'; payload: Friend[] }
    | { type: 'CREATE_NEW_USER' };
  