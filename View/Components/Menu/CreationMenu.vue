<template>
    <div>
        <section class="hero is-medium is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        EzGraph<span class="graph-title">{{ currentGraphTitle }}</span>
                    </h1>
                </div>
            </div>
        </section>
        <div class="tabs-container">
            <ez-tabs>
                <ez-tab label="Creation" icon="edit">
                    <ez-graph-creation-screen></ez-graph-creation-screen>
                </ez-tab>
                <ez-tab label="Algorithms" icon="refresh">
                    <ez-algorithms-screen></ez-algorithms-screen>
                </ez-tab>
            </ez-tabs>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['graph'],
        computed: {
            currentGraphTitle() {
                return this.graph.title == '' || this.graph.title == undefined ? '' : ' - ' + this.graph.title;
            }
        },
        mounted() {
            console.log('Creation Menu Component mounted.')
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
    
    span.graph-title {
        font-size: 30px;
    }
</style>