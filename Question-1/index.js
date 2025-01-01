function rentContainer(neededContainer, listings) {
  const sortedListings = listings.sort((a, b) => {
    return a.totalCost / a.container - b.totalCost / b.container;
  });
  // console.log(sortedListings);
  let totalCost = 0;
  let contractWith = [];
  for (const provider of sortedListings) {
    if (neededContainer === 0) {
      break;
    } else if (neededContainer >= provider.container) {
      neededContainer = neededContainer - provider.container;
      totalCost += provider.totalCost;
      contractWith.push(
        `[Contract with] ${provider.name} ${provider.container}, price: ${provider.totalCost}`
      );
    } else if (neededContainer < provider.container) {
      let costForNeeded =
        neededContainer * (provider.totalCost / provider.container);
      totalCost = totalCost + costForNeeded;
      contractWith.push(
        `[Contract with] ${provider.name} ${neededContainer}, price: ${costForNeeded}`
      );
      neededContainer = 0;
    }
  }

  contractWith.forEach((provider) => {
    console.log(provider);
  });

  if (neededContainer > 0) {
    console.log("Not enough container");
  }

  console.log(`[Summary] total cost ${totalCost}`);
}

//----------TEST CASE 1----------
// Input
// const neededContainer = 3;
// const listings = [
//   {
//     name: "Container renter A",
//     container: 1,
//     totalCost: 1,
//   },
//   {
//     name: "Container renter B",
//     container: 2,
//     totalCost: 1,
//   },
//   {
//     name: "Container renter C",
//     container: 3,
//     totalCost: 3,
//   },
//   {
//     name: "Container renter D",
//     container: 4,
//     totalCost: 8,
//   },
// ];

// Output
// [Contract with] Container renter B 2 container, price: 1
// [Contract with] Container renter A 1 container, price: 1
// [Summary] total cost 2
// -------------------------------------------------------------

//----------TEST CASE 2----------
// Input
// const neededContainer = 10;
// const listings = [
//   {
//     name: "Container renter A",
//     container: 5,
//     totalCost: 5,
//   },
//   {
//     name: "Container renter B",
//     container: 2,
//     totalCost: 10,
//   },
//   {
//     name: "Container renter C",
//     container: 2,
//     totalCost: 3,
//   },
// ];

// Output
// [Contract with] Container renter A 5 container, price: 5
// [Contract with] Container renter C 2 container, price: 3
// [Contract with] Container renter B 2 container, price: 10
// Not enough containers
// [Summary] total cost 18
// -------------------------------------------------------------

//----------TEST CASE 3----------
// Input
const neededContainer = 10;
const listings = [
  {
    name: "Container renter A",
    container: 5,
    totalCost: 5,
  },
  {
    name: "Container renter B",
    container: 2,
    totalCost: 10,
  },
  {
    name: "Container renter C",
    container: 10,
    totalCost: 3,
  },
];

// Output
// [Contract with] Container renter C 10 container, price: 3
// [Summary] total cost 3
// -------------------------------------------------------------

rentContainer(neededContainer, listings);
