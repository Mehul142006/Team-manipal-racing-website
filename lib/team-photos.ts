/**
 * Portrait paths keyed by the member name in SUBSYSTEM_TEAMS / LEADERSHIP.
 * The filename is the mapping source. Each file matches exactly one person.
 */
export const TEAM_MEMBER_PHOTOS: Record<string, string> = {
  "Akarsh P Poojary": "/photos/team/Akarsh.jpeg",
  "Yashvardhan M": "/photos/team/Yash.jpeg",
  "Brian D'Souza": "/photos/team/Brian.jpeg",
  "Anant G Agarwal": "/photos/team/Anant.jpeg",
  "Shamith Krishna U G": "/photos/team/Shamith.jpeg",
  "Shlok Chakravarthy": "/photos/team/Shlok.jpeg",
  "Mehul Chhibber": "/photos/team/Mehul.jpeg",
  "Ananthakrishnan O.": "/photos/team/Ananthakrishnan.jpeg",
  "Niyati Yadav": "/photos/team/Niyati.jpeg",
  "Arsh Dhar": "/photos/team/Arsh.jpeg",
  "Anish K": "/photos/team/Anish.jpeg",
  "Thushar P K": "/photos/team/Thushar.jpeg",
  "Bijin Babu": "/photos/team/Bijin.jpeg",
  "Rajendra Sunki Reddy": "/photos/team/Rajendra.jpeg",
  "Karan Kumar": "/photos/team/Karan.jpeg",
};

export function getTeamMemberPhoto(name: string): string | undefined {
  return TEAM_MEMBER_PHOTOS[name];
}
