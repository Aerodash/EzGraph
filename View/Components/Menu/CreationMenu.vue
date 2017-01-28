<template>
    <div style="height: 100%">
        <section class="hero is-medium is-primary" ref="hero">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        EzGraph<span class="graph-title">{{ currentGraphTitle }}</span>
                    </h1>
                </div>
            </div>
        </section>
        <div class="tabs-container" ref="tabsContainer">
            <ez-tabs ref="tabs">
                <ez-tab label="Creation" icon="edit">
                    <ez-graph-creation-screen-v2 :graph="graph"></ez-graph-creation-screen-v2>
                </ez-tab>
                <ez-tab label="Algorithms" icon="refresh">
                    <ez-algorithms-screen :graph="graph"></ez-algorithms-screen>
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
        updated() {
            if (this.$parent.$data.isCreatingGraph) { // If creation mode
                let height = $(window).height() - $(this.$refs.hero).height();
                $(this.$refs.tabsContainer).height(height);
                
                // Set tabs content height;
                let tabs = this.$refs.tabs
                let $tabsContent = $(tabs.$refs.tabsContent);
                let $tabsElementsHeight = 57;
                height = $(window).height() - $tabsElementsHeight - $(this.$refs.hero).height();
                $tabsContent.css('height', height);
                $tabsContent.css('overflow-y', 'scroll');
            }
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