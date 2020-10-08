<template>
    <div class="alert" :class="{show : message}">
        <div class="text">{{messageDisplay}}</div>
    </div>
</template>

<script>
    export default {
        name: 'ErrorAlert',
        components: {},
        data: function() {
            return {
                show: false,
                timeout: null,
                messageDisplay: null
            };
        },
        computed: {
            message() {
                return this.$store.state.alert.message;
            }
        },
        watch: {
            message() {
                if(this.timeout) {
                    clearTimeout(this.timeout);
                    this.timeout = null;
                }
                if (this.message) {
                    this.messageDisplay = this.message;
                    this.show = true;
                    this.timeout = setTimeout(() => {
                        this.$store.dispatch('closeAlert')
                    }, 5000);
                } else {
                    this.show = false;
                    this.timeout = setTimeout(() => {
                        this.messageDisplay = null;
                    }, 500);
                }
            }
        },
        methods: {

        }
    };
</script>

<style lang="scss">
    @import "../assets/css/variables.scss";
    
    .alert {
        background-color: $colour-tertiary; 
        border: 1px solid #808080; 
        padding: 1rem; 
        width: 90vw; 
        max-width: 20rem; 
        text-align: center; 
        position: fixed; 
        left: 0; right: 0; 
        margin: auto; 
        box-sizing: border-box;
        box-shadow: .2rem .2rem .75rem 0px rgba(0,0,0,0.15);
    
        transition: .5s; 
        opacity: 0; 
        bottom: -25vh;
    }

    .alert.show {
        bottom: 1rem; 
        opacity: 1;
    }

</style>