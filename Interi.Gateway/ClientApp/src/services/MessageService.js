import instance from "./AxiosApi";

export default {
    getMessageList: () =>
        instance({
            method: "GET",
            url: "/message/list"
        }),
    getMessageItem: (id) =>
        instance({
            method: "GET",
            url: "/message/item/" + id,
        }),
    postMessage: (data) =>
        instance({
            method: "POST",
            url: "/message",
            data: data,
        }),
    putMessage: (data) =>
        instance({
            method: "PUT",
            url: "/message",
            data: data,
        }),
    deleteMessage: (id) =>
        instance({
            method: "DELETE",
            url: "/message/" + id
        })
};
