export const config1 = {
  lazyload: {
    threshold: 0.5,
    once: true,
    // offset: '100px',
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
  debounce: {
    delay: 100,
    target: ['searchbar', 'autocomplete'], // if no array, then defaults to all
  },
}

export const adaptiveLoading = {
  '3g': {},
};
