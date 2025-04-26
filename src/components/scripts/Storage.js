    let localStorage = window.localStorage;

// get chat list user from local storage

export const GetChatList = () => {
    let list = localStorage .getItem('chatuserlist');
    if(list == null || list == undefined) return [];

    else return JSON.parse(list);

}

export const SetChatList = (list) => {
    localStorage.setItem(`chatuserlist`, JSON.stringify(list));
    return true;
}