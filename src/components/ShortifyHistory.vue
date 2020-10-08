<template>
    <div class="history">
        
        <ShortifyHistoryItem v-for="(item, index) in shortifyHistoryList" :key="index" :originalUrl="item.original_link" :shortUrl="item.short_link"/>
        
    </div>
</template>

<script>
    import ShortifyHistoryItem from './ShortifyHistoryItem.vue'

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
    
    .history {
        background-color: var(--colour-mono-light);
        border-radius: .25rem;
        padding: 0 1rem;
        margin-top: 2rem;

        /deep/ .item + .item {
            border-top: solid 1px #000;
        }
    }




</style>