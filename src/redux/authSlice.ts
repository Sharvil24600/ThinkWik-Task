import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
}

interface UserState {
  user: User | null;
}

const persistedUser = JSON.parse(localStorage.getItem('user') || 'null');

const initialState: UserState = {
  user: persistedUser,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
        },
   loginUser: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;

      if (state.user && state.user.email === email && state.user.password === password) {
        state.user = {
          ...state.user,
          isLoggedIn: true,
        };
        localStorage.setItem('user', JSON.stringify(state.user)); // Update localStorage item
      }
    },
     logout: (state) => {
      if (state.user) {
        state.user = {
          ...state.user,
          isLoggedIn: false,
        };
        localStorage.setItem('user', JSON.stringify(state.user)); // Update localStorage item
      }
    },
   
  },
});

export const { addUser, loginUser,logout } = userSlice.actions;

export default userSlice.reducer;
