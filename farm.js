const getCostsForCrop = (input) => {
  return input.crop.cost * input.numCrops;
}

const getYieldForPlant = (crop, environmentFactors) => {
  let result = 0;
  if (!environmentFactors) {
      return crop.yield;
  }
  Object.keys(environmentFactors).forEach((key) => {
      const environmentFactorsKey = environmentFactors[key];
      const cropFactor = crop.factors[key];

      result += (crop.yield / 100) * cropFactor[environmentFactorsKey];
  });
  return crop.yield + result;
}

const getYieldForCrop = (input, environmentFactors) => {
  return input.numCrops * getYieldForPlant(input.crop, environmentFactors);
}

const getTotalYield = ({ crops }, environmentFactors) => {
  let result = 0;
  crops.forEach(crop => {
      result += getYieldForCrop(crop, environmentFactors);
  });
  return result;
}

const getRevenueForCrop = (input, environmentFactors) => {
  return input.crop.sale_price * getYieldForCrop(input, environmentFactors);
}

const getProfitForCrop = (input, environmentFactors) => {
  return getRevenueForCrop(input, environmentFactors) - getCostsForCrop(input);
}

const getTotalProfit = (crops, environmentFactors) => {
  let result = 0;
  crops.forEach(crop => {
      result += getProfitForCrop(crop, environmentFactors);
  });
  return result;
}

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
}