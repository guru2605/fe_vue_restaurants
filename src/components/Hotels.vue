<template>
  <div class="hotels">
    <table class="table table-striped table-bordered text-left">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Host Name</th>
          <th scope="col">Room Type</th>
          <th scope="col">Neighbourhood</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hotel of hotels" :key="hotel._id">
          <td>{{hotel.name}}</td>
          <td>{{hotel.host_name}}</td>
          <td>{{hotel.room_type}}</td>
          <td>{{hotel.neighbourhood}}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination mt-3">
      <a href="#" @click="getPrevPage()">&laquo;</a>
      <a> {{ skip/10 +1 }}  of {{Math.round(total/this.limit)}}  Pages</a>
      <a href="#" @click="getNextPage()">&raquo;</a>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../event-bus.js";
import AddNewHotel from "./AddNewHotel.vue";
import RestaurantService from "../mixins/restaurants";
export default {
  name: "Hotels",
  mixins: [RestaurantService],
  data() {
    return {
      hotels: [],
      totalPages: 0,
      skip: 0,
      limit: 10,
      search: "",
      loading: false,
      sortKey: "restaurant_name",
      sortValue: 1,
      total: 0
    };
  },
  methods: {
    async loadTables() {
      this.loading = true;
      try {
        let response = await this.getAllHotels(this.filters);
        this.hotels = response.hotels;
        this.total = response.total;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
      // this.totalPages = res.data.total
    },
    getNextPage() {
      console.log("Next")
      if(this.total > this.skip + 10){
        this.skip = this.skip +10
        this.loadTables();
      }
    },
    getPrevPage() {
      if(this.skip - 10 >= 0){
        this.skip = this.skip -10
        this.loadTables();
      }
    },
    updateSortParams(key, value) {
      this.sortKey = key;
      this.sortValue = value;
      this.loadTables();
    },
    addNewRestaurant() {
      this.$modal.show("add-new-hotel");
    }
  },
  mounted() {
    this.loadTables();
    EventBus.$on("search", search => {
      this.search = search;
      this.loadTables();
    });
  },
  components: { AddNewHotel },
  destroyed() {
    EventBus.$off("search");
  },
  computed: {
    filters() {
      return {
        search: this.search,
        sort_key: this.sortKey,
        sort_value: this.sortValue,
        skip: this.skip,
        limit: this.limit
      };
    }
  }
};
</script>

<style scoped>
.active {
  background-color: green;
  color: white;
}
.hide-arrow {
  visibility: hidden;
}
th:hover .sorting-icon {
  visibility: visible !important;
  cursor: pointer;
}
.sorting-icon {
  padding-right: 2px;
}
.text-bold {
  font-weight: bold;
}
.fs-14 {
  font-size: 14px !important;
}
.pointer {
  cursor: pointer;
}
#add-restaurant-button {
  position: relative;
  float: left;
  width: 200px;
}
.pagination {
  display: inline-block;
  float: right;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}

.pagination a.active {
  background-color: #4CAF50;
  color: white;
}
</style>
