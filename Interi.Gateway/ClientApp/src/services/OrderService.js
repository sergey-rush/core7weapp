import instance from "./AxiosApi";
import multipart from "./AxiosFile";

export default {
    getOrderList: (index, size) =>
        instance({
            method: "GET",
            url: "/order/list",
            params: {
                index: index,
                size: size
            },
        }),
    getOrderItem: (id) =>
        instance({
            method: "GET",
            url: "/order/item/" + id,
        }),
    postOrder: (data) =>
        instance({
            method: "POST",
            url: "/order",
            data: data,
        }),
    putOrder: (data) =>
        instance({
            method: "PUT",
            url: "/order",
            data: data,
        }),
    deleteOrder: (id) =>
        instance({
            method: "DELETE",
            url: "/order/" + id
        }),
    countOrders: () =>
        instance({
            method: "GET",
            url: "order/count"
        })
};
