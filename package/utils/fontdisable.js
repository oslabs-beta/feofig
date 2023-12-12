"use strict";
//cool articles:
// https://www.zachleat.com/web/the-compromise/
// https://innovation.ebayinc.com/tech/engineering/ebays-font-loading-strategy/
// https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
// https://www.freecodecamp.org/news/web-fonts-in-2018-f191a48367e8/
// https://stackoverflow.com/questions/42342133/showing-on-console-slow-network-is-detected-fallback-font-will-be-used-while-l
// APPROACH: 
// HIGH LEVEL:
// check if user internet speed is slow
// if user speed is slow, disable custom fonts
// TECHNICAL:
// use font-display? https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
// use css insert-rule / delete-rule? https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
//Important terms:
// FOIT: Flash of invisible text
// FOUT: Flash of unstyled text
//it turns out font-display basically does everything we would want, I don't think there is a way 
//example configuration:
const fontdisableConfig = {
    fontdisable: {
        "2g": {
            disable: true,
            exlude: null,
        },
        "3g": {
            disable: true,
            exclude: "comic sans",
        },
        "4g": {
            disable: false
        },
    },
};
