import express from "express";
import { config } from "dotenv";
config();

const apiKey = process.env.API_URL;

// Create a new Express app
const app = express();
const port = process.env.PORT || 4242;

const sportiek =
  "https://raw.githubusercontent.com/DikkeTimo/proof-of-concept-Sportiek/main/json/localjssportiek.json";
const sportiekone = [apiKey];

const datasportiek = [[sportiek], [sportiekone]];
const [data1, data2] = await Promise.all(datasportiek.map(fetchJson));
const data = { data1, data2 };

// const checkdata = data1.filter((item) => {
//   return item.numberOfBeds === item.departurePricePersons
// });

const filterData = data1.reduce((acc, item) => {
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
      departureDates: [item.departureDate]
    });
  }

  return acc;
}, []);


// Set EJS as the template engine and specify the views directory
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static("public"));

app.get("/", async function (request, response) {
  response.render("index", { data1: data1, filterData: filterData });
});

app.get("/results", async function (request, response) {
  response.render("results", { data1: data1, filterData: filterData });
});

app.listen(port, () => {
  console.log("listening on http://localhost:" + port);
});


async function fetchJson(urls) {
  // Display the loader
  try {
    const response = await fetch(urls);
    const data = await response.json();
    // Hide the loader once the response is received
    console.log("Loaded!");
    return data;
  } catch (error) {
    console.error("Error:", error);
    // Hide the loader in case of an error
    console.log("Error!");
    throw error;
  }
}