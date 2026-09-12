# NON X V18 — 360 PRODUCT MEDIA

Built from the approved NON X V17 Product Experience.

## Added
- Native `type: "360"` media support in product galleries.
- 360 media renders as a muted, autoplaying, looping, controls-free product rotation.
- 360 badge and dedicated thumbnail treatment.
- Generic support only: no current catalog product was assigned the pilot 360 video because the supplied video belongs to a different product.

## Product data example
```json
{
  "type": "360",
  "src": "assets/images/products/PRODUCT-360.mp4",
  "poster": "assets/images/products/PRODUCT-front.jpg",
  "alt": "Product name — 360 degree view"
}
```

The 360 asset should only be added to the matching real product.


## V18.1 — NX-001 PRODUCT ASSET
- Added NX-001 as the first real catalog product using the provided visual assets.
- Added PRIMARY, BACK, 3/4, DETAIL, EDITORIAL and 360° media.
- Marked NX-001 as DROP 001.
- Removed the prototype Drop 001 flag from the old demo hoodie to avoid duplicate drop numbering.
- Product commercial data is explicitly provisional and intended to be replaced with real supplier data.


## V18.2 — PRODUCT EXPERIENCE REFINEMENT
- Refined product modal to a larger, cleaner split layout inspired by the approved NON X product mockup.
- Main media stage uses a stable square presentation to reduce blank space and improve framing.
- Added previous/next gallery controls and fullscreen-style visual control.
- Removed accidental grayscale from product media.
- Detail images remain uncropped via contain behavior.
- Added a portrait-format 360° asset for NX-001, preserving the original horizontal video inside a vertical presentation.
- Kept all temporary product data clearly provisional.
