
$(window).on('LoadVueComponents', function() {
    // Initialization
    window._ = require('lodash');
    window.Vue = require('vue');

    // Event hub
    const Event = require('./Utils/Event').default;
    window.Event = new Event();

    Vue.component('example', require('./Example.vue'));
    Vue.component('ez-app', require('./App.vue'));
    Vue.component('ez-graph', require('./Graph.vue'));
    Vue.component('ez-menu', require('./Menu.vue'));

    //Tab component
    Vue.component('ez-tabs', require('./Tabs/Tabs.vue'));
    Vue.component('ez-tab', require('./Tabs/Tab.vue'));

    // Initialize Vue app
    new Vue({
        el: '#app'
    })
})
