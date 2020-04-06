import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import NetworkDevice, { ProbeStatus } from './NetworkDevice';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const topologySlice = createSlice({
  name: 'topology',
  initialState: {
    devices: Array<NetworkDevice>(),
    scanningNetwork: false,
    scanError: null as Error | null
  },
  reducers: {
    addDevices: (state, action: PayloadAction<NetworkDevice[]>) => {
      const newDevices = action.payload.filter(
        ({ ip }) => !state.devices.map(d => d.ip).includes(ip)
      );
      state.devices.push(...newDevices);
    },
    removeDevice: (state, action: PayloadAction<NetworkDevice>) => {
      state.devices.splice(state.devices.indexOf(action.payload), 1);
    },
    clearDevices: state => {
      state.devices = Array<NetworkDevice>();
    },
    startScanningNetwork: state => {
      state.scanningNetwork = true;
    },
    stopScanningNetwork: (state, action: PayloadAction<Error | null>) => {
      state.scanningNetwork = false;
      state.scanError = action.payload;
    },
    startProbingDevice: (state, action: PayloadAction<string>) => {
      const device = state.devices.find(({ ip }) => ip === action.payload);
      if (device) {
        device.probeStatus = ProbeStatus.IN_PROGRESS;
      }
    }
  }
});

export const {
  addDevices,
  removeDevice,
  clearDevices,
  startScanningNetwork,
  stopScanningNetwork,
  startProbingDevice
} = topologySlice.actions;

export default topologySlice.reducer;

export const selectDevices = (state: RootState) => state.topology.devices;
