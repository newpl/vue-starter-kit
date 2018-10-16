<template>
    <div class="login-page">
        <div class="login">
            <h2 class="mb-3 login-heading"><b>Sign In</b></h2>
            <div class="login-box">
                <div class="login__content">
                    <tb-validator ref="validLogin" :target="login" :rules="[rules.required]" no-message>
                        <tb-text-field class="login__text-field mb-3" v-model="login" @enter="signIn" placeholder="User ID"></tb-text-field>
                    </tb-validator>
                    <tb-validator ref="validAuthCode" :target="authCode" :rules="[rules.required]" no-message>
                        <tb-text-field password class="login__text-field mb-3" v-model="authCode" @enter="signIn" placeholder="Password"></tb-text-field>
                    </tb-validator>
                    <div style="color:red;">{{errorMessage}} &nbsp; </div>
                    <tb-button class="btn-sign-in" @click="signIn">Login</tb-button>
                    <!-- <div style="display:inline-flex;width: 100%;justify-content: space-between;align-items:baseline;margin-top:10px;"></div> -->
                    <tb-button class="btn-regist" color="primary--tint-1" @click="goto('/register')">Sign Up</tb-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import jsencrypt from '~/util/jsencrypt.js';
import Constant from '~/Constant.js';
import CONF from '~/Config.js';
export default {
    data : function () {
        return {
            rules : {
                required: v => !!v || '필수항목입니다.'
            },
            login : '',
            authCode : '',
            errorMessage : ''
        }
    }, 
    methods : {
        goto : function(path) {
            this.$router.push(path);
        },
        signIn : function () {
            if(!this.$refs.validLogin.isValid()) {this.errorMessage = 'User ID를 입력하세요'; return;};
            if(!this.$refs.validAuthCode.isValid()) {this.errorMessage = 'Password를 입력하세요'; return;};

            const keyData = this.$store.state.loginStore.publicKey;
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(keyData);
            let encrypted = encrypt.encrypt(this.authCode);
            let param = { login:this.login, authCode:encrypted };
            
            axios.post(CONF.LOGIN, param)
                .then((res) => {
                    console.log(res);
                    this.$store.dispatch(Constant.CURRENT);
                    this.$cookie.set('ISDP-TOKEN', res.data.token, { expires:'8h'});
                    this.$notify({
                        title: '로그인',
                        text: '로그인 성공',
                        type: 'success'
                    });
                    this.$router.push('/');
                }).catch((err) => {
                    this.$cookie.set('ISDP-TOKEN', '', { expires:'1s' });
                    this.$notify({
                        title: '로그인',
                        text: '로그인 실패',
                        type: 'error'
                    })
                    this.errorMessage = err.data.message;
                })
        }
    },
    mounted() {
        axios.get(CONF.INIT)
            .then((res) => {
                console.log("Session Reset");
            })
    }
}
</script>

<style scoped>
#root .login-page {background:rgba(0,0,0,0.7);}
#root .login-page__back {position:absolute;top:0;bottom:0;lefT:0;right:0;z-index:0;overflow:hidden;background:black;}
#root .login-page__back img {filter:blur(2px) opacity(1.8);}
#root .login {
    position:absolute; width: 440px; height:380px;
    background:rgb(240, 240, 240);
    /*for IE, edge compatibility*/
    /*top:50%;*/
    /*left:50%;*/
    /*transform:translate(-50%, -50%);*/
    top:calc(50% - 250px);
    left:calc(50% - 220px);
    /******* compatibility *******/
}
#root .login-box {
    padding:70px 60px;
}
#root .login-heading {position:relative;height:50px;border-bottom: 5px solid #4FABE8;background:rgba(37, 124, 206, 0.8);text-align:center;padding-top:10px;}
#root .login-heading b{font-weight:600;font-size:20px;color:white;font-family:'Roboto'}
#root .login__content {}
#root .login__content h1 {font-size:30px;font-weight:bold;margin-bottom:10px;}
#root .login__label {font-size: 20px;margin-bottom:10px;}
#root .login__label .m-icon {margin-right:8px;}
#root .login__text-field {width: 100%;outline:none;}
#root .login__text-field .-tb-text-field__input {outline:none;position:relative;}
#root .login__link {cursor:pointer;user-select: none;font-weight: bold;}
#root .login__link:hover {color:rgb(42,150,253);}
#root .login__content .btn-sign-in {width:100%;height:35px;margin-top:10px;font-size:18px;}
/* .login__content .btn-sign-in {width:100%;height:45px;margin-top:0px;font-size:60px;} */
/* .login__content .btn-sign-in .-tb-button {font-size:18px;} */
#root .login__content .btn-sign-in .-tb-button:hover {background:rgba(42,150,253,0.8);}
/* .login__content .btn-regist {width:100%;} */
#root .login__content .btn-regist {width:100%; margin-top:10px;height:35px;}
#root .login__content .btn-regist .-tb-button {background:transparent;border:1px solid #FFF;} 
/* #root .login__content .btn-sso .-tb-button:hover {background:rgba(42,150,253,0.8);color:#FFF;} */

</style>
