import { CarPageContent } from "@/app/car/CarPageContent";
import { verifySitePhotos } from "@/lib/get-site-photos";

export default function CarPage() {
  const photos = verifySitePhotos();

  return <CarPageContent photos={photos} />;
}
