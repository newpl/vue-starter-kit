<template>
  <div id="root" style="overflow:hidden;">
    <transition name="slide-fade">
      <router-view class="main-frame"></router-view>
    </transition>
    <top-navigation></top-navigation>
    <bot-footer></bot-footer>
    <notifications/>
  </div>
</template>

<script>
import Vue from 'vue';
import topNavigation from '~/comp/frame/TopNavigation';
import botFooter from '~/comp/frame/BotFooter';
import axios from 'axios';
import Constant from '~/Constant.js';
import CONF from '~/Config.js'
export default {
  name: 'app',
  components: {
    topNavigation: topNavigation,
    botFooter: botFooter
  },
  data: function () {
    return {
    }
  },
  computed: {
  },
  beforeCreate: function () {
    // key 가져오기
    this.$store.dispatch(Constant.GET_PUBLIC_KEY);
    var token = this.$cookie.get('ISDP-TOKEN');
    if(!token) {
      this.$store.dispatch(Constant.LOGOUT)
      return ;
    } else {
      console.log ("로그인중..");
      let param = { token:token };
      axios.post(CONF.LOGIN, param)
      .then ((res, status, xhr) => {
        console.log(res.data);
        this.$cookie.set('ISDP-TOKEN', res.data.token, { expires: '8h' });
      }).catch ((err) => {
        this.$cookie.set('ISDP-TOKEN', '', { expires:'1s' });
        console.log ('fail to login', err);
      })
    }
  },
  created : function () {
    axios.interceptors.response.use((response) => {
      return response;
    }, (err) => {
      if (err.response.status === 400) {
        this.$notify({
          title: 'Failed Your Job',
          text: err.response.data.errMsg,
          type: 'error'
        })
      } else if (err.response.status === 401) {
        console.log ('unauthorized, logging out...');
      }
      return Promise.reject (err.response);
    })
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.elastic-enter-active {
  animation: elastic-in 0.5s;
}
.elastic-leave-active {
  animation: elastic-in 0.5s reverse;
}

.slide-fade-enter-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);;
}
.slide-fade-enter, .slide-fade-leave-to {
  /* transform: translateX(-10%); */
  animation: change-out .4s ease;
  opacity: 0;
}

.slide-fade-enter-to, .slide-fade-leave {
  /* transform: translateX(-10%); */
  animation: change-in .4s ease;
  opacity: 1;
}

@keyframes change-in {
  0%   { transform: translateX(100%); opacity:1;}
  /* 10%  { transform: translateX(90%);  opacity:0.1;}
  20%  { transform: translateX(80%);  opacity:0.2;}
  30%  { transform: translateX(70%);  opacity:0.3;}
  40%  { transform: translateX(60%);  opacity:0.4;}
  50%  { transform: translateX(50%);  opacity:0.5;}
  60%  { transform: translateX(40%);  opacity:0.6;}
  70%  { transform: translateX(30%);  opacity:0.7;}
  80%  { transform: translateX(20%);  opacity:0.8;}
  90%  { transform: translateX(10%);  opacity:0.9;} */
  100% { transform: translateX(0%);   opacity:1;}
}
@keyframes change-out {
  0%   { transform: translateX(0%);    opacity:0;}
  /* 10%  { transform: translateX(-10%);  opacity:0.8;}
  20%  { transform: translateX(-20%);  opacity:0.8;}
  30%  { transform: translateX(-30%);  opacity:0.6;}
  40%  { transform: translateX(-40%);  opacity:0.6;}
  50%  { transform: translateX(-50%);  opacity:0.4;}
  60%  { transform: translateX(-60%);  opacity:0.4;}
  70%  { transform: translateX(-70%);  opacity:0.2;}
  80%  { transform: translateX(-80%);  opacity:0.2;}
  90%  { transform: translateX(-90%);  opacity:0;} */
  100% { transform: translateX(-100%); opacity:1;}
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
