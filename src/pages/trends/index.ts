Page({
  data: {
    theme: 'light',
  },

  radioChange(e:{detail: {value: string}}) {
    this.setData({
      theme: e.detail.value,
    })
  }
})
