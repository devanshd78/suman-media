# Premium 3D UI Pass

This pass layers a cinematic 3D interaction system over the existing premium Maharashtra visual language without introducing WebGL, Three.js, GSAP, or another runtime dependency.

## Design language

- Deep perspective and parallax rather than flat hover movement.
- Paithani-inspired diamonds are treated as floating spatial inlays.
- Hill-fort step geometry is used as abstract depth architecture.
- Maharashtra jewel tones remain restrained: gold, maroon, peacock teal, saffron, ivory and cinema black.
- Important content stays live semantic HTML and CMS-driven.

## Reusable 3D primitives

`src/components/motion/premium-3d.tsx`

- `Premium3DSurface`: pointer-responsive tilt, lift and glare using Framer Motion motion values and springs.
- `HeritageDepthField`: decorative 3D cultural geometry used only as atmosphere.
- Both automatically reduce to static presentation for `prefers-reduced-motion` users.

## Sections upgraded

### Hero
- 3D cultural geometry and perspective horizon.
- Hero copy placed across separate Z planes.
- CMS badge and QR promo card get physical depth and pointer tilt.

### About
- Main editorial copy moved into a shallow 3D ivory slab with raised type layers.

### Clients
- Client circles now read as dimensional jewel-tone spheres with specular highlights and depth shadows.

### Services
- Existing scroll-driven 3D gallery retained and enhanced with deeper copy/image planes, inlaid card borders and stronger depth shadows.

### Industries
- Each industry card is now a pointer-responsive 3D stage.
- CMS artwork occupies a higher Z plane while copy and cultural inlays use separate planes.

### Statistics
- Metrics are presented as four floating glass/jewel panels with raised counter typography.

### Why Partner / Cannes
- Benefits appear on a shallow 3D paper slab.
- Cannes scene receives cultural depth geometry, perspective floor and a floating event badge.

### Founder letter
- Editorial paper becomes a physical floating letter with raised typography and signature planes.

### Insights
- CMS imagery is framed as a physical 3D editorial print with depth shadow, glare and hover tilt.

### Careers
- 3D cultural field, perspective floor, raised typography and a physical CTA button.

### Footer
- Figma layout is preserved. Only social controls receive a subtle 3D hover response.

## Performance and accessibility

- No canvas or WebGL.
- No new package dependency.
- Pointer motion uses transform-only Framer Motion values.
- Touch pointers do not receive tilt behavior.
- Reduced-motion users receive static surfaces and no perspective horizon animation.
- CMS content and Sanity schemas are unchanged.
