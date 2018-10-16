import Vue from 'vue';
import Router from 'vue-router';

import home from '~/comp/pages/Home.vue';
import login from '~/comp/pages/Login.vue';
import register from '~/comp/pages/Register.vue';
import notFound from '~/comp/pages/NotFound.vue';

Vue.use(Router);
/* 페이지 이동 경로 router */
const router = new Router({
    routes: [
        { path: '/'            , redirect: '/home'   },
        { path: '/home'        , component: home     },
        { path: '/login'       , component: login    },
        { path: '/register'    , component: register },
        { path: '*'            , component: notFound },
    ]
})

// router.beforeEach(function(to, from, next) {
//     // error 처리
// })

export default router;