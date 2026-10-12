export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-base-100">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
}
