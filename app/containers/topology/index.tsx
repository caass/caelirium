/* eslint-disable promise/always-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import find from 'local-devices';
import { Map } from 'react-feather';
import {
  selectDevices,
  startScanningNetwork,
  stopScanningNetwork,
  addDevices,
  startProbingDevices,
  clearDevices,
  stopProbingDevices
} from './slice';
import DeviceCard from '../../components/deviceCard';
import { ProbeStatus } from '../../utils/NetworkDevice';
import { parse as parseNmapResults, probeIPs } from '../../utils/nmap';
import PageHeader from '../../components/pageHeader';
import BigIcon from '../../components/bigIcon';

const Topology: React.FunctionComponent = () => {
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
    if (devices.length === 0) {
      return;
    }

    const devicesToProbe = devices
      .filter(({ probeStatus }) => probeStatus === ProbeStatus.NOT_STARTED)
      .map(({ ip }) => ip);

    if (devicesToProbe.length === 0) {
      return;
    }

    dispatch(startProbingDevices(devicesToProbe));
    probeIPs(devicesToProbe)
      .then(parseNmapResults)
      .then(({ run, devices: probedDevices }) => {
        // Debugging
        // console.log(run);
        // console.dir(probedDevices);
        dispatch(stopProbingDevices(probedDevices));
      })
      .catch(err => {
        // TODO: Handle errors lol
        throw err;
      });
  }, [devices]);

  return (
    <>
      <PageHeader title="Topology">
        <BigIcon ariaLabel="Network Topology Icon">
          <Map />
        </BigIcon>
      </PageHeader>
      <button aria-label="Scan for devices" onClick={scanNetwork} type="button">
        Scan
      </button>
      <button
        aria-label="Clear devices"
        onClick={() => dispatch(clearDevices())}
        type="button"
      >
        clear devices
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
    </>
  );
};

export default Topology;
