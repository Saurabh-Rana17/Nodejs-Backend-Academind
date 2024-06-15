// const fs = require("fs");
// fs.writeFileSync(
//   "hello.txt",
//   "This file is crreated using node js asynchronously"
// );

// const hobby = ["dfs", 3, 54, "fsdfs"];
// console.log(hobby.map());
// const person = {
//   a: "fd",
//   b: "sd",
// };
// let { a, b } = person;
// a = "0";

// b = "z";

// console.log(a, b, person);

async function demo() {
  const name = "name";
  const ln = setTimeout(() => {
    return 10;
  }, 1000);
  console.log(name);
  console.log(ln);
}

demo();
