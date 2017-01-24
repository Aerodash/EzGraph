
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

    // Menu component
    Vue.component('ez-menu', require('./Menu/Menu.vue'));
    Vue.component('ez-menu-footer', require('./Menu/MenuFooter.vue'));

    //Tab component
    Vue.component('ez-tabs', require('./Tabs/Tabs.vue'));
    Vue.component('ez-tab', require('./Tabs/Tab.vue'));

    //Screens
    Vue.component('ez-new-graph-screen', require('./Screens/NewGraphScreen.vue'));
    Vue.component('ez-open-graph-screen', require('./Screens/OpenGraphScreen.vue'));
    Vue.component('ez-recent-graphs-screen', require('./Screens/RecentGraphsScreen.vue'));
    Vue.component('ez-algorithms-screen', require('./Screens/AlgorithmsScreen.vue'));
    Vue.component('ez-help-screen', require('./Screens/HelpScreen.vue'));


    // Initialize Vue app
    new Vue({
        el: '#app'
    })
})
