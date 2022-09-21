import { configureStore } from '@reduxjs/toolkit'
import connectWalletReducer from './connectWallet'

export default configureStore({
  reducer: {
    connectWallet: connectWalletReducer,
  },
})