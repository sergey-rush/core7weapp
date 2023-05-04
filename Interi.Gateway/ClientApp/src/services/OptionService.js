import instance from "./AxiosApi";

export default {
    getOptionList: () =>
        instance({
            method: "GET",
            url: "/option/list"
        }),
    getOptionItem: (id) =>
        instance({
            method: "GET",
            url: "/option/item/" + id,
        }),
    postOption: (data) =>
        instance({
            method: "POST",
            url: "/option",
            data: data,
        }),
    putOption: (data) =>
        instance({
            method: "PUT",
            url: "/option",
            data: data,
        }),
    deleteOption: (id) =>
        instance({
            method: "DELETE",
            url: "/option/" + id
        })
};
