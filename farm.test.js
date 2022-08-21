const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

describe("getYieldForPlant", () => {
  const corn = {
      name: "corn",
      yield: 30,
      factors: {
          sun: {
              low: -50,
              medium: 0,
              high: 75,
          },
      }
  };
  const environmentFactors = {
      sun: "high",
  };
  test("Get yield for plant with no environment factors", () => {
      expect(getYieldForPlant(corn)).toBe(30);
  });
  test("Get yield for plant, take environmental factors into account", () => {
      expect(getYieldForPlant(corn, environmentFactors)).toBe(52.5);
  });
});

describe("getYieldForCrop", () => {
  const corn = {
      name: "corn",
      yield: 3,
      factors: {
          sun: {
              low: -50,
              medium: 0,
              high: 75,
          },
          wind: {
              low: 0,
              medium: 0,
              high: -25,
          },
      }
  };
  const input = {
      crop: corn,
      numCrops: 10,
  };
  const environmentFactors = {
      sun: "high",
      wind: "high",
  };
  test("Get yield for crop, simple", () => {
      expect(getYieldForCrop(input)).toBe(30);
  });
  test("Get yield for crop, take environmental factors into account", () => {
      expect(getYieldForCrop(input, environmentFactors)).toBe(45);
  });
});

describe("getTotalYield", () => {
  const corn = {
      name: "corn",
      yield: 3,
      factors: {
          sun: {
              low: -50,
              medium: 0,
              high: 75,
          },
      }
  };
  const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factors: {
          sun: {
              low: -25,
              medium: 25,
              high: 50,
          },
      }
  };
  const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
  ];
  const environmentFactors = {
      sun: "high",
  };
  test("Calculate total yield with multiple crops, environmental factors NOT included", () => {
      expect(getTotalYield({ crops })).toBe(23);
  });
  test("Calculate total yield with multiple crops, take environmental factors into account", () => {
      expect(getTotalYield({ crops }, environmentFactors)).toBe(38.25);
  });
  test("Calculate total yield with 0 amount", () => {
      const corn = {
          name: "corn",
          yield: 3,
      };
      const crops = [{ crop: corn, numCrops: 0 }];
      expect(getTotalYield({ crops })).toBe(0);
  });
});

describe("getCostsForCrop", () => {
  const corn = {
      name: "corn",
      cost: 1,
  }
  const input = {
      crop: corn,
      numCrops: 20,
  };
  test("Calculate costs for a crop", () => {
      expect(getCostsForCrop(input)).toBe(20);
  });
  test("Calculate costs for a crop (corn) with 0 amount", () => {
      const input = {
          crop: corn,
          numCrops: 0,
      };
      expect(getCostsForCrop(input)).toBe(0);
  })
});

describe("getRevenueForCrop", () => {
  const pumpkin = {
      name: "pumpkin",
      yield: 4,
      cost: 1.5,
      sale_price: 4,
      factors: {
          sun: {
              low: -25,
              medium: 25,
              high: 50,
          },
      }
  };
  const input = {
      crop: pumpkin,
      numCrops: 5,
  };
  const environmentFactors = {
      sun: "high",
  };

  test("Calculate revenue for a crop, no environmental factors", () => {
      expect(getRevenueForCrop(input)).toBe(80);
  });
  test("Calculate revenue for a crop, take environmental factors into account", () => {
      expect(getRevenueForCrop(input, environmentFactors)).toBe(120);
  });
  test("Calculate revenue for a crop with 0 amount", () => {
      const input = {
          crop: pumpkin,
          numCrops: 0,
      };
      expect(getRevenueForCrop(input)).toBe(0);
  });
});

describe("getProfitForCrop", () => {
  const pumpkin = {
      name: "pumpkin",
      yield: 4,
      cost: 1.5,
      sale_price: 4,
      factors: {
          sun: {
              low: -25,
              medium: 25,
              high: 50,
          },
      }
  };
  const input = {
      crop: pumpkin,
      numCrops: 5,
  };
  const environmentFactors = {
      sun: "high",
  };
  test("Calcultate profit for a crop, no environmental factors", () => {
      expect(getProfitForCrop(input)).toBe(72.5);
  });
  test("Calcultate profit for a crop, take environmental factors into account", () => {
      expect(getProfitForCrop(input, environmentFactors)).toBe(112.5);
  });
  test("Calcultate profit for a crop with 0 amount", () => {
      const input = {
          crop: pumpkin,
          numCrops: 0,
      };
      expect(getProfitForCrop(input)).toBe(0);
  });
});

describe("getTotalProfit", () => {
  const corn = {
      name: "corn",
      yield: 3,
      cost: 1,
      sale_price: 3,
      factors: {
          sun: {
              low: -50,
              medium: 0,
              high: 75,
          },
          wind: {
              low: 0,
              medium: 0,
              high: -25,
          },
      }
  };
  const pumpkin = {
      name: "pumpkin",
      yield: 4,
      cost: 1.5,
      sale_price: 4,
      factors: {
          sun: {
              low: -25,
              medium: 25,
              high: 50,
          },
          wind: {
              low: 25,
              medium: 0,
              high: -25,
          },
      }
  }; const crops = [
      { crop: corn, numCrops: 1 },
      { crop: pumpkin, numCrops: 1 },
  ];
  const environmentFactors = {
      sun: "high",
      wind: "high",
  };
  test("Calculate profit for multiple crops, no environmental factor", () => {
      expect(getTotalProfit(crops)).toBe(22.5);
  });
  test("Calculate profit for multiple crops, environmental factors included", () => {
      expect(getTotalProfit(crops, environmentFactors)).toBe(31);
  });
  test("Calculate profit for multiple crops with 0 amount", () => {
      const crops = [
          { crop: corn, numCrops: 0 },
          { crop: pumpkin, numCrops: 0 },
      ];
      expect(getTotalProfit(crops)).toBe(0);
  });
});
