const Airtable = require("airtable");
const base = new Airtable().base(process.env.AIRTABLE_BASE_ID);

// DIRECTORY RESOURCES
const resources = base.table("Directory Resources");

// Gets all directory resources sorted by relevance.
// Currently, "relevance" is calculated as: number of mentor recommendations + 3 (if a featured resource)
async function getAllDirectoryResources() {
  return resources
    .select({
      sort: [{ field: "relevance", direction: "desc" }],
    })
    .all();
}

// Gets a single directory resource by its internal record id, e.g. "recpMjYKr3izdXZLo"
async function getDirectoryResourceByID(id) {
  return resources.find(id);
}

// MENTORS
const mentors = base.table("Mentors");

async function getAllMentors() {
  return mentors.select().all();
}

async function getMentorByID(id) {
  return mentors.find(id);
}

const mentorJourneys = base.table("Mentor Journeys");

async function getMentorJourneyByID(id) {
  return mentorJourneys.find(id);
}

module.exports = {
  getAllDirectoryResources,
  getAllMentors,
  getDirectoryResourceByID,
  getMentorJourneyByID,
};
