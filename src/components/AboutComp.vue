<template>
    <h1>{{name}} {{id}} {{locale}}</h1>
</template>
<script>
    export default {
        data() {
            return {
                name : 'About',
                id : this.$route.params.id,
                locale : this.$route.query.lang,
            }
        },
        created()
    {
       if(!localStorage.getItem('login'))
       {
            this.$router.push('/login');
        
       }
    }
    }
</script>