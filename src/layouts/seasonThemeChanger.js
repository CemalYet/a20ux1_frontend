import store from '../store.js';
const seasonThemeChanger = function (){
    let resolvedTheme = {
        isSummer: false,
        isFall: false,
        isWinter: false,
        isSpring: false,
    }
    let theme = store.getters.getTheme;
    if (theme === "Seasons") {
        let createSeasonResolver = require('date-season')
        let seasonNorth = createSeasonResolver()
        let date = new Date()
        if (seasonNorth(date) === 'Summer') {
            resolvedTheme.isSummer=true;
            resolvedTheme.isFall=false;
            resolvedTheme.isWinter=false;
            resolvedTheme.isSpring=false;
        }
        if (seasonNorth(date) === 'Fall') {
            resolvedTheme.isFall=true;
            resolvedTheme.isSummer=false;
            resolvedTheme.isWinter=false;
            resolvedTheme.isSpring=false;
        }
        if (seasonNorth(date) === 'Winter') {
            resolvedTheme.isWinter=true;
            resolvedTheme.isSummer=false;
            resolvedTheme.isFall=false;
            resolvedTheme.isSpring=false;
        }
        if (seasonNorth(date) === 'Spring') {
            resolvedTheme.isSpring=true;
            resolvedTheme.isSummer=false;
            resolvedTheme.isFall=false;
            resolvedTheme.isWinter=false;
        }
    }
    if (theme === "Summer") {
        resolvedTheme.isSummer=true;
        resolvedTheme.isFall=false;
        resolvedTheme.isWinter=false;
        resolvedTheme.isSpring=false;
    }
    if (theme === "Fall") {
        resolvedTheme.isFall=true;
        resolvedTheme.isSummer=false;
        resolvedTheme.isWinter=false;
        resolvedTheme.isSpring=false;
    }
    if (theme === "Winter") {
        resolvedTheme.isWinter=true;
        resolvedTheme.isSummer=false;
        resolvedTheme.isFall=false;
        resolvedTheme.isSpring=false;
    }
    if (theme === "Spring") {
        resolvedTheme.isSpring=true;
        resolvedTheme.isSummer=false;
        resolvedTheme.isFall=false;
        resolvedTheme.isWinter=false;
    }
    return resolvedTheme;
}

export default seasonThemeChanger;