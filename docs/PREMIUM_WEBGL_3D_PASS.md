# Premium WebGL 3D Pass

This pass removes the intentionally bad anti-design direction by branching from the Premium 3D build instead, then adds a real WebGL layer to the hero.

## Added technology

- Three.js
- React Three Fiber
- GSAP
- Browser WebGL through the React Three Fiber `<Canvas>` renderer

## Why it is limited to the hero

The hero gets the strongest real-time 3D treatment because it provides the highest visual impact while avoiding a WebGL canvas in every section. The rest of the site continues to use the lighter Framer Motion + CSS 3D system.

## Visual language

The real-time scene uses abstract forms inspired by Maharashtra without becoming literal or tourism-like:

- Paithani-style jewel diamonds
- gold/copper metallic accents
- peacock teal and deep maroon materials
- floating orbit lines
- fort-step geometry

The geometry remains decorative and does not replace any semantic/crawlable content.

## CMS behavior

The scene reacts to the active CMS hero slide. No Sanity schemas were changed. Hero content, images, CTA content, badges, QR codes, and links remain CMS-driven.

## Motion behavior

GSAP choreographs the Three.js group whenever the active hero slide changes. React Three Fiber's render loop handles subtle ambient motion. Framer Motion continues to animate live HTML copy, controls, and the rest of the site.

## Accessibility and performance

- The canvas is `aria-hidden` and non-interactive.
- `prefers-reduced-motion` is passed into the WebGL renderer and switches it to a demand-based render loop.
- DPR is capped at 1.5.
- The canvas is used only in the hero.
- No heavy textures, post-processing pipeline, physics engine, or large 3D assets are introduced.

## Install

The WebGL dependencies added in `package.json` are:

```json
{
  "@react-three/fiber": "^9.3.0",
  "gsap": "^3.13.0",
  "three": "^0.179.1"
}

// devDependency
{
  "@types/three": "^0.179.0"
}
```

Run `npm install` once after extracting the project so npm can resolve these packages and regenerate the lockfile in an online environment.
