<script setup>

import { ref } from 'vue';

let props = defineProps({
    editUser: {
        type: Object,
        default: {}
    }
});

let emit = defineEmits(['updateuser','close']);

// form data
let UserName = props.editUser.name;
let Message = props.editUser.message;

// validation data
let UserNameError = ref(false);
let MessageError = ref(false);


// update username and message using function
const UpdateUser = () => {
    // validation for name thread
    if(UserName.length < 3) UserNameError.value = true;
    else UserNameError.value = false;

    if(Message.length < 3) MessageError.value = true;
    else MessageError.value = false;


    if(!UserNameError.value && !MessageError.value){
        let Currentuser = {
            id: props.editUser.id,
            name: UserName,
            message: Message
        };
        emit('updateuser', Currentuser);
    }
}
</script>

<template>
    <div  class="add-chat animate__animated animate__zoomInDown">
       <div class="addchat-header"> 
           <h2>Edit New chat</h2>
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
           <div class="btn-primary" @click="UpdateUser">Update</div>
           <div @click="emit('close')" class="btn-secondary">Close</div>
       </div>
   </div>
   <div id="overlay" class="overlay"></div>
</template>