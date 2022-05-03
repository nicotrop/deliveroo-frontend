const testArr = [
  {
    id: 11111,
    name: "tantine",
  },
  { id: 22222, name: "tontine" },
  { id: 33333, name: "tartine" },
];

const Tab = [
  {
    id: 11112,
    name: "blue",
  },
];

/* for (let i = 0; i < testArr.length; i++) {
  //   console.log(testArr[i]);
  if (testArr[i].id === 11111) {
    console.log(testArr[i].id);
  }
} */

console.log(testArr.filter((element) => element.id === Tab[0].id).length > 1);
