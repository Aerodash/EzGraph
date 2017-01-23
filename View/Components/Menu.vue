<template>
    <div>
        Menu
        <ez-tabs>
            <ez-tab label="Tab 1" icon="quora">
                Content 1
            </ez-tab>
            <ez-tab label="Tab 2" icon="quora">
                Content 2
            </ez-tab>
            <ez-tab label="Tab 3" icon="quora">
                Content 3
            </ez-tab>
        </ez-tabs>
    </div>
</template>
<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>