"use strict";
Page({
    data: {
        theme: '#222',
    },
    onChange: function (e) {
        this.setData({
            theme: e.detail.value,
        });
    }
});
