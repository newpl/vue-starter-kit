<template>
    <div class="top-navigation">
        <div class="top-navigation__home" @click="goto('/home')">Nexfinance</div>
        <div class="top-navigation__register" :class="isActived" @click="goto('/register')">SIGN UP</div>
        <div class="top-navigation__login" :class="isActived">
            <span v-if="isLoggedIn" class="top-navigation__login__label" @click="goto('/login')">LOGIN</span>
            <span v-else class="top-navigation__logout__label" @click="logout">LOGOUT</span>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Constant from '~/Constant.js';
import CONF from '~/Config.js';

export default {
    name : 'top-navigation',
    data : function () {
        return {}
    },
    computed : {
        isLoggedIn : function () {
            console.log(this.$store.state.loginStore.currentUser);
            return (this.$store.state.loginStore.currentUser === undefined) || (this.$store.state.loginStore.currentUser.userId == 4)
        },
        isActived : function () {
            if(this.$route.path==='/register') return {register_active:true, login_active:false};
            else if(this.$route.path==='/login') return {login_active:true, register_active:false};
            else return {register_active:false, login_active:false};
        }
    },
    methods : {
        goto : function (path) {
            console.log(this.$route.path);
            this.$router.push (path);
        },
        logout : function () {
            axios.post(CONF.LOGOUT)
                .then((res) => {
                    this.onLogout();
                }).catch((err) => {
                    let param = { tokenKey : this.$store.state.loginStore.currentUser.login, token: this.$cookie.get('ISDP-TOKEN') };
                    axios.post(CONF.CHECK_LOGIN, param)
                        .then((res) => {
                            this.onLogout();
                        }).catch((err) => {});
                });
        },
        onLogout : function () {
            this.$notify({
                title: '로그아웃',
                text: '로그아웃 성공',
                type: 'success'
            });
            this.$cookie.set('ISDP-TOKEN','', { expires:'1s' });
            this.$store.dispatch(Constant.LOGOUT);
            this.goto('/');
        }
    }
}
</script>
<style>
/* .top-navigation {position: absolute;top:0;left:0;right:0;height: 50px;background-color: #fffffe;color: #000;padding-left:20px;border-bottom:1px solid rgb(203,203,203);} */
.top-navigation {position: absolute;top:0;left:0;right:0;height: 50px;background:rgba(0,0,0,0.7);color:#FFF;padding-left:20px;}
.top-navigation__home {display:absolute;width:160px;height:50px;line-height:50px;cursor:pointer;user-select: none;font-size: 22px;font-weight: bold;
    vertical-align: middle;float:left;padding-left:1%;}
/* .top-navigation__home {display:absolute;width:160px;height:50px;line-height:50px;cursor:pointer;user-select: none;font-size: 22px;font-weight: bold;
    vertical-align: middle;float:left;} */
.top-navigation__login {position: absolute;top:0;right: 10%;width: 80px;height:100%;font-weight:bold;border-bottom:3px solid #F2F2F2;opacity:0.8;}
.top-navigation__login__label {position:absolute;transform:translateY(-50%);top:55%;cursor:pointer;right:27%;font-size:14px;}
.top-navigation__logout__label {position:absolute;transform:translateY(-50%);top:55%;cursor:pointer;right:18%;font-size:14px;}
.top-navigation__login.login_active {border-bottom:3px solid #2A96FD;opacity:1;color:#2A96FD;}
/* .top-navigation__register {position: absolute;vertical-align: middle; width:160px;right:50px;line-height:53px; cursor:pointer;font-size:15px;font-weight:bold;} */
.top-navigation__register {max-width:300px;position:absolute;text-align:center;padding:0px 10px;cursor:pointer;user-select: none;
    line-height:50px;right:3%;border-bottom:3px solid #F2F2F2;opacity:0.8;font-weight:bold;font-size:14px;height:100%;}
.top-navigation__register.register_active {border-bottom:3px solid #2A96FD;opacity:1;color:#2A96FD;}
</style>
