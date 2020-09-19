import React from 'react';
import './style.css';

import Types from '../../types';
import inner from './inner.png';
import left_outer from './left_outer.png';
import right_outer from './right_outer.png';
import full_outer from './full_outer.png';
import trigger from './trigger.gif';

const data = {
  INNER_JOIN: {
    type: Types.INNER_JOIN,
    relAlg: ' Phones ⋈θ Specs',
    def: `In an inner join, only those tuples that satisfy
         the matching criteria are included, while the rest
        are excluded`,
    sql: `SELECT
    "Phones"."id" AS "Phone ID", "Specs"."id" AS "Spec ID",
    "Phones"."name", "company", "resolution", "size",
    "os", "chipset","ram", "memory",
    "mainCamera" AS "Main Camera", 
    "frontCamera" AS "Front Camera", "battery" 
FROM "Phones"
INNER JOIN "Specs"
ON "Phones"."name" = "Specs"."name;"
    `,
    img: inner,
  },
  LEFT_OUTER_JOIN: {
    type: Types.LEFT_OUTER_JOIN,
    relAlg: 'Phones ⟕ Specs',
    def: `In the left outer join, operation allows keeping
          all tuple in the left relation. However, if there 
          is no matching tuple is found in right relation, 
          then the attributes of right relation in the join 
          result are filled with null values.`,
    sql: `SELECT
    "Phones"."id" AS "Phone ID", "Specs"."id" AS "Spec ID",
    "Phones"."name" AS "Name (A)", "Specs"."name" AS "Name (B)",
    "company", "resolution", "size", "os", "chipset",
    "ram", "memory", "mainCamera" AS "Main Camera", 
    "frontCamera" AS "Front Camera", "battery" 
FROM "Phones"
LEFT OUTER JOIN "Specs"
ON "Phones"."name" = "Specs"."name";`,
    img: left_outer,
  },
  RIGHT_OUTER_JOIN: {
    type: Types.RIGHT_OUTER_JOIN,
    relAlg: 'Phones ⟖ Specs',
    def: `In the right outer join, operation allows keeping 
        all tuple in the right relation. However, if there is
        no matching tuple is found in the left relation, then
        the attributes of the left relation in the join result
        are filled with null values. 
    `,
    sql: `SELECT
    "Phones"."id" AS "Phone ID", "Specs"."id" AS "Spec ID",
    "Phones"."name" AS "Name (A)", "Specs"."name" AS "Name (B)",
    "company", "resolution", "size", "os", "chipset",
    "ram", "memory", "mainCamera" AS "Main Camera", 
    "frontCamera" AS "Front Camera", "battery" 
FROM "Phones"
RIGHT OUTER JOIN "Specs"
ON "Phones"."name" = "Specs"."name";`,
    img: right_outer,
  },
  FULL_JOIN: {
    type: Types.FULL_JOIN,
    relAlg: 'Phones ⟗ Specs',
    def: `In a full outer join, all tuples from both relations
        are included in the result, irrespective of the
        matching condition.`,
    sql: `SELECT
    "Phones"."id" AS "Phone ID", "Specs"."id" AS "Spec ID",
    "Phones"."name" AS "Name (A)", "Specs"."name" AS "Name (B)",
    "company", "resolution", "size", "os", "chipset",
    "ram", "memory", "mainCamera" AS "Main Camera", 
    "frontCamera" AS "Front Camera", "battery" 
FROM "Phones"
FULL JOIN "Specs"
ON "Phones"."name" = "Specs"."name";`,
    img: full_outer,
  },
  UNION: {
    type: Types.UNION,
    relAlg: 'Phones ∪ Specs',
    def: `It includes all tuples that are in tables 'Phones' or in
      'Specs'.`,
    sql: `SELECT "name"
FROM "Phones"
UNION 
SELECT "name"
FROM "Specs";
  `,
  },
  INTERSECTION: {
    type: Types.INTERSECTION,
    relAlg: 'Phones ∩ Specs',
    def: `Defines a relation consisting of a set of all tuple
         that are in both Phones and Specs. However,
         Phones and Specs must be union-compatible.`,
    sql: `SELECT "name" 
FROM "Phones"
INTERSECT
SELECT "name" 
FROM "Specs";`,
  },
  DIFFERENCE: {
    type: Types.DIFFERENCE,
    relAlg: 'Phones - Specs',
    def: `It is a relation which includes all tuples that are in Phones but not in Specs`,
    sql: `SELECT "name" 
FROM "Phones"
EXCEPT
SELECT "name" 
FROM "Specs";`,
  },
  CROSS_JOIN: {
    type: Types.CROSS_JOIN,
    relAlg: 'Phones X Specs',
    def: `Cartesian Product in DBMS is an operation used to merge columns from two relations.
It is also called Cross Product or Cross Join.`,
    sql: `SELECT 
    "Phones"."name" AS "Name (A)",
    "Specs"."name" AS "Name (B)"
FROM "Phones"
CROSS JOIN "Specs";`,
  },
  TRIGGER: {
    type: Types.TRIGGER,
    def: `PostgreSQL Triggers are database callback functions, which are
     automatically performed/invoked when a specified database event occurs.`,
    sql: `
    CREATE FUNCTION add_phone_to_spec() 
      RETURNS TRIGGER 
      LANGUAGE PLPGSQL 
      AS $$
    BEGIN
        INSERT INTO "Specs"("name")
        VALUES(NEW."name");
  
        RETURN NEW;
    END;
      $$

    CREATE  TRIGGER  "phone_to_spec"
    AFTER INSERT
    ON "Phones"
    FOR EACH ROW
      EXECUTE PROCEDURE add_phone_to_spec();
    `,
    img: trigger,
  },
};

const getData = (type) => {
  if (type === Types.INNER_JOIN) return data['INNER_JOIN'];
  else if (type === Types.LEFT_OUTER_JOIN)
    return data['LEFT_OUTER_JOIN'];
  else if (type === Types.RIGHT_OUTER_JOIN)
    return data['RIGHT_OUTER_JOIN'];
  else if (type === Types.FULL_JOIN) return data['FULL_JOIN'];
  else if (type === Types.UNION) return data['UNION'];
  else if (type === Types.INTERSECTION) return data['INTERSECTION'];
  else if (type === Types.DIFFERENCE) return data['DIFFERENCE'];
  else if (type === Types.CROSS_JOIN) return data['CROSS_JOIN'];
  else if (type === Types.TRIGGER) return data['TRIGGER'];
};

const Info = ({ type }) => {
  console.log(type);
  const data = getData(type);
  return data ? (
    <div className="Info">
      <div className="Info__Text">
        {data.relAlg && <h5>Relational Algebra</h5>}
        {data.relAlg && <p>{data.relAlg}</p>}

        <h5>Definition</h5>
        <p>{data.def}</p>

        <h5>SQL</h5>
        <pre>{data.sql}</pre>
      </div>
      <div className="Info__Diagram">
        {data.img ? <img src={data.img} /> : null}
      </div>
    </div>
  ) : null;
};

export default Info;
