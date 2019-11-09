import moment from 'moment';

export const convertArrayToString = arr => arr.map(val => `${val}`);

export const getNumberFromString = val => Number(val);
export const getBinaryFromString = val =>
  Number(
    Array.from(val.replace(' ', ''))
      .map(each => each.charCodeAt(0).toString(2))
      .join('')
  );
export const getNumberFromDate = val => moment(val).valueOf();
export const getNumberFromStringBool = val => Number(JSON.parse(val));
