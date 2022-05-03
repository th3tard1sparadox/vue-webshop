const state = () => ({
    all: []
})
  
// getters
const getters = {}

// actions
const actions = {
    async getAllProducts ({ commit }) {
        const gResponse = await fetch("http://localhost:5000/products");
        const gObject = await gResponse.json();
        const products = gObject;
        commit('setProducts', products)
    }
}

// mutations
const mutations = {
    setProducts (state, products) {
        state.all = products
    },

    decrementProductInventory (state, { id }) {
        const product = state.all.find(product => product.id === id)
        // do something
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}