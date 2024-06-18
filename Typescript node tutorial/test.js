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

// async function demo() {
//   const name = "name";
//   const ln = setTimeout(() => {
//     return 10;
//   }, 1000);
//   console.log(name);
//   console.log(ln);
// }

// demo();

const map = new Map();
map.set("a", 1);
map.set("b", 4);
map.set("c", 3);
map.set("d", 0);

let arr = [];

for (let [key, val] of map) {
  arr.push([key, val]);
}
const a = [];
a.push(...arr[0]);
console.log(a);
// console.log(arr.sort((a, b) => b[1] - a[1]));
