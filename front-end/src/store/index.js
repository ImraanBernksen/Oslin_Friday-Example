import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
    cars: null,
    car: null,
    asc:true
  },

  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },

    setProperties: (state, cars) => {
      state.cars = cars;
    },
    setProperty: (state, car) => {
      state.cars = car;
    },
    sortPropertiesByPrice: (state) => {
      state.cars.sort((a, b) => {
        return a.price - b.price;
      });
      if (!state.asc) {
        state.cars.reverse();
      }
      state.asc = !state.asc;
    },
  },
  actions: {
    register: async (context, payload) => {
      const { full_name, email, password } = payload;
      fetch("http://localhost:3030/api/users", {
        method: "POST",
        body: JSON.stringify({
          full_name: full_name,
          email: email,
          password: password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => context.commit("setUser", json));
    },

    login: async (context, payload) => {
      const { email, password } = payload;

      const response = await fetch(
        `http://localhost:3000/api/users?email=${email}&password=${password}`
      );
      const userData = await response.json();
      context.commit("setUser", userData[0]);
    },

    getProperties: async (context) => {
      fetch("http://localhost:3000/cars")
        .then((res) => res.json())
        .then((cars) => context.commit("setProperties", cars));
    },
    getProperty: async (context, id) => {
      fetch("http://localhost:3000/cars/" + id)
        .then((res) => res.json())
        .then((car) => context.commit("setProperty", car));
    },
    deleteProperty: async (context, id) => {
      fetch("http://localhost:3000/cars/" + id, {
        method: "DELETE",
      }).then(() => context.dispatch("getProperties"));
    },
    createProperty: async (context, car) => {
      fetch("http://localhost:3000/cars/", {
        method: "POST",
        body: JSON.stringify(car),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then(() => context.dispatch("getProperties"));
    },
    updateProperty: async (context, car) => {
      fetch("http://localhost:3000/cars/" + car.id, {
        method: "PUT",
        body: JSON.stringify(car),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then(() => context.dispatch("getProperties"));
    },
  },
  modules: {},
});
