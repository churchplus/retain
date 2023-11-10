<template>
    <select class="input-sm" :name="name" style="width: 100%" :id="id" @change="selecteditem">
        <slot>
            
        </slot>
    </select>
</template>

<script>
    /* eslint no-unused-vars: 1 */
    import select2 from 'select2'
    import $ from 'jquery'
    export default {
        props: ["options", "data-img_src", "value", "name", "typ", "id"],

        data() {
            return {
                msg: "Hello",
            }
        },

        methods: {
            selectedItem(e) {
                console.log(e.target.value);
            }
        },

        mounted() {
            // console.log();
            $('.input-sm').select2();
            let vm = this;
            $(this.$el)
            .select2({theme: 'bootstrap4', data: this.options})
            .val(this.value)
            .trigger('change')
            .on('change', function() {
                vm.$emit('input', { value: this.value, dataType: this.name })
            })
        },

        watch: {
            value: function(value) {
                $(this.$el).val(value).trigger('change');
            },
            options: function(options) {
                $(this.$el).select2({data: options})
            }
        }
    }
</script>

<style scoped>
    .create-link {
        color: blue !important;
    }
</style>