<script setup>

import { ref } from 'vue';

// define emit for add user model
let emit = defineEmits(['addUser','close']);

// form data
let UserName ='';
let Message ='';

// validation form
let UserNameError = ref(false);
let MessageError = ref(false);

// add user function
const AddUser = () => {
    // validation
    if(UserName.length < 3) UserNameError.value = true;
    else UserNameError.value = false;

    if(Message.length < 3) MessageError.value = true;
    else MessageError.value = false;


    // emit data
    if(!UserNameError.value && !MessageError.value){
        emit('addUser' , UserName , Message);

         // Reset form fields after submission
        UserName = '';
        Message = '';
    }
};

</script>


<template>
     <div  class="add-chat animate__animated animate__zoomInDown">
        <div class="addchat-header"> 
            <h2>add new chat</h2>
            <span @click="emit('close')"><img src="./../images/close.svg" alt="close"></span>
        </div>
        <div class="chat-form">
            <div class="form-field">
                <label >User Name</label>
                <input type="text"  :class="UserNameError ? '_error' : '' " v-model="UserName" placeholder="i.e. Jon Doe">
            </div>
            <div class="form-field">
                <label >Message</label>
                <input type="text" :class="MessageError ? '_error': ''" v-model="Message" placeholder="Hello There!">
            </div>
        </div>
        <div class="action">
            <div class="btn-primary" @click="AddUser">Add</div>
            <div @click="emit('close')" class="btn-secondary">Close</div>
        </div>
    </div>
    <div id="overlay" class="overlay"></div>
</template>