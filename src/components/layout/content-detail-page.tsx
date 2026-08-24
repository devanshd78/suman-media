import Link from "next/link";

type ContentDetailPageProps = {
  eyebrow: string;
  title: string;
  description?: string | null;
  backHref: string;
  backLabel: string;
};

export function ContentDetailPage({
  eyebrow,
  title,
  description,
  backHref,
  backLabel,
}: ContentDetailPageProps) {
  return (
    <main className="mx-auto flex min-h-[65vh] w-full max-w-full flex-col justify-center px-5 py-16 sm:px-8 sm:py-24 lg:px-[3.5rem]">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
        {eyebrow}
      </p>
      <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
          {description}
        </p>
      ) : null}
      <Link
        href={backHref}
        className="mt-10 w-fit text-sm font-semibold text-zinc-900 underline underline-offset-4"
      >
        {backLabel}
      </Link>
    </main>
  );
}
