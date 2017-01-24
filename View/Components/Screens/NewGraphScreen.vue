<template>
    <div>
        <h1 class="title is-3">New graph</h1>
        <form>
            <label class="label">Title</label>
            <p class="control">
                <input class="input" type="text">
            </p>
            <label class="label">Default colors</label>
            <label class="label small-label">Nodes</label>
            <p class="control">
                <input class="input" type="color" value="#808080">
            </p>
            <label class="label small-label">Edges</label>
            <p class="control">
                <input class="input" type="color" value="#d3d3d3">
            </p>
        </form>
    </div>
</template>
<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
<style scoped>
    .small-label {
        font-size: 12px;
    }
</style>