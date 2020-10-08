<template>
    <div class="input-wrap">
        <div class="shortify-input">
            <input :id="field.name" type="textbox" :attr="inputProps" v-model="field.value" :placeholder="placeholder" @change="this.change" @focus="this.focus" v-on:keyup.enter="button" ref="input" />
            <a href="" class="button" @click.prevent="button" :class="{disabled: false}">
                <span :class="{show: !shortified}">Shortify!</span>
                <span :class="{show: shortified}">Copy</span>
            </a>
        </div>
        <div class="error" :class="{show: field.validation.error}">{{field.validation.error}}</div>
    </div>
</template>

<script>
    export default {
        name: 'InputFieldShortifyUrl',
        props: [
            'field',
            'placeholder',
            'inputProps',
            'shortified'
        ],
        methods: {
            change() {
                this.$emit('onChange', this.field);
            },
            button() {
                this.$emit('onButtonClick', this.field);
                if (this.shortified) {
                    //If shortified, copy URL to clipboard.
                    this.selectInputText();
                    document.execCommand("copy");
                    this.$store.dispatch('alert', 'URL copied to clipboard');
                }
            },
            focus() {
                this.$emit('onFocus', this.field);
                if(this.shortified) {
                    //If shortified, auto select url on focus.
                    this.selectInputText();
                }
            },
            selectInputText() {
                this.$refs.input.select();
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
            min-width: 3rem;

            span {
                position: absolute;
                left: 0; right: 0;
                transition: .25s;
                opacity: 0;;
            }
            span.show {
                opacity: 1;
            }
        }
    }

    .shortify-input > *{
        margin: .5rem;
    }

    .error {
        background-color: #fff;
        padding: .25rem .5rem;
        font-size: .8rem;
        border: 1px solid #dc1e1e;
        color: #dc1e1e;

        transition: .25s;
        overflow: hidden;
        opacity: 0;
        margin-top: 0rem;
        height: 0;
    }

    .error.show {
        opacity: 1;
        margin-top: .5rem;
        height: auto;
    }


</style>