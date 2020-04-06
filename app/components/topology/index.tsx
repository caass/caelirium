import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import find from 'local-devices';
import { Link } from 'react-router-dom';
import {
  selectDevices,
  startScanningForDevices,
  stopScanningForDevices,
  clearDevices,
  addDevice
} from './topologySlice';
import routes from '../routes.json';

export default function Topology() {
  const devices = useSelector(selectDevices);
  const dispatch = useDispatch();

  const scanForDevices = () => {
    dispatch(startScanningForDevices());
    find()
      // eslint-disable-next-line promise/always-return
      .then(foundDevices => {
        dispatch(clearDevices());
        foundDevices.forEach(d => dispatch(addDevice(d)));
        dispatch(stopScanningForDevices(null));
      })
      .catch(err => {
        dispatch(stopScanningForDevices(err));
      });
  };

  return (
    <div>
      <Link to={routes.HOME}>home</Link>
      <button
        aria-label="Scan for devices"
        onClick={scanForDevices}
        type="button"
      >
        Scan
      </button>
      <div>
        <ol>
          {devices.map(({ name, ip, mac }) => (
            <li key={mac}>
              <ul>
                <li>{name}</li>
                <li>{ip}</li>
                <li>{mac}</li>
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
