const Employee = require("./employee");
const assert = require("assert");
const Util = require("./util");
const Manager = require("./manager");

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

// Mockando o Currenty year do Date.getFullYear. Para que os nossos testes não quebrem com a virada doo ano/século
const CURRENT_YEAR = 2021;
Date.prototype.getFullYear = () => CURRENT_YEAR;

{
  const employee = new Employee({
    name: "Guilherme",
    gender: GENDER.male,
    age: 18,
  });

  assert.deepStrictEqual(employee.name, "Mr. Guilherme");
  assert.deepStrictEqual(employee.age, undefined);
  assert.deepStrictEqual(employee.gender, undefined);
  assert.deepStrictEqual(employee.grossPay, Util.formatCurrency(5000.4));
  assert.deepStrictEqual(employee.netPay, Util.formatCurrency(4000.32));

  const expectedBirthYear = 2003;
  assert.deepStrictEqual(employee.birthYear, expectedBirthYear);

  // Como birthDay não tem setter, ele não deve mudar se tentarmos alterar o valor dele.
  const newAge = 80;
  const newYear = new Date().getFullYear() - newAge;
  employee.birthYear = newYear;
  assert.deepStrictEqual(employee.birthYear, expectedBirthYear);

  // Age tem setter, então se mudar o  age, o getter do birthDay vai mudar o retorno.
  employee.age = newAge;
  assert.deepStrictEqual(employee.birthYear, newYear);

  console.log("\n ---employee---");
  console.log("employee.name: ", employee.name);
  console.log("employee.age: ", employee.age);
  console.log("employee.gender: ", employee.gender);
  console.log("employee.grossPay: ", employee.grossPay);
  console.log("employee.netPay: ", employee.netPay);
}

{
  const manager = new Manager({
    name: "Maria",
    age: 20,
    gender: GENDER.female,
  });

  assert.deepStrictEqual(manager.name, "Ms. Maria");
  assert.deepStrictEqual(manager.age, undefined);
  assert.deepStrictEqual(manager.gender, undefined);
  assert.deepStrictEqual(manager.birthYear, 2001);
  assert.deepStrictEqual(manager.grossPay, Util.formatCurrency(5000.4));
  assert.deepStrictEqual(manager.bonusess, Util.formatCurrency(2000));
  assert.deepStrictEqual(manager.netPay, Util.formatCurrency(6000.32))

  console.log("\n ---manager---");
  console.log("manager.name: ", manager.name);
  console.log("manager.age: ", manager.age);
  console.log("manager.gender: ", manager.gender);
  console.log("manager.grossPay: ", manager.grossPay);
  console.log("manager.netPay: ", manager.netPay);
}
