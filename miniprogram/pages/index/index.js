"use strict";
Page({
    data: {
        theme: 'light',
    },
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);
        this.setData({
            theme: e.detail.value,
        });
    }
});
