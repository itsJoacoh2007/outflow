# NON X — V17 Product Experience

V17 is built on the stable NON X V16 base and upgrades the product detail experience around the NON X visual standard.

## New
- Product identity: `NX-001`, `DROP 001`.
- Media roles: `PRIMARY`, `BACK`, `3/4`, `DETAIL`, `EDITORIAL`, `VIDEO`.
- Numbered gallery labels.
- NON X / NOTE editorial block.
- Optional product fields: `code`, `editorial`, and `media[].role`.

## Workflow
1. Replace product assets in `assets/images/products/`.
2. Add or edit products in `data/products.json`.
3. Test locally.
4. Commit/push with GitHub Desktop when ready.
5. Vercel deploys from GitHub.

No Shopify checkout is connected yet. Product data is still prototype/reference data until replaced with real supplier/product information.
