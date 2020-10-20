Page({
  data: {
    theme: '#222',
  },

  onChange(e:{detail: {value: string}}) {
    this.setData({
      theme: e.detail.value,
    })
  }
})
