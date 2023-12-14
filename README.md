![FEOFIG-Logo-01](https://github.com/oslabs-beta/feofig/assets/126510453/af945e7a-a81d-470b-9306-16935ee477c6)

# FEOFig
**_✨ Front End Optimizer & Configurer ✨_**
<br>
Turn complex front-end optimization into a simple task while maintaining readability using our figs!

## About
FEOFig is a one-stop-shop library for various front-end optimization techniques that developers can configure and apply to elements using "figs", which are reusable drop-in wrappers containing your customized settings. After configuring settings for your desired technique(s) in a separate "config" file, the figs are ready to wrap around single, multiple, or even nested elements.


## Features
➡️ Lazy Loading <br>
➡️ Debouncing <br>
➡️ Throttling <br>
➡️ Pause Offscreen CSS Animations <br>

🚀 TypeScript support

## Getting Started
### Installation
```
npm install feofig
```

## Usage 
### Fig Wrapper
Import the Fig wrapper from the FEOFig library and wrap it around your code. The Fig wrapper will apply optimizations based on a "config" object passed into the "config" prop.

```javascript
import Fig from 'feofig';
import { configExample } from './config.js';

const App = () => {
    <Fig config={configExample}>
        <img src='ILoveFigs.jpg' alt='Figs' placeholder='ILikeFigs.jpg' />
        <input type='text' onChange={handleChange} />
    </Fig>
}

export default App;
```

> NOTE: The Fig wrapper will apply optimizations to nested components but **WILL SKIP OVER** custom components.

### Creating your configurations
In the following example, a separate Javascript file is created containing the configs. Individual configs are exported and then imported into the files they will be used in.

```javascript
export const configExample = {
  lazyload: {
    threshold: 0.5,
    once: false,
  },
  throttle: {
    delay: 3000,
  },
};

export const config2 = {
  lazyload: {
    threshold: 0.25,
    once: true,
  },
  pauseAnimation: {
    threshold: 0.5,
    offset: '100px',
    classes: ['animate'],
  }
};

export const debounceConfig = {
  debounce: {
    delay: 1000,
    minlength: 5,
  }
};
```

## Configuration Documentation
Configurations are objects consisting of optional keys `lazyload`, `debounce`, `throttle`, and `pauseAnimation` whose values are objects containing the options for that specific optimization.

### lazyload
Images will only be fetched when the image element enters the browser viewport. Only works for `<img>` elements.
```javascript
lazyload: {
    threshold: number || 0,
    once: boolean || true,
    offset: string || '0px',
}
```
**_`threshold`_**: A value between 0 and 1 indicating what percentage of the placeholder image should be visible before fetching the source image. Will have no effect if the image element has no placeholder image.

**_`once`_**: A boolean indicating whether each image should be lazy loaded only once. If set to false, images will continue to be lazy loaded after entering and leaving the browser viewport.

**_`offset`_**: A string indicating the margin of the browser viewport before elements are considered visible. Example: For `offset: "10px 0px 30px 0px"` (top, right, bottom, left), an image will load when it is 10px above or 30px below the browser viewport. If only one value is provided, it will apply to all sides. Percentages may be used as well.


### debounce
Applies debouncing to `onChange` function attached to following elements:<br>
- `<input>`
- `<textarea>`
- `<select>`
- `<form>`
```javascript
debounce: {
    delay: number || 100,
    minLength: number || 0,
  }
```
**_`delay`_**: Amount of time (in milliseconds) to be delayed after the last change in the input value before the `onChange` function is triggered. For example, if set to 1000, `onChange` function will not fire until 1 second elapses after user stops making changes.

**_`minLength`_**: Minimum length of the input value for which the `onChange` function will be triggered. If the length of the input value is less than `minLength`, the `onChange` function will not be invoked.

> Note: The function to be debounced should be given to the `onChange` attribute of any target element(s)<br>_For example:_<br>`<textarea onChange={handleChange}></textarea>`

### throttle
Applies throttling to `onChange` function attached to `<input>` element and `<textarea>` element
```javascript
throttle: {
    delay: number || 100,
    minLength: number || 0,
  }
```
**_`delay`_**: Minimum time interval (in milliseconds) between consecutive invocations of `onChange` function. For example, `delay` set to 1000 means the `onChange` function will only be triggered once every 1 second if user makes changes continuously.

**_`minLength`_**: Minimum length of the input value for which the `onChange` function will be triggered. If the length of the input value is less than `minLength`, the `onChange` function will not be invoked.

> Note: The function to be throttled should be given to the `onChange` attribute of any target element(s)<br>_For example:_<br>`<textarea onChange={handleChange}></textarea>`

### pauseAnimation
Pause any CSS animations applied to the element when it is outside of the browser viewport. 
```javascript
pauseAnimation: {
  threshold: number || 0.5,
  offset: string || '0px',
  classes: string[]
}
```
**_`threshold`_**: A value between 0 and 1 indicating what percentage of the element should be visible before enabling its animation.

**_`offset`_**: A string indicating the margin of the browser viewport before elements are considered visible. Example: For offset: "10px 0px 30px 0px" (top, right, bottom, left), an element's CSS animation will be enabled when it is 10px above or 30px below the browser viewport. If only one value is provided, it will apply to all sides. 

**_`classes`_**: An array of strings indicating which classes pauseAnimation will be applied to. For example, if `classes: ['animation']` is provided and an element `<div className='animation' />` is wrapped with the Fig wrapper, then the pauseAnimation optimization will be applied to that element. 

## Running Benchmark Tests
Benchmark app load times on your network by running the command: `npx feofig --port <PORT>` . The PORT will be the port number your app is currently running on, and will default to 8080 if not specified, as follows:  `npx feofig --port 8080`
<br>
> NOTE: Your app must be running locally on your localhost to run the benchmark! 
<br>

To optionally run additional benchmarks for 4g, 3g, and/or 2g network speeds, specify them in your command: `npx feofig --port <PORT> 4g 3g 2g`
<br>

Networks speeds are defined as follows: 
```
  '4g': 
    latency: 20ms,
    downloadThroughput: 10.24 Megabits/sec = 1.28 Megabytes/sec
    uploadThroughput: 5.12 Megabits/sec = 640 Kilobytes/sec

  '3g': 
    latency: 40ms,
    downloadThroughput: 750 Kilobits/sec = 93.75 Kilobytes/sec
    uploadThroughput: 250 Kilobits/sec = 31.25 Kilobytes/sec

  '2g': 
    latency: 300ms,
    downloadThroughput: 150 Kilobits/sec = 18.750 Kilobytes/sec
    uploadThroughput: 50 Kilobits/sec = 6.25 Kilobytes/sec

```
> NOTE: Benchmarks will time out if the page does not finish loading within 30 seconds.

## Development
### Known Issues
+ Fig wrapper skips over custom elements
+ Debounce function errors when delay is set to exactly 100ms.
+ Offset does not work for nested components for all optimizations.

If you find additional issues please open an issue on this repo!

### How To Contribute
**🙏 _We believe in the power of open source and its ability to inspire and improve the community. Any contributions are welcomed and encouraged!_ 🙏**<br><br>
🍴 Fork me! <br>
👐 Clone forked repo! <br>
📋 Commit changes! <br>
📤 Make a Pull Request! <br>

## License
Distributed under the MIT License.

## Tech Stack
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=Puppeteer&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)


## Contributors
⚙️ Andy Lam | [GitHub](https://github.com/Andythelam) | [LinkedIn](https://www.linkedin.com/in/andythelam/)<br>
⚙️ Cristina Lee | [GitHub](https://github.com/crslee9970) | [LinkedIn](https://www.linkedin.com/in/cristina-lee-77846b263/)<br>
⚙️ Keidy Wuang | [GitHub](https://github.com/keidy9) | [LinkedIn](https://www.linkedin.com/in/keidyw/)<br>
⚙️ Zack Rauzi | [GitHub](https://github.com/ZackRauzi) | [LinkedIn](https://www.linkedin.com/in/zackrauzi/)<br>
<br>
Accelerated by and maintained under OSLabs.
