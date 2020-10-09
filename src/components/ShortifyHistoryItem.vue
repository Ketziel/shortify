<template>
<transition name="fade">
    <div class="item">
        <div>
            <div class="copy-effect" :class="{show: copying}">{{entry.short_link}}</div>
            <a :href="entry.full_short_link" target="_blank" class="short">{{entry.short_link}}</a>
            <a :href="entry.original_link" target="_blank" class="original">{{entry.original_link}}</a>
        </div>
        <div>
            <a href="" class="button hollow" @click.prevent="copyText">Copy</a>
        </div>
    </div>
</transition>
</template>

<script>
    export default {
        name: 'ShortifyHistoryItem',
        props: [
            'entry'
        ],
        data() {
            return {
                copying: false,
                copyingTimeout: null
            };
        },
        computed: {
            shortifyFormModel() {
                return this.$store.state.shortify.shortifyHistory;
            }
        },
        methods: {
            copyText() {
                let copyEle = document.createElement('textarea');
                copyEle.value = this.entry.full_short_link;
                copyEle.style.opacity = '0';
                document.body.appendChild(copyEle);
                copyEle.select();
                document.execCommand('copy');
                document.body.removeChild(copyEle);

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
            }
        }
    };
</script>

<style lang="scss">
    @import "../assets/css/variables.scss";
    
    .item {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1rem;

        a:not(.button) {
            display: block;
            word-wrap: break-word;
        }
        .short {
            font-size: 1.75rem;
        }
        .original {
            font-size: .75rem;
        }
        
        .copy-effect {
            position: absolute;
            font-size: 1.75rem;
            top: 1rem; left: 1rem;
            pointer-events: none;
            opacity: 0;
        }
        .copy-effect.show {
            animation: fade-up .5s linear;
        }
    }
    @media screen and (max-width: 400px) {
        .item {
            flex-wrap: wrap;
            justify-content: center;
            text-align: center;
            width: 100%;
            box-sizing: border-box;

            .button {
                height: 1.7rem;
                margin: 1rem 0 .5rem;
                width: 8rem;
            }
            .copy-effect {
                left: 0; right: 0;
            }
        }
        .item > div {
            width: 100%;
        }
    }

    @keyframes fade-up {
        0%   {opacity: 1; top: .5rem;}
        100% {opacity: 0; top: -2rem;}
    }


</style>