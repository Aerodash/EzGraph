
$(window).on('LoadVueComponents', function() {
    // Initialization
    window._ = require('lodash');
    window.Vue = require('vue');

    Vue.component('example', require('./Example.vue'));
    Vue.component('app', require('./App.vue'));

    // Initialize Vue app
    new Vue({
        el: '#app'
    })
})
