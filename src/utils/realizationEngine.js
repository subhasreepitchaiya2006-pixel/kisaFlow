/**
 * KisanFlow Realization Engine & Supply Chain Analytics
 */

export function calculateRealization({ grossPrice, quantityKg, distanceKm, isRefrigerated }) {
  const baseLogisticsPerKm = isRefrigerated ? 0.025 : 0.018; // per kg per km
  const logisticsCostPerKg = Math.max(1.5, Math.min(6.0, Number((distanceKm * baseLogisticsPerKm).toFixed(2))));
  
  // Spoilage buffer based on distance and refrigeration
  const spoilagePct = isRefrigerated ? 0.015 : 0.04;
  const spoilageCostPerKg = Number((grossPrice * spoilagePct).toFixed(2));
  
  // FPO administrative fee (1% max vs 15-30% middleman commission)
  const fpoFeePerKg = Number((grossPrice * 0.01).toFixed(2));
  
  // Net farmer realization
  const netTakeHomePerKg = Number((grossPrice - logisticsCostPerKg - spoilageCostPerKg - fpoFeePerKg).toFixed(2));
  
  // Total farmer payout
  const totalNetPayout = Math.round(netTakeHomePerKg * quantityKg);
  
  // Traditional Middleman comparison
  const middlemanCutPerKg = Number((grossPrice * 0.45).toFixed(2)); // Middlemen take ~45%
  const traditionalFarmerPrice = Number((grossPrice - middlemanCutPerKg).toFixed(2));
  const traditionalPayout = Math.round(traditionalFarmerPrice * quantityKg);
  
  const additionalFarmerGainPct = Math.round(((netTakeHomePerKg - traditionalFarmerPrice) / traditionalFarmerPrice) * 100);

  return {
    grossPrice,
    logisticsCostPerKg,
    spoilageCostPerKg,
    fpoFeePerKg,
    netTakeHomePerKg,
    totalNetPayout,
    traditionalFarmerPrice,
    traditionalPayout,
    additionalFarmerGainPct,
    savedMoneyForFarmer: totalNetPayout - traditionalPayout
  };
}

export function clusterFarmingLots(farmerListings) {
  // Group listings by crop and grade
  const clusters = {};
  
  farmerListings.forEach(item => {
    const key = `${item.crop}__${item.grade}`;
    if (!clusters[key]) {
      clusters[key] = {
        crop: item.crop,
        grade: item.grade,
        totalQuantityKg: 0,
        farmersCount: 0,
        farmers: [],
        listings: []
      };
    }
    clusters[key].totalQuantityKg += item.quantityKg;
    clusters[key].farmersCount += 1;
    clusters[key].farmers.push(item.farmerName);
    clusters[key].listings.push(item);
  });
  
  return Object.values(clusters);
}
