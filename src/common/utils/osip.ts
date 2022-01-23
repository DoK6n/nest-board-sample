const os = require('os');

export const getMyIp = (): string => {
  const ifaces = os.networkInterfaces();
  let ip = '';
  Object.keys(ifaces).forEach(key => {
    for (let i = 0, len = ifaces[key].length; i < len; i++) {
      const details = ifaces[key][i];
      if ((key === 'Wi-Fi' || key.indexOf('이더넷') !== -1) && details.family === 'IPv4') {
        ip = details.address;
      }
    }
  });

  return ifaces.hasOwnProperty('Wi-Fi') || ifaces.hasOwnProperty('이더넷') ? ip : 'localhost';
};
