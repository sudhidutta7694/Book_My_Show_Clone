<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="h-screen bg-slate-800 flex gap-20 flex-col">
        <div class="mt-40 relative">
            <div class="flex items-center justify-center gap-6">
                <label for="select" class="text-gray-200 text-xl font-serif font-semibold">Select the number of
                    seats:</label>
                <div>
                    <select id="select"
                        class="flex justify-center items-center font-mono font-bold text-md appearance-none py-2 px-4 pr-8 leading-tight text-red-50 bg-black border border-red-300 shadow-sm focus:outline-dashed rounded-full focus:border-red-400 transition-transform ease-in-out duration-1000 hover:text-red-100"
                        v-model="selectedOption" @change="updateSelectedSeats">
                        <option v-for="option in seatOptions" :value="option.value" :key="option.value">
                            {{ option.label }}
                        </option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-[40.7vw] flex items-center px-2 text-red-300">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 12l-6-6h12l-6 6z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <div class="relatve flex justify-center">
            <div
                class="mt-12 absolute z-1000 bg-red-200 h-[20vh] w-[40vw] rounded-xl border border-black hover:shadow shadow-xl shadow-red-100 flex justify-center items-center">
                <p class="font-sans text-2xl font-bold">All eyes here, please!</p>
            </div>
        </div>
        <div class="mt-12 theatre scale-105 bg-slate-900">


            <div class="cinema-seats left" :class="{ 'selected': isSelectedSeat('left') }">
                <div v-for="row in numberOfRows" :key="row" class="cinema-row" :class="'row-' + row">
                    <div v-for="seat in seatsPerRow" :key="seat" class="seat"
                        :class="{ 'selected-seat': isSelectedSeat(getSeatId('left', row, seat)) }"
                        @click="toggleSeat(getSeatId('left', row, seat))"
                        :disabled="isSeatDisabled(getSeatId('left', row, seat))"></div>
                </div>
            </div>

            <div class="cinema-seats right" :class="{ 'selected': isSelectedSeat('right') }">
                <div v-for="row in numberOfRows" :key="row" class="cinema-row" :class="'row-' + row">
                    <div v-for="seat in seatsPerRow" :key="seat" class="seat"
                        :class="{ 'selected-seat': isSelectedSeat(getSeatId('right', row, seat)) }"
                        @click="toggleSeat(getSeatId('right', row, seat))"
                        :disabled="isSeatDisabled(getSeatId('right', row, seat))"></div>
                </div>
            </div>
        </div>
        <div class="mt-[50vh] ml-[40vw] flex flex-col justify-center">
            <router-link :to="{
                name: 'payment', query: {
                    payment: (150 * numSeats),
                    seats: selectedSeats && selectedSeats.length ? selectedSeats.join(',') : '',
                    theater: JSON.stringify(theater),
                    movie: movie,
                    language: language,
                    city: city,
                    state: state
                }
            }">
                <button
                    class="px-4 py-2 w-[20vw] font-semibold font-mono bg-gray-500 rounded-full disabled:opacity-50 disabled:pointer-events-none"
                    :class="{ 'bg-green-500': selectedSeats.length >= numSeats }"
                    :disabled="selectedSeats.length < numSeats">
                    {{ selectedSeats.length >= numSeats ? `Proceed to Pay - ₹${150 * numSeats}` : 'Select Seats' }}
                </button>
            </router-link>
        </div>
    </div>
</template>
  
  
<script>
export default {
    props: {
        theater: {
            type: String,
            required: true,
        },
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
            selectedOption: '1', // Initial selected option value
            selectedSeats: [], // Array to store the selected seats
            numSeats: 1,
            seatOptions: [
                { value: '1', label: '1 Seat' },
                { value: '2', label: '2 Seats' },
                { value: '3', label: '3 Seats' },
                { value: '4', label: '4 Seats' },
                { value: '5', label: '5 Seats' },
                { value: '6', label: '6 Seats' },
            ],
            numberOfRows: 7, // Number of rows in the cinema
            seatsPerRow: 7, // Number of seats per row
        };
    },
    watch: {
        selectedOption(newOption) {
            this.numSeats = parseInt(newOption);
        },
    },
    methods: {
        updateSelectedSeats() {
            // Clear the selectedSeats array
            this.selectedSeats = [];

            // Get the selected option value
            const numSeats = parseInt(this.selectedOption);

            // Loop through each seat and add it to the selectedSeats array
            for (let row = 1; row <= this.numberOfRows; row++) {
                for (let seat = 1; seat <= this.seatsPerRow; seat++) {
                    const seatId = this.getSeatId('left', row, seat);
                    if (this.selectedSeats.length < numSeats && this.isSelectedSeat(seatId)) {
                        this.selectedSeats.push(seatId);
                    }
                }
            }

            // Log the selected seat values
            console.log(this.selectedSeats);
        },

        isSelectedSeat(seatId) {
            // Check if the seat is selected
            return this.selectedSeats.includes(seatId);
        },

        toggleSeat(seatId) {
            // Get the selected option value
            const numSeats = parseInt(this.selectedOption);

            // Check if the seat is already selected
            if (this.isSelectedSeat(seatId)) {
                // Remove the seat from selectedSeats array
                this.selectedSeats = this.selectedSeats.filter((seat) => seat !== seatId);
            } else {
                // Check if the maximum number of seats has been reached
                if (this.selectedSeats.length < numSeats) {
                    // Add the seat to selectedSeats array
                    this.selectedSeats.push(seatId);
                }
            }

            // Log the selected seat values
            console.log(this.selectedSeats);
        },

        getSeatId(side, row, seat) {
            return `${side}-${row}-${seat}`;
        },

        isSeatDisabled(seatId) {
            // Check if the seat is disabled based on the selected option value
            const numSeats = parseInt(this.selectedOption);
            return this.selectedSeats.length >= numSeats && !this.isSelectedSeat(seatId);
        },
    },
};
</script>


  
<style scoped>
.theatre {
    display: flex;
    position: absolute;
    z-index: 1000;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.cinema-seats {
    display: flex;
}

.seat {
    cursor: pointer;
    width: 35px;
    height: 50px;
    border-radius: 7px;
    background: linear-gradient(to top, #761818, #761818, #761818, #761818, #761818, #B54041, #F3686A);
    margin-bottom: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.selected-seat {
    background-color: green;
    cursor: pointer;
}

.seat.active {
    background: green;
    border-radius: 7px;
}

.seat:hover:before {
    content: "";
    position: absolute;
    z-index: 1000;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 7px;
}

.left .cinema-row {
    transform: skewX(-15deg);
    margin: 0 6px;
}

.left .seat {
    transform: skewX(20deg);
    margin-top: -32px;
}

.left .row-2 .seat {
    transform: skewX(18deg);
}

.left .row-3 .seat {
    transform: skewX(16deg);
}

.left .row-4 .seat {
    transform: skewX(15deg);
}

.left .row-5 .seat {
    transform: skewX(12deg);
}

.left .row-6 .seat {
    transform: skewX(10deg);
}

.left .row-7 .seat {
    transform: skewX(8deg);
}

.right {
    margin-left: 70px;
}

.right .cinema-row {
    transform: skewX(7deg);
    margin: 0 6px;
}

.right .seat {
    transform: skewX(-8deg);
    margin-top: -32px;
}

.right .row-2 .seat {
    transform: skewX(-10deg);
}

.right .row-3 .seat {
    transform: skewX(-12deg);
}

.right .row-4 .seat {
    transform: skewX(-15deg);
}

.right .row-5 .seat {
    transform: skewX(-16deg);
}

.right .row-6 .seat {
    transform: skewX(-18deg);
}

.seat.active {
    background: green;
    border-radius: 7px;
}

.right .row-7 .seat {
    transform: skewX(-20deg);
}

/* New Modifications */

/* Change opacity and background color for selected seats */
.selected-seat {
    background: green;
}

/* Reduce opacity for unselected seats */
.seat:not(.selected-seat) {
    opacity: 1;
}

.disable-hover .seat:hover:before {
    background: none;
}

.disabled\:opacity-50[disabled] {
    opacity: 0.5;
}

.disabled\:pointer-events-none[disabled] {
    pointer-events: none;
}

.bg-green-500 {
    background-color: #25ce90;
}
</style>



