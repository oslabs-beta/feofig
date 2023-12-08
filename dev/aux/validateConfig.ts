import {Config} from './types';

const validateConfigs = (config: Config) => {
  // checks if config file exist
  if (!config) throw new Error('No configuration file was provided!');

  // validates object file
  if (typeof config !== 'object')
    throw new Error('Configuration file must be an object!');

  // checks for additional unexpected properties
  const allowedProps = ['lazyload', 'debounce', 'throttle', 'test'];
  const actualProps = Object.keys(config);
  const invalidProps = actualProps.filter(
    (prop) => !allowedProps.includes(prop)
  );
  if (invalidProps.length > 0) {
    throw new Error(
      `Lazyload: Invalid properties found: ${invalidProps.join(', ')}`
    );
  }

  // validates "lazyload"
  if (config.lazyload) {
    const {threshold, once, offset} = config.lazyload;

    // checks for additional unexpected properties
    const allowedProps = ['threshold', 'once', 'offset'];
    const actualProps = Object.keys(config.lazyload);
    const invalidProps = actualProps.filter(
      (prop) => !allowedProps.includes(prop)
    );
    if (invalidProps.length > 0) {
      throw new Error(
        `Lazyload: Invalid properties found: ${invalidProps.join(', ')}`
      );
    }

    // validates "threshold"
    if (
      threshold !== undefined &&
      (typeof threshold !== 'number' || threshold < 0 || threshold > 1)
    )
      throw new Error(
        'Lazyload: Threshold must be a valid number between 0 and 1'
      );

    // validates "once"
    if (once !== undefined && typeof once !== 'boolean')
      throw new Error('Lazyload: Once must be a boolean');

    // validates "offset"
    const offsetPattern = /^-?\d+px$/;
    if (
      offset !== undefined &&
      (typeof offset !== 'string' || !offsetPattern.test(offset))
    )
      throw new Error(
        'Lazyload: Offset must be a string containing a number followed by px'
      );
  }
};

export default validateConfigs;
