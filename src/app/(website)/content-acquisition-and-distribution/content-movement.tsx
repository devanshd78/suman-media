"use client";

const steps = [
  { title: "Acquire", description: "Rights & Content" },
  { title: "Curate", description: "Catalogue & Programming" },
  { title: "Distribute", description: "OTT • Satellite • FAST • Digital" },
  { title: "Reach", description: "Indian & International Audiences" },
];

export function ContentMovement() {
  return (
    <section className="movement-section" aria-labelledby="movement-heading">
      <h2 id="movement-heading">How Content Moves</h2>
      <ol className="movement-grid">
        {steps.map((step, index) => (
          <li className="movement-card" key={step.title}>
            <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
            <svg className="step-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="step-copy">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <style jsx>{`
        .movement-section {
          display: flex;
          width: 100%;
          margin: 0 auto;
          padding: 6.25rem 3.5rem;
          flex-direction: column;
          align-items: center;
          gap: 3.5rem;
          background: #fff;
          font-feature-settings: "liga" off, "clig" off;
        }
        h2 {
          margin: 0;
          color: #1a1a1a;
          text-align: center;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 2.5rem;
          font-weight: 600;
          line-height: 3rem;
          letter-spacing: -0.03125rem;
        }
        .movement-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 2rem;
          width: 100%;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .movement-card {
          position: relative;
          display: flex;
          height: 17.3125rem;
          padding: 1.25rem 1.25rem 0.75rem;
          flex-direction: column;
          align-items: flex-start;
          gap: 4rem;
          border-radius: 1.25rem;
          border-bottom: 1px solid #e6e6e6;
          color: #000;
        }
        .movement-card:nth-child(1) { background: #f5ebf4; transform: rotate(5.509deg); }
        .movement-card:nth-child(2) { background: #ebf5f0; transform: rotate(-3.784deg); }
        .movement-card:nth-child(3) { background: #f5f1eb; transform: rotate(-5.27deg); }
        .movement-card:nth-child(4) { background: #d9e5f6; transform: rotate(7.404deg); }
        .step-number {
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 3.5rem;
          font-weight: 600;
          line-height: 4rem;
          letter-spacing: -0.0625rem;
        }
        .step-copy { display: flex; flex-direction: column; gap: 0.5rem; }
        h3 {
          margin: 0;
          font-family: Inter, Arial, sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.75rem;
          text-transform: uppercase;
        }
        p {
          margin: 0;
          color: #969696;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5rem;
        }
        .step-arrow {
          position: absolute;
          top: 1.5rem;
          right: 1.25rem;
          opacity: 0;
          transform: rotate(0deg);
          transition: opacity 180ms ease, transform 220ms ease;
        }
        .movement-card:hover .step-arrow {
          opacity: 1;
          transform: rotate(-45deg);
        }
        @media (max-width: 1100px) {
          .movement-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 3rem 2rem; }
        }
        @media (max-width: 640px) {
          .movement-section { padding: 4rem 2rem; }
          h2 { font-size: 2rem; line-height: 2.5rem; }
          .movement-grid { grid-template-columns: minmax(0, 1fr); max-width: 24rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .step-arrow { transition: none; }
        }
      `}</style>
    </section>
  );
}
