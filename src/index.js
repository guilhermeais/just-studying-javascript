const Employee = require("./employee");
const assert = require("assert");
const Util = require("./util");

const GENDER = {
  male: "male",
  female: "female",
};

{
  const employee = new Employee({
    name: "Guilherme Teixeira Ais",
    gender: GENDER.female,
  });

  assert.throws(() => employee.birthYear, {
    message: "you must define age first!!",
  });
}

{
  const employee = new Employee({
    name: "Guilherme",
    gender: GENDER.male,
    age: 18,
  });

  assert.deepStrictEqual(employee.name, "Mr. Guilherme");
  assert.deepStrictEqual(employee.age, undefined);
  assert.deepStrictEqual(employee.gender, undefined);
  assert.deepStrictEqual(employee.grossPay, Util.formatCurrency(5000.40));
}
