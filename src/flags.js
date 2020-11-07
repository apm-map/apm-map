// feature flags; toggle certain features or code using depending on whether or not a given flag is set to true
// Set to true to "enable" a feature code path, but ONLY commit when releasing the feature

const FLAGS = {
  APM_MAP_V2_AIRTABLE: false,
  APM_MAP_V2_WINTER2020_REDESIGN: false,
  APM_MAP_V2_DIRECTORY_SEARCH: false,
};

module.exports = {
  FLAGS,
};
