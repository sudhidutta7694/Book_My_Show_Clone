<template>
  <table class="table rounded-xl shadow-2xl">
    <thead class="rounded-t-xl">
      <tr class="bg-slate-900 font-bold text-red-200">
        <th>City</th>
        <th>Language</th>
        <th>Movie</th>
        <th>Payment</th>
        <th>Seat Length</th>
        <th>State</th>
        <th>Theater ID</th>
        <th>Timing</th>
        <th>Day</th>
        <th>Date</th>
        <th>Token</th>
        <!-- <th>Booking Status</th> -->
      </tr>
    </thead>
    <tbody class="rounded-b-xl">
      <tr class="bg-slate-600 font-sans text-gray-100" v-for="booking in (bookingData).slice(0,4)" :key="booking.token">
        <td>{{ booking.city }}</td>
        <td>{{ booking.language }}</td>
        <td>{{ booking.movie }}</td>
        <td>{{ booking.payment }}</td>
        <td>{{ booking.seatLength }}</td>
        <td>{{ booking.state }}</td>
        <td>{{ booking.theater.id }}</td>
        <td>{{ booking.theater.timing }}</td>
        <td>{{ booking.theater.day }}</td>
        <td>{{ booking.date }}</td>
        <td>{{ booking.token }}</td>
        <!-- <td>{{ (booking.date==Date.toLocaleString('en-US', { month: 'short', day: 'numeric' }))? Active : Expired }}</td> -->
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
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 16px;
}

th, td {
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
