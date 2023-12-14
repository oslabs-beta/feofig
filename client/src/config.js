export const lazyLoadConfig = {
  lazyload: {
    threshold: 0.5,
    once: true,
    // offset: '100px',
    // throttle
    // debounce
  },
  // debounce: {
  //   delay: 1000,
  //   minLength: 3,
  //   // target: ['searchbar', 'autocomplete'], // if no array, then defaults to all
  // },
  // throttle: {
  //   delay: 100,
  //   minLength: 3,
  //   // target: ['searchbar', 'autocomplete'], // if no array, then defaults to all
  // }

  // pre-fetching: true,
  // disableCSSanimations : true,
  // disableCustomFonts: true,
};

export const debounceConfig = {
  debounce: {
    delay: 1000,
    minLength: 3,
    // target: ['searchbar', 'autocomplete'], // if no array, then defaults to all
  },
}

export const debounceConfig2 = {
  debounce: {
    delay: 3000,
    minLength: 3,
    // target: ['searchbar', 'autocomplete'], // if no array, then defaults to all
  },
}

export const throttleConfig = {
  throttle: {
    delay: 1000,
    minLength: 3,
    // target: ['searchbar', 'autocomplete'], // if no array, then defaults to all
  },
}

// export const adaptiveLoading = {
//   '3g': {},
// };


export const pauseAnimationConfig = {
  pauseAnimation: {
    threshold: 0.5,
    offset: "100px",
    classes: ['animate']
  }
}