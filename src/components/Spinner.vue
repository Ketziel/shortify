<template>
        <div class="spinner">
            <div class="inner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
</template>

<script>
    export default {
        name: 'Spinner'
    };
</script>

<style lang="scss">
  @import "../assets/css/variables.scss";

    .spinner {
      width: 5em; 
      height: 5em; 
      font-size: .5rem;
        .inner {
          position: relative; 
          height: 100%; width: 100%;

          div {
            background-color: $colour-mono-light; 
            width: 0em; height: 0em; 
            border-radius: 1em; 
            position: absolute; 
            top: 0; right: 0; bottom: 0; left: 0; 
            margin: auto;
          }
          div:nth-child(1) {
            transform: rotate(0deg) translateY(-2em); 
            animation: spinner-dot-pulse .8s infinite; animation-delay: 0s;
          }
          div:nth-child(2) {
            transform: rotate(45deg) translateY(-2em); 
            animation: spinner-dot-pulse .8s infinite; animation-delay: .1s;
          }
          div:nth-child(3) {
            transform: rotate(90deg) translateY(-2em); 
            animation: spinner-dot-pulse .8s infinite; animation-delay: .2s;
          }
          div:nth-child(4) {
            transform: rotate(135deg) translateY(-2em); 
            animation: spinner-dot-pulse .8s infinite; animation-delay: .3s;
          }
          div:nth-child(5) {
            transform: rotate(180deg) translateY(-2em); 
            animation: spinner-dot-pulse .8s infinite; animation-delay: .4s;
          }
          div:nth-child(6) {
            transform: rotate(225deg) translateY(-2em); 
            animation: spinner-dot-pulse .8s infinite; animation-delay: .5s;
          }
          div:nth-child(7) {
            transform: rotate(270deg) translateY(-2em); 
            animation: spinner-dot-pulse .8s infinite; animation-delay: .6s;
          }
          div:nth-child(8) {
            transform: rotate(315deg) translateY(-2em); 
            animation: spinner-dot-pulse .8s infinite; animation-delay: .7s;
          }
        }
      
    }


    @-webkit-keyframes spinner-dot-pulse {
      0%   { width: 0em; height: 0em; opacity: 0;}
      50%   { width: 1em; height: 1em; opacity: 1;}
      100% { width: 0em; height: 0em; opacity: 0;}
    }
    @-moz-keyframes spinner-dot-pulse {
      0%   { width: 0em; height: 0em; opacity: 0;}
      50%   { width: 1em; height: 1em; opacity: 1;}
      100% { width: 0em; height: 0em; opacity: 0;}
    }
    @-o-keyframes spinner-dot-pulse {
      0%   { width: 0em; height: 0em; opacity: 0;}
      50%   { width: 1em; height: 1em; opacity: 1;}
      100% { width: 0em; height: 0em; opacity: 0;}
    }
    @keyframes spinner-dot-pulse {
      0%   { width: .5em; height: .5em; opacity: 0;}
      50%   { width: 1em; height: 1em; opacity: 1;}
      80%   { opacity: 0;}
      100%, 100% { width: 0em; height: 0em; opacity: 0;}
    }
    

</style>