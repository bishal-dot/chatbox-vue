<script setup>

import { ref } from 'vue';
// import UserCard from './UserCard.vue';
// import EmptyCard from './EmptyCard.vue';
// import AddModal from './AddModal.vue';
// import EditModal from './EditModal.vue';

// import local storage 
import { GetChatList , SetChatList } from './scripts/Storage';

// import components from index.js
import { AddModal, UserCard , EmptyCard, EditModal , ChatBox} from '.';

let ShowModal = ref(false);
let ShowEditModal = ref(false);
let EditUserData = ref({});
let searchResult = '';

// toogle dark and light theme
const Theme = () => {
    document.body.classList.toggle('dark-theme')
}

// chat list user data
let ChatUserLists = ref(GetChatList()
//     [
//     {
//         id : 1,
//         name: 'Doe',
//         message : 'This is demo message '
//     },
//     {
//         id : 2,
//         name: 'John',
//         message : 'This is a message'
//     },
// ]
);



    /**
     * delete selected user from ChatListUsers
     * @param user selected user to delete
     * @returns delete user and update ChatListUsers
    */
const DeleteUser = (user) => {
    ChatUserLists.value = ChatUserLists.value.filter(element => {
        if(user.id == element.id) return false;
        else return true;
    });

    // update local storage
    SetChatList(ChatUserLists.value);
};

/**
     * This function add new user to the ChatListUsers
     * @param username emited from AddModal, name of new user
     * @param message emited data, message of new user
     * @returns void
    */

const AddNewUser = (username, message) => {
    ChatUserLists.value.unshift({
        id: Math.floor(Math.random() *1000),
        name: username,
        message : message
    });

     // update local storage
     SetChatList(ChatUserLists.value);

    // hide the modal
    ShowModal.value = false;
}


/**
     * this function show the edit modal 
     * and update EditUserData object to send as props
     * @param user user object to change 
     * @returns void
    */
const EditUser =  (user) => {
    EditUserData.value = user;
    ShowEditModal.value = true;
};


 /**
     * this function update the selected user in main object (ChatListUsers)
     * @param user new updated user data emited from EditModal Component
     * @returns void
    */
const UpdateUser = (user) => {
        // update the selected user in main object
        ChatUserLists.value.map(element => {
            if (user.id == element.id) {
                element.name = user.name;
                element.message = user.message;
            }
        });

         // update local storage
        SetChatList(ChatUserLists.value);

        // hide edit modal
        ShowEditModal.value = false;
    };

// search user
const SearchUser = () => {
    ChatUserLists.value.map(user => {
        if(user.name.toLowerCase().includes(searchResult.toLowerCase())) user.matched = false;
        else user.matched = true;
    });
};

// sort chat user in ascending and descending order
const sortOrderAscending = () => {
    ChatUserLists.value.sort((a , b) => {
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        else return 0;
    });
};

const sortOrderDescending = () => {
    ChatUserLists.value.sort((a , b) => {
        if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        else if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        else return 0;
    });
};



</script>

<template>
     <div class="chat-container animate__animated animate__zoomIn">
        <div class="chat-heading">
            <h2>
                <img class="network hide" src="./../images/network.svg" alt="network" id="netStatus">
                <span>Chats ({{ ChatUserLists.length }})</span>
            </h2>
            <div class="action">
                <!-- <span><img src="./../images/sortAZ.svg" alt="sort" @click="sortOrderDescending"></span> -->
                 <span>
                    <p @click="sortOrderAscending">A</p>
                    <p @click="sortOrderDescending">Z</p>
                 </span>
                <span><img src="./../images/dark.svg" alt="theme" @click="Theme"></span>
                <span><img src="./../images/new.svg" alt="add" @click="ShowModal = true"></span>
            </div>
        </div>
        <div class="chat-search">
            <span><img src="./../images/search.svg" alt="search"></span>
            <input type="text" placeholder="Search in chat" @keyup="SearchUser" v-model="searchResult">
        </div>

        <ul>
            <UserCard v-for="user in ChatUserLists" :key="user.id" 
            :user="user" 
            @delete="DeleteUser"
            @edit="EditUser"
            />      
        </ul>
        <EmptyCard v-if="ChatUserLists.length == 0" />
    </div>

    <!-- add modal --> 
    <AddModal v-if="ShowModal"
        @addUser="AddNewUser"
        @close ="ShowModal = false"  />
     <!-- add modal --> 
      <!-- edit user model -->
    <EditModal v-if="ShowEditModal"
        :editUser="EditUserData"
        @updateuser="UpdateUser"
        @close="ShowEditModal = false"
    />

</template>