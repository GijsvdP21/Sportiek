import express from "express";
import { config } from "dotenv";
config();

// Create a new Express app
const app = express();
const port = process.env.PORT || 4242;

// Urls from .env file
const apiKey = process.env.API_URL_INFOMARTION;
const sportiekfeedone = process.env.API_URL_ACCOMMODATIES1;
const sportiekfeedtwo= process.env.API_URL_ACCOMMODATIES2
const sportiekfeedthree= process.env.API_URL_ACCOMMODATIES3

// Variabel name to the url's
const sportiekone = [apiKey];
const sportiekfeed1 = [sportiekfeedone]
const sportiekfeed2 = [sportiekfeedtwo]
const sportiekfeed3 = [sportiekfeedthree]

// all url's together
const urls = [sportiekone, sportiekfeed1, sportiekfeed2, sportiekfeed3];
const [data1, data2, data3, data4] = await Promise.all(urls.map(fetchJson));
const combinedData = [...data2, ...data3, ...data4];

const filterData = combinedData.reduce((acc, item) => {
  const existingItem = acc.find((el) => el.variantName === item.variantName);

  if (existingItem) {
    // Voeg de huidige datum alleen toe als deze nog niet in de bestaande item is opgenomen
    if (!existingItem.departureDates.includes(item.departureDate)) {
      existingItem.departureDates.push(item.departureDate);
    }
  } else {
    // Voeg een nieuw item toe met de huidige variantName en datum
    acc.push({
      accomodationId: item.accomodationId,
      departurePricePersons: item.departurePricePersons,
      variantName: item.variantName,
      complex_name: item.complex_name,
      departureDates: [item.departureDate],
      number: [item.number]
    });
  }

  return acc;
}, []);



// const Id = []
// filterData.forEach(item => {
//   Id.push(item.accomodationId);
// })

// const dorp = []
// data1.forEach(item => {
//   dorp.push(item.accomodationId)
//   dorp.push(item.dorp)
// })

// console.log(Id)
// console.log(dorp)



// Set EJS as the template engine and specify the views directory
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static("public"));

app.get("/", async function (request, response) {
  response.render("index", { filterData, data1, data2, data3 ,data4 });
});

app.get("/results", async function (request, response) {
  response.render("results", { filterData, data1, data2, data3 ,data4 });
});

// { data1: data1, data2: data2, filterData: filterData, data: data }

app.listen(port, () => {
  console.log("listening on http://localhost:" + port);
});


async function fetchJson(urls) {
  return await fetch(urls)
    .then((response) => response.json())
    .catch((error) => error);
}





// const datasportiek = [[sportiekfeed1], [sportiekone]];
// const [data1, data2] = await Promise.all(datasportiek.map(fetchJson));
// const data = { data1, data2 };


// const checkdata = data1.filter((item) => {
//   return item.numberOfBeds === item.departurePricePersons
// });


// functies
// const dorp = [];
// data1.forEach(item => {
//   dorp.push(item.dorp);
//   dorp.push(item.accomodationId)
// });