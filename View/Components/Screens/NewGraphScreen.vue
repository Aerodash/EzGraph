<template>
    <div>
        <h1 class="title is-3">New graph</h1>
        <form @submit.prevent="enterCreationMode" style="margin-bottom: 75px;">
            <label class="label">Title</label>
            <p class="control">
                <input class="input" type="text" v-model="graph.title" name="graphTitle">
            </p>
            <button type="submit" class="button is-primary pull-right">
                <span>Create</span>
                <span class="icon is-small">
                    <i class="fa fa-chevron-right"></i>
                </span>
            </button>
        </form>
        <hr>
        <form @submit.prevent="enterCreationMode">
            <label class="label">Json</label> //todo auto beautify json
            <p class="control">
                <textarea class="textarea"></textarea>
            </p>
            <button type="submit" class="button is-primary pull-right">
                <span>Create from Json</span>
                <span class="icon is-small">
                    <i class="fa fa-chevron-right"></i>
                </span>
            </button>
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                graph: {
                    title: ''
                }
            }
        },
        methods: {
            /*
            changeNodesColor(e) {
                let newColor = e.target.value;
                let oldStyle = cy.style().json();
                for(let i = 0; i < oldStyle.length; i++) {
                    let style = oldStyle[i];
                    if (style.selector === 'node') {
                        style.style['background-color'] = newColor;
                        break;
                    }
                }
                cy.style().fromJson(oldStyle).update();
            },
            changeEdgesColor(e) {
                let newColor = e.target.value;
                let oldStyle = cy.style().json();
                for(let i = 0; i < oldStyle.length; i++) {
                    let style = oldStyle[i];
                    if (style.selector === 'edge') {
                        style.style['line-color'] = newColor;
                        break;
                    }
                }
                cy.style().fromJson(oldStyle).update();
            },*/
            enterCreationMode(e) {
                let values = $(e.target).serializeArray();
                let value = (key) => values.find(e => e.name == key).value;

                // Tell app component to create a new graph and enter creation mode
                Event.fire('ez-createGraph', {
                    title: value('graphTitle')
                });
            }
        }
    }
</script>
<style scoped>
    hr {
        background-color: #cecece;
        height: 2px;
    }
</style>