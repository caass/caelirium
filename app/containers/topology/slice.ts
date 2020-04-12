import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import NetworkDevice, { ProbeStatus } from '../../utils/NetworkDevice';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../redux/store';

const topologySlice = createSlice({
  name: 'topology',
  initialState: {
    devices: Array<NetworkDevice>(),
    scanningNetwork: false,
    scanError: null as Error | null,
    lastRun: undefined as
      | undefined
      | {
          started: string;
          ended: string;
          elapsed: string;
        }
  },
  reducers: {
    addDevices: (state, action: PayloadAction<NetworkDevice[]>) => {
      const newDevices = action.payload.filter(
        ({ ip }) => !state.devices.map(d => d.ip).includes(ip)
      );
      state.devices.push(...newDevices);
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
    startProbingDevices: (state, action: PayloadAction<string[]>) => {
      state.devices
        .filter(({ ip }) => action.payload.includes(ip))
        .forEach(d => {
          d.probeStatus = ProbeStatus.IN_PROGRESS;
        });
    },
    stopProbingDevices: (state, action: PayloadAction<NetworkDevice[]>) => {
      action.payload.forEach(d => {
        state.devices[state.devices.findIndex(({ ip }) => ip === d.ip)] = d;
      });
    },
    updateLastRun: (
      state,
      action: PayloadAction<{
        started: string;
        ended: string;
        elapsed: string;
      }>
    ) => {
      state.lastRun = action.payload;
    }
  }
});

export const {
  addDevices,
  clearDevices,
  startScanningNetwork,
  stopScanningNetwork,
  startProbingDevices,
  stopProbingDevices,
  updateLastRun
} = topologySlice.actions;

export default topologySlice.reducer;

export const selectDevices = (state: RootState) => state.topology.devices;
export const selectScanningNetwork = (state: RootState) =>
  state.topology.scanningNetwork;
export const selectProbingDevices = (state: RootState) =>
  state.topology.devices.filter(
    ({ probeStatus }) => probeStatus === ProbeStatus.IN_PROGRESS
  ).length > 0;
export const selectLastRun = (state: RootState) => state.topology.lastRun;
