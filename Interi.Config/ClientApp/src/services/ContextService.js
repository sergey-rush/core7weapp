import React, { Component } from 'react';
const AppContext = {};
export default {
    register: (key, instance) => {
        AppContext[key] = instance;
    },
    getInstance: (key) => {
        var instance = AppContext[key];
        return instance;
    }
}