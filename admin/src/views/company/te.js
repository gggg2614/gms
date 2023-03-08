let a = "123.xlxs";

b = a.split(".");
console.log(b[1] === "xlxs");

let c = [
  {
    column_1: 123,
    column_2: 123
  }
];

let d = c.map(x =>[{a:x.column_1}]).flat();
console.log(c);
console.log(d);
