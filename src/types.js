const Types = {
  INNER_JOIN: 'Inner Join',
  LEFT_OUTER_JOIN: 'Left Outer Join',
  RIGHT_OUTER_JOIN: 'Right Outer Join',
  FULL_JOIN: 'Full Join / Full Outer Join',
  UNION: 'Union',
  INTERSECTION: 'Intersection',
  DIFFERENCE: 'Difference',
  CROSS_JOIN: 'Cross Join / Cartesian Product',
  TRIGGER: 'Trigger',
};

Object.freeze(Types);
export default Types;
