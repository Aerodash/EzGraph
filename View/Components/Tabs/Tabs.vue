<template>
    <div class="tabs is-toggle columns is-multiline is-success">
        <ul class="column is-12 tabs-elements">
            <li v-for="tab in tabs" :class="{ 'is-active': tab.active }" @click="activate(tab)">
                <a>
                    <span class="icon is-small"><i :class="tab.icon"></i></span>
                    <span>{{ tab.label }}</span>
                </a>
            </li>
        </ul>
        <div class="column is-12 tabs-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['activeTabIndex'],
        data() {
            return {
                tabs: []
            }
        },
        methods: {
            activate(tab) {
                this.tabs.forEach((t) => {
                    if (t.label == tab.label) t.active = true;
                    else t.active = false;
                });
                Event.fire('ez-activateTab', tab);
            }
        },
        watch: {
            tabs(newTabs) {
                if (!this.activeTabIndex || this.activeTabIndex > newTabs.length - 1)
                    this.activate(newTabs[0]);
                else
                    this.activate(newTabs[this.activeTabIndex]);
            }
        }
    }
</script>
<style scoped>
    .tabs-elements {
        padding-left: 31.5
    }
    
    .tabs-content {
        padding-left: 20px;
        padding-right: 30px;
    }
</style>