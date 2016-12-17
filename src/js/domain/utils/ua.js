/**
 *
 * @returns {*}
 */
export const isIOS = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/iphone/) || ua.match(/ipad/) || ua.match(/ipod/)) {
    return true;
  }
  return false;
};
