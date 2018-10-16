import Constant from '~/Constant.js';
import CONF from '~/Config.js'
import axios from 'axios';

export default {
    [Constant.GET_PUBLIC_KEY] : (store) => {
        axios.get(CONF.GET_KEY).then((res) => {
            store.commit (Constant.SET_PUBLIC_KEY, res.data);
        })               
    },
    [Constant.LOGOUT] : (store) => {
        var guest = { userId:4, login:'guest', fullName:'Guest', email:'', statusId:'1', createDate:'',datetimePattern:'yyyy-MM-dd HH:mm', epid:null, locale:'ko', timezone:'Asia/Seoul'};
        store.commit(Constant.SET_CURRENT_USER, guest);
        store.commit(Constant.SET_SYSTEM_EXIST, '');
    },
    [Constant.CURRENT] : (store) => {
        axios.get(CONF.GET_CURRENT)
        .then ((res) => {
            store.commit (Constant.SET_CURRENT_USER, res.data);
            console.log(res.data.login);
            let login = res.data.login;
            if(login != 'guest') {
                axios.get('/rest/v1/role/user/' + login)
                    .then((res) => {
                        store.commit (Constant.SET_ROLE_LIST, res.data);
                    });
                axios.get('/rest/v1/user/exist/' + login)
                    .then((res) => {
                        store.commit (Constant.SET_SYSTEM_EXIST, res.data);
                    });
                axios.get('/rest/v1/terms/agreelist/login/' + login)
                    .then((res) => {
                        var toggle = false;
                        for (var i=0; i<res.data.length; i++) {
                            if (res.data[i].agreeYn=='N') {
                                toggle = true;
                            }
                            if(toggle) {
                                store.commit (Constant.SET_TERMS_AGREE, 'N');
                            } else {
                                store.commit (Constant.SET_TERMS_AGREE, "Y");
                            }
                        }
                    });
            }
        })
    }

    // [Constant.CURRENT] : (store) => {
    //     return new Promise((resolve) => {
    //         axios.get(CONF.GET_CURRENT)
    //         .then ((res) => {
    //             store.commit (Constant.SET_CURRENT_USER, res.data);
    //             console.log(res.data.login);
    //             let login = res.data.login;
    //             if(login != 'guest') {
    //                 axios.get('/rest/v1/role/user/' + login)
    //                     .then((res) => {
    //                         store.commit (Constant.SET_ROLE_LIST, res.data);
    //                     });
    //                 axios.get('/rest/v1/user/exist/' + login)
    //                     .then((res) => {
    //                         store.commit (Constant.SET_SYSTEM_EXIST, res.data);
    //                     });
    //                 axios.get('/rest/v1/terms/agreelist/login/' + login)
    //                     .then((res) => {
    //                         var toggle = false;
    //                         for (var i=0; i<res.data.length; i++) {
    //                             if (res.data[i].agreeYn=='N') {
    //                                 toggle = true;
    //                             }
    //                             if(toggle) {
    //                                 store.commit (Constant.SET_TERMS_AGREE, 'N');
    //                             } else {
    //                                 store.commit (Constant.SET_TERMS_AGREE, "Y");
    //                             }
    //                         }
    //                     });
    //             }
    //             resolve();
    //         })
    //     })
    // }
}