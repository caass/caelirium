/* eslint-disable promise/always-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import find from 'local-devices';
import {
  selectDevices,
  startScanningNetwork,
  stopScanningNetwork,
  addDevices,
  startProbingDevice
} from './slice';
import routes from '../routes.json';
import DeviceCard from './deviceCard';
import { ProbeStatus } from './NetworkDevice';

export default function Topology() {
  const devices = useSelector(selectDevices);
  const dispatch = useDispatch();

  const scanNetwork = () => {
    dispatch(startScanningNetwork());
    find()
      .then(foundDevices => {
        dispatch(stopScanningNetwork(null));
        dispatch(
          addDevices(
            foundDevices.map(({ name, ip, mac }) => ({
              name,
              ip,
              mac,
              ports: undefined,
              manufacturer: undefined,
              os: undefined,
              probeStatus: ProbeStatus.NOT_STARTED,
              probeError: undefined
            }))
          )
        );
      })
      .catch(err => {
        dispatch(stopScanningNetwork(err));
      });
  };

  useEffect(() => {
    devices
      .filter(({ probeStatus }) => probeStatus === ProbeStatus.NOT_STARTED)
      .forEach(({ ip }) => {
        dispatch(startProbingDevice(ip));
      });
  }, [devices]);

  return (
    <div>
      <Link to={routes.HOME}>home</Link>
      <button aria-label="Scan for devices" onClick={scanNetwork} type="button">
        Scan
      </button>
      <div>
        <ol>
          {devices.map(d => (
            <li key={d.ip}>
              <DeviceCard device={d} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
