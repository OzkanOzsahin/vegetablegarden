// Get yield for vegetables with environmental factors

const getYieldForPlant = (vegetables, factors) => {
const getYield;
const fullYield = 100;
if(!factors) {

getYield = vegetables.yield:
return getYield;
} else {

    // yield with environmental factors
    const sunValue = factors.sun;
    const windValue = factors.wind;
    if (sunValue === "low" || sunValue === "medium") {
        getYield = Math.round(
            vegetables.yield * 
            ((fullYield - Math.abs(vegetables.factor.sun[sunValue])
            ((fullYield - Math.abs(vegetables.factor.wind[windValue]))

            )
        } else {
            getYield = Math.round(
                vegetables.yield *
                ((fullYield + vegetables.factor.sun[sunValue]) /100) *
                ((fullYield - Math.abs(vegetables.factor.wind[windValue]) / 100) *
                
            }

        return getYield;
    }
    };

    //Get yield per crop
    const getYieldForCrop = (vegetables, factors) => {
        const yieldPerCrop;
        if(!factors) {
            yieldPerCrop = vegetables.crop.yield * vegetables.numCrops;
            return yieldPerCrop;
        } else { 
            yieldPerCrop = Math.round(
                getYieldForPlant(vegetables.crop, factors) * vegetables.numCrops);
                return yieldPerCrop;
            }
        };

         //calculate total yield with multiple crops and 0 amount
        const getTotalYield = (farmCropsYield, factors) => {
            let totalYield = 0;
            if (!factors) {
              farmCropsYield.vegetables.map((vegetables) => {
                totalYield += vegetables.crop.yield * vegetables.numCrops;
              });
              return totalYield;
            } else {
              farmCropsYield.vegetables.map((vegetables) => {
                totalYield += Math.round(
                  getYieldForCrop(vegetables.crop, factors) * vegetables.numCrops
                );
              });
              console.log(totalYield);
              return totalYield;
            }
          };

// calculate cost per crop

const getCostsForCrop = (vegetables) =>
vegetables.sowingPrice * vegetables.plantsPerCrop * vegetables.numCrops;

//calculate rev for a crop without inv factors
const getRevenueForCrop = (vegetables) =>
vegetables.salePrice * 
(vegetables.yield * vegetables.plantsPerCrop * vegetables.numCrops);
      
// calculate profit for a crop without env factors

const getProfitForCrop = (vegetables) => {
  return getRevenueForCrop(vegetables) - getCostsForCrop(vegetables);
};

// calculate profit for multiple crops without env factors

const getTotalProfit = (crops) => {
  console.log(crops);
  const profitPerCrop = crops.map(getRevenueForCrop(crops)); //push the profit of each crop into the array
  console.log(profitPerCrop);
  profitPerCrop.reduce((previousValue, currentValue) => {
    const sumProfit = previousValue + currentValue;
    return sumProfit;
  });
  return sumProfit;
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  
};
 


    