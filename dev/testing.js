const config = true;

const runTest = (config, wrapChoice) => {
  // if test = true, run tests
  if (config) {
    const result = '';
    if (wrapChoice === 'noWrap') {
      result = puppeteer(fig)
      return `This took ${result} to load without wrapping`
    }
    if (wrapChoice === 'wrap') {
      result = puppeteer(fig, noTest)
      return `This took ${result} to load with wrapping`
    }
  }

}

const noWrapResult = runTest(config, 'noWrap')
const wrapResult = runTest(config, 'wrap')

console.log(noWrapResult)
console.log(wrapResult)