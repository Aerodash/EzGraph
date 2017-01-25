<template>
    <div style="height: inherit;" ref="root">
        <div :id="uuid" class="tabs is-toggle columns is-multiline is-success" ref="tabsElements">
            <ul class="tabs-elements">
                <li v-for="tab in tabs" :class="{ 'is-active': tab.active }" @click="activate(tab)">
                    <a>
                        <span class="icon is-small"><i :class="tab.icon"></i></span>
                        <span>{{ tab.label }}</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="column is-12 tabs-content" ref="tabsContent">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import UUID from '../Utils/UUID';

    export default {
        props: ['activeTabIndex'],
        data() {
            return {
                uuid: UUID.create(),
                tabs: [],
                tabsInitialized: false
            }
        },
        methods: {
            activate(tab) {
                this.tabs.forEach((t) => {
                    if (t.label == tab.label) t.active = true;
                    else t.active = false;
                });
                Event.fire('ez-activateTab.' + this.uuid, tab);
            }
        },
        watch: {
            tabs(newTabs) {
                if (this.tabsInitialized) return;
                if (!this.activeTabIndex || this.activeTabIndex > newTabs.length - 1)
                    this.activate(newTabs[0]);
                else
                    this.activate(newTabs[this.activeTabIndex]);
                this.tabsInitialized = true;
            }
        }
    }
</script>
<style scoped>
    .tabs-elements {
        margin-left: auto;
        margin-right: auto;
        flex-grow: 0;
        padding-top: 10px;
    }
    
    .tabs-content {
        padding-left: 20px;
        padding-right: 30px;
    }
    
</style>