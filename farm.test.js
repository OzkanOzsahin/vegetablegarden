const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

// CALCULATE THE YIELD FOR PLANT
describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -30,
        high: -60,
      },
    },
  };

  const input = {
    crop: corn,
    numCrops: 10,
  }
  test("Get yield for plant with NO environmental factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });

  test("Get yield for plant WITH environmental factors", () => {
    const environmentFactors = { sun: "medium", wind: "high" };

    
    expect(getYieldForPlant(corn, environmentFactors)).toBe(12); // sun: medium, wind: high
    
  });
});

// CALCULATE YIELD FOR CROP
describe("getYieldForCrop", () => {
  const corn = {
    name: "corn",
    yield: 3,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -30,
        high: -60,
      },
    },
  };

  const pumpkin = {
    name: "pumpkin",
    yield: 4,
    factor: {
      sun: {
        low: -40,
        medium: 0,
        high: 60,
      },
      wind: {
        low: 0,
        medium: -20,
        high: -50,
      },
    },
  };

  const tomatoes = {
    name: "tomatoes",
    yield: 5,
    factor: {
      sun: {
        low: -30,
        medium: 10,
        high: 70,
      },
      wind: {
        low: 0,
        medium: -30,
        high: -40,
      },
    },
  };

  const vegetables = [
    {
      crop: corn,
      numCrops: 10,
    },
    {
      crop: pumpkin,
      numCrops: 2,
    },
    {
      crop: tomatoes,
      numCrops: 4,
    },
  ];

  const input = {
    crop: corn,
    crop: pumpkin,
    crop: tomatoes,
    numCrops: 10,
    numCrops: 2,
    numCrops: 4,
  };

  test("Get yield for crop, simple", () => {
    expect(getYieldForCrop(vegetables[1])).toBe(8);
  });

  test("Get yield for crop, WITH environmental factors", () => {
    const environmentFactors = { sun: "medium", wind: "high" };

    expect(getYieldForCrop(vegetables[2], environmentFactors)).toBe(13);
  });
});

//CALCULATE THE TOTAL YIELD FOR MULTIPLE CROPS
describe("getTotalYield", () => {
  const corn = {
    name: "corn",
    yield: 3,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -30,
        high: -60,
      },
    },
  };

  const pumpkin = {
    name: "pumpkin",
    yield: 4,
    factor: {
      sun: {
        low: -40,
        medium: 0,
        high: 60,
      },
      wind: {
        low: 0,
        medium: -20,
        high: -50,
      },
    },
  };

  const tomatoes = {
    name: "tomatoes",
    yield: 5,
    factor: {
      sun: {
        low: -30,
        medium: 10,
        high: 70,
      },
      wind: {
        low: 0,
        medium: -30,
        high: -40,
      },
    },
  };

  let vegetables = [
    {
      crop: corn,
      numCrops: 10,
    },
    {
      crop: pumpkin,
      numCrops: 2,
    },
    {
      crop: tomatoes,
      numCrops: 4,
    },
  ];
const input = {
  crop: corn,
  crop: pumpkin,
  crop: tomatoes,
  numCrops: 10,
  numCrops: 2,
  numCrops: 4,
}
  test("Calculate total yield with multiple crops", () => {
    expect(getTotalYield({ vegetables })).toBe(58);
  });

  test("Calculate total yield with 0 amount", () => {
    let vegetables = [{ crop: corn, numCrops: 0 }];

    expect(getTotalYield({ vegetables })).toBe(0);
  });

  test("Calculate total yield WITH environmental factors", () => {
    const environmentFactors = { sun: "high", wind: "high" };

    //getTotalYield();

    function getTotalYield() {
      expect(getTotalYield({ vegetables }, environmentFactors)).toBe(45);
    }
    const input = {
      crop: vegetables,
      numCrops: 100,
    }
  });
});

// Calculate the cost for a crop
describe("getCostsForCrop", () => {
  test("Calculate the cost for a crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      sowingPrice: 1,
      plantsPerCrop: 30,
      numCrops: 5,
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      sowingPrice: 1,
      plantsPerCrop: 35,
      numCrops: 2,
    };

    const tomatoes = {
      name: "tomatoes",
      yield: 5,
      sowingPrice: 1,
      plantsPerCrop: 40,
      numCrops: 4,
    };


    const input = {
      crop: corn,
      crop: pumpkin,
      crop: tomatoes,
      numCrops: 30,
      numCrops: 2,
      numCrops: 4,
    }
    expect(getCostsForCrop(corn)).toBe(150);
    expect(getCostsForCrop(pumpkin)).toBe(70);
    expect(getCostsForCrop(tomatoes)).toBe(160);
  });

 
});

// calculate the revenue for a crop (without environmental factors)
describe("getRevenueForCrop", () => {
  test("calculate the revenue for a crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      sowingPrice: 1,
      plantsPerCrop: 30,
      numCrops: 5,
      salePrice: 2,
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      sowingPrice: 1,
      plantsPerCrop: 35,
      numCrops: 2,
      salePrice: 2,
    };

    const tomatoes = {
      name: "tomatoes",
      yield: 3,
      sowingPrice: 1,
      plantsPerCrop: 40,
      numCrops: 4,
      salePrice: 1.5,
    };

    const input = {
      crop: corn,
      crop: pumpkin,
      crop: tomatoes,
      numCrops: 30,
      numCrops: 2,
      numCrops: 4,
    }

    expect(getRevenueForCrop(corn)).toBe(900);
    expect(getRevenueForCrop(pumpkin)).toBe(560);
    expect(getRevenueForCrop(tomatoes)).toBe(720);
  });

  
});

//  calculate the profit for a crop (without environmental factors)
describe("getProfitForCrop", () => {
  test("calculate the profit for a crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      sowingPrice: 1,
      plantsPerCrop: 30,
      numCrops: 5,
      salePrice: 2,
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      sowingPrice: 1,
      plantsPerCrop: 35,
      numCrops: 2,
      salePrice: 2,
    };

    const tomatoes = {
      name: "tomatoes",
      yield: 3,
      sowingPrice: 1,
      plantsPerCrop: 40,
      numCrops: 4,
      salePrice: 1.5,
    };

    const input = {
      crop: corn,
      crop: pumpkin,
      crop: tomatoes,
      numCrops: 30,
      numCrops: 2,
      numCrops: 4,
    }
    expect(getProfitForCrop(corn)).toBe(750);
    expect(getProfitForCrop(pumpkin)).toBe(490);
    expect(getProfitForCrop(tomatoes)).toBe(560);
  });

  
});

// calculate the profit for multiple crops (without environmental factors)
describe("getTotalProfit", () => {
  test("calculate the profit for multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
      sowingPrice: 1,
      plantsPerCrop: 30,
      numCrops: 5,
      salePrice: 2,
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      sowingPrice: 1,
      plantsPerCrop: 35,
      numCrops: 2,
      salePrice: 2,
    };

    const tomatoes = {
      name: "tomatoes",
      yield: 3,
      sowingPrice: 1,
      plantsPerCrop: 40,
      numCrops: 4,
      salePrice: 1.5,
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
      { crop: tomatoes, numCrops: 4 },
    ];

    
    const input = {
      crop: corn,
      crop: pumpkin,
      crop: tomatoes,
      numCrops: 30,
      numCrops: 2,
      numCrops: 4,
    }
  });

  
});