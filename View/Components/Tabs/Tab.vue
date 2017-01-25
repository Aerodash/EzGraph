<template>
    <div v-show="active">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: ['label', 'icon'],
        data() {
            return {
                active: false,
                parentUUID: this.$parent.$data.uuid
            }
        },
        computed: {
            iconName() {
                return 'fa fa-' + this.icon;
            }
        },
        mounted() {
            Event.listen('ez-activateTab.' + this.parentUUID, (tab) => {
                if (this.label === tab.label) {
                    this.active = true;
                } else {
                    this.active = false;
                }
                
            });
        },
        created() {
            this.$parent.$data.tabs.push({
                label: this.label,
                icon: this.iconName,
                active: this.active
            });
        }
    }
</script>