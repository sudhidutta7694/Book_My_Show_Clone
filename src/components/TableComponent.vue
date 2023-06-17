<template>
    <div class="table rounded-xlṭ">
      <div class="table-row bg-slate-900">
        <div class="table-cell red-text capitalize font-bold text-center" v-for="(value, field) in bookingData" :key="field">
          {{ field }}
        </div>
      </div>
      <div class="table-row bg-slate-900">
        <div class="table-cell" v-for="(value, field) in bookingData" :key="field">
          <div v-if="field === 'theater'">
            <div class="table-row">
              <div class="table-cell subfield capitalize font-bold text-center" v-for="(subValue, subField) in value" :key="subField">
                {{ subField }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-row">
        <div class="table-cell" v-for="(value, field) in bookingData" :key="field">
          <div v-if="field === 'theater'">
            <div class="table-row">
              <div class="table-cell subvalue " v-for="(subValue, subField) in value" :key="subField">
                {{ subValue }}
              </div>
            </div>
          </div>
          <div v-else>
            {{ value }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style>
  .table {
    display: table;
    width: 100%;
    border-collapse: collapse;
    background-color: #374151;
    border-radius: 20px 20px;
    border: none;
  }
  
  .table-row {
    display: table-row;
  }
  
  .table-cell {
    display: table-cell;
    text-align: center;
    padding: 8px;
    color: #d1d5db;
  }
  
  .red-text {
    color: #e68585;
  }
  
  .capitalize {
    text-transform: capitalize;
  }
  
  .font-bold {
    font-weight: bold;
  }
  
  .subfield {
    color: #e68585;
  }
  
  .subvalue {
    color: #d1d5db;
  }
  
  .bg-slate-900 {
    background-color: #131820;
  }
  
  .text-red-200 {
    color: #f87171;
  }
  </style>
  
  <script>
  export default {
    props: {
      bookingData: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  