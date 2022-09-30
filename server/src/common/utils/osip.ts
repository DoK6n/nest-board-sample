import { config } from 'process';

const os = require('os');

export const getMyIp = (): string => {
  const ifaces = os.networkInterfaces();
  let ip = '';
  Object.keys(ifaces).forEach(key => {
    for (let i = 0, len = ifaces[key].length; i < len; i++) {
      const details = ifaces[key][i];
      if (
        (key.indexOf('Wi-Fi') !== -1 || // windows
          key.indexOf('이더넷') !== -1 || // windows
          key.indexOf('en6') !== -1 || // macOS 이더넷
          key.indexOf('en0') !== -1) && // macOS Wi-Fi
        details.family === 'IPv4'
      ) {
        ip = details.address;
      }
    }
  });
  return ifaces.hasOwnProperty('Wi-Fi') ||
    ifaces.hasOwnProperty('이더넷') ||
    ifaces.hasOwnProperty('en6') ||
    ifaces.hasOwnProperty('en0')
    ? ip
    : 'localhost';
};
