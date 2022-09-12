<template>
    <div>
        <h1>{{name}}</h1>
      <div class="row">
        <div class="col-md-4 offset-2">
            <router-link to="/"> >> Back to Home</router-link><br><br>
            <button class="btn btn-danger btn-sm" @click="logout">Logout</button>
            <div class="card-body">
                <h2>Course Registration Form</h2>
        <form method="POST" @submit.prevent="StudentRegistration">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" v-model="user.username" class="form-control" required>
            </div> 
            <div class="form-group">
                <label for="username">Password</label>
                <input type="password" v-model="user.password" class="form-control" required>
            </div>  
            <div class="form-group">
                <label for="username">Email</label>
                <input type="email" v-model="user.email" class="form-control" required>
            </div> 
            <div class="form-group">
                <label for="username">Age</label>
                <input type="number" v-model="user.age" class="form-control" min="1" required>
            </div>
            <div class="form-group">
                <label for="username">Gender</label><br>
                <label><input type="radio" v-model="user.gender" name="gender" value="Male"> Male</label><br>
                <label><input type="radio" v-model="user.gender" name="gender" value="Female"> Female</label>
            </div> 
            <div class="form-group">
                <label for="username">Choose your courses</label><br>
                <label><input type="checkbox" v-model="courses" value="HTML"> HTML</label><br>
                <label><input type="checkbox" v-model="courses" value="CSS"> CSS</label><br>
                <label><input type="checkbox" v-model="courses" value="JavaScript"> JavaScript</label><br>
                <label><input type="checkbox" v-model="courses" value="PHP"> PHP</label><br>
                <label><input type="checkbox" v-model="courses" value="MySQL"> MySQL</label>
            </div> 
            <div class="form-group">
                <label for="username">Select your country</label><br>
                <select class="form-control" v-model="selectedCountry">
                    <option v-for="(country,index) in countries" :key="index">
                        {{country}}
                    </option>
                </select>
            </div> 
            <div class="form-group">
                <label for="username">Enter your short description (optional)</label><br>
                <textarea name="" id="" rows="5" class="form-control" v-model="short_description">
                </textarea>
            </div> 
            <div class="form-group">
                <input type="submit" value="Register" class="btn btn-success mt-3 form-control">
            </div><br><br>


        </form>
       </div>
        </div>
        <div class="col-md-4 offset-1" v-if="student_information">
                <h2>Your informations : </h2>
                <p>Your name : {{user.username}}</p>
                <p>Your email : {{user.email}}</p>
                <p>Your password : {{user.password}}</p>
                <p>Your age : {{user.age}}</p>
                <p>Your gender : {{user.gender}}</p>
                <p>Your interested courses : {{courses}}</p>
                <p>Your Country : {{selectedCountry}}</p>
                <p style="white-space:pre-line;">Short description : {{short_description}}</p>
        </div>
        <div class="col-md-5">
            <table class="table table-bordered table-hover">
                <thead>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th width="40%">Courses</th>
                    <th>Country</th>
                    <th class="text-center" colspan="2">Action</th>
                </thead>
                <tbody>
                    <tr v-for="student in students" :key="student.id">
                        <td>{{student.username}}</td>
                        <td>{{student.email}}</td>
                        <td>{{student.age}}</td>
                        <td>{{student.gender}}</td>
                        <td>{{student.courses}}</td>
                        <td>{{student.country}}</td>
                        <td><button class="btn btn-success btn-sm" @click="editStudent(student.id)">Edit</button></td>
                        <td><button @click="deleteStudent(student.id)" class="btn btn-danger btn-sm">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
      {{ getStudents()}}
    </div>
</template>
<script>
import axios from 'axios';
import cogoToast from 'cogo-toast';
import Swal from 'sweetalert2'
    export default {
        data() {
            return {
                user : {
                    username : '',
                    password : '',
                    email    : '',
                    age      : '',
                    gender   : 'Male',

                },
                courses             : [],
                countries           : ['Bangladesh', 'India', 'Pakistan', 'USA', 'UK', 'Srilanka', 'Africa'],
                selectedCountry     : 'Bangladesh',
                short_description   : '',
                student_information : false,
                students : [],
                hiddenID : '',
            }
        },
        methods : {
    
            StudentRegistration()
            {
                if(this.hiddenID == ''){
                    axios.post('http://127.0.0.1:8000/api/student_registration', {
                    'username' : this.user.username,
                    'email' : this.user.email,
                    'password' : this.user.password,
                    'age' : this.user.age,
                    'gender' : this.user.gender,
                    'courses' : this.courses,
                    'country' : this.selectedCountry,
                    'short_description' : this.short_description,
            })
            .then((response)=>{
                    if(response.status == 200)
                    {
                        Swal.fire(
                            'Good job!',
                            'You clicked the button!',
                            'success'
                        )
                        // cogoToast.success(response.data.success);
                        // this.student_information = true;
                        this.getStudents();
                        this.resetForm();
                    }
                })
                .catch((error)=>{
                    alert(error);
                })
                }
                else {
                    axios.put('http://127.0.0.1:8000/api/edit/' + this.hiddenID, {
                    'username' : this.user.username,
                    'email' : this.user.email,
                    'password' : this.user.password,
                    'age' : this.user.age,
                    'gender' : this.user.gender,
                    'courses' : this.courses,
                    'country' : this.selectedCountry,
                    'short_description' : this.short_description,
            })
            .then((response)=>{
                    if(response.status == 200)
                    {
                        cogoToast.success(response.data.success);
                        // this.student_information = true;
                        this.getStudents();
                        this.hiddenID = '';
                        this.resetForm();
                    }
                })
                .catch((error)=>{
                    alert(error);
                })
                }
               
               
            },
            editStudent(id){
                axios.get('http://127.0.0.1:8000/api/edit/' + id)
                .then(res=>{
                    this.user.username = res.data.username;
                    this.user.email = res.data.email;
                    this.user.password = res.data.password;
                    this.user.age = res.data.age;
                    this.user.gender = res.data.gender;
                    this.courses = res.data.courses;
                    this.selectedCountry = res.data.country;
                    this.short_description = res.data.short_description;
                    this.hiddenID = res.data.id;
                })
                .catch(err=>{
                    console.log(err);
                })
            },

            deleteStudent(id)
            {
                Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        buttonsStyling: true
                    }).then(function (isConfirm) {
                        if(isConfirm.value === true) {
                            axios.delete('http://127.0.0.1:8000/api/destroy/'+id)
                            .then(res=>{
                                if(res.status == 200)
                                {
                                    this.getStudents();
                                    Swal.fire(
                                        'Deleted!',
                                        'success'
                                        )
                                }
                            })
                            .catch(err=>{
                                console.log(err);
                            })
                        }
                    });
            },

            resetForm()
            {

                this.user.username = '';
                this.user.email = '';
                this.user.password = '';
                this.user.age = '';
                this.user.gender = 'Male';
                this.courses = '';
                this.selectedCountry = 'Bangladesh';
                this.short_description = '';
            },
            getStudents()
            {  
                axios.get('http://127.0.0.1:8000/api/students')
                .then(res=>{
                    this.students = res.data; 
                })
                .catch(err=>{
                    console.log(err);
                })
            
            },
            logout()
            {
                localStorage.removeItem('login');
                this.$router.push('/login');
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
<style>
    label{
        font-weight: bold;
        color: red;
    }
</style>