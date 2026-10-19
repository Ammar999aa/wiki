// Result panels for the "Try me" scheme, copied verbatim (org tag, title,
// summary, link target) from the PANELS object in the team's revised Model
// page (src/assets/model-page-drylab2.html), in the order of its "Every result
// on the scheme" buttons. Text is HTML (italics, superscripts). The mini
// charts are in ResultScheme.jsx, keyed by `key`.
const PANELS = [
  {
    "key": "k-gapfill",
    "org": "<em>B. subtilis</em> &#183; iBsu1147",
    "target": "gapfill",
    "title": "Why did the model fail without oxygen?",
    "take": "To test this, we allowed the model to obtain NAD<sup>+</sup> and orotate, a pyrimidine precursor, directly. Supplying either alone did not restore growth. Supplying both restored a predicted growth rate of 0.22 h<sup>&minus;1</sup> under uncapped nitrate supply, supporting the identification of two simultaneous bottlenecks."
  },
  {
    "key": "k-bac-nb",
    "org": "<em>B. subtilis</em> &#183; nanobody production",
    "target": "bacillus-nanobody",
    "title": "Can <em>B. subtilis</em> maintain nanobody production without oxygen?",
    "take": "With oxygen, <em>B. subtilis</em> had approximately 10% higher predicted production capacity than yeast. Without oxygen, and with nitrate supplied, its advantage increased to approximately 3.4 times the yeast prediction."
  },
  {
    "key": "k-bac-o2",
    "org": "<em>B. subtilis</em> &#183; oxygen",
    "target": "bacillus-oxygen",
    "title": "Can <em>B. subtilis</em> grow without oxygen?",
    "take": "With nitrate uptake limited to 10 mmol gDW<sup>&minus;1</sup> h<sup>&minus;1</sup>, predicted growth decreased from 0.32 h<sup>&minus;1</sup> aerobically to 0.14 h<sup>&minus;1</sup> anaerobically, a reduction of approximately 57%, compared with approximately 74% for yeast. Under these anaerobic conditions, <em>B. subtilis</em> doubled in approximately five hours, compared with approximately six hours for yeast."
  },
  {
    "key": "k-sucrose",
    "org": "<em>B. subtilis</em> &#183; carbon source",
    "target": "sucrose",
    "title": "Could sucrose replace glucose?",
    "take": "Under anaerobic conditions, the two sugars supported approximately equal growth per unit of carbon. Under aerobic conditions, glucose supported more growth per unit of carbon than sucrose."
  },
  {
    "key": "k-induction-b",
    "org": "<em>B. subtilis</em> &#183; dynamic model",
    "target": "bacillus-induction",
    "title": "When should production begin and when should we harvest?",
    "take": "Under the illustrative parameter settings, the highest final concentration occurred near 6.5 hours, with lower output for earlier or later induction. When induction began at 12 hours, nanobody concentration peaked near 140 mg L<sup>&minus;1</sup> at approximately 28 hours, then declined as modelled degradation exceeded production."
  },
  {
    "key": "k-yst-nb",
    "org": "<em>S. cerevisiae</em> &#183; nanobody production",
    "target": "yeast-nanobody",
    "title": "Does limited oxygen also reduce nanobody production?",
    "take": "We used the yeast model to estimate the maximum production rate of our two nanobody constructs, Nb14 and Nb1_gbHSV, with and without oxygen. For both constructs, removing oxygen reduced predicted production capacity by approximately 82%."
  },
  {
    "key": "k-yst-o2",
    "org": "<em>S. cerevisiae</em> &#183; oxygen",
    "target": "yeast-oxygen",
    "title": "How much oxygen does yeast need?",
    "take": "Predicted growth fell from 0.41 to 0.11 h<sup>&minus;1</sup>, increasing the doubling time from 1.7 to 6.3 hours. At the lowest non-zero value tested, 0.0503 mmol gDW<sup>&minus;1</sup> h<sup>&minus;1</sup>, growth reached 0.092 h<sup>&minus;1</sup>, exceeding our analysis threshold of 5% of aerobic growth."
  },
  {
    "key": "k-partner",
    "org": "<em>S. cerevisiae</em> &#215; <em>S. elongatus</em>",
    "target": "partner",
    "title": "How much could the photosynthetic partner supply?",
    "take": "Capping supplier growth increased sucrose supply from 0.23 to 0.81 mmol gDW<sup>&minus;1</sup> h<sup>&minus;1</sup>, raising yeast growth to 0.038 h<sup>&minus;1</sup>. Including the predicted oxygen supply increased growth further to 0.18 h<sup>&minus;1</sup>, approximately 4.7 times the sucrose-only result."
  },
  {
    "key": "k-pastoris",
    "org": "<em>P. pastoris</em> &#183; chassis comparison",
    "target": "pastoris",
    "title": "Would <em>Pichia pastoris</em> perform better?",
    "take": "Under aerobic conditions, <em>P. pastoris</em> had the highest predicted growth rate among the chassis tested. Under the tested low-oxygen condition, however, it grew more slowly than <em>S. cerevisiae</em> and supported less than half its combined GFP and nanobody production rate."
  },
  {
    "key": "k-cyano-n",
    "org": "<em>S. elongatus</em> &#183; what limits the supplier",
    "target": "cyano-limits",
    "title": "What limits the cyanobacterial supplier?",
    "take": "The analysis indicated that nitrogen availability limited growth under these conditions. Additional carbon or light offered no predicted growth benefit, whereas the nitrogen-related values identified ammonium and nitrate availability as priorities for further investigation."
  },
  {
    "key": "k-export",
    "org": "<em>S. elongatus</em> &#183; sucrose export",
    "target": "export",
    "title": "Can we direct more carbon toward sucrose export?",
    "take": "The model predicted a clear trade-off: supporting more supplier growth left less carbon available for sucrose export. At the reported maximum-growth operating point, sucrose export reached 0.23 mmol gDW<sup>&minus;1</sup> h<sup>&minus;1</sup>. Reducing the supplier growth rate to 0.013 h<sup>&minus;1</sup> increased export to 0.81 mmol gDW<sup>&minus;1</sup> h<sup>&minus;1</sup>, approximately 3.5 times higher."
  },
  {
    "key": "k-knockouts",
    "org": "<em>S. elongatus</em> &#183; gene deletions",
    "target": "knockouts",
    "title": "Would gene deletions increase sucrose production?",
    "take": "We tested whether deleting glgC, involved in glycogen storage, and invA, involved in sucrose breakdown, could redirect resources toward sucrose production. Neither deletion, alone or in combination, increased predicted production even when carbon and light restrictions were removed."
  }
];

export default PANELS;
