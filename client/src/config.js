export const config1 = {
  lazyload: {
    threshold: 0.5,
    once: true,
    // offset?
    // throttle
    // debounce
  },
  debounce: {
    delay: 100,
    target: ['searchbar', 'autocomplete'], // if no array, then defaults to all
  },
  throttle: {
    delay: 100,
    target: ['searchbar', 'autocomplete'], // if no array, then defaults to all
  },
  test: true, // tentative

  // pre-fetching: true,
  // disableCSSanimations : true,
  // disableCustomFonts: true,
};

export const config2 = {
}

export const adaptiveLoading = {
  '3g': {},
};
