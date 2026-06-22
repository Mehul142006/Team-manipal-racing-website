import { CarPageContent } from "@/app/car/CarPageContent";
import { verifyEvPhotos, verifySitePhotos } from "@/lib/get-site-photos";

export default function CarPage() {
  const photos = verifySitePhotos();
  const evImages = verifyEvPhotos();

  return <CarPageContent photos={photos} evImages={evImages} />;
}
