// userAgent.js
import UAParser from 'ua-parser-js';

const parser = new UAParser();

export function getDeviceInfo() {
  const result = parser.getResult();

  return result 
  // {
  //   device: result.device.model || 'Unknown',
  //   deviceVersion: result.os.version || 'Unknown',
  //   browser: result.browser.name || 'Unknown',
  //   browserVersion: result.browser.version || 'Unknown',
  //   userAgent: result.ua,
  // }
}