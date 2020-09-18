const api = 'http://localhost:3000';

const headers = {
  Accept: 'application/json',
};

const getItems = (itemType) => {
  console.log('FETCHING', itemType);
  return fetch(`${api}/${itemType}`, { headers })
    .then((res) => res.json())
    .then(
      (data) => data,
      (error) => error
    );
};

export const getPhones = () => {
  return getItems('phones');
};

export const getSpecs = () => {
  return getItems('specs');
};

const getJoinedItems = (joinType) => {
  console.log('FETCHING', joinType);
  return fetch(`${api}/${joinType}`, { headers })
    .then((res) => res.json())
    .then(
      (data) => data.results,
      (error) => error
    );
};

export const getInnerJoin = () => {
  return getJoinedItems('innerjoin');
};

export const getLeftOuterJoin = () => {
  return getJoinedItems('leftouterjoin');
};

export const getRightOuterJoin = () => {
  return getJoinedItems('rightouterjoin');
};

export const getFullJoin = () => {
  return getJoinedItems('fulljoin');
};

export const getUnion = () => {
  return getJoinedItems('union');
};

export const getIntersection = () => {
  return getJoinedItems('intersection');
};

export const getDifference = () => {
  return getJoinedItems('difference');
};

export const getCrossJoin = () => {
  return getJoinedItems('crossjoin');
};

// export const enableTrigger = () => {
//   return fetch(`${api}/trigger`, { method: 'POST', headers })
//     .then((res) => res.json())
//     .then(
//       (data) => data.results,
//       (error) => error
//     );
// };

export const addPhone = (phone) => {
  return fetch(`${api}/phone`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(phone),
  })
    .then((res) => res.json())
    .then(
      (data) => data.results,
      (error) => error
    );
};
