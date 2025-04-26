<script setup>

// props
const props = defineProps({
    user: {
        type:Object,
        default: {}
    }
});

// emit
const emit = defineEmits(['delete','edit']);

// user first character for avatar
const FirstChar = () => {
    return props.user.name[0].toUpperCase();
};

</script>



<template>
    <li v-if="!user.matched">
        <div class="profile">
            <h2>{{ FirstChar() }}</h2>
        </div>
        <div class="details">
            <h4>{{ user.name[0].toUpperCase()+ user.name.slice(1) }}</h4>
            <p>{{ user.message }}</p>
        </div>
        <div class="delete">
            <img @click="emit('delete', user)" src="./../images/delete.svg" alt="delete">
        </div>
        <div class="edit">
            <img @click="emit('edit', user)" src="./../images/edit.svg" alt="edit">
        </div>
    </li>
</template>