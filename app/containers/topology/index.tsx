/* eslint-disable promise/always-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import find from 'local-devices';

import { Map, XCircle, BarChart2, Loader } from 'react-feather';

import Container, { ContainerProps } from '../../components/container';
import DeviceCard from '../../components/deviceCard';
import Button from '../../components/button';

import { scanWrapper } from './styles.scss';
import { spin } from '../../styles/_animations.scss';

import {
  selectDevices,
  clearDevices,
  selectScanningNetwork,
  selectProbingDevices,
  selectLastRun,
  startScanningNetwork,
  stopScanningNetwork,
  addDevices,
  startProbingDevices,
  stopProbingDevices,
  updateLastRun
} from './slice';
import NetworkDevice, { ProbeStatus } from '../../utils/NetworkDevice';
import { parse as parseNmapResults, probeIPs } from '../../utils/nmap';

const Topology: React.FunctionComponent<ContainerProps> = ({
  next,
  prev
}: ContainerProps) => {
  const devices = useSelector(selectDevices);
  const isScanning = useSelector(selectScanningNetwork);
  const isProbing = useSelector(selectProbingDevices);
  const lastRun = useSelector(selectLastRun);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!lastRun) {
      return;
    }
    console.log(`Run completed in ${lastRun.elapsed}`);
  }, [lastRun]);

  const lightScan = async (): Promise<NetworkDevice[]> => {
    dispatch(startScanningNetwork());
    return find().then(foundDevices => {
      dispatch(stopScanningNetwork(null));
      const fullFoundDevices = foundDevices.map(({ name, ip, mac }) => ({
        name,
        ip,
        mac,
        ports: undefined,
        manufacturer: undefined,
        os: undefined,
        probeStatus: ProbeStatus.NOT_STARTED,
        probeError: undefined
      }));
      dispatch(addDevices(fullFoundDevices));
      return fullFoundDevices;
    });
  };

  const deepScan = (devicesToProbe: NetworkDevice[]) => {
    const ipsToProbe = devicesToProbe.map(({ ip }) => ip);

    dispatch(startProbingDevices(ipsToProbe));
    probeIPs(ipsToProbe)
      .then(parseNmapResults)
      .then(({ run, devices: probedDevices }) => {
        // Debugging
        // console.log(run);
        // console.dir(probedDevices);
        dispatch(stopProbingDevices(probedDevices));

        const failedProbes: NetworkDevice[] = devicesToProbe
          .filter(
            ({ ip: potentiallyUnprobedIP }) =>
              !probedDevices.map(({ ip }) => ip).includes(potentiallyUnprobedIP)
          )
          .map(d => ({
            name: d.name,
            ip: d.ip,
            mac: d.mac,
            online: d.online,
            lastboot: d.lastboot,
            vendor: d.vendor,
            os: d.os,
            probeStatus: ProbeStatus.FAILED,
            ports: d.ports
          }));

        dispatch(stopProbingDevices(failedProbes));

        dispatch(updateLastRun(run.time));
      })
      .catch(err => {
        // TODO: Handle errors lol
        throw err;
      });
  };

  return (
    <Container
      title="Topology"
      header={{
        icon: <Map />
      }}
      next={next}
      prev={prev}
    >
      <div
        className={`${scanWrapper} flex flex-row justify-center items-baseline mb-2`}
      >
        <Button
          icon={isScanning ? <Loader className={spin} /> : <BarChart2 />}
          text="Scan Network"
          onClick={() => lightScan().then(deepScan)}
          buttonType="default"
        />
        {devices.length > 0 ? (
          <Button
            icon={<XCircle />}
            text="Clear Devices"
            onClick={() => dispatch(clearDevices())}
            buttonType="warning"
            disabled={isScanning || isProbing}
          />
        ) : (
          ''
        )}
      </div>
      <div className="flex flex-row flex-wrap items-start content-start justify-center">
        {devices.map(d => (
          <DeviceCard key={d.ip} device={d} />
        ))}
      </div>
    </Container>
  );
};

export default Topology;
