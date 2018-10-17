<template>
    <div class="register-page">
    <div class="register">
        <div class="register-content">
            <div class="register-box register-window">
                <h2 class="mb-3 register-signup-heading"><b>Create Your MIP Account</b></h2>
                <tb-validator ref="validForm" form>
                    <div class="mb-3">
                        <div class="register__label register__label--required">아이디</div>
                        <tb-validator class="inline short" ref="validLogin" :target="form.login" :rules="[rules.required, rules.login]" :disabled="disabled.login">
                            <tb-text-field v-model="form.login" :disabled="disabled.login" :readonly="true"></tb-text-field>
                            <div class="register__login-check-cover"></div>
                        </tb-validator>
                        <tb-button class="inline register__login-check-button" @click="checkIdPopup">{{this.form.login===''?'중복확인':'변경'}}</tb-button><br>
                    </div>
                    <div class="mb-3">
                        <div class="register__label register__label--required">비밀번호</div>
                        <tb-validator class="inline short" :target="beforeAuthCode" :rules="[rules.required, rules.authCode]" :disabled="disabled.authCode">
                            <tb-text-field password v-model="beforeAuthCode"></tb-text-field>
                        </tb-validator>
                    </div>
                    <div class="mb-3">
                        <div class="register__label register__label--required">비밀번호확인</div>
                        <tb-validator class="inline short" :target="authCodeCheck" :rules="[rules.required, rules.authCodeCheck]" :disabled="disabled.authCodeCheck">
                            <tb-text-field password v-model="authCodeCheck"></tb-text-field>
                        </tb-validator>
                    </div>
                    <div class="mb-3">
                        <div class="register__label register__label--required">성명</div>
                        <tb-validator class="inline short" :target="form.fullName" :rules="[rules.required, rules.fullName]" :disabled="disabled.fullName">
                            <tb-text-field v-model="form.fullName"></tb-text-field>
                        </tb-validator>
                    </div>
                        <div class="mb-3">
                            <div class="register__label register__label--required">E-mail</div>
                            <tb-validator :target="form.email" :rules="[rules.required,rules.email]" class="inline normal" :disabled="disabled.email">
                                <tb-text-field v-model="email[0]" style="width: 30%;" :disabled="disabled.email"></tb-text-field> @ 
                                <tb-text-field v-model="email[1]" :disabled="disabled.email||!!tailSelect||false" style="width:30%;"></tb-text-field>
                                <select v-model="tailSelect" class="register__select" :disabled="disabled.email">
                                    <option v-for="(tail, idx) in tailList" :value="tail.value" :key="idx">{{tail.label}}</option>
                                </select>
                            </tb-validator>
                        </div>
                        <div class="mb-3">
                            <div class="register__label register__label--required">연락처</div>
                            <tb-validator :target="form.contactNo" :rules="[rules.required, rules.contactNo]" class="inline normal">
                                <tb-text-field v-model="form.contactNo" mask="###-####-####" placeholder="###-####-####" style="width:40%;"></tb-text-field>
                            </tb-validator>
                        </div>
                        <div class="mb-3">
                            <div class="register__label register__label--required">성별</div>
                            <tb-validator :target="form.gender" :rules="[rules.required]" class="inline">
                                <tb-radio v-model="form.gender" label="남" value="Male"></tb-radio>
                                <tb-radio v-model="form.gender" label="여" value="Femail"></tb-radio>
                            </tb-validator>
                        </div>
                        <div class="mb-3">
                            <div class="register__label">국적</div>
                            <div style="position:relative;" class="inline normal">
                                <select v-model="form.nationality" class="register__select">
                                    <option v-for="(nation, idx) in nationalityList" :value="nation.value" :key="idx">
                                        {{nation.label}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="register__label">회사명</div>
                            <tb-validator :target="form.company" :rules="[rules.lessThan100]" class="inline short">
                                <tb-text-field v-model="form.company"></tb-text-field>
                            </tb-validator>
                        </div>
                        <div class="mb-3">
                            <div class="register__label">직급</div>
                            <tb-validator :target="form.grade" :rules="[rules.lessThan100]" class="inline short">
                                <tb-text-field v-model="form.grade"></tb-text-field>
                            </tb-validator>
                        </div>
                </tb-validator>
            <tb-button color="primary--shade-1" style="float:left;margin-left:38%;margin-top:5px;" @click="$router.go(-1)">
                <i class="m-icon">clear</i> CANCEL</tb-button>
            <tb-button color="primary--red-1" style="float:right;margin-right:30%;margin-top:5px;" @click="submit"><i class="m-icon">done_outline</i> SUBMIT</tb-button>
        </div>
        </div>
    </div>
          <!-- 아이디 체크를 위한 Modal -->
        <tb-modal v-model="checkModal" overflowYInherit>
            <div class="my-modal" style="width:450px;">
                <div class="modal-title">
                    <h3>아이디 중복확인</h3>
                </div> 
                <div class="modal-body">
                    <tb-validator ref="duplLogin" :target="duplLogin" :rules="[rules.required,rules.login]" style="width:315px; display:inline-block;">
                        <tb-text-field v-model="duplLogin" style="width:100%;" placeholder="아이디" @enter="checkId"></tb-text-field>
                    </tb-validator>
                    <tb-button v-show="duplLogin!==''" style="position:relative; height:26px; float:right;right:0px;" @click="checkId">중복확인</tb-button><br>
                    <div :class="duplCheckedClass" v-show="!duplCheckedLogin"> {{duplCheckedLogin}} <br> {{loginCheckedMessage}} </div>
                </div>
                <div class="modal-action">
                    <tb-button color="primary--tint-4" @click="checkModal=false;">취소</tb-button>
                    <tb-button class="prim" @click="mUseDuplCheckedId">사용하기</tb-button>
                </div>
            </div>
        </tb-modal>
    </div>
</template>

<script>
import axios from 'axios';
import jsencrypt from '~/util/jsencrypt.js';
export default {
    data : function () {
        return {
            rules : {
                required: v => !!v || '필수항목입니다.',
                login: v => /^[a-z0-9_.]{3,12}$/.test(v) || '3~12자 영문 소문자, 숫자와 특수기호 \' _ \' , \'. \' 만 사용 가능합니다.',
                fullName: v => /^[a-z0-9가-힇]{1,20}$/.test(v) || '20자 이내의 유효한 이름을 입력하세요',
                email: v => /^[a-z0-9A-Z]([-_.]?[a-z0-9A-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(v) || '유효한 email 주소를 입력하세요.',
                authCode: v => /^(?=.*?[a-zA-Z])(?=.*[0-9])(?=.*?[!@$%^&*?_~]).{8,16}$/.test(v) || '8~16자의 영문 대소문자, 숫자, 특수문자 (!@$%^&*?_~)만 가능합니다.',
                authCodeCheck: v => v == this.beforeAuthCode || '패스워드가 일치하지 않습니다.',
                contactNo: v => /^[0-9]{11}$/.test(v) || '양식에 맞는 연락처를 입력하세요.',
                lessThan100: v => v.length<=100 || '100자 이내로 입력하세요.'
            },
            disabled: {
                login:false,
                authCode:false,
                authCodeCheck:false,
                fullName:false,
                email:false
            },
            form: {
                login : '',
                authCode: '',
                fullName: '',
                email: '',
                gender:'',
                contactNo: '',
                nationality: 'ko',
                company: '',
                grade: '',
                contactNo: '',
                userType: '',
                approvalId: 1
            },
            beforeAuthCode: '',
            authCodeCheck: '',
            email: ['',''],
            tailList : [
                {value: '', label: '직접입력'},
                {value: 'samsung.com', label: 'samsung.com'},
                {value: 'gmail.com', label: 'gmail.com'},
                {value: 'naver.com', label: 'naver.com'},
                {value: 'daum.net', label: 'daum.net'}
            ],
            nationalityList : [
                {value: 'ko', label: '대한민국'},
                {value: 'en', label: '미국'},
                {value: 'ch', label: '중국'},
                {value: 'jp', label: '일본'}
            ],
            tailSelect: '',
            checkModal: false,
            duplLogin: '',
            checkedId: ''
        }
    },
    computed : {
        duplCheckedClass: function() {
            return {
                "register__login-checked": true,
                "register__login-checked--available": this.checkedId=="none"||this.checkedId=="ISDP",
                "register__login-checked--duplicated": this.checkedId=="KIT",
            }
        },
        loginCheckedMessage: function() {
            if(this.checkedId=="none"){
                return "사용가능한 아이디입니다."
            } else if(this.checkedId=="ISDP") {
                return "ISDP 회원입니다. 통합회원가입을 위해 로그인이 필요합니다."
            } else if(this.checkedId=="DELETED") {
                return "탈퇴한 회원 아이디입니다. 재가입은 관리자에게 문의하세요."
            } else if(this.checkedId=="KIT") {
                return "이미 등록된 아이디입니다."
            } else {
                return ""
            }
        }
    },
    watch: {
        tailSelect : function(val) {
            this.email[1] = val;
        },
        email : function (arr) {
            if (arr[0]=='' && arr[1]==''){
                this.form.email = '';
            }
            this.form.email = arr[0] + '@' + arr[1];
        }
    },
    methods: {
        checkIdPopup : function() {
            this.checkModal = true;
        },
        checkId : function() {
            if(this.$refs.duplLogin.isValid()) {
                if(this.duplLogin) {
                    axios.get('/rest/v1/user/exist/' + this.duplLogin)
                        .then(res => {
                            this.checkedId = res.data;
                            this.duplCheckedId = this.duplLogin;
                            return res.data;
                        })
                        .catch(err => {
                            console.log(err);
                            console.log(err.data);
                            this.$notify({
                                title: '중복확인',
                                text: ' 아이디 중복확인 실패',
                                type: 'error'
                            });
                        })
                }
            }
            return "";
        },
        mUseDuplCheckedId : function() {
            this.disabled = {
                login: false,
                fullName: false,
                email: false
            };
            this.form.login = this.duplLogin;
            this.form.userType = 'ISDP';
            this.checkModal = false;
        },
        submit : function() {
            const keyData = this.$store.state.loginStore.publicKey;
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(keyData);
            this.form.authCode = encrypt.encrypt(this.beforeAuthCode);
            if(this.$refs.validForm.isValid()) {
                axios.post('/rest/v1/user/create/', this.form)
                    .then(res => {
                        this.$notify({
                            title: '회원가입',
                            text: '회원가입에 성공했습니다.',
                            type: 'success'
                        });
                        this.$router.push('/home');
                    }).catch(err => {
                        if(err.data && err.data.errMsg) {
                            this.$notify({
                                title: '회원가입',
                                text: err.data.errMsg,
                                type: 'error'
                            });
                        }else { 
                            this.$notify({
                                title: '회원가입',
                                text: '회원가입 과정에 문제가 발생했습니다.',
                                type: 'error'
                            });
                        }
                    })
            } else {
                this.$notify({
                    title: '회원가입',
                    text: '가입 양식에 어긋나는 항목이 존재합니다.',
                    type: 'error'
                });
            }
        }
    }

}
</script>

<style>
.register-page {background:rgba(0,0,0,0.7);}
.register {position: relative;margin: 0px auto;width: 100%;height: 100%;padding: 10px;min-width: 640px;max-width: 1000px;}
.register-box {width: 600px;position: relative;margin:auto;background:rgb(240, 240, 240)}
.register .register-window {position: relative;margin-top: 10px; width: 80%;height: calc(100% - 50px);border: 0px solid rgba(0,0,0,0.2);}
.register .register-content {width: 100%;height: 100%;overflow-y: auto;position:relative;}
.register-signup-heading {position:relative;height:50px;border-bottom: 5px solid #4FABE8;background:rgba(37, 124, 206, 0.8);text-align:center;padding-top:10px;}
.register-signup-heading b{font-weight:600;font-size:20px;color:white;font-family:'Roboto'}
.register__label {width: 35%;text-align: right;display:inline-block; padding-right:15px;}
.register__label--required::after {content: '*';padding-left:5px;position:absolute;color: red;right: 70% - 10px;}
.register__login-check-cover {position: absolute;top:0px;left:0px;width: 100%;height:26px;}
.register-box .-tb-text-field {width:100%;position:relative;}
.register-box .inline {display:inline-block;height:26px;}
.register-box .normal {width: 60%;}
.register-box .short {width:30%;}
.register__login-checked {text-align:center; margin-top:15px;}
.register__login-checked--available {color:  rgba(42,150,253,1);}
.register__login-checked--duplicated {color:  rgba(255,0,0,1);}
.register .register-content {padding: 10px;}
.register .register__login-check-button {position: absolute;height:26px;vertical-align: bottom;width:15%;padding-left:10px;}
.register__select {width:25%;height:26px;border:1px solid #ccc;border-radius:2px;vertical-align:middle;}
.register-box .-tb-radio span {font-size:10px;}
</style>
