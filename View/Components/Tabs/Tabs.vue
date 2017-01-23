<template>
    <div class="tabs is-toggle columns is-multiline">
        <ul class="column is-12">
            <li v-for="tab in tabs" :class="{ 'is-active': tab.active }" @click="activate(tab)">
                <a>
                    <span class="icon is-small"><i :class="tab.icon"></i></span>
                    <span>{{ tab.label }}</span>
                </a>
            </li>
        </ul>
        <div class="column is-12">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
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
                this.activate(newTabs[0]);
            }
        }
    }
</script>