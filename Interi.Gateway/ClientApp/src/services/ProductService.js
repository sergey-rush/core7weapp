import instance from "./AxiosApi";
import multipart from "./AxiosFile";

export default {
    getProductList: () =>
        instance({
            method: "GET",
            url: "/product/list"
        }),
    getProductItem: (id) =>
        instance({
            method: "GET",
            url: "/product/item/" + id,
        }),
    postProduct: (data) =>
        instance({
            method: "POST",
            url: "/product",
            data: data,
        }),
    putProduct: (data) =>
        instance({
            method: "PUT",
            url: "/product",
            data: data,
        }),
    deleteProduct: (id) =>
        instance({
            method: "DELETE",
            url: "/product/" + id
        })
};
