// Published structures live on iGEM's asset server, wrapped as
// {"format":"pdb","data":"..."} because the Uploads tool rejects raw PDB
// content under any extension — see src/pages/ProteinLibrary/proteins.js
// for the full story, and for the per-protein entries the library page
// builds from the same files.
const STRUCTURES_BASE = "https://static.igem.wiki/teams/6341/wiki/3d-models/structures";

// `name` is a file there, e.g. "ffibp-4nu2".
export const structureFile = (name) => `${STRUCTURES_BASE}/${name}.json`;
