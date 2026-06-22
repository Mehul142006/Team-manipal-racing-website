import { Suspense } from "react";
import SubsystemsPageContent from "./SubsystemsPageContent";
import { verifySubsystemPhotos } from "@/lib/get-subsystem-photos";

export default function SubsystemsPage() {
  const subsystemPhotos = verifySubsystemPhotos();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted">
          Loading subsystems…
        </div>
      }
    >
      <SubsystemsPageContent imageOverrides={subsystemPhotos} />
    </Suspense>
  );
}
