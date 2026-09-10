export const MOCK_CROPS = [
  { id: 'crop-1', name: 'Tomato (Hybrid Red)', category: 'Vegetables', shelfLifeDays: 4, baselineMandiPrice: 38 },
  { id: 'crop-2', name: 'Onion (Nashik Red)', category: 'Vegetables', shelfLifeDays: 30, baselineMandiPrice: 28 },
  { id: 'crop-3', name: 'Potato (Jyoti Fresh)', category: 'Tubers', shelfLifeDays: 45, baselineMandiPrice: 22 },
  { id: 'crop-4', name: 'Green Chilli (Guntur)', category: 'Spices', shelfLifeDays: 7, baselineMandiPrice: 65 },
  { id: 'crop-5', name: 'Pomegranate (Bhagwa)', category: 'Fruits', shelfLifeDays: 14, baselineMandiPrice: 120 },
];

export const MOCK_FPOS = [
  {
    id: 'fpo-101',
    name: 'Sahyadri Agro Farmers Producer Co. Ltd.',
    district: 'Nashik',
    state: 'Maharashtra',
    totalFarmers: 420,
    activeBatches: 8,
    lat: 20.0059,
    lng: 73.7898,
    leadManager: 'Ramesh Patil',
    contact: '+91 98220 12345',
  },
  {
    id: 'fpo-102',
    name: 'Kolar Green Produce Farmers Co-op',
    district: 'Kolar',
    state: 'Karnataka',
    totalFarmers: 310,
    activeBatches: 5,
    lat: 13.1367,
    lng: 78.1292,
    leadManager: 'Venkatachala Gowda',
    contact: '+91 94480 67890',
  },
  {
    id: 'fpo-103',
    name: 'Azadpur Border Farmer Collective',
    district: 'Sonipat',
    state: 'Haryana',
    totalFarmers: 280,
    activeBatches: 6,
    lat: 28.9931,
    lng: 77.0151,
    leadManager: 'Sukhbir Singh',
    contact: '+91 98112 34567',
  }
];

export const MOCK_FARMER_LISTINGS = [
  {
    id: 'lst-01',
    farmerName: 'Balasaheb Shinde',
    voiceNoteText: "I have 1,500 kg of fresh Grade A Tomato ready for harvest in 2 days from Nashik farm.",
    fpoId: 'fpo-101',
    crop: 'Tomato (Hybrid Red)',
    quantityKg: 1500,
    grade: 'Grade A (Export/Bulk)',
    harvestDate: '2026-09-11',
    farmLocation: 'Dindori, Nashik (20.2011, 73.8321)',
    lat: 20.2011,
    lng: 73.8321,
    expectedGrossPrice: 38,
    logisticsCostKg: 3.2,
    spoilageBufferKg: 1.8,
    netTakeHome: 33.0,
    status: 'Pooled in Cluster #101-A',
    listedAt: '10 mins ago'
  },
  {
    id: 'lst-02',
    farmerName: 'Sunita Deshmukh',
    voiceNoteText: "800 kg Grade B Tomato, ready for dispatch tomorrow.",
    fpoId: 'fpo-101',
    crop: 'Tomato (Hybrid Red)',
    quantityKg: 800,
    grade: 'Grade B (Local Retail)',
    harvestDate: '2026-09-10',
    farmLocation: 'Pimpalgaon, Nashik (20.1701, 73.9801)',
    lat: 20.1701,
    lng: 73.9801,
    expectedGrossPrice: 36,
    logisticsCostKg: 3.0,
    spoilageBufferKg: 1.5,
    netTakeHome: 31.5,
    status: 'Pooled in Cluster #101-A',
    listedAt: '25 mins ago'
  },
  {
    id: 'lst-03',
    farmerName: 'Dnyaneshwar Pawar',
    voiceNoteText: "2,500 kg Nashik Red Onion, dry cured, excellent storage quality.",
    fpoId: 'fpo-101',
    crop: 'Onion (Nashik Red)',
    quantityKg: 2500,
    grade: 'Grade A',
    harvestDate: '2026-09-08',
    farmLocation: 'Niphad, Nashik (20.0781, 74.1082)',
    lat: 20.0781,
    lng: 74.1082,
    expectedGrossPrice: 28,
    logisticsCostKg: 1.8,
    spoilageBufferKg: 0.5,
    netTakeHome: 25.7,
    status: 'Available for Lotting',
    listedAt: '1 hour ago'
  },
  {
    id: 'lst-04',
    farmerName: 'M. Narayanaswamy',
    voiceNoteText: "3,000 kg fresh Tomato harvest ready in Kolar hub.",
    fpoId: 'fpo-102',
    crop: 'Tomato (Hybrid Red)',
    quantityKg: 3000,
    grade: 'Grade A',
    harvestDate: '2026-09-10',
    farmLocation: 'Malur, Kolar (13.0031, 77.9392)',
    lat: 13.0031,
    lng: 77.9392,
    expectedGrossPrice: 40,
    logisticsCostKg: 4.1,
    spoilageBufferKg: 2.0,
    netTakeHome: 33.9,
    status: 'Pooled in Cluster #102-B',
    listedAt: '2 hours ago'
  },
  {
    id: 'lst-05',
    farmerName: 'Manjeet Singh Dhillon',
    voiceNoteText: "4,000 kg Jyoti Potato clean harvest.",
    fpoId: 'fpo-103',
    crop: 'Potato (Jyoti Fresh)',
    quantityKg: 4000,
    grade: 'Grade A',
    harvestDate: '2026-09-07',
    farmLocation: 'Ganaur, Sonipat (29.1351, 77.0210)',
    lat: 29.1351,
    lng: 77.0210,
    expectedGrossPrice: 22,
    logisticsCostKg: 1.5,
    spoilageBufferKg: 0.3,
    netTakeHome: 20.2,
    status: 'Available for Lotting',
    listedAt: '3 hours ago'
  }
];

export const MOCK_CLUSTERED_LOTS = [
  {
    lotId: 'LOT-NSK-2026-09A',
    fpoName: 'Sahyadri Agro Farmers Producer Co.',
    crop: 'Tomato (Hybrid Red)',
    totalQuantityKg: 4500,
    participatingFarmers: 4,
    farmers: ['Balasaheb Shinde', 'Sunita Deshmukh', 'Kiran Khairnar', 'Vikas Jadhav'],
    originHub: 'Nashik Aggregation Center',
    originLat: 20.0059,
    originLng: 73.7898,
    destinationMarket: 'Mumbai Wholesale & Retail Hub (Vashi / Dadar)',
    destLat: 19.0760,
    destLng: 72.8777,
    mandiPricePerKg: 38.0,
    kisanFlowPricePerKg: 33.2,
    traditionalFarmerSharePercent: 42,
    kisanFlowFarmerSharePercent: 86,
    spoilageReductionPercent: 68,
    status: 'Matched with Buyer (Reliance Fresh)',
    etaHours: 4.5,
    distanceKm: 168
  },
  {
    lotId: 'LOT-KLR-2026-12B',
    fpoName: 'Kolar Green Produce Farmers Co-op',
    crop: 'Tomato (Hybrid Red)',
    totalQuantityKg: 6000,
    participatingFarmers: 6,
    farmers: ['M. Narayanaswamy', 'Gopalappa', 'Srinivas R.', 'Anjanappa', 'Venkatesh', 'Kavitha M.'],
    originHub: 'Kolar Aggregation Center',
    originLat: 13.1367,
    originLng: 78.1292,
    destinationMarket: 'Bengaluru Metro Fulfillment Center (KR Puram)',
    destLat: 12.9716,
    destLng: 77.5946,
    mandiPricePerKg: 42.0,
    kisanFlowPricePerKg: 36.5,
    traditionalFarmerSharePercent: 38,
    kisanFlowFarmerSharePercent: 87,
    spoilageReductionPercent: 72,
    status: 'In Transit',
    etaHours: 1.8,
    distanceKm: 65
  }
];

export const MOCK_BUYER_ORDERS = [
  {
    orderId: 'ORD-8821',
    buyerName: 'BigBasket Wholesale Hub',
    buyerType: 'Bulk Retail Enterprise',
    crop: 'Tomato (Hybrid Red)',
    quantityKg: 3000,
    offeredPriceKg: 42.5,
    breakdown: {
      farmgatePayment: 34.0, // 80% to farmer!
      logisticsCost: 4.5,   // Shared optimized route
      spoilageInsurance: 1.5,
      platformFee: 2.5,     // Buyer side only!
    },
    middlemanComparisonPrice: 58.0, // Middleman charges consumer ₹58, gives farmer ₹16
    savingsForConsumer: 15.5,
    status: 'Dispatched',
    deliveryTarget: 'Vashi DC, Navi Mumbai'
  },
  {
    orderId: 'ORD-8822',
    buyerName: 'Dadar Consumer Apartment Association (120 Families)',
    buyerType: 'Consumer Collective',
    crop: 'Onion (Nashik Red)',
    quantityKg: 500,
    offeredPriceKg: 31.0,
    breakdown: {
      farmgatePayment: 26.0,
      logisticsCost: 3.0,
      spoilageInsurance: 0.5,
      platformFee: 1.5
    },
    middlemanComparisonPrice: 45.0,
    savingsForConsumer: 14.0,
    status: 'Confirmed & Pooled',
    deliveryTarget: 'Dadar West, Mumbai'
  }
];

export const MOCK_DEMAND_FORECAST_DATA = {
  labels: ['Mon (Sep 07)', 'Tue (Sep 08)', 'Wed (Today)', 'Thu (Sep 10)', 'Fri (Sep 11)', 'Sat (Sep 12)', 'Sun (Sep 13)'],
  crops: {
    Tomato: {
      historicalMandi: [34, 36, 38, 42, 45, 48, 52],
      predictedDemandKg: [12000, 14500, 18000, 22000, 26000, 29000, 31000],
      predictedFarmgateRealization: [28.5, 30.2, 33.0, 36.8, 39.5, 42.0, 45.2],
      supplyDipAlert: true,
      alertMessage: '⚠️ Urgent: Nashik & Kolar regional supply dip expected in 48 hours! Wholesale demand surging by +35%. Recommended action: Pool harvests now to capture peak net realization.'
    },
    Onion: {
      historicalMandi: [26, 27, 28, 28, 29, 30, 31],
      predictedDemandKg: [35000, 34000, 36000, 35500, 37000, 38000, 39000],
      predictedFarmgateRealization: [23.1, 24.0, 25.7, 25.5, 26.2, 27.0, 27.8],
      supplyDipAlert: false,
      alertMessage: '✅ Stable market condition. Steady demand across Mumbai & Delhi wholesale APMCs.'
    }
  }
};

export const MOCK_ROUTE_DATA = {
  routeName: 'Route #MH-NSK-MUM-04',
  vehicle: 'Eicher 14FT Refrigerated Van (MH-15-EG-4921)',
  driver: 'Prakash Deshmukh (+91 97654 32100)',
  stops: [
    { name: 'Dindori Farm (Balasaheb Shinde)', lat: 20.2011, lng: 73.8321, type: 'Pickup', qty: '1,500 kg Tomato' },
    { name: 'Pimpalgaon Farm (Sunita Deshmukh)', lat: 20.1701, lng: 73.9801, type: 'Pickup', qty: '800 kg Tomato' },
    { name: 'Sahyadri FPO Nashik Hub', lat: 20.0059, lng: 73.7898, type: 'Consolidation', qty: 'QC & Cold Seal' },
    { name: 'Vashi Wholesale Hub, Mumbai', lat: 19.0760, lng: 72.8777, type: 'Buyer Delivery', qty: '2,300 kg Delivered' }
  ],
  totalDistanceKm: 182,
  optimizedFuelSavedLiters: 14.5,
  spoilageRiskScore: 'Low (1.2%)',
  traditionalSoloCost: '₹8,400',
  kisanFlowPooledCost: '₹3,950 (53% Cost Reduction!)'
};

export const MOCK_ONDC_PAYLOAD = {
  context: {
    domain: "nic2004:52110",
    country: "IND",
    city: "std:022",
    action: "on_search",
    core_version: "1.2.0",
    bap_id: "buyer-app-ondc.gov.in",
    bpp_id: "kisanflow-fpo-gateway.sih.in",
    transaction_id: "txn-sih-26033-99812",
    message_id: "msg-99120-fpo",
    timestamp: "2026-09-09T17:45:00.000Z"
  },
  message: {
    catalog: {
      "bpp/descriptor": {
        name: "KisanFlow FPO Aggregated Produce Network",
        short_desc: "Direct Farmgate Certified Produce Lots (DoCA Aligned)"
      },
      "bpp/providers": [
        {
          id: "fpo-101-sahyadri",
          descriptor: { name: "Sahyadri Agro Farmers Producer Co. (Nashik)" },
          items: [
            {
              id: "item-tomato-gradeA-4500kg",
              descriptor: { name: "Tomato Hybrid Red (Export Grade A)" },
              price: { currency: "INR", value: "33.20", maximum_value: "38.00" },
              quantity: { available: { count: 4500, unit: "kg" } },
              category_id: "Fresh Produce",
              fulfillment_id: "ful-refrigerated-express",
              "@kisanflow/farmer_realization": {
                net_take_home_per_kg: "₹33.00",
                farmer_share_pct: "86%",
                middleman_eliminated_cut: "₹18.50/kg"
              }
            }
          ]
        }
      ]
    }
  }
};
