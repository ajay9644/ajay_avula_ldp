function result(f, a) {
  //f is a function passed as paramerter , a is an array
  const res = new Array(a.length);
  for (let i = 0; i < a.length; i++) {
    res[i] = f(a[i]);
  }
  return res;
}

function cube(x) {
  return x * x * x;
}

const a = [1, 2, 3, 4];
console.log("The actual array is: " + a);
console.log(
  "The array after performing cube on each element: " + result(cube, a)
);
