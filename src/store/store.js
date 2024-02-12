import { configureStore } from '@reduxjs/toolkit';

import tabReducer from './tabSlice';
import loadingReducer from './Loading'
import TOGGLELOADER from './Loader/OpenLoader';
import IsAdminLogged from './Auth/IsAdmin';
import IsLoggedIn from './Auth/Islogged';
import UserlnfoStored from './Auth/UserInfoStored';

const store = configureStore({
  reducer: {
    tab: tabReducer,
    loading: loadingReducer,
    TOGGLELOADER: TOGGLELOADER,
    IsAdminLogged: IsAdminLogged,
    IsLoggedIn: IsLoggedIn,
    UserlnfoStored: UserlnfoStored
  },
});

export default store;
