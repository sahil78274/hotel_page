# Saffron & Stone

A responsive, editorial-style website for a **fictional** luxury Indian restaurant in Jaipur. Built with Vite, semantic HTML, CSS, vanilla JavaScript, locally hosted fonts, and Lucide icons.

## Run locally

```sh
npm ci
npm run dev
```

The server listens on `0.0.0.0:5173`. Arena's `.e2b.app` preview hosts are permitted in `vite.config.js`.

## Production build

```sh
npm run build
npm run preview
```

Deploy the contents of `dist/` to a static hosting service. No server-side runtime is required.

## Included interactions

- Transparent-to-solid navigation, mobile menu, section highlighting, and smooth anchor navigation.
- Five menu categories with accessible tab roles and arrow/Home/End keyboard controls.
- Native modal gallery lightbox with Escape, close-button, and backdrop support.
- Three manually controlled, clearly labeled fictional testimonials.
- Name, phone, date, time, and guest-count validation; safely rendered sample-request summary; reset flow.
- Explicit informational dialogs for WhatsApp and Instagram placeholders.
- Reveal animations with reduced-motion support, skip navigation, and visible keyboard focus.
- Local images and fonts; no runtime requests to third-party image or font services.

## Important demo boundaries

This is not a live restaurant. No booking backend, message delivery, social account, real map integration, or personal-data storage is connected. The reservation form **does not confirm a booking** and does not send or persist personal details. Restaurant address, hours, email, and phone are clearly marked illustrative sample information. WhatsApp and Instagram controls intentionally explain their demo status rather than linking to unrelated people or accounts.

Before a real launch, replace the sample business details, supply approved restaurant photography, connect a reservation service, configure the real WhatsApp and Instagram destinations, add applicable privacy information, and test those integrations.

## Photography

Real photographs are bundled in `public/images/` for reliable demo rendering. They are visual references, not claims about a real Saffron & Stone venue or kitchen. Attribution is also available from the footer's Photography credits dialog.

| Asset | Source |
| --- | --- |
| `feast.jpg` | [Glebe Kitchen — hotel-style butter chicken](https://glebekitchen.com/butter-chicken-murgh-makhani-indian-hotel-style/) |
| `butter-chicken.webp` | [Rassa](https://rassaboston.com/) |
| `heritage.jpg` | [Pexels — Indian restaurant interior](https://www.pexels.com/photo/32657750/) |
| `dining.jpg` | [Sumessh Menon Associates — Aubergin](https://sumesshmenonassociates.com/aubergin-dining-restaurant-interior-design/) |
| `interior.jpg` | [The Architects Diary — Indian restaurant interiors](https://thearchitectsdiary.com/top-10-restaurant-interior-design-in-india/) |
| `paneer.jpg` | [My Ginger Garlic Kitchen — Paneer Tikka](https://www.mygingergarlickitchen.com/tandoori-paneer-tikka/) |
| `biryani.jpg` | [Whisk Affair — Hyderabadi Mutton Biryani](https://www.whiskaffair.com/hyderabadi-mutton-biryani-recipe/) |
| `dal.jpg` | [Whisk Affair — Dal Maharani](https://www.whiskaffair.com/dal-maharani-recipe/) |
| `dessert.jpg` | [The Belly Rules the Mind — Gulab Jamun](https://thebellyrulesthemind.net/gulab-jamun-recipe/) |

Third-party photographs are not relicensed by this repository. Obtain suitable permissions/licenses or replace with licensed/owned assets before commercial publication. The dal image is an illustrative black-lentil dish, not a photograph of a restaurant-specific recipe.

Fonts: Cormorant Garamond and Manrope, installed via Fontsource. Icons: Lucide.

## Browser smoke tests

With the dev server running in another terminal:

```sh
npm test
```

The test harness uses Playwright and bundled serverless Chromium for the Linux Arena environment. It checks five viewport widths (1440, 1024, 768, 390, 320), horizontal overflow, image decoding, navigation, all menu categories, keyboard tabs, gallery dialogs, testimonials, placeholder dialogs, reservation validation and successful demo submission, and browser JavaScript errors. Screenshots are saved to the ignored `test-results/` directory.
