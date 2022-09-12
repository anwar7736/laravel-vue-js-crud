<template>
    <h1>{{name}}</h1>
</template>
<script>
    export default {
        data() {
            return {
                name : 'Home',
            }
        },
        created()
        {
        if(!localStorage.getItem('login'))
        {
                this.$router.push('/login');
            
        }
        },
        
    }
</script>