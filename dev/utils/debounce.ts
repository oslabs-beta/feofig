const Debounce = () => {
  
  // from https://levelup.gitconnected.com/debounce-from-scratch-8616c8209b54
  const debounce = <T extends (...args: any[]) => void> (func: T, wait: number) => {
    let timerId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => func(...args), wait);
    }
  }

  // // from https://kettanaito.com/blog/debounce-vs-throttle
  // function debounce(func, duration) {
  //   let timeout
  
  //   return function (...args) {
  //     const effect = () => {
  //       timeout = null
  //       return func.apply(this, args)
  //     }
  
  //     clearTimeout(timeout)
  //     timeout = setTimeout(effect, duration)
  //   }
  // }
}