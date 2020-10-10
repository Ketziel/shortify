<template>
    <transition-group name="history" tag="div" class="history">
        <ShortifyHistoryItem v-for="(item, index) in shortifyHistoryList" :key="index" :id="index" :entry="item" />
    </transition-group>
</template>

<script>
    import ShortifyHistoryItem from '@/components/ShortifyHistoryItem.vue'

    export default {
        name: 'ShortifyHistory',
        components: {ShortifyHistoryItem},
        computed: {
            shortifyHistoryList() {
                return this.$store.state.shortify.shortifyHistory;
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import "../assets/css/variables.scss";
    
    .history {
        background-color: $colour-mono-light;
        border-radius: .25rem;
        padding: 0 1rem;
        margin-top: 2rem;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column-reverse;
        transition: .5s;
        .item {
            border-top: solid 1px $colour-mono-dark;
            transition: opacity .25s ease-in .25s, max-height .5s;
            overflow: hidden;
        }
        .item:last-child {
            border-top: none;
        }
    }

    .history-enter-active, .history-leave-active {
        max-height: 10rem;
        
    }
    .history-enter, .history-leave-to {
        max-height: 0;
        opacity: 0;
    }



</style>