import { Exo_2, Inter } from "next/font/google";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

const STATS = [
  {
    value: "000+",
    label: "Film Entertainment Content",
  },
  {
    value: "00+",
    label: "Youtube Channels",
  },
  {
    value: "00mn",
    label: "Content views",
  },
  {
    value: "00+",
    label: "Years in Business",
  },
] as const;

export function StatsSection() {
  return (
    <section
      aria-label="Suman Media statistics"
      className="
        mx-auto
        flex
        w-full
        max-w-[90rem]
        flex-col
        items-end

        gap-[6.25rem]

        bg-white

        px-5
        py-16

        sm:px-8

        lg:px-[3.5rem]
        lg:py-[6.25rem]
      "
    >
      <div
        className="
          grid
          w-full
          grid-cols-1

          bg-white

          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={`
              relative

              flex
              flex-col
              items-center
              justify-center

              gap-1

              px-4
              py-6

              lg:px-6
              lg:py-1

              ${
                index !== STATS.length - 1
                  ? "lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:h-[4.25rem] lg:after:w-px lg:after:-translate-y-1/2 lg:after:bg-[rgba(0,17,102,0.10)]"
                  : ""
              }
            `}
          >
            <p
              className={`
                ${exo2.className}

                w-full

                text-center

                text-[2.75rem]
                font-semibold
                leading-[3.25rem]
                tracking-[-0.0625rem]

                text-[rgba(0,6,38,0.90)]

                lg:text-[3.5rem]
                lg:leading-[4rem]
              `}
              style={{
                fontFeatureSettings: '"liga" off, "clig" off',
              }}
            >
              {stat.value}
            </p>

            <p
              className={`
                ${inter.className}

                w-full

                text-center

                text-base
                font-normal
                leading-6

                text-[rgba(0,9,51,0.65)]
              `}
              style={{
                fontFeatureSettings: '"liga" off, "clig" off',
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}