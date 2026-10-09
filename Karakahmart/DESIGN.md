# KarakahMart storefront design

## Direction

Retail storefront for KarakahMart. The interface prioritizes quick product
discovery, compact offer cards, and a clear shopping-cart flow. The primary
palette is white, navy, and KarakahMart blue, with green reserved for savings.
Layouts adapt from desktop to mobile, including the storefront, shopping flow,
and account screens.

## Tokens

| Role | Value |
| --- | --- |
| Page | `#ffffff` |
| Surface | `#f4f6f7` |
| Primary text | `#20283f` |
| Secondary text | `#5f6873` |
| Brand blue | `#0798d2` |
| Dark blue | `#007db5` |
| Savings | `#16833b` |
| Border | `#e6e9ec` |
| Corner radius | `12px` |

The storefront uses the light theme on every page, regardless of the
operating-system color preference. Native controls also stay in light mode.

## Layout

- Main content is centered at a maximum width of 1180px.
- Product recommendations use five columns on desktop and progressively fewer
  columns on narrow screens, with eight category shortcuts directly below the
  promotional banner.
- The hero uses a full-photo banner with promotional copy overlaid on the
  image.
- Product detail, cart, and checkout pages use two-column layouts on desktop
  and stack content on narrow screens.
- Login and registration use a split desktop layout and a single-column layout
  on narrow screens.

## Interaction

- The homepage shows fifteen randomized products across a 60-product demo catalog
  per page. Category shortcuts filter that grid in place, and search matches
  product names.
- The promotional hero has previous/next controls and direct slide selection.
- Product detail pages share a single demo catalog with the homepage and cart.
- The cart persists product quantities in local storage. Checkout validates
  delivery details, presents a review receipt, and waits for final confirmation.
- Login and registration use a local JSON account store in browser storage.
  Passwords are PBKDF2-hashed with Web Crypto, but the flow is demo-only and
  does not provide server-side authentication.
- Order confirmation clearly states that no real order or payment is processed.
- Motion is limited to hover, focus, and state transitions, and is reduced for
  users who request reduced motion.

## Assets and implementation

Product photography is loaded from Unsplash. Additional demo products use
representative images selected from the closest matching product type. The
storefront uses semantic HTML, custom CSS properties, and vanilla JavaScript.
No frontend framework or additional package is required.
