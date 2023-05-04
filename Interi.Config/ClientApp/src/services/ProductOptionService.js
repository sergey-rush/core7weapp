import instance from "./AxiosApi";

export default {
    getProductOptionList: (id) =>
        instance({
            method: "GET",
            url: "/product-option/list/" + id
        }),
    getProductOptionItem: (id) =>
        instance({
            method: "GET",
            url: "/product-option/item/" + id,
        }),
    postProductOption: (data) =>
        instance({
            method: "POST",
            url: "/product-option",
            data: data,
        }),
    putProductOption: (data) =>
        instance({
            method: "PUT",
            url: "/product-option",
            data: data,
        }),
    deleteProductOption: (id) =>
        instance({
            method: "DELETE",
            url: "/product-option/" + id
        })
};
