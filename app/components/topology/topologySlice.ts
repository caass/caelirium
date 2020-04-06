import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDevice } from 'local-devices';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const topologySlice = createSlice({
  name: 'topology',
  initialState: {
    devices: Array<IDevice>(),
    scanning: false,
    scanError: null as Error | null
  },
  reducers: {
    addDevice: (state, action: PayloadAction<IDevice>) => {
      state.devices.push(action.payload);
    },
    removeDevice: (state, action: PayloadAction<IDevice>) => {
      state.devices.splice(state.devices.indexOf(action.payload), 1);
    },
    clearDevices: state => {
      state.devices = Array<IDevice>();
    },
    startScanningForDevices: state => {
      state.scanning = true;
    },
    stopScanningForDevices: (state, action: PayloadAction<Error | null>) => {
      state.scanning = false;
      state.scanError = action.payload;
    }
  }
});

export const {
  addDevice,
  removeDevice,
  clearDevices,
  startScanningForDevices,
  stopScanningForDevices
} = topologySlice.actions;

export default topologySlice.reducer;

export const selectDevices = (state: RootState) => state.topology.devices;
