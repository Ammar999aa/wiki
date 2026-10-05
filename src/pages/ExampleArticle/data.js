// ILLUSTRATIVE DATA — invented for the example article (/example-article),
// not measured. Generated from Zwietering's modified logistic model
// (OD0 = 0.02, K = 1.2) with the growth rates in example-article.md's
// Table 2 and ±3% jitter; SD = 0.004 + 4% of the mean. A real page puts
// its measured data here instead, with a comment naming the experiment,
// date and notebook entry it came from.

const t = Array.from({ length: 17 }, (_, i) => i * 0.5); // h

export const growthCurves = {
  t,
  series: [
    {
      temp: 25,
      mean: [0.024, 0.026, 0.029, 0.032, 0.038, 0.045, 0.056, 0.074, 0.097, 0.136, 0.183, 0.25, 0.34, 0.449, 0.535, 0.644, 0.762],
      sd: [0.005, 0.005, 0.005, 0.005, 0.006, 0.006, 0.006, 0.007, 0.008, 0.009, 0.011, 0.014, 0.018, 0.022, 0.025, 0.03, 0.034],
    },
    {
      temp: 30,
      mean: [0.025, 0.028, 0.032, 0.043, 0.057, 0.093, 0.146, 0.237, 0.368, 0.534, 0.72, 0.836, 0.971, 1.056, 1.095, 1.142, 1.132],
      sd: [0.005, 0.005, 0.005, 0.006, 0.006, 0.008, 0.01, 0.013, 0.019, 0.025, 0.033, 0.037, 0.043, 0.046, 0.048, 0.05, 0.049],
    },
    {
      temp: 37,
      mean: [0.023, 0.028, 0.04, 0.071, 0.154, 0.34, 0.603, 0.845, 1.041, 1.129, 1.143, 1.187, 1.194, 1.223, 1.215, 1.184, 1.234],
      sd: [0.005, 0.005, 0.006, 0.007, 0.01, 0.018, 0.028, 0.038, 0.046, 0.049, 0.05, 0.051, 0.052, 0.053, 0.053, 0.051, 0.053],
    },
  ],
};

// One colour per temperature, used for every chart on the page.
export const TEMP_COLORS = { 25: "#6FA8FF", 30: "#B16DFF", 37: "#FFD84D" };
