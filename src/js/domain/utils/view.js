import railwayConfig from '../../config/railway';
/**
 *
 * @returns {*}
 */
export const bodyBg = (index) => {
  const body = document.querySelector('body');
  if (isNaN(index)) {
    body.style.backgroundColor = 'rgba(239,239,244,1)';
  } else {
    body.style.backgroundColor = `rgba(${railwayConfig[index].color},1)`;
  }
};
