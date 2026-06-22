"use client";

export function AmbientGradients() {
  return (
    <div aria-hidden className="ambient-gradients pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div className="ambient-gradients__orb ambient-gradients__orb--navy" />
      <div className="ambient-gradients__orb ambient-gradients__orb--orange" />
      <div className="ambient-gradients__orb ambient-gradients__orb--blue" />
    </div>
  );
}
