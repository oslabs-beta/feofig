const Debounce = () => {
  
  // from https://levelup.gitconnected.com/debounce-from-scratch-8616c8209b54
  const debounce = (func, wait: number) => {
    let timerId;
    return () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => func(), wait);
    }
  }

}