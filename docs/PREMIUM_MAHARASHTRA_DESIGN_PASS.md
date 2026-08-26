# Premium Maharashtra Design Pass

This pass builds on the existing motion upgrade without changing the CMS data model or adding dependencies.

## Creative direction

The landing page now uses a contemporary Maharashtra-inspired luxury palette and visual language:

- cinema black / ink
- Paithani gold
- restrained saffron
- deep maroon
- peacock teal
- warm ivory / handmade-paper neutrals

Cultural references remain abstract and modern rather than literal. The system uses thin Paithani-inspired geometric borders, stepped hill-fort linework, Marathi microcopy, jewel-tone client bubbles, warm editorial paper treatments and a cultural ribbon reading "महाराष्ट्रातून जगासाठी".

## Key changes

- Hero: deeper filmic grading, gold/saffron atmosphere, premium eyebrow chip, white masked logo in the landing header, richer QR card and glass controls.
- About: premium ivory surface, fort silhouette, Paithani edge and abstract Maharashtra signature mark.
- Cultural ribbon: new animated maroon/peacock/gold identity strip between About and Clients.
- Clients: warm premium surface and jewel-tone client bubbles inspired by Paithani/Marathi colour palettes.
- Services: transformed into a cinema-black 3D gallery with ivory copy, gold numbering and richer image grading.
- Achievement/Government: saffron-gold heritage surface with stepped fort geometry.
- Industries: premium paper surface and elevated card treatment.
- Stats: deep maroon/ink jewel section with gold/ivory statistics.
- Partner/Cannes: warmer editorial gold surface and geometric cultural detail.
- Testimonials/Abhijat: paper treatment plus richer maroon cinematic grading.
- Media coverage: premium paper gallery surface.
- Founder letter: editorial paper card with maroon/gold/peacock spine, warm photo grading and deeper cinematic background.
- Insights: premium editorial surface and elevated image cards.
- FAQ: luxury translucent paper accordion with gold borders.
- Careers: maroon cinematic grading and glass CTA.
- Footer: existing Figma structure preserved while receiving warm paper, gold separators, cultural edge and warmer image grading.
- Header menus: ivory/gold mega-menu treatment and richer mobile-menu jewel gradient.

## CMS impact

None. No Sanity schemas, queries, document types, content fields or editor-controlled values were changed.

## Dependencies

No new dependencies were added.

## Accessibility / motion

The existing reduced-motion handling remains intact. The new cultural ribbon disables its animation under `prefers-reduced-motion: reduce`.

## Validation

All TypeScript/TSX files were parsed through the TypeScript compiler API after the changes. No syntax errors were found.
