/* --------------------------- APP FUNCTIONS --------------------------- */

/** Contains actions for handling menu toggle */
const _toggleMenuActions = (className) => $("body").toggleClass(className);

/** Handles menu toggle */
const toggleMenu = (selector, className, toggler, callback = null) => {
  if (!$(selector).length) return false;

  $.each(toggler.split(","), (i, el) => $(el).on("click", () => {
    _toggleMenuActions(className);
    
    // Trigger callback function
    if(callback) { callback(); }

  }));
  
  $(selector).find("a").on("click", () => _toggleMenuActions(className));
};

/** Handles hide/show header on scroll */
const animateHeader = (selector = ".header") => {
  if (!$(selector).length) return false;

  let lastScrollTop = 0;
  const delta = 15;

  $(window).on("scroll", function () {
    const st = $(this).scrollTop();

    // No action if menu is open
    if (!$("body").hasClass("menu-open")) {
      if (Math.abs(lastScrollTop - st) <= delta) return;

      if (st > lastScrollTop && lastScrollTop > 0) {
        // Scroll down
        $(selector).addClass("hide");
      } else {
        // Scroll up
        $(selector).removeClass("hide");
      }

      lastScrollTop = st;
    }
  });
};

/** Colors svg icons */
const colorSvg = (selector = null, colorHex = null) => {
  $(selector ?? "[data-svg]").each((i, el) => {
    const colorTag = colorHex ?? el.dataset.svg;

    const rgb = hexToRgb(colorTag);
    const color = new Color(rgb[0], rgb[1], rgb[2]);
    const solver = new Solver(color);
    const result = solver.solve();
    $(el).attr("style", result.filter);
  });
};

/** Changes color of target on hover of element */
const colorOnHover = (selector = null, target = null, colorHex = null) => {
  $(selector ?? "[data-color_onhover]").each((i, el) => {
    let currentColor;

    // Handle mouse enter and leave
    $(el).on("mouseenter", () => {
      targetEl = target ?? $(el).find("[data-color_onhover_target]");
      currentColor = $(targetEl).css("color");

      $(targetEl).css("color", colorHex ?? el.dataset.color_onhover);
    });

    $(el).on("mouseleave", () => $(targetEl).css("color", currentColor));
  });
};

/* --------------------------- PLUGINS --------------------------- */

/** Creates and returns an according with given options */
const accordion = (selector, options = {}) => {
  if (!document.querySelector(selector)) {
    return false;
  }
  return new Accordion(selector, options);
};
