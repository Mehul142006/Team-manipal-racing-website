import { TeamPageContent } from "@/components/team/TeamPageContent";
import { getHomePhotos } from "@/lib/get-home-photos";

export default function TeamPage() {
  const { teamPhoto } = getHomePhotos();

  return <TeamPageContent teamPhotoSrc={teamPhoto} />;
}
