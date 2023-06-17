<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-slate-700 text-gray-300 min-h-screen">
    <div class="theater-list pl-12 py-40">
      <div class="flex justify-center items-center">
        <h1 class="text-4xl font-bold inline mb-16">Theaters Streaming <span class="font-extrabold mb-16">'{{ movie
        }}'</span></h1>
      </div>
      <div class="flex justify-between item-center">
        <div class="mt-20 ml-48 justify-center items-center">
          <div class="filter mt-16 mb-12 flex">
            <select id="day-filter" v-model="selectedDay"
              class="p-4 text-xl font-serif font-semibold border border-spacing-x-3 border-red-300 bg-slate-900 rounded flex gap-4">
              <option value="" hidden>Please Select a Date</option>
              <option class="m-4 text-xl font-serif font-semibold border border-red-600 bg-slate-900 rounded-full"
                v-for="day in days" :key="day.value.slice(0, -7)" :value="day.value.slice(0, -7)">{{ day.value }}
              </option>
            </select>
          </div>
          <ul v-if="selectedDay" class="fade-enter-active">
            <li v-for="(theater, index) in filteredTheaters" :key="theater.id" :style="getTheaterAnimation(index)"
              class="mb-12 fade-enter">
              <div
                class="theater-item flex justify-between bg-slate-800 p-6 rounded-xl w-[30vw] transition-all ease-linear">
                <div class="">
                  <h3 class="text-xl font-semibold">{{ theater.name }}</h3>
                  <p class="text-green-200">Timing: {{ theater.timing }}</p>
                </div>
                <routerLink :to="{ name: 'hall', query: { theater: JSON.stringify(theater), movie: movie, language: language, city: city, state: state } }"
                  @click="addToUserTheaters(theater)"
                  class="bg-red-700 hover:bg-red-800 text-gray-100 font-bold py-2 px-4 rounded">
                  Book Seats
                </routerLink>
              </div>
            </li>
          </ul>
        </div>
        <img class="mr-48"
          src="https://media1.giphy.com/media/g6UKQJ1y9Bh0RH2pOY/giphy.gif?cid=6c09b952c22b1418a908ebcad9c45e35003baa8909b7f776&ep=v1_internal_gifs_gifId&rid=giphy.gif&ct=s"
          alt="ticket_gif" />
      </div>
    </div>
  </div>
</template>


<script>
// import { db } from '@/firebase';

export default {
  props: {
    movie: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showButton: false,
      theaters: [
        { id: 1, name: 'Bio-Scope', timing: '5:00 PM', day: 'Sunday' },
        { id: 2, name: 'Carnival Cinemas', timing: '10:00 PM', day: 'Sunday' },
        { id: 3, name: 'Bio-Scope', timing: '12:00 PM', day: 'Monday' },
        { id: 4, name: 'Carnival Cinemas', timing: '12:00 PM', day: 'Monday' },
        { id: 5, name: 'Bio-Scope', timing: '3:00 PM', day: 'Tuesday' },
        { id: 6, name: 'Carnival Cinemas', timing: '4:00 PM', day: 'Tuesday' },
        { id: 7, name: 'Bio-Scope', timing: '6:00 PM', day: 'Wednesday' },
        { id: 8, name: 'Carnival Cinemas', timing: '6:00 PM', day: 'Wednesday' },
        { id: 9, name: 'Bio-Scope', timing: '8:00 PM', day: 'Thursday' },
        { id: 10, name: 'Carnival Cinemas', timing: '4:00 PM', day: 'Thursday' },
        { id: 11, name: 'Bio-Scope', timing: '9:00 PM', day: 'Friday' },
        { id: 12, name: 'Carnival Cinemas', timing: '7:00 PM', day: 'Friday' },
        { id: 13, name: 'Bio-Scope', timing: '9:00 PM', day: 'Saturday' },
        { id: 14, name: 'Carnival Cinemas', timing: '2:00 PM', day: 'Saturday' },
      ],
      timings: ['12:00 PM', '3:00 PM', '4:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'],
      selectedTiming: '',
      selectedDay: '',
      selectedTheaters: [],
      userTheaters: []
    };
  },
  computed: {
    filteredDays() {
      return this.days.filter(day => day.value);
    },
    days() {
      const currentDate = new Date();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const DayIndex = (currentDate.getDay());
      const currentDayIndex = (DayIndex + 1) % 7;
      const nextDayIndex = (DayIndex + 2) % 7;
      const dayAfterNextIndex = (DayIndex + 3) % 7;

      return [
        { label: 'Today', value: days[currentDayIndex] + ' ' + this.getFormattedDate(currentDate, 1) },
        { label: 'Tomorrow', value: days[nextDayIndex] + ' ' + this.getFormattedDate(currentDate, 2) },
        { label: 'Day After Tomorrow', value: days[dayAfterNextIndex] + ' ' + this.getFormattedDate(currentDate, 3) }
      ];
    },
    filteredTheaters() {
      if (this.selectedTiming && this.selectedDay) {
        return this.theaters.filter(theater => theater.timing === this.selectedTiming && theater.day === this.selectedDay);
      } else if (this.selectedTiming) {
        return this.theaters.filter(theater => theater.timing === this.selectedTiming);
      } else if (this.selectedDay) {
        return this.theaters.filter(theater => theater.day === this.selectedDay);
      } else {
        return null
      }
    }
  },
  watch: {
    selectedDay() {
      this.selectedTiming = '';
    }
  },
  methods: {
    getTheaterAnimation(index) {
      const delay = index * 1000; // Delay each theater by 100 milliseconds
      return `transition-delay: ${delay}ms`;
    },
    addToUserTheaters(theater) {
      this.userTheaters.push(theater)
      console.log(theater)
    },
    getFormattedDate(date, daysToAdd) {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + daysToAdd);

      const options = { month: 'short', day: 'numeric' };
      return newDate.toLocaleDateString('en-US', options);
    }
  }
};
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 1s, transform 1s;
}

.theater-item {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active .theater-item {
  opacity: 1;
  transform: translateY(0);
}
</style>
