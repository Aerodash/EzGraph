<template>
    <div>
        <section class="hero is-medium is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        EzGraph
                    </h1>
                </div>
            </div>
        </section>
        <div class="tabs-container">
            <ez-tabs :active-tab-index="2">
                <ez-tab label="Recent" icon="ellipsis-h">
                    <ez-recent-graphs-screen></ez-recent-graphs-screen>
                </ez-tab>
                <ez-tab label="Open" icon="folder-open">
                    <ez-open-graph-screen></ez-open-graph-screen>
                </ez-tab>
                <ez-tab label="New" icon="plus-circle">
                    <ez-new-graph-screen></ez-new-graph-screen>
                </ez-tab>
                <ez-tab label="Algorithms" icon="refresh">
                    <ez-algorithms-screen></ez-algorithms-screen>
                </ez-tab>
                <ez-tab label="Help" icon="question-circle">
                    <ez-help-screen></ez-help-screen>
                </ez-tab>
            </ez-tabs>
        </div>
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
    h1.title {
        font-family: Roboto-Thin;
        font-size: 60px;
        padding-left: 10px;
    }
    
    .hero.is-medium .hero-body {
        padding-bottom: 1rem;
        padding-top: 7rem;
    }

    .hero {
        margin-bottom: 10px;
    }
</style>