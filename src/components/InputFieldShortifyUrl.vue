<template>
    <div class="input-wrap">
        
        <div class="shortify-input">
            <div class="copy-effect" :class="{show: copying}">{{field.value}}</div>
            <input :id="field.name" type="textbox" :disabled="fetching" v-model="field.value" :placeholder="placeholder" @change="this.change" @focus="this.focus" v-on:keyup.enter="button"  v-on:keyup="edit" ref="input" />
            <a href="" class="button" @click.prevent="button" :class="{disabled: fetching}">
                <span :class="{show: !shortified && !fetching}">Shortify!</span>
                <span class="spinner-wrap" :class="{show: fetching}"><Spinner/></span>
                <span :class="{show: shortified && !fetching}">Copy</span>
            </a>
        </div>
        <div class="error" :class="{show: field.validation.error}">{{field.validation.error}}</div>
    </div>
</template>

<script>
    import Spinner from '@/components/Spinner.vue'

    export default {
        name: 'InputFieldShortifyUrl',
        components: {
            Spinner
        },
        props: [
            'field',
            'placeholder',
            'shortified',
            'fetching'
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
                    //If URL is shortified, copy URL to clipboard.
                    this.copyText();
                }
            },
            edit() {
                this.$emit('onEdit', this.field);
            },
            focus() {
                this.$emit('onFocus', this.field);
                if(this.shortified) {
                    //If URL is shortified, auto select url on focus.
                    this.selectInputText();
                }
            },
            copyText() { //Copies URL to clipboard
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

<style lang="scss" scoped>
    @import "../assets/css/variables.scss";
    
    .shortify-input {
        position: relative;
        display: flex;
        background-color: $colour-tertiary;
        border-radius: .25rem;

        input {
            padding: .5rem .5rem; 
            box-sizing: border-box; 
            border: 1px solid #808080; 
            color: $colour-mono-dark; width: 100%; 
            background-color: $colour-mono-light;
            border-radius: .25rem;
            font-size: 1rem;
            font-family: 'Oswald', sans-serif;
        }
        input:disabled {
            pointer-events: none;
        }

        .button {
            margin-left: 0;
            min-width: 3rem;

            span {
                position: absolute;
                left: 0; right: 0;
                margin: auto;

                transition: .25s;
                opacity: 0;
                transform: scale(0);
            }
            span.show {
                opacity: 1;
                transform: scale(1);
            }

            .spinner-wrap {

                /deep/ .spinner {
                    font-size: .3rem;
                    display: inline-block;
                }
            }
        }

        .copy-effect {
            position: absolute;
            top: .5rem; left: .5rem;
            pointer-events: none;
            opacity: 0;
        }
        .copy-effect.show {
            animation: fade-up .5s linear;
        }

    }
    @media screen and (max-width: 400px) {
        .shortify-input {
            flex-wrap: wrap;
            justify-content: center;

            .button {
                height: 1.7rem;
                margin: .25rem 0 .5rem;
                width: 8rem;
            }
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
        background-color: $colour-mono-light;
        padding: .25rem .5rem;
        font-size: .8rem;
        border: 1px solid $colour-error;
        color: $colour-error;

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