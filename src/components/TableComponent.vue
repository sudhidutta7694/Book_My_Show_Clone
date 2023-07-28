<template>
  <table class="table rounded-xl shadow-2xl">
    <thead class="rounded-t-xl">
      <tr class="bg-slate-900 font-bold text-xl text-gray-100">
        <th>City</th>
        <th>Language</th>
        <th>Movie</th>
        <th>Payment</th>
        <th>Seat Length</th>
        <th>Theater Name</th>
        <th>City</th>
        <th>State</th>
        <th>Timing</th>
        <th>Day</th>
        <th>Date</th>
        <th>Token</th>
        <!-- <th>Booking Status</th> -->
      </tr>
    </thead>
    <tbody class="rounded-b-xl">
      <tr class="text-red-50 bg-slate-600 font-serif text-xl" v-for="booking in sortedBookings" :key="booking.token">
        <!-- :class="(((new Date(booking.date).getUTCMonth()) <= (new Date().getUTCMonth())) && ((new Date(booking.date).getDate()) <= (new Date().getDate()))) ? 'text-red-200' : 'text-green-200'" -->
        <td>{{ booking.city }}</td>
        <td>{{ booking.language }}</td>
        <td>{{ booking.movie }}</td>
        <td>{{ booking.payment }}</td>
        <td>{{ booking.seatLength }}</td>
        <td>{{ booking.theater.name }}</td>
        <td>{{ booking.city }}</td>
        <td>{{ booking.state }}</td>
        <td>{{ booking.theater.timing }}</td>
        <td>{{ booking.theater.day }}</td>
        <td>{{ booking.date }}</td>
        <td>{{ booking.token }}</td>
        <!-- <td class="font-mono font-bold">
          {{ (((new Date(booking.date).getUTCMonth()) <= (new Date().getUTCMonth())) && ((new
            Date(booking.date).getDate()) <= (new Date().getDate()))) ? 'Expired' : 'Active' }} </td> -->
      </tr>
    </tbody>
  </table>
</template>


<script>
export default {
  props: {
    bookingData: {
      type: Array,
      required: true,
    },
  },
  computed: {
  sortedBookings() {
    return this.bookingData.slice(0,5).sort((a, b) => new Date(b.date) - new Date(a.date));
  }
}
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 16px;
}

th,
td {
  padding: 12px;
  text-align: center;
}

th {
  font-size: 16px;
  font-weight: bold;
}

td {
  font-size: 16px;
}
</style>style
