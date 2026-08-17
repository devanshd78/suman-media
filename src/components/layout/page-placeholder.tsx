type PagePlaceholderProps = {
  title: string;
  description: string;
};

export function PagePlaceholder({
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col justify-center px-6 py-20">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
        Component handover point
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-zinc-600">{description}</p>
    </main>
  );
}
