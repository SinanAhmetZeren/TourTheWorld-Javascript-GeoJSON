function makeRequest(location) {
  return new Promise((resolve, reject) => {
    console.log(`making request to ${location}`);
    if (location === "google") {
      resolve("---- google says hi");
    } else {
      reject("---- rejected");
    }
  });
}

function processRequest(response) {
  return new Promise((resolve, reject) => {
    console.log("Processing response");
    resolve(`---- extra information + ${response} `);
  });
}



    // await new Promise(function(resolve, reject) {
    //   setTimeout(() => resolve(1), 1000)})
    //     ////////////////////////////////////
    //     .then(function(result) {
    //       console.log(result); // 1
    //       return new Promise((resolve, reject) => { // (*)
    //     setTimeout(() => resolve(2), 1000)})})
    //     ////////////////////////////////////
    //     .then(function(result) { // (**)
    //       console.log(result); // 2
    //       return new Promise((resolve, reject) => {
    //     setTimeout(() => resolve(3), 1000)})})
    //     ////////////////////////////////////
    //     .then(function(result) { // (**)
    //       console.log(result); // 2
    //       return new Promise((resolve, reject) => {
    //     setTimeout(() => resolve(4), 1000)})})
    //     ///////////////////////////////////
    //     .then(function(result) {
    //       console.log(result); // 4
    //     });


// makeRequest("google").then((res) => processRequest(res));

async function ikisi(location) {
  try {
    const response = await makeRequest(location);
    console.log("makerequest:");
    console.log(response);
    const sonuc = await processRequest(response);
    console.log("processrequest:");
    console.log(sonuc);
    return 1;
  } catch {
    console.log("error");
  }
}

// ikisi("google");

const myPromise = new Promise((resolve, reject) => {
  resolve("hello");
});

const fnc = async function () {
  const hello = await myPromise.then((hello) => hello);
  console.log("hello: ", hello);
  const hello1 = await myPromise.then((hello1) => hello1);
  console.log("hello1: ", hello1);
};

// fnc();

// let response;
let allCountryCodes = [];
const getCountries = async function () {
  await fetch(`https://restcountries.eu/rest/v2/all`)
    .then((resp) => resp.json())
    .then((res) => {
      response = res;
    });

  response.forEach((country, i) => {
    allCountryCodes[i] = country.alpha3Code;
    // console.log(country.alpha2Code);
  });

  const allcountries = allCountryCodes.join('","');
  // console.log(allcountries);
};

response = getCountries();

// console.log(response);
// response.forEach((country) => {
//   allCountryCodes.append(country.alpha2Code);
// });

// console.log(allCountryCodes);
// console.log(response[i].alpha2code);
// prettier-ignore
let ar = ["AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BQ","BA","BW","BV","BR","IO","UM","VG","VI","BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","CX","CC","CO","KM","CG","CD","CK","CR","HR","CU","CW","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","ET","FK","FO","FJ","FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","VA","HN","HK","HU","IS","IN","ID","CI","IR","IQ","IE","IM","IL","IT","JM","JP","JE","JO","KZ","KE","KI","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MO","MK","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","NC","NZ","NI","NE","NG","NU","NF","KP","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN","PL","PT","PR","QA","XK","RE","RO","RU","RW","BL","SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SX","SK","SI","SB","SO","ZA","GS","KR","SS","ES","LK","SD","SR","SJ","SZ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UY","UZ","VU","VE","VN","WF","EH","YE","ZM","ZW"]

// let ar = [1, 2, 3, 4, 5, 6, 7];
// let sayı = 5;
// const index = ar.indexOf("AF");
// console.log(index);
// ar.splice(index, 1);
// console.log(ar);

// const rem = function (code) {
//   const index = ar.indexOf(code);
//   console.log(index);
//   ar.splice(index, 1);
//   console.log(ar);
// };

// for (let i = 0; i < 230; i++) {
//   rem("AF");
// }

// let arr1 = [1, 2, 3, 4, 5, 6];
// let arr2 = [5, 6, 7, 8, 9];
// let difference = arr1.filter((x) => !arr2.includes(x));
// console.log(difference);

// let a = 1;
// a += 1;
// console.log(a);
