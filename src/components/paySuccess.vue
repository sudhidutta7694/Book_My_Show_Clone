<template>
    <div class="mt-[-55vh] bg-slate-800 p-6 md:p-12">
        <div>
            <router-link to="/bookings" class="relative flex justify-center item-center">
                <button id="bookingButton" @click="storeBookingData" :class="{ 'disabled-button': isButtonDisabled }"
                    :disabled="isButtonDisabled"
                    class="bg-red-600 absolute  z-10000 h-16 w-64 mt-[70vh] text-lg font-sans shadow-xl rounded-lg font-semibold text-white p-4 hover:bg-red-700">
                    Continue to Bookings
                </button>
            </router-link>
        </div>
        <div class="container h-screen">
            <div class="m-4 md:m-96 printer-top"></div>

            <div class="paper-container">
                <div class="printer-bottom"></div>

                <div class="paper">
                    <div class="main-contents flex flex-col justify-center items-center">
                        <div class="success-icon">&#10004;</div>
                        <div class="success-title">
                            Payment of ₹{{ payment }} Complete
                        </div>
                        <div class="success-description">
                            Hurray! You have successfully booked {{ seatLength }} seat
                            <span v-if="seatLength !== 1">s</span> of {{ movie }} (language:
                            {{ language }}) in {{ theater.name }}, {{ city }}
                            <br />Be ready to enjoy the movie at {{ theater.timing }} on
                            {{ theater.day }}
                        </div>
                        <div class="order-details">
                            <div class="order-number-label">Token no.</div>
                            <div class="order-number">{{ token }}</div>
                        </div>
                        <div class="order-footer">Thank you!</div>
                    </div>
                    <div class="jagged-edge"></div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

import swal from 'sweetalert2';
// import { db } from '@/firebase'
// import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';

export default {
    props: {
        date: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        seatLength: {
            type: Number,
            required: true,
        },
        theater: {
            type: Object,
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
            isButtonDisabled: true,
            bookingData: {
                token: '',
                cardNumber: 0,
                payment: 0,
                seatLength: 0,
                theater: {},
                movie: '',
                language: '',
                city: '',
                state: '',
            },
        };
    },
    methods: {
        async storeBookingData() {
            const user = JSON.parse(localStorage.getItem('user')).uid;
            // const payment = JSON.parse(localStorage.getItem('payment'));
            const db = getFirestore(); // Access the Firestore instance

            if (user) {
                console.log(this.theater.type);
                // Construct the booking data object
                const bookingData = {
                    token: this.token,
                    cardNumber: JSON.parse(localStorage.getItem('cardNumber')),
                    payment: 1.18 * JSON.parse(localStorage.getItem('payment')),
                    date: this.date,
                    seatLength: this.seatLength,
                    theater: this.theater.type === undefined ? JSON.parse(this.theater) : this.theater,
                    movie: this.movie,
                    language: this.language,
                    city: this.city,
                    state: this.state,
                    seats: JSON.parse(localStorage.getItem('selectedSeats'))
                };

                try {
                    // Create a userBookingData document within a collection named after the user's ID
                    const userBookingCollectionRef = collection(db, `Bookings/${user}/userBookingData`);
                    const userBookingDocRef = doc(userBookingCollectionRef);

                    const userBookingDocSnapshot = await getDoc(userBookingDocRef);
                    if (userBookingDocSnapshot.exists()) {
                        // Document already exists
                        // ...
                    } else {
                        // Document doesn't exist, create it
                        await setDoc(userBookingDocRef, bookingData);
                        // ...
                    }

                    console.log('Booking data saved successfully!');
                } catch (error) {
                    swal.fire({
                        title: 'Error saving booking data',
                        html: `<p>${error}</p>`,
                        icon: 'error',
                    });
                }
            } else {
                // User is not logged in, prompt them to log in
                swal.fire({
                    title: 'User is not logged in',
                    html: 'Please log in to store the booking data.',
                    icon: 'warning'
                });
            }


        }

    },
    mounted() {
        setTimeout(() => {
            this.isButtonDisabled = false;
        }, 3000);
    },
};
</script>
  
<style scoped>
.container {
    width: fit-content;
    margin: 30px auto;
}

.printer-top {
    z-index: 1;
    border: 12px solid #666666;
    height: 12px;
    border-bottom: 0;
    border-radius: 6px 6px 0 0;
    background: #333333;
}

.printer-bottom {
    width: 100%;
    z-index: 0;
    border: 12px solid #666666;
    height: 12px;
    border-top: 0;
    border-radius: 0 0 6px 6px;
    background: #333333;
}

.paper-container {
    position: relative;
    overflow: hidden;
    height: 467px;
}

.paper {
    background: #ffffff;
    height: 447px;
    position: absolute;
    z-index: 2;
    margin: 0 12px;
    margin-top: -12px;
    animation: print 3000ms cubic-bezier(0.68, -0.55, 0.265, 0.9) 1;
}

.main-contents {
    margin: 0 12px;
    padding: 24px;
}

.jagged-edge {
    position: absolute;
    background: rgb(30, 41, 59);
    height: 20px;
    width: 100%;
    bottom: 0;
}

.jagged-edge:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(45deg, transparent 33.333%, #ffffff 33.333%, #ffffff 66.667%, transparent 66.667%),
        linear-gradient(-45deg, transparent 33.333%, #ffffff 33.333%, #ffffff 66.667%, transparent 66.667%);
    background-size: 16px 40px;
    background-position: 0 -20px;
}

.success-icon {
    text-align: center;
    font-size: 48px;
    height: 72px;
    background: #359d00;
    border-radius: 50%;
    width: 72px;
    height: 72px;
    margin: 16px auto;
    color: #fff;
}

.success-title {
    font-size: 24px;
    text-align: center;
    color: #666;
    font-weight: bold;
    margin-bottom: 16px;
}

.success-description {
    font-size: 16px;
    line-height: 21px;
    color: #848383;
    text-align: center;
    margin-bottom: 24px;
}

.order-details {
    text-align: center;
    color: #333;
    font-weight: bold;
}

.order-number-label {
    font-size: 18px;
    margin-bottom: 8px;
}

.order-number {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    line-height: 48px;
    font-size: 48px;
    padding: 8px 0;
    margin-bottom: 24px;
}

.order-footer {
    text-align: center;
    line-height: 18px;
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: bold;
    color: #999;
}

.disabled-button {
    color: black;
    background-color: #999999;
    cursor: not-allowed;
}

@keyframes print {
    0% {
        transform: translateY(-90%);
    }

    100% {
        transform: translateY(0%);
    }
}
</style>
  