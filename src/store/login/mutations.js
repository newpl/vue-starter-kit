import Constant from '../../Constant.js';
export default {
    [Constant.SET_PUBLIC_KEY] : (state, payload) => {
        console.log("SET_PUBLIC_KEY : ", payload);
        state.publicKey = payload;
    },
    [Constant.SET_CURRENT_USER] : (state, payload) => {
        state.currentUser = payload;
        state.isResetAuthCode = false;
        if( state.currentUser.lastAuthCodeUpdateDate && state.duration && state.duration>0) {
            var lastUpdate = new Date(state.currentUser.lastAuthCodeUpdateDate);
            var now = new Date()
            var days = new Date().setDate(now.getDate()-state.duration)
              console.log("currentUser------------------------------")
              console.log("now: "+now.getDate())
              console.log("lastUpdate: "+lastUpdate.getTime())
              console.log("days: "+days)
            if(days > lastUpdate.getTime()){
              state.isResetAuthCode = true
            }
          }
    },
    [Constant.SET_SYSTEM_EXIST] : (state, payload) => {
        state.systemExist = payload;
    },
    [Constant.SET_ROLE_LIST] : (state, payload) => {
        state.roleList = payload;
    },
    [Constant.SET_TERMS_AGREE] : (state, payload) => {
        state.termsAgree = payload;
    }
    
}