import { createSlice } from '@reduxjs/toolkit'

export const connectWalletSlice = createSlice({
  name: 'connectWallet',
  initialState: {
    connected: false,
    currAddress: '0x',
  },
  reducers: {
    connect: (state, action) => {
      state.connected = action.payload.connected;
      state.currAddress = action.payload.currAddress;
    },
  },
})

// Action creators are generated for each case reducer function
export const { connect } = connectWalletSlice.actions

export default connectWalletSlice.reducer