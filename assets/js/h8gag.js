var serverAPI = 'http://localhost:3000'

var app = new Vue({
  el: '#app',
  data: {
    shoppingCart: 0,
    totalPayment: 0,
    categoryName: 'All Category',
    categories: [],
    items: []
  },

  created: function() {
    this.getCategory(),
    this.getItems()
  },

  methods: {
    getCategory() {
      axios.get(serverAPI + '/api/category')
      .then(resp => {
        this.categories = resp.data.category
      })
    },

    getItems() {
      axios.get(serverAPI + '/api/item')
      .then(resp => {
        this.categoryName = 'All Category'
        this.items        = resp.data.items
      })
    },

    getItemsByCategory(id) {
      axios.get(serverAPI + '/api/item/' + id)
      .then(resp => {
        this.categoryName = resp.data.items[0].CategoryId.name
        this.items        = resp.data.items
      })
    }
  }
})
