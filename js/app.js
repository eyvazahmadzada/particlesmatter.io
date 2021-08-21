$(function ($) {
  // Handle header mobile menu toggle
  toggleMenu(".mobile_menu", "header-menu-open", ".hamburger, .overlay-body", () => {
    $("body").removeClass("docs-menu-open");
  });

  // Handle header hide/show on scroll
  animateHeader();

  // Color SVGs with data attribute "data-svg" (original SVG color must be #000)
  colorSvg();

  // Color target with attribute "data-color_onhover_target" on hover of "data-color_onhover"
  colorOnHover();

  // Set up accodions
  const accordions = ["docs", "faq"];
  accordions.forEach((acc) => accordion(`#js-accordion-${acc}`, { showMultiple: true, openOnInit: [0] }));
});
