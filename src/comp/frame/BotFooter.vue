<template>
    <div class="footer">
        <div class="copyright">Copyright {{year}} SAMSUNG SDS. All rights reserved. </div>
    </div>
</template>

<script>
export default {
    name : 'bot-footer',
    computed : {
        year : function () {
            return new Date().getFullYear();
        }
    }
}
</script>

<style scoped>
.footer {
    position: fixed;
    bottom:0px;
    width: 100%;
    /*height: var(--footer-height);*/
    height: 30px;
    color:white;
    background:rgba(0,0,0,0.7);
    }
.copyright {
    width: fit-content;
    position:absolute;
    left: 20px;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 11px;
    opacity:0.8;
    padding-left:1%;
}
</style>
