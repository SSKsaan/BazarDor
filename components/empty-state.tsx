import Link from "next/link";

type EmptyStateProps = {
  icon?: string;
  title?: string;
  message: string;
  buttonLabel?: string;
};

export default function EmptyState({
  icon,
  title,
  message,
  buttonLabel = "হোম পেজে ফিরে যান",
}: EmptyStateProps) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-4 py-16 text-center">
      {icon ? <p className="text-7xl">{icon}</p> : null}
      {title ? <h1 className="mt-4 text-3xl font-bold">{title}</h1> : null}
      <p className="mt-2 text-base-content/60">{message}</p>
      <Link href="/" className="btn btn-primary mt-6 font-bold">
        {buttonLabel}
      </Link>
    </main>
  );
}
