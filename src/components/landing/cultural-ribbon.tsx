const PHRASES = [
  "महाराष्ट्रातून जगासाठी",
  "कथा",
  "संगीत",
  "चित्रपट",
  "डिजिटल",
  "तंत्रज्ञान",
  "FROM MAHARASHTRA TO THE WORLD",
] as const;

function RibbonSet() {
  return (
    <div className="flex shrink-0 items-center gap-7 pr-7 sm:gap-10 sm:pr-10">
      {PHRASES.map((phrase, index) => (
        <span key={`${phrase}-${index}`} className="inline-flex items-center gap-7 sm:gap-10">
          <span className="whitespace-nowrap text-[0.62rem] font-semibold uppercase tracking-[0.2em] sm:text-[0.68rem]">
            {phrase}
          </span>
          <span className="h-1.5 w-1.5 rotate-45 border border-current opacity-60" />
        </span>
      ))}
    </div>
  );
}

export function CulturalRibbon() {
  return (
    <div
      aria-hidden="true"
      className="relative z-20 w-full overflow-hidden border-y border-[#E2BB5F]/22 bg-[linear-gradient(90deg,#4C1422,#721F31_45%,#164C50)] py-3 text-[#F2D28A] shadow-[0_1rem_3rem_rgba(34,10,17,0.15)] sm:py-3.5"
    >
      <div className="heritage-ribbon-track flex w-max items-center">
        <RibbonSet />
        <RibbonSet />
      </div>
    </div>
  );
}
