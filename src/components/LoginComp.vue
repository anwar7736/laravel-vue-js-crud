<template>
    <div>
       <div class="row">
            <div class="col-md-4 offset-4">
                <h2 class="text-danger text-center">Student Login Form</h2><br>
                <form method="POST" @submit.prevent="StudentLogin">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="user.email" required>
                    </div><br>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="user.password" required>
                    </div><br>
                    <button type="submit" class="btn btn-success">Login</button>
                </form>
            </div>
       </div>
    </div>
</template>
<script>
import axios from 'axios';
import cogoToast from 'cogo-toast';

    export default {
        data(){
            return {
                user : {
                    email : '',
                    password : '',
                }
            }
        },
        methods : {
            StudentLogin()
            {
                axios.post('http://127.0.0.1:8000/api/login/', {
                    "email" : this.user.email,
                    "password" : this.user.password,
                })
                .then(res=>{
                    if(res.data == 1)
                    {
                        localStorage.setItem('login', true);
                        this.$router.push('/');
                    }
                    else if(res.data != 1)
                    {
                        cogoToast.error('Invalid credentials!');
                    }
                })
                .catch(err=>{
                    cogoToast.error(err);
                })
            }
        },
        created()
        {
        if(localStorage.getItem('login'))
        {
                this.$router.push('/');
            
        }
        }
     }
</script>