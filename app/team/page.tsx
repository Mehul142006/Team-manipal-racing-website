import { TeamPageContent } from "@/components/team/TeamPageContent";
import { getAboutPhotos } from "@/lib/get-about-photo";
import { getHomePhotos } from "@/lib/get-home-photos";

export default function TeamPage() {
  const { teamPhoto } = getHomePhotos();
  const structurePhotoSrc = getAboutPhotos()?.teamStructure ?? null;

  return (
    <TeamPageContent teamPhotoSrc={teamPhoto} structurePhotoSrc={structurePhotoSrc} />
  );
}
