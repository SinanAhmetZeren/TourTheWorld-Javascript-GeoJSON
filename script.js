"use strict";
import { geoJsonData } from "./geojson.js";
import { dontgo2, dontgo3, allCountriesArray2,allCountriesArray3, allCountriesDict2to3, allCountriesDict3to2 } from "./data.js";


class App {
  #map;
  #mapZoomLevel = 5;
  #country;
  #country_code;
  #current_country;
  #fligths = 0;
  #flag;
  #itinerary = [];
  #visitedCountries2to3 = {};
  #visitedCountriesArray2 = dontgo2;
  #visitedCountriesArray3 = dontgo3;
  #visitedCountries3to2 = {};
  #unvisitedNeigbours = [];
  #unvisitedCountries2 = allCountriesArray2;
  // let difference = arr1.filter(x => !arr2.includes(x));

  #unvisitedCountries3 = allCountriesArray3;
    // prettier-ignore
  // #dontgo =["ASM", "ATA", "ABW", "BMU", "BES", "BVT", "VIR", "CYM", "TCD", "CXR", "CCK", "COM", "COK", "CUW", "ESH", "FRO", "FJI", "PYF", "ATF", "GMB", "GRD", "GLP", "GUM", "HMD", "VAT", "KWT", "MAC", "MTQ", "MCO", "MSR", "NCL", "NFK", "MNP", "PLW", "PSE", "PRI", "REU", "SHN", "KNA", "SMR", "SGP", "SXM", "SLB", "SGS", "SSD", "TUV", "VUT", "WLF"]
  #input = document.getElementById("input");
  #button_plane = document.getElementById("button_plane");
  #button_car = document.getElementById("button_car");
  #itinerary_button = document.getElementById("itinerary");
  #airplane = document.getElementById("airplane");
  #car = document.getElementById("car");
  #name = document.getElementById("name2");
  #population = document.getElementById("population2");
  #currency = document.getElementById("currency2");
  #languages = document.getElementById("languages2");
  #area = document.getElementById("area2");
  #capital = document.getElementById("capital2");

  constructor() {
    this._getPosition();
    // prettier-ignore
    this.#itinerary_button.addEventListener("click", this._displayItinerary.bind(this));
    // prettier-ignore
    this.#button_plane.addEventListener("click",this._gotoRandomCountry.bind(this));
    this.#button_car.addEventListener("click", this._gotoNeighbour.bind(this));
    // console.log( this.#unvisitedCountries3)
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
    const coords = [latitude, longitude];
    this.#map = L.map("map").setView(coords, this.#mapZoomLevel);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    this.#map.on("click", this._handleClick.bind(this));
    this._findCountry(coords);
  }

  _handleClick(e) {
    this._getCoordinates(e).then((coords) => {
      this._findCountry(coords);
      this._moveToClick(coords);
    });
  }

  //----------------------------------------------------------------------
  //----------- GET COORDINATES OF CLICK ---------------------------------
  //----------------------------------------------------------------------

  _getCoordinates(e) {
    return new Promise(function (resolve) {
      const coords = [e.latlng.lat, e.latlng.lng];
      resolve(coords);
    });
  }

  //----------------------------------------------------------------------
  //----------- REVERSE GEOCODING ----------------------------------------
  //----------- FIND COUNTRY NAME AND CODE -------------------------------

  _findCountry(coords) {
    let lat = coords[0] % 360;
    let lon = coords[1] % 360;
    if (lon < -180) lon += 360;
    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=c79bbdca11af4d3e9c743c14669e486a`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          this.#country = result.features[0].properties.country;
          this.#country_code = result.features[0].properties.country_code;
          console.log(result.features[0].properties.country);
        }
        if (this.#country_code === "ESH") {
          this.country = "Morocco"
          return "MAR"
        }
        return this.#country_code;
        
      })
      .then((code) => {
        this._popCountry(code);
        this._findFlagAndNeighbors(code);
        // this._displayCountryOnMap(code, "purple");
      })
      .catch((error) => console.log("error", error));
  }

  _popCountry(code) {
    const uppercaseCode2 = code.toUpperCase();
    const [uppercaseCode3] = allCountriesDict2to3[uppercaseCode2];
    this.#visitedCountries2to3[uppercaseCode2] = uppercaseCode3
    this.#visitedCountries3to2[uppercaseCode3] = uppercaseCode2
    if (!this.#visitedCountriesArray2.includes(uppercaseCode2))
    {
    this.#visitedCountriesArray2.push(uppercaseCode2)
    this.#visitedCountriesArray3.push(uppercaseCode3)
  }
    delete this.#unvisitedCountries2.uppercaseCode2;
    delete this.#unvisitedCountries3.uppercaseCode3;
    this._updateVisitedAndFlights();
  }

  //----------------------------------------------------------------------
  //----------- FETCH AND DISPLAY COUNTRY FLAG ---------------------------
  //----------------------------------------------------------------------

  _addToItinerary(country, travelBy) {
    this.#itinerary.push([country, travelBy]);
  }

  _addMarker(seconds, flagurl, coords) {
    let newMarker = L.icon({
      iconUrl: flagurl,
      iconSize: [60, 40],
      popupAnchor: [0, 0],
    });
    setTimeout(() => {
      L.marker(coords, { icon: newMarker })
        .addTo(this.#map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
          })
        );
    }, seconds * 1000);
  }

  // _addGeoJsonData(countrycode) {
  //   console.log(geoJsonData.features[0].properties.ISO2);
  // }

  _findFlagAndNeighbors(code) {
    if (code) {
      this.#current_country = code;
      fetch(`https://restcountries.eu/rest/v2/alpha/${code}`)
        .then((response) => response.json())
        .then((res) => {
          this.#flag = document.getElementById("flag-image");
          this.#flag.src = `${res.flag}`;
          const neighbours = document.getElementById("dashboard-neighbours");
          this.#name.innerHTML = `${res.name}`;
          // prettier-ignore
          this.#population.innerHTML = `${+(res.population / 1000000).toFixed(1)} million`;
          this.#currency.innerHTML = `${res.currencies[0].name}`;
          this.#languages.innerHTML = `${res.languages[0].name}`;
          this.#area.innerHTML = `${res.area.toLocaleString()} km2`;
          this.#capital.innerHTML = `${res.capital}`;
          let countrysNeighbours3 = res.borders;
          // console.log(res);
          // console.log("-------------", res.name,"-----------");
          // console.log(res.name,"all neigbours 3:" ,countrysNeighbours3);
          // console.log(res.name,"all visited countries 2", this.#visitedCountriesArray2);
          // console.log(res.name,"all visited countries 3",this.#visitedCountriesArray3);
          this.#unvisitedNeigbours = []
          countrysNeighbours3.forEach((code3) =>{
            if (!this.#visitedCountriesArray3.includes(code3)  && !dontgo3.includes(code3) )
                {
                  this.#unvisitedNeigbours.push(code3)
                }
          })
          console.log( res.name, "unvisited neigbors are:",this.#unvisitedNeigbours)

          
          if (this.#visitedCountriesArray2.length == 50) {
            this._addMarker(2, res.flag, res.latlng);
            this._displayCountryOnMap(res.alpha2Code, "red");
            this.#itinerary.push(["Started in", res.name]);
          }

          neighbours.innerHTML = "";
          if (this.#unvisitedNeigbours.length === 0) {
            this.#button_car.disabled = true;
            // this.#button_plane.style.opacity = 1;
            // this.#button_plane.disabled = false;
            // prettier-ignore
            neighbours.insertAdjacentHTML("beforeend",`<div>Welcome to ${res.capital}! <br/><br/>  You need to take a flight!<div\>`);
            this.#input.placeholder = "You need to take a flight";
            // this.#button_plane.classList.remove("hidden");
          }
          if (this.#unvisitedNeigbours.length === 1) {
            this.#button_car.disabled = false;
            // this.#button_plane.disabled = true;
            // this.#button_car.style.opacity = 1;
            // prettier-ignore
            neighbours.insertAdjacentHTML("beforeend",`<div>Welcome to ${res.capital}! <br/><br/>  You can go to ${this.#unvisitedNeigbours[0]} from here.  <br\><div\>`);
            // prettier-ignore
            this.#input.placeholder = `Let's go to ${this.#unvisitedNeigbours[0]}. Click Hitchhike!`;
          }
          if (this.#unvisitedNeigbours.length > 1) {
            // this.#button_car.style.opacity = 1;
            this.#button_car.disabled = false;
            // this.#button_plane.disabled = true;
            // prettier-ignore
            neighbours.insertAdjacentHTML("beforeend",`<div>Welcome to ${res.capital}! <br/><br/> You can travel to ${this.#unvisitedNeigbours.length} neighbours.  <div\>`);
            this.#input.placeholder = `Let's try your chance 🤞`;
          }
        });
    }
  }

  _gotoNeighbour() {
    let carHTML = `<img src="/img/vosvos.png" alt="" />`;
    this.#car.insertAdjacentHTML("beforeend", carHTML);
    document.getElementById("input").value = "";
    let max = Math.floor(this.#unvisitedNeigbours.length + 1);
    let random = Math.floor(Math.random() * (max - 1) + 1);
    for (let i = 0; i < random; i++) {
      let popped = this.#unvisitedNeigbours.pop();
      this.#unvisitedNeigbours.unshift(popped);
    }
    let nextCountry = this.#unvisitedNeigbours[0];
    fetch(`https://restcountries.eu/rest/v2/alpha/${nextCountry}`)
      .then((response) => response.json())
      .then((result) => {
        let coords = result.latlng;
        this._findCountry(coords);
        this._moveToClick(coords);
        this._addMarker(1.5, result.flag, coords);
        this._addToItinerary(result.name, "🚗");
        this._displayCountryOnMap(result.alpha2Code, "#185bd3");

      });

    this.#car.classList.add("animatePosition");
    setTimeout(() => {
      this.#car.classList.add("animateOpacity");
    }, 100);  //1500
    setTimeout(() => {
      this.#car.classList.remove("animatePosition");
      this.#car.classList.remove("animateOpacity");
      this.#car.textContent = "";
    }, 200);  //2500
  }
  //----------------------------------------------------------------------
  //----------- MOVE SCREEN TO CLICK LOCATION ----------------------------
  //----------------------------------------------------------------------

  _gotoRandomCountry() {
    let airplaneHTML = `<img src="/img/tenor.gif" alt="" />`;
    this.#airplane.insertAdjacentHTML("beforeend", airplaneHTML);
    this.#fligths += 1;
    // this.#button_plane.classList.add("hidden");

    let unvisitedAndallowed = this.#unvisitedCountries3.filter(x => !dontgo3.includes(x[0]))
    let max = Math.floor(unvisitedAndallowed.length + 1 );
    // console.log(this.#unvisitedCountries2.length -49 );
    let random = Math.floor(Math.random() * (max - 1) + 1);

    // console.log(dontgo3);
    // console.log(this.#unvisitedCountries3.length,this.#unvisitedCountries3[0]);
    // console.log(unvisitedAndallowed.length,unvisitedAndallowed[0]);
    let nextCountry = unvisitedAndallowed[random];
    // let nextCountry = this.#unvisitedCountries2[random];

    let coords;
    fetch(`https://restcountries.eu/rest/v2/alpha/${nextCountry}`)
      .then((response) => response.json())
      .then((result) => {
        coords = result.latlng;
        this._findCountry(coords);
        this.#map.panTo(coords, {
          animate: true,
          duration: 1,  //3
          easeLinearity: 0.8,
        });
        this._updateVisitedAndFlights();
        this._addMarker(3, result.flag, coords);
        this._addToItinerary(result.name, "✈️");
        this._displayCountryOnMap(result.alpha2Code, "purple");
        console.log(result);
      })
      .then(() => {});
    this.#airplane.classList.add("animatePosition");

    setTimeout(() => {
      this.#airplane.classList.add("animateOpacity");
    }, 130); //1300

    setTimeout(() => {
      this.#airplane.classList.remove("animatePosition");
      this.#airplane.classList.remove("animateOpacity");
      this.#airplane.textContent = "";
    }, 200); //2000
  }

  _moveToClick(coords) {
    if (!this.#map) return;
    this.#map.panTo(coords, {
      animate: true,
      duration: .5, //1
      easeLinearity: 0.8,
    });
  }

  _updateVisitedAndFlights() {
    let countries_visited = document.getElementById("countries-visited");
    let flights_taken = document.getElementById("flights-taken");

    countries_visited.textContent = "";
    flights_taken.textContent = "";
    countries_visited.insertAdjacentHTML(
      "beforeend",
      ` &nbsp;Countries visited: ${this.#visitedCountriesArray2.length-49} `
    );
    flights_taken.insertAdjacentHTML(
      "beforeend",
      ` &nbsp Flights taken: ${this.#fligths} `
    );
  }

  _displayItinerary() {
    this.#itinerary_button.disabled = true;
    console.log(this.#itinerary);
    let travel_list = document.getElementById("travel-list");

    console.log(travel_list);

    this.#itinerary.forEach((travel, i) => {
      travel_list.insertAdjacentHTML(
        "beforeend",
        `<div class="travel-item"> ${i + 1} - ${travel[0]} ${travel[1]} <div\>`
      );
    });
    openModal();
  }

  _transformCoordinates = function (countrycode) {
    let coordinates = [];
    let result = [];
    for (let i = 0; i < 246; i++) {
      if (geoJsonData.features[i].properties.ISO2 === countrycode) {
        coordinates = geoJsonData.features[i].geometry.coordinates;
        if (geoJsonData.features[i].geometry.type === "Polygon") {
          coordinates[0].forEach((item) => {
            result.push([item[1], item[0]]);
          });
          return result;
        }
        if (geoJsonData.features[i].geometry.type === "MultiPolygon") {
          coordinates.forEach((polygon, i) => {
            let result_inner = [];
            polygon[0].forEach((item) => {
              result_inner.push([item[1], item[0]]);
            });
            result[i] = result_inner;
          });
          return result;
        }
        break;
      }
    }
  };


  _displayCountryOnMap(countrycode, colorCode) {
    let codeUpper = countrycode.toUpperCase();
    let countryCoordinates = this._transformCoordinates(codeUpper);
    var polygon = L.polygon(countryCoordinates, { color: colorCode }).addTo(
      this.#map
    );
  }
}

const app = new App();

//// MODAL FUNCTIONALITY
const modal = document.getElementById("modal");
const btnCloseModal = document.querySelectorAll(".close-modal");
const itinerary_button = document.getElementById("itinerary");

// FUNCTION TO OPEN RELATED MODAL
const openModal = function () {
  console.log("hello");
  modal.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  let travel_list = document.getElementById("travel-list");
  travel_list.textContent = "";
  itinerary_button.disabled = false;
};

btnCloseModal.forEach((btn) => btn.addEventListener("click", closeModal));
