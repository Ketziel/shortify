<template>
    <!--<div class="input-wrap" :class="{error: field.validation.error, disabled: disabled}">-->
    <div class="shortify-input">
        <input :id="field.name" type="textbox" :attr="inputProps" v-model="field.value" :placeholder="placeholder" @change="this.change" v-on:keyup.enter="button"/>
        <a href="" class="button" @click.prevent="button"><span>Shortify!</span></a>
        <div class="error">{{field.validation.error}}</div>
    </div>
        <!--<div class="error">{{field.validation.error}}</div>-->
    <!--</div>-->
</template>

<script>
    export default {
        name: 'InputFieldShortifyUrl',
        props: [
            'field',
            'placeholder',
            'inputProps',
        ],
        methods: {
            change() {
                this.$emit('onChange', this.field);
            },
            button() {
                this.$emit('onButtonClick', this.field);
            }
        }
    };
</script>

<style lang="scss">
    
    .shortify-input {
        display: flex;
        background-color: #ECD18E;
        border-radius: .25rem;

        input {
            padding: .5rem .5rem; 
            box-sizing: border-box; 
            border: 1px solid #808080; 
            color: #000; width: 100%; 
            background-color: #fff;
            border-radius: .25rem;
            font-size: 1rem;
            font-family: 'Oswald', sans-serif;
        }
        .button {
            margin-left: 0;
        }
    }

    .shortify-input > *{
        margin: .5rem;
    }


</style>