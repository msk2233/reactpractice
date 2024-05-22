let firstName: String = "type script"; // type string
let Age = 50;

console.log(typeof firstName);
console.log(typeof Age);

const Car: { type: string, mileage?: number } = { 
    type: "Toyota",
  };
  Car.mileage = 2000;

  console.log(Car);
  
  function printStatusCode(code: string | number) {
    console.log(`My status code is ${code}.`)
  }
  
  printStatusCode(1000);
  printStatusCode('abcj');