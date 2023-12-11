import {Config} from './types';

const validateConfigs = (config: Config) => {
  // checks if config file exist
  if (!config) throw new Error('No configuration file was provided!');

  // validates object file
  if (typeof config !== 'object')
    throw new Error('Configuration file must be an object!');

  // checks for additional unexpected properties
  const allowedProps = ['lazyload', 'debounce', 'throttle'];
  const actualProps = Object.keys(config);
  const invalidProps = actualProps.filter(
    (prop) => !allowedProps.includes(prop)
  );
  if (invalidProps.length > 0) {
    throw new Error(
      `Invalid properties found in the Configuration file: ${invalidProps.join(
        ', '
      )}`
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
        `Invalid properties found in the lazyload configuration: ${invalidProps.join(
          ', '
        )}`
      );
    }

    // validates "threshold"
    if (
      threshold !== undefined &&
      (typeof threshold !== 'number' || threshold < 0 || threshold > 1)
    )
      throw new Error(
        'Lazyload: threshold must be a valid number between 0 and 1'
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
        'Lazyload: offset must be a string containing a number followed by px'
      );
  }

  // prevents debounce and throttle simultaneously
  if (config.debounce && config.throttle) {
    console.error('Both debounce and throttle are currently enabled in one of the configurations but are mutually exclusive. Please remove one of them')
  }

  // validates "debounce"
  if (config.debounce) {
    const {delay, minLength} = config.debounce; // add target later

    // checks for additional unexpected properties
    const allowedProps = ['delay', 'minLength'];
    const actualProps = Object.keys(config.debounce);
    const invalidProps = actualProps.filter(
      (prop) => !allowedProps.includes(prop)
    );
    if (invalidProps.length > 0) {
      throw new Error(
        `Invalid properties found in the debounce configuration: ${invalidProps.join(
          ', '
        )}`
      );
    }

    // validates "delay"
    if (delay !== undefined && (typeof delay !== 'number' || delay < 0))
      throw new Error('Debounce: delay must be a valid, positive number');
    // validates "minLength"
    if (
      minLength !== undefined &&
      (typeof minLength !== 'number' || minLength < 0)
    )
      throw new Error('Debounce: minLength must be a valid, positive number');
  }

  // validates "throttle"
  if (config.throttle) {
    const {delay, minLength} = config.throttle; // add target later

    // checks for additional unexpected properties
    const allowedProps = ['delay', 'minLength'];
    const actualProps = Object.keys(config.throttle);
    const invalidProps = actualProps.filter(
      (prop) => !allowedProps.includes(prop)
    );
    if (invalidProps.length > 0) {
      throw new Error(
        `Invalid properties found in the throttle configuration: ${invalidProps.join(
          ', '
        )}`
      );
    }

    // validates "delay"
    if (delay !== undefined && (typeof delay !== 'number' || delay < 0))
      throw new Error('Debounce: delay must be a valid, positive number');
    // validates "minLength"
    if (
      minLength !== undefined &&
      (typeof minLength !== 'number' || minLength < 0)
    )
      throw new Error('Debounce: minLength must be a valid, positive number');
  }

  // add more config validations below:
};

export default validateConfigs;
