Page({
  data: {
    theme: 'light',
  },

  radioChange(e: {detail: {value: string}}) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      theme: e.detail.value,
    })
  }
})
