<template>
    <div class="input-wrap">
        <div class="shortify-input">
            <div class="copy-effect" :class="{show: copying}">{{field.value}}</div>
            <input :id="field.name" type="textbox" :attr="inputProps" v-model="field.value" :placeholder="placeholder" @change="this.change" @focus="this.focus" v-on:keyup.enter="button"  v-on:keyup="edit" ref="input" />
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
        data() {
            return {
                copying: false,
                copyingTimeout: null
            };
        },
        methods: {
            change() {
                this.$emit('onChange', this.field);
            },
            button() {
                this.$emit('onButtonClick', this.field);
                if (this.shortified) {
                    //If shortified, copy URL to clipboard.
                    this.copyText();
                }
            },
            edit() {
                this.$emit('onEdit', this.field);
            },
            focus() {
                this.$emit('onFocus', this.field);
                if(this.shortified) {
                    //If shortified, auto select url on focus.
                    this.selectInputText();
                }
            },
            copyText() {
                this.selectInputText();
                document.execCommand("copy");
                this.$store.dispatch('alert', 'URL copied to clipboard');
                
                // Copy Animation
                if(this.timeout) {
                    clearTimeout(this.copyingTimeout);
                    this.copyingTimeout = null;
                    this.copying = false;
                }
                this.copying = true;
                this.copyingTimeout = setTimeout(() => {
                    this.copying = false;
                }, 500);
            },
            selectInputText() {
                this.$refs.input.select();
            }
        }
    };
</script>

<style lang="scss">
    
    .shortify-input {
        position: relative;
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

        .copy-effect {
            position: absolute;
            top: .5rem; left: .5rem;
            opacity: 0;
        }
        .copy-effect.show {
            animation: fade-up .5s linear;
        }
    }

    @keyframes fade-up {
        0%   {opacity: 1; top: .5rem;}
        100% {opacity: 0; top: -2rem;}
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