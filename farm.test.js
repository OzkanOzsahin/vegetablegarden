const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, 
     getProfitForCrop, getTotalProfit, } = require("./farm");

// Calculating Yield per plant
describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
        factor: 30,
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
}
});

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });


test("Get yield for plant with environment factors", () => {
    const environmentFactors = {sun:"medium", wind:"high"};

    expect(getYieldForPlant(corn, environmentFactors)).toBe(30);
});

    // Calculate yield per crop
    describe("getYieldForCrop", () => {
        const corn = {
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


        test("Get yield for crop, simple", () => {
            expect(getYieldForCrop(vegetables[1])).toBe(8);
        });
        
        test("Get yield for crop with environmental factors", () => {
            const environmentFactors = {sun: "medium", wind: "high"};
            expect(getYieldForCrop(vegetables[2], environmentFactors)).toBe(12);
        });
    });

    //calculate the total yield for multiple crops
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
        medium:-30,
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

test("Calculate total yield with multiple crops", () => {
    expect(getTotalYield({vegetables})).toBe(40);
});

test("Calculate total yield with 0 amount", () => {
    const vegetables =[{crop: corn, numCrops: 0}];

    expect(getTotalYield({vegetables})).toBe(0);
});
    });

test("Calculate total yield WITH environmental factors", () => {
    const environmentFactors = { sun: "high", wind: "high" };

    expect(getTotalYield({ vegetables }, environmentFactors)).toBe(0);
  });



    // Calculate cost for a crop

    describe("getCostsForCrop", () => {
        test("Calculate cost for a crop", () => {
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
      
          expect(getCostsForCrop(corn)).toBe(150);
          expect(getCostsForCrop(pumpkin)).toBe(70);
          expect(getCostsForCrop(tomatoes)).toBe(160);
        });
      });

        // Calculate revenue for a crop (without environment factors)
        describe("getProfitForCrop", () => [
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
          
              expect(getProfitForCrop(corn)).toBe(750);
              expect(getProfitForCrop(pumpkin)).toBe(490);
              expect(getProfitForCrop(tomatoes)).toBe(560);
            }),

            // Calculate profit for a crop without environmental factors

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
              
                  expect(getProfitForCrop(corn)).toBe(750);
                  expect(getProfitForCrop(pumpkin)).toBe(490);
                  expect(getProfitForCrop(tomatoes)).toBe(560);
                });
              
                // Calculate profit for multiple crops without environmental factors
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
                        { crop: pumpkin, numCrops: 4 },
                      ];
                      
             });

                });