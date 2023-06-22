import express from "express";
import { config } from "dotenv";
import { log } from "console";
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

// ... other code ...

// console.log(sportiekfeed1)
console.log('gijs')
// console.log(data2)

app.get("/", async function (request, response) {
  try {
    const urls = [sportiekone, sportiekfeed1, sportiekfeed2, sportiekfeed3];
    const [data1, data2, data3, data4] = await Promise.all(urls.map(fetchJson));
    const combinedData = [...data2, ...data3, ...data4];
    const locationData = data1;


    // console.log(data2);

    function filterItems(items) {
      return items.filter(item => item.departurePricePersons === item.numberOfBeds);
    }
    
    const correctHouses = filterItems(combinedData)
    // console.log(correctHouses)
    
    let prevDepartureDate = null;
    let prevComplexName = null;
    let prevVariantName = null;
    const numberList = [];

    correctHouses.forEach(info => {
      if (
        info.departureDate !== prevDepartureDate &&
        info.complex_name === prevComplexName &&
        info.variantName === prevVariantName
      ) {
        numberList.push(info.number);
      }

      prevDepartureDate = info.departureDate;
      prevComplexName = info.complex_name;
      prevVariantName = info.variantName;
    });

    // if (numberList.length > 0) {
    //   console.log("List of numbers:", numberList.join(", "));
    // }


    // console.log(combinedData);
    const departureDates = [...new Set(combinedData.map(item => item.departureDate))];
    departureDates.sort((date1, date2) => {
    const [day1, month1, year1] = date1.split('-');
    const [day2, month2, year2] = date2.split('-');
    const dateObj1 = new Date(`${year1}-${month1}-${day1}`);
    const dateObj2 = new Date(`${year2}-${month2}-${day2}`);
    return dateObj1 - dateObj2;
    });
    
    // console.log(departureDates);


    


    const locations = locationData.reduce((acc, item) => {
      const existingLocation = acc.find((el) => el.accomodationId === item.accomodationId);
    
      if (!existingLocation) {
        acc.push(item);
      }
    
      return acc;
    }, []);
    


    
    

    response.render("index", { correctHouses, combinedData, numberList, departureDates, locations, data1, data2, data3, data4 });
  } 
  catch (error) {
    // Handle any errors that occur during the data fetching or rendering process
    console.error(error);
    response.status(500).send("Internal Server Error");
  }
});



app.get("/results", async function (request, response) {
  try {
    const urls = [sportiekone, sportiekfeed1, sportiekfeed2, sportiekfeed3];
    const [data1, data2, data3, data4] = await Promise.all(urls.map(fetchJson));
    const combinedData = [...data2, ...data3, ...data4];
    const locationData = data1;


    // console.log(data2);

    function filterItems(items) {
      return items.filter(item => item.departurePricePersons === item.numberOfBeds);
    }
    
    const correctHouses = filterItems(combinedData)
    // console.log(correctHouses)
    
    let prevDepartureDate = null;
    let prevComplexName = null;
    let prevVariantName = null;
    const numberList = [];

    correctHouses.forEach(info => {
      if (
        info.departureDate !== prevDepartureDate &&
        info.complex_name === prevComplexName &&
        info.variantName === prevVariantName
      ) {
        numberList.push(info.number);
      }

      prevDepartureDate = info.departureDate;
      prevComplexName = info.complex_name;
      prevVariantName = info.variantName;
    });

    // if (numberList.length > 0) {
    //   console.log("List of numbers:", numberList.join(", "));
    // }
    // console.log(correctHouses.slice(0, 20));


    console.log(combinedData);
    const departureDates = [...new Set(combinedData.map(item => item.departureDate))];
    departureDates.sort((date1, date2) => {
    const [day1, month1, year1] = date1.split('-');
    const [day2, month2, year2] = date2.split('-');
    const dateObj1 = new Date(`${year1}-${month1}-${day1}`);
    const dateObj2 = new Date(`${year2}-${month2}-${day2}`);
    return dateObj1 - dateObj2;
    });
    
    // console.log(departureDates);

    // function rearrangeJSONFormat(originalData) {
    //   const newData = { ...originalData }; // Create a shallow copy of the original data
    
    //   // Create a new array of dates with the modified format
    //   const newDates = originalData.data.map(house => {
    //     return {
    //       ...house,
    //       dates: house.dates.map(date => {
    //         return {
    //           departureDate: date.date,
    //           number: date.numberOfBeds
    //         };
    //       })
    //     };
    //   });
    
    //   newData.data = newDates; // Update the data property with the new array
    
    //   return newData;
    // }
    
    // const originalData = {
    //   // Your correctHouses JSON data
    // };
    
    // const modifiedData = rearrangeJSONFormat(originalData);
    // console.log(modifiedData);
    

    


    const locations = locationData.reduce((acc, item) => {
      const existingLocation = acc.find((el) => el.accomodationId === item.accomodationId);
    
      if (!existingLocation) {
        acc.push(item);
      }
    
      return acc;
    }, []);
    

    

    response.render("results", { correctHouses, combinedData, numberList, departureDates, locations, data1, data2, data3, data4 });
  } 
  catch (error) {
    // Handle any errors that occur during the data fetching or rendering process
    console.error(error);
    response.status(500).send("Internal Server Error");
  }
});


// ... other code ...



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