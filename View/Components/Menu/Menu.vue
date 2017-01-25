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
            <ez-tabs :active-tab-index="2" ref="tabs">
                <ez-tab label="Recent" icon="ellipsis-h">
                    <ez-recent-graphs-screen></ez-recent-graphs-screen>
                </ez-tab>
                <ez-tab label="Open" icon="folder-open">
                    <ez-open-graph-screen></ez-open-graph-screen>
                </ez-tab>
                <ez-tab label="New" icon="plus-circle">
                    <ez-new-graph-screen :graph="graph"></ez-new-graph-screen>
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
        props: ['graph'],
        computed: {
            currentGraphTitle() {
                return this.graph.title == '' || this.graph.title == undefined ? '' : ' - ' + this.graph.title;
            }
        },
        mounted() {
            let height = $(window).height() - $(this.$refs.hero).height();
            $(this.$refs.tabsContainer).height(height);

            // Set tabs content height;
            let tabs = this.$refs.tabs
            let $tabsContent = $(tabs.$refs.tabsContent);
            let $tabsElementsHeight = 57;
            height = $(window).height() - $tabsElementsHeight - $(this.$refs.hero).height();
            $tabsContent.css('height', height);
            $tabsContent.css('overflow-y', 'scroll');
            
            console.log('Menu Component mounted.')
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