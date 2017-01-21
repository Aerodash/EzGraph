// Initialization
window._ = require('lodash');
window.Vue = require('vue');

Vue.component('example', require('./Example.vue'));


// Initialize Vue app
new Vue({
    el: '#app'
})