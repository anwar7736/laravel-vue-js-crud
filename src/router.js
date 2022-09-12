import {createRouter, createWebHistory} from 'vue-router';
import Home from './components/HomeComp.vue';
import About from './components/AboutComp.vue';
import Contact from './components/ContactComp.vue';
import Login from './components/LoginComp.vue';

const routes = [
    {path : '/', component : Home},
    {path : '/about/:id', component : About},
    {path : '/contact', component : Contact},
    {path : '/login', component : Login},
];

const router = createRouter({
    routes,
    history : createWebHistory(),
});
export default router;