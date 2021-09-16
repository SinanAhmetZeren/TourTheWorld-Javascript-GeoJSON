"use strict";

class App {
  #map;
  #mapZoomLevel = 5;
  #country;
  #country_code;
  #current_country;
  #unvisitedNeigbours;
  #fligths = 0;
  #flag;
  #visitedCountries2 = [];
  #visitedCountries3 = [];
  // prettier-ignore
  #allCountries2 =[
  "AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BQ","BA","BW","BV","BR","IO","UM","VG","VI","BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","CX","CC","CO","KM","CG","CD","CK","CR","HR","CU","CW","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","ET","FK","FO","FJ","FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","VA","HN","HK","HU","IS","IN","ID","CI","IR","IQ","IE","IM","IL","IT","JM","JP","JE","JO","KZ","KE","KI","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MO","MK","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","NC","NZ","NI","NE","NG","NU","NF","KP","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN","PL","PT","PR","QA","XK","RE","RO","RU","RW","BL","SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SX","SK","SI","SB","SO","ZA","GS","KR","SS","ES","LK","SD","SR","SJ","SZ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UY","UZ","VU","VE","VN","WF","EH","YE","ZM","ZW"];
  // prettier-ignore
  #allCountries3 =[
  "AFG","ALA","ALB","DZA","ASM","AND","AGO","AIA","ATA","ATG","ARG","ARM","ABW","AUS","AUT","AZE","BHS","BHR","BGD","BRB","BLR","BEL","BLZ","BEN","BMU","BTN","BOL","BES","BIH","BWA","BVT","BRA","IOT","UMI","VGB","VIR","BRN","BGR","BFA","BDI","KHM","CMR","CAN","CPV","CYM","CAF","TCD","CHL","CHN","CXR","CCK","COL","COM","COG","COD","COK","CRI","HRV","CUB","CUW","CYP","CZE","DNK","DJI","DMA","DOM","ECU","EGY","SLV","GNQ","ERI","EST","ETH","FLK","FRO","FJI","FIN","FRA","GUF","PYF","ATF","GAB","GMB","GEO","DEU","GHA","GIB","GRC","GRL","GRD","GLP","GUM","GTM","GGY","GIN","GNB","GUY","HTI","HMD","VAT","HND","HKG","HUN","ISL","IND","IDN","CIV","IRN","IRQ","IRL","IMN","ISR","ITA","JAM","JPN","JEY","JOR","KAZ","KEN","KIR","KWT","KGZ","LAO","LVA","LBN","LSO","LBR","LBY","LIE","LTU","LUX","MAC","MKD","MDG","MWI","MYS","MDV","MLI","MLT","MHL","MTQ","MRT","MUS","MYT","MEX","FSM","MDA","MCO","MNG","MNE","MSR","MAR","MOZ","MMR","NAM","NRU","NPL","NLD","NCL","NZL","NIC","NER","NGA","NIU","NFK","PRK","MNP","NOR","OMN","PAK","PLW","PSE","PAN","PNG","PRY","PER","PHL","PCN","POL","PRT","PRI","QAT","KOS","REU","ROU","RUS","RWA","BLM","SHN","KNA","LCA","MAF","SPM","VCT","WSM","SMR","STP","SAU","SEN","SRB","SYC","SLE","SGP","SXM","SVK","SVN","SLB","SOM","ZAF","SGS","KOR","SSD","ESP","LKA","SDN","SUR","SJM","SWZ","SWE","CHE","SYR","TWN","TJK","TZA","THA","TLS","TGO","TKL","TON","TTO","TUN","TUR","TKM","TCA","TUV","UGA","UKR","ARE","GBR","USA","URY","UZB","VUT","VEN","VNM","WLF","ESH","YEM","ZMB","ZWE"]
  // prettier-ignore
  #unvisitedCountries2 =[
    "AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BQ","BA","BW","BV","BR","IO","UM","VG","VI","BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","CX","CC","CO","KM","CG","CD","CK","CR","HR","CU","CW","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","ET","FK","FO","FJ","FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","VA","HN","HK","HU","IS","IN","ID","CI","IR","IQ","IE","IM","IL","IT","JM","JP","JE","JO","KZ","KE","KI","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MO","MK","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","NC","NZ","NI","NE","NG","NU","NF","KP","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN","PL","PT","PR","QA","XK","RE","RO","RU","RW","BL","SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SX","SK","SI","SB","SO","ZA","GS","KR","SS","ES","LK","SD","SR","SJ","SZ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UY","UZ","VU","VE","VN","WF","EH","YE","ZM","ZW"];
  // prettier-ignore
  #unvisitedCountries3 =[
    "AFG","ALA","ALB","DZA","ASM","AND","AGO","AIA","ATA","ATG","ARG","ARM","ABW","AUS","AUT","AZE","BHS","BHR","BGD","BRB","BLR","BEL","BLZ","BEN","BMU","BTN","BOL","BES","BIH","BWA","BVT","BRA","IOT","UMI","VGB","VIR","BRN","BGR","BFA","BDI","KHM","CMR","CAN","CPV","CYM","CAF","TCD","CHL","CHN","CXR","CCK","COL","COM","COG","COD","COK","CRI","HRV","CUB","CUW","CYP","CZE","DNK","DJI","DMA","DOM","ECU","EGY","SLV","GNQ","ERI","EST","ETH","FLK","FRO","FJI","FIN","FRA","GUF","PYF","ATF","GAB","GMB","GEO","DEU","GHA","GIB","GRC","GRL","GRD","GLP","GUM","GTM","GGY","GIN","GNB","GUY","HTI","HMD","VAT","HND","HKG","HUN","ISL","IND","IDN","CIV","IRN","IRQ","IRL","IMN","ISR","ITA","JAM","JPN","JEY","JOR","KAZ","KEN","KIR","KWT","KGZ","LAO","LVA","LBN","LSO","LBR","LBY","LIE","LTU","LUX","MAC","MKD","MDG","MWI","MYS","MDV","MLI","MLT","MHL","MTQ","MRT","MUS","MYT","MEX","FSM","MDA","MCO","MNG","MNE","MSR","MAR","MOZ","MMR","NAM","NRU","NPL","NLD","NCL","NZL","NIC","NER","NGA","NIU","NFK","PRK","MNP","NOR","OMN","PAK","PLW","PSE","PAN","PNG","PRY","PER","PHL","PCN","POL","PRT","PRI","QAT","KOS","REU","ROU","RUS","RWA","BLM","SHN","KNA","LCA","MAF","SPM","VCT","WSM","SMR","STP","SAU","SEN","SRB","SYC","SLE","SGP","SXM","SVK","SVN","SLB","SOM","ZAF","SGS","KOR","SSD","ESP","LKA","SDN","SUR","SJM","SWZ","SWE","CHE","SYR","TWN","TJK","TZA","THA","TLS","TGO","TKL","TON","TTO","TUN","TUR","TKM","TCA","TUV","UGA","UKR","ARE","GBR","USA","URY","UZB","VUT","VEN","VNM","WLF","ESH","YEM","ZMB","ZWE"]
  #input = document.getElementById("input");
  #button_plane = document.getElementById("button_plane");
  #button_car = document.getElementById("button_car");
  #allIcons = [];
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
    this.#button_plane.addEventListener("click",this._gotoRandomCountry.bind(this));
    this.#button_car.addEventListener("click", this._gotoNeighbour.bind(this));
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
        }
        return this.#country_code;
      })
      .then((code) => {
        this._popCountry(code);
        this._findFlagAndNeighbors(code);
      })
      .catch((error) => console.log("error", error));
  }

  _popCountry(code) {
    const uppercaseCode = code.toUpperCase();
    const index = this.#unvisitedCountries2.indexOf(uppercaseCode);
    const index2 = this.#allCountries2.indexOf(uppercaseCode);
    if (!this.#visitedCountries2.includes(uppercaseCode)) {
      this.#visitedCountries2.push(uppercaseCode);
      this.#visitedCountries3.push(this.#allCountries3[index2]);
    }
    if (index != -1) {
      this.#unvisitedCountries2.splice(index, 1);
      this.#unvisitedCountries3.splice(index, 1);
    }
    this._updateVisitedAndFlights();
  }

  //----------------------------------------------------------------------
  //----------- FETCH AND DISPLAY COUNTRY FLAG ---------------------------
  //----------------------------------------------------------------------

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

  // _addMarker1(coords, flag) {
  //   L.marker(coords)
  //     .addTo(this.#map)
  //     .bindPopup(L.popup({ autoClose: false }))
  //     .setPopupContent(`<img style="width: 6rem ;" src="${flag}" alt="">`)
  //     .openPopup();

  // L.marker(coords, { icon: newMarker })
  //   .addTo(this.#map)
  //   .bindPopup(
  //     L.popup({
  //       maxWidth: 250,
  //       minWidth: 100,
  //       autoClose: false,
  //       closeOnClick: false,
  //       // className: `${workout.type}-popup`,
  //     })
  // )
  // .setPopupContent(
  //   "Visited !"
  //   // `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
  // )
  // .openPopup();
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
          this.#population.innerHTML = `${+(res.population / 1000000).toFixed(
            1
          )} million`;

          this.#currency.innerHTML = `${res.currencies[0].name}`;
          this.#languages.innerHTML = `${res.languages[0].name}`;
          this.#area.innerHTML = `${res.area.toLocaleString()} km2`;
          this.#capital.innerHTML = `${res.capital}`;
          let countrysNeighbours = res.borders;
          this.#unvisitedNeigbours = countrysNeighbours.filter(
            (x) => !this.#visitedCountries3.includes(x)
          );
          if (this.#visitedCountries2.length == 1) {
            this._addMarker(2, res.flag, res.latlng);
          }

          neighbours.innerHTML = "";
          if (this.#unvisitedNeigbours.length === 0) {
            this.#button_plane.style.opacity = 1;
            this.#button_car.disabled = true;
            this.#button_plane.disabled = false;
            // prettier-ignore
            neighbours.insertAdjacentHTML("beforeend",`<div>Welcome to ${res.name}! <br/><br/>  You need to take a flight!<div\>`);
            this.#input.placeholder = "You need to take a flight";
            this.#button_plane.classList.remove("hidden");
          }
          if (this.#unvisitedNeigbours.length === 1) {
            this.#button_car.disabled = false;
            this.#button_plane.disabled = true;
            this.#button_car.style.opacity = 1;
            // prettier-ignore
            neighbours.insertAdjacentHTML("beforeend",`<div>Welcome to ${res.name}! <br/><br/>  You can go to ${this.#unvisitedNeigbours[0]} from here.  <br\><div\>`);
            // prettier-ignore
            this.#input.placeholder = `Let's go to ${this.#unvisitedNeigbours[0]}. Click Hitchhike!`;
          }
          if (this.#unvisitedNeigbours.length > 1) {
            this.#button_car.style.opacity = 1;
            this.#button_car.disabled = false;
            this.#button_plane.disabled = true;
            // prettier-ignore
            neighbours.insertAdjacentHTML("beforeend",`<div>Welcome to ${res.name}! <br/><br/> You can travel to ${this.#unvisitedNeigbours.length} neighbours.  <div\>`);
            this.#input.placeholder = `Let's try your chance 🤞`;
          }
        });
    }
  }

  _gotoNeighbour() {
    let carHTML = `<img src="/img/vosvos.png" alt="" />`;
    this.#car.insertAdjacentHTML("beforeend", carHTML);

    let number = document.getElementById("input").value;
    if (!number) {
      number = 1;
    }
    document.getElementById("input").value = "";
    let max = Math.floor(this.#unvisitedNeigbours.length + 1);
    let random = Math.floor(Math.random() * (max - 1) + 1);
    for (let i = 0; i < random; i++) {
      let popped = this.#unvisitedNeigbours.pop();
      this.#unvisitedNeigbours.unshift(popped);
    }
    let nextCountry = this.#unvisitedNeigbours[number - 1];

    fetch(`https://restcountries.eu/rest/v2/alpha/${nextCountry}`)
      .then((response) => response.json())
      .then((result) => {
        let coords = result.latlng;
        this._findCountry(coords);
        this._moveToClick(coords);
        this._addMarker(1.5, result.flag, coords);
      });

    this.#car.classList.add("animatePosition");

    setTimeout(() => {
      this.#car.classList.add("animateOpacity");
    }, 1500);

    setTimeout(() => {
      this.#car.classList.remove("animatePosition");
      this.#car.classList.remove("animateOpacity");
      this.#car.textContent = "";
    }, 2500);
  }
  //----------------------------------------------------------------------
  //----------- MOVE SCREEN TO CLICK LOCATION ----------------------------
  //----------------------------------------------------------------------

  _gotoRandomCountry() {
    let airplaneHTML = `<img src="/img/tenor.gif" alt="" />`;
    this.#airplane.insertAdjacentHTML("beforeend", airplaneHTML);
    this.#fligths += 1;
    this.#button_plane.classList.add("hidden");
    let max = Math.floor(this.#unvisitedCountries2.length + 1);
    let random = Math.floor(Math.random() * (max - 1) + 1);
    let nextCountry = this.#unvisitedCountries2[random];
    let coords;
    fetch(`https://restcountries.eu/rest/v2/alpha/${nextCountry}`)
      .then((response) => response.json())
      .then((result) => {
        coords = result.latlng;
        this._findCountry(coords);
        this.#map.panTo(coords, {
          animate: true,
          duration: 3,
          easeLinearity: 0.8,
        });
        this._updateVisitedAndFlights();
        this._addMarker(3, result.flag, coords);
      })
      .then(() => {});
    this.#airplane.classList.add("animatePosition");

    setTimeout(() => {
      this.#airplane.classList.add("animateOpacity");
    }, 1300);

    setTimeout(() => {
      this.#airplane.classList.remove("animatePosition");
      this.#airplane.classList.remove("animateOpacity");
      this.#airplane.textContent = "";
    }, 2000);
  }

  _moveToClick(coords) {
    if (!this.#map) return;
    this.#map.panTo(coords, {
      animate: true,
      duration: 1,
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
      `Countries visited: ${this.#visitedCountries2.length} `
    );
    flights_taken.insertAdjacentHTML(
      "beforeend",
      `Flights taken: ${this.#fligths} `
    );
  }
}

const app = new App();

// You are in ${country}.  Choose a number between 1 and {country.neighbors.lenght}
