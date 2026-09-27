"use client";

import Image from "next/image";

const categories = [
  { label: "Films", image: "/images/ott/Image2.png", position: "center 28%" },
  { label: "Music", image: "/images/ott/thirdhero.png", position: "center" },
  { label: "Originals", image: "/images/ott/Zingaat.png", position: "center" },
];

export function ContentShowcase() {
  return (
    <section className="content-showcase" aria-labelledby="showcase-heading">
      <h2 id="showcase-heading">
        We create pathways for regional stories, <span>films and music to reach
        audiences beyond their original market — connecting content with
        platforms, partners and opportunities across India and international
        markets.</span>
      </h2>
      <div className="showcase-grid">
        {categories.map((category) => (
          <figure key={category.label}>
            <div className="showcase-image">
              <Image
                src={category.image}
                alt={`${category.label} content`}
                fill
                sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 950px) 30vw, 33vw"
                style={{ objectFit: "cover", objectPosition: category.position }}
              />
            </div>
            <figcaption>{category.label}</figcaption>
          </figure>
        ))}
      </div>
      <style jsx>{`
        .content-showcase {
          display: flex;
          width: 100%;
          padding: 6.25rem 3.5rem;
          flex-direction: column;
          align-items: center;
          gap: 6.25rem;
          background: #000;
          color: #fff;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-feature-settings: "liga" off, "clig" off;
        }
        h2 {
          width: 100%;
          margin: 0;
          font-size: 2.5rem;
          font-weight: 600;
          line-height: 3rem;
          letter-spacing: -0.03125rem;
        }
        h2 span { color: #969696; }
        .showcase-grid {
          display: flex;
          align-items: stretch;
          gap: 1.5625rem;
          width: 100%;
        }
        figure {
          display: flex;
          flex: 1 0 0;
          min-width: 0;
          margin: 0;
          flex-direction: column;
          gap: 1.25rem;
        }
        .showcase-image {
          position: relative;
          width: 100%;
          aspect-ratio: 410 / 324;
          overflow: hidden;
          border-radius: 0.5rem;
          background: #d9d9d9;
        }
        figcaption { font-size: 1.25rem; font-weight: 600; line-height: 1.75rem; }
        @media (max-width: 950px) {
          .content-showcase { padding: 5rem 2rem; gap: 4rem; }
        }
        @media (max-width: 640px) {
          .content-showcase { padding: 4rem 1.25rem; gap: 3rem; }
          h2 { font-size: 2rem; line-height: 2.5rem; }
          .showcase-grid { flex-direction: column; gap: 2rem; }
        }
      `}</style>
    </section>
  );
}
