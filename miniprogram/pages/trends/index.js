"use strict";
Page({
    data: {
        theme: 'light',
    },
    radioChange: function (e) {
        this.setData({
            theme: e.detail.value,
        });
    }
});
