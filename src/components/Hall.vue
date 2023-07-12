<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <teleport to="#movieStats">
        <div class="stats fixed top-[40vh] right-[10vw] z-1000">
            <div class="bg-slate-700 w-20 py-3 h-fit rounded-xl flex flex-col gap-4 justify-center items-center p-2">
                <div class="seat-ruby rounded-lg w-16 h-16 flex flex-col items-center justify-center">
                    <p class="font-mono text-white font-bold">RUBY</p>
                    <p class="font-mono text-indigo-300 font-bold">₹150</p>
                </div>
                <div class="seat-gold rounded-lg w-16 h-16 flex flex-col items-center justify-center">
                    <p class="font-mono text-white font-bold">GOLD</p>
                    <p class="font-mono text-indigo-800 font-bold">₹200</p>
                </div>
                <div class="seat-panna rounded-lg w-16 h-16 flex flex-col items-center justify-center">
                    <p class="font-mono text-white font-bold">PANNA</p>
                    <p class="font-mono text-indigo-800 font-bold">₹250</p>
                </div>
                <div class="bg-gray-500 rounded-lg w-16 h-16 flex items-center justify-center">
                    <p class="font-mono text-white font-bold">N/A</p>
                </div>
                <div class="selected rounded-lg w-16 h-16 flex items-center justify-center">
                    <p class="font-serif text-sm text-gray-200 font-bold">Selected</p>
                </div>
            </div>
        </div>
    </teleport>

    <div class="h-screen bg-slate-800 flex gap-20 flex-col">
        <div class="mt-40 relative">
            <div class="flex items-center justify-center gap-6">
                <label for="select" class="text-gray-200 text-xl font-serif font-semibold">
                    Select the number of seats:
                </label>
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
                    <div v-for="seat in seatsPerRow" :key="seat" class="seat" :class="getSeatClass('left', row, seat)"
                        @click="toggleSeat(getSeatId('left', row, seat))"
                        :disabled="isSeatDisabled(getSeatId('left', row, seat))"
                        :data-seat-id="getSeatId('left', row, seat)">
                    </div>
                </div>
            </div>

            <div class="cinema-seats right" :class="{ 'selected': isSelectedSeat('right') }">
                <div v-for="row in numberOfRows" :key="row" class="cinema-row" :class="'row-' + row">
                    <div v-for="seat in seatsPerRow" :key="seat" class="seat" :class="getSeatClass('right', row, seat)"
                        @click="toggleSeat(getSeatId('right', row, seat))"
                        :disabled="isSeatDisabled(getSeatId('right', row, seat))"
                        :data-seat-id="getSeatId('right', row, seat)">
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-[50vh] ml-[40vw] flex flex-col justify-center">
            <router-link :to="{
                name: 'payment',
                query: {
                    payment: payment,
                    seats: selectedSeats.length ? selectedSeats.join(',') : '',
                    date: date,
                    theater: JSON.stringify(theater),
                    movie: movie,
                    language: language,
                    city: city,
                    state: state,
                },
            }">
                <button
                    class="px-4 py-2 w-[20vw] font-semibold font-mono bg-gray-500 rounded-full disabled:opacity-50 disabled:pointer-events-none"
                    :class="{ 'bg-green-500': selectedSeats.length >= numSeats }" @click="saveSelectedSeats"
                    :disabled="selectedSeats.length < numSeats">
                    {{ selectedSeats.length >= numSeats ? `Proceed to Pay - ₹${payment}` : 'Select Seats' }}
                </button>
            </router-link>
        </div>
    </div>
</template>
  

<script>
// import { provide } from 'vue';
export default {
    props: {
        date: {
            type: String,
            required: true,
        },
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
            selectedOption: '1',
            selectedSeats: [],
            numSeats: 1,
            seatOptions: [
                { value: '1', label: '1 Seat' },
                { value: '2', label: '2 Seats' },
                { value: '3', label: '3 Seats' },
                { value: '4', label: '4 Seats' },
                { value: '5', label: '5 Seats' },
                { value: '6', label: '6 Seats' },
            ],
            numberOfRows: 7,
            seatsPerRow: 7,
            prices: {
                gold: 200,
                panna: 250,
                ruby: 150,
            },
            payment: 0,
        };
    },
    watch: {
        selectedOption(newOption) {
            this.numSeats = parseInt(newOption);
        },
        selectedSeats: {
            handler() {
                this.calculatePayment();
            },
            deep: true,
        },
    },
    methods: {
        saveSelectedSeats() {
            localStorage.setItem('selectedSeats', JSON.stringify(this.selectedSeats));
        },
        calculatePayment() {
            this.payment = this.selectedSeats.reduce((total, seat) => {
                const seatClass = this.getSeatClassFromSeatId(seat);
                const seatPrice = this.getSeatPrice(seatClass);
                return total + seatPrice;
            }, 0);
        },
        getSeatPrice(seatClass) {
            const seatType = seatClass.split('-')[1];
            return this.prices[seatType];
        },
        getSeatClassFromSeatId(seatId) {
            const [side, row, seat] = seatId.split('-');
            return this.getSeatClass(side, row, seat);
        },
        updateSelectedSeats() {
            this.selectedSeats = [];

            const numSeats = parseInt(this.selectedOption);

            for (let row = 1; row <= this.numberOfRows; row++) {
                for (let seat = 1; seat <= this.seatsPerRow; seat++) {
                    const seatId = this.getSeatId('left', row, seat);
                    if (this.selectedSeats.length < numSeats && this.isSelectedSeat(seatId)) {
                        this.selectedSeats.push(seatId);
                    }
                }
            }

            console.log(this.selectedSeats);
        },
        isSelectedSeat(seatId) {
            return this.selectedSeats.includes(seatId);
        },
        toggleSeat(seatId) {
            const numSeats = parseInt(this.selectedOption);

            if (this.isSelectedSeat(seatId)) {
                this.selectedSeats = this.selectedSeats.filter((seat) => seat !== seatId);
            } else {
                if (this.selectedSeats.length < numSeats) {
                    this.selectedSeats.push(seatId);
                }
            }

            // Apply the style to the selected seat
            const seatElement = document.querySelector(`.seat[data-seat-id="${seatId}"]`);
            console.log(seatElement);
            if (seatElement) {
                const isSelected = this.isSelectedSeat(seatId);
                seatElement.classList.toggle('selected', isSelected);
                // seatElement.style.backgroundColor = isSelected ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)';

            }

            console.log(this.selectedSeats);
        },
        getSeatId(side, row, seat) {
            return `${side}-${row}-${seat}`;
        },
        isSeatDisabled(seatId) {
            const numSeats = parseInt(this.selectedOption);
            return this.selectedSeats.length >= numSeats && !this.isSelectedSeat(seatId);
        },
        getSeatClass(side, row, seat) {
            const seatId = this.getSeatId(side, row, seat);

            if (
                seatId === 'left-1-1' ||
                seatId === 'left-2-1' ||
                seatId === 'left-3-1' ||
                seatId === 'left-4-1' ||
                seatId === 'left-5-1' ||
                seatId === 'left-6-1' ||
                seatId === 'left-7-1' ||
                seatId === 'right-1-1' ||
                seatId === 'right-2-1' ||
                seatId === 'right-3-1' ||
                seatId === 'right-4-1' ||
                seatId === 'right-5-1' ||
                seatId === 'right-6-1' ||
                seatId === 'right-7-1'
            ) {
                return 'seat-gold';
            } else if (
                seatId === 'left-1-7' ||
                seatId === 'left-2-7' ||
                seatId === 'left-3-7' ||
                seatId === 'left-4-7' ||
                seatId === 'left-5-7' ||
                seatId === 'left-6-7' ||
                seatId === 'left-7-7' ||
                seatId === 'right-1-7' ||
                seatId === 'right-2-7' ||
                seatId === 'right-3-7' ||
                seatId === 'right-4-7' ||
                seatId === 'right-5-7' ||
                seatId === 'right-6-7' ||
                seatId === 'right-7-7'
            ) {
                return 'seat-panna';
            } else {
                return 'seat-ruby';
            }
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
    background: linear-gradient(to top, #761818, #B54041, #F3686A);
    margin-bottom: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.selected {
    background-color: green;
}

.seat:hover:before {
    content: "";
    position: absolute;
    z-index: 1000;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
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

.right .row-7 .seat {
    transform: skewX(-20deg);
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

.seat-gold {
    background: linear-gradient(to top, #FFD700, #B8860B);
}

.seat-panna {
    background: linear-gradient(to top, #00FF00, #008000);
}

.seat-ruby {
    background: linear-gradient(to top, #761818, #B54041, #F3686A);
}

.selected {
    background: linear-gradient(to top, #121067, #2b29a8, #4644cb);
}

.seat:not(.selected) {
    opacity: 1;
}
</style>




