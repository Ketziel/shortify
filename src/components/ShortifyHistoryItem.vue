<template>
<transition name="fade">
    <div class="item">
        <div class="short">{{shortUrl}}</div>
        <div class="original">{{originalUrl}}</div>
    </div>
</transition>
</template>

<script>
    export default {
        name: 'ShortifyHistoryItem',
        props: [
            'originalUrl',
            'shortUrl'
        ],
        computed: {
            shortifyFormModel() {
                return this.$store.state.shortify.shortifyHistory;
            }
        },
    };
</script>

<style lang="scss">
    
    .item {
        
        padding: 1rem 1rem;

        .short {
            font-size: 1.75rem;
        }
        .original {
            font-size: .75rem;
        }
    }


    .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }


</style>