<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class=" h-screen bg-slate-800 flex gap-20 flex-col">
        <div class="relative flex justify-center">
        <div class="m-72 absolute z-1000 bg-red-200 h-[20vh] w-[40vw] rounded-xl border border-black hover:shadow shadow-xl shadow-red-100 flex justify-center items-center">
            <p class="font-sans text-2xl font-bold">All eyes here, please!</p></div>
        </div>
        <div class="theatre scale-105 bg-slate-900">


            <div class="cinema-seats left">
                <div class="cinema-row row-1">
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                </div>

                <div class="cinema-row row-2">
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                </div>

                <div class="cinema-row row-3">
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                </div>

                <div class="cinema-row row-4">
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                </div>

                <div class="cinema-row row-5">
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                </div>

                <div class="cinema-row row-6">
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                </div>

                <div class="cinema-row row-7">
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                </div>
            </div>


            <div class="cinema-seats right">
                <div class="cinema-row row-1">
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                </div>

                <div class="cinema-row row-2">
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                </div>

                <div class="cinema-row row-3">
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                </div>

                <div class="cinema-row row-4">
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                </div>

                <div class="cinema-row row-5">
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                </div>

                <div class="cinema-row row-6">
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                </div>

                <div class="cinema-row row-7">
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                    <div class="seat"></div>
                </div>
            </div>

        </div>
    </div>
</template>
  
  
<script>
export default {
    props: ['theater', 'movie'],
    data() {
        return {
            seats: [
                { id: 1, active: false },
                { id: 2, active: false },
                { id: 3, active: false },
                { id: 4, active: false },
                { id: 5, active: false },
                { id: 6, active: false },
                { id: 7, active: false },
                { id: 8, active: false },
                { id: 9, active: false },
                { id: 10, active: false },
                { id: 11, active: false },
                { id: 12, active: false },
                { id: 13, active: false },
                { id: 14, active: false },
                { id: 15, active: false },
                { id: 16, active: false },
                { id: 17, active: false },
                { id: 18, active: false },
                { id: 19, active: false },
                { id: 20, active: false },
                { id: 21, active: false },
                { id: 22, active: false },
                { id: 23, active: false },
                { id: 24, active: false },
                { id: 25, active: false },
                { id: 26, active: false },
                { id: 27, active: false },
                { id: 28, active: false },
                { id: 29, active: false },
                { id: 30, active: false },
                { id: 31, active: false },
                { id: 32, active: false },
                { id: 33, active: false },
                { id: 34, active: false },
                { id: 35, active: false },
                { id: 36, active: false },
                { id: 37, active: false },
                { id: 38, active: false },
                { id: 39, active: false },
                { id: 40, active: false },
                { id: 41, active: false },
                { id: 42, active: false },
                { id: 43, active: false },
                { id: 44, active: false },
                { id: 45, active: false },
                { id: 46, active: false },
                { id: 47, active: false },
                { id: 48, active: false },
                { id: 49, active: false },
                { id: 50, active: false },
                { id: 51, active: false },
                { id: 52, active: false },
                { id: 53, active: false },
                { id: 54, active: false },
                { id: 55, active: false },
                { id: 56, active: false },
                { id: 57, active: false },
                { id: 58, active: false },
                { id: 59, active: false },
                { id: 60, active: false },
                { id: 61, active: false },
                { id: 62, active: false },
                { id: 63, active: false },
            ],
        };
    },
    methods: {
        toggleSeat(id) {
            this.seats = this.seats.map((seat) => {
                if (seat.id === id) {
                    return { ...seat, active: !seat.active };
                } else {
                    return seat;
                }
            });
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

.seat.active {
    background: rgba(255, 255, 255, 0.6);
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

.right .row-7 .seat {
    transform: skewX(-20deg);
}
</style>


