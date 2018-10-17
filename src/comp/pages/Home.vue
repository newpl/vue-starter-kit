<template>
    <div>
        <div class="main-page--wrapper">
            <div class="main-page">
                <span class="main-page__title">
                    <h2>Made In Platform</h2>
                    <hr>
                    <small>MIP Starter Kit</small>
                </span>
                <article>
                    <p>
                        <b></b>
                        <ul>
                            <li><a @click="goto('/home')">Home Page</a></li>
                            <li><a @click="goto('/login')">Login Page</a></li>
                            <li><a @click="goto('/register')">SignUp Page</a></li>
                            <li><a @click="goto('/notfound')">NotFound Page</a></li>
                        </ul>
                    </p>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'home',
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
.main-page--wrapper {position:absolute;top:0;bottom:0;left:0;right:0;overflow:hidden;z-index:1;background:rgba(0,0,0,0.7);}
.main-page {position:relative;margin-left:calc(50% - 425px);width: 850px;min-height:100%;
    padding:30px 40px;color:#F2EFF8;text-align:center;top: 150px;}
.main-page__title {font-size: 26px;font-weight: bold;line-height: 1;}
.main-page h2 {font-size:28px;color:#2A96FD;opacity:0.8;padding:5px;}
/* .main-page h2 {font-size:34px;line-height: 44px; margin-bottom: 7px;} */
.main-page__title small {font-size:20px;margin-right:5px;color:#EBEBEB;}
.main-page article {font-size:14px;}
.main-page b {font-weight:bold;color:#FFF;}
.main-page article li {font-size:18px;cursor:pointer;list-style-type:none;}
</style>