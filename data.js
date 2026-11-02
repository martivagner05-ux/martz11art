// ============================================================
//  MARTZ11 — site content. Edit this file to change the site.
// ============================================================

// Your eBay page (used when a painting has no own ebay link)
const EBAY_STORE = "https://ebay.io/m/YNLJi7";

// Social links — shown at the bottom of every page (leave "" to hide one)
const INSTAGRAM = "https://www.instagram.com/martz11art";
const TIKTOK = "https://www.tiktok.com/@martz11art";

// Paintings for sale — shown on the main page.
// To add one, copy this inside the [ ] (add a comma between paintings):
//   {
//     id: "painting-name",              // short unique name, used in the link
//     title: "PAINTING NAME",
//     number: "#002",                   // shown under the title in the shop
//     size: "50 × 70 CM",
//     medium: "ACRYLIC ON CANVAS",
//     painted: "2026",                  // when it was painted
//     sold: "",                         // empty = AVAILABLE, or when it sold, e.g. "DEC 2026"
//     price: "",
//     image: "images/painting-name.jpg",
//     photos: ["images/...jpg"],        // extra photos shown under the main image
//     info: "Text about the painting.",
//     ebay: ""                          // eBay link for this painting (empty = EBAY_STORE)
//   }
const PAINTINGS = [
  {
    id: "aubrey",
    title: "AUBREY",
    number: "#001",
    size: "38 × 38 CM",
    medium: "ACRYLIC ON CANVAS",
    painted: "2026",
    sold: "",
    price: "",
    image: "images/aubrey/main.jpg",
    photos: [
      "images/aubrey/photo-1.jpg",
      "images/aubrey/photo-2.jpg",
      "images/aubrey/photo-3.jpg",
      "images/aubrey/photo-4.jpg",
      "images/aubrey/photo-5.jpg"
    ],
    info: "",
    ebay: "https://www.ebay.com/itm/407332160400"
  }
];

// History of work — shown on the ARCHIVE page. Each one opens its own page
// (same as a painting, but without the eBay button). Copy this inside the [ ]:
//   {
//     id: "work-name",                  // short unique name, used in the link
//     title: "WORK NAME",
//     number: "#000",
//     size: "38 × 38 CM",
//     medium: "ACRYLIC ON CANVAS",
//     painted: "2026",
//     sold: "",                         // empty = AVAILABLE, or when it sold
//     image: "images/work-name/main.jpg",
//     photos: ["images/work-name/photo-1.jpg"],
//     info: ""
//   }
const ARCHIVE = [
  {
    id: "aubrey",
    title: "AUBREY",
    number: "#001",
    size: "38 × 38 CM",
    medium: "ACRYLIC ON CANVAS",
    painted: "2026",
    sold: "",
    image: "images/aubrey/main.jpg",
    photos: [
      "images/aubrey/photo-1.jpg",
      "images/aubrey/photo-2.jpg",
      "images/aubrey/photo-3.jpg",
      "images/aubrey/photo-4.jpg",
      "images/aubrey/photo-5.jpg"
    ],
    info: ""
  }
];

// Private pages — a thank-you page + certificate for the buyer,
// opened only with their order code.
// The key is the SHA-256 hash of the code (UPPERCASE), so the code itself
// never appears in the website source. To make a hash in Terminal:
//   printf %s MYCODE | shasum -a 256
// Then add inside the { }:
//   "PASTE-HASH-HERE": {
//     title: "...", number: "#000", size: "...", medium: "...", painted: "2026",
//     owner: "",       // buyer's name (empty = not shown)
//     purchased: "",   // when they bought it, e.g. "NOV 2026" (empty = not shown)
//     note: "",        // your own thank-you message (empty = default message)
//     image: "images/....jpg", photos: []
//   },
const PRIVATE = {
  // AUBREY
  "dc811d1e032bfaf171b5ab062399f84134b54dbbf9b2ad2a289cbe81948b2876": {
    title: "AUBREY",
    number: "#001",
    size: "38 × 38 CM",
    medium: "ACRYLIC ON CANVAS",
    painted: "1.NOVEMBER 2026",
    owner: "",
    purchased: "",
    note: "",
    image: "images/aubrey/main.jpg",
    photos: [
      "images/aubrey/photo-1.jpg",
      "images/aubrey/photo-2.jpg",
      "images/aubrey/photo-3.jpg",
      "images/aubrey/photo-4.jpg"
    ]
  }
};
