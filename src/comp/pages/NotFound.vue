<template>
    <div>
        <div class="notfound-page--wrapper">
            <div class="notfound-page">
                <span class="notfound-page__title">
                    <h2>Not Found</h2>
                    <hr>
                    <small>올바른 경로가 아닙니다</small><br><br>
                </span>
                <a @click="goto('/home')">Home 으로 돌아가기</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'notFound',
    data : function () {
        return {}
    },
    methods : {
        goto : function (path) {
            console.log(path);
            this.$router.push(path);
        }
    }
}
</script>
<style scoped>
.notfound-page--wrapper {position:absolute;top:0;bottom:0;left:0;right:0;overflow:hidden;z-index:1;background:rgba(0,0,0,0.7);}
.notfound-page {position:relative;margin-left:calc(50% - 425px);width: 850px;min-height:100%;
    padding:30px 40px;color:#F2EFF8;text-align:center;top: 150px;}
.notfound-page__title {font-size: 26px;font-weight: bold;line-height: 1;}
.notfound-page h2 {font-size:28px;color:rgba(230, 15, 15, 0.932);opacity:0.8;padding:5px;}
/* .main-page h2 {font-size:34px;line-height: 44px; margin-bottom: 7px;} */
.notfound-page__title small {font-size:20px;margin-right:5px;color:#EBEBEB;}
.notfound-page a {font-size:20px;margin-right:5px;color:#EBEBEB;cursor:pointer;}
</style>