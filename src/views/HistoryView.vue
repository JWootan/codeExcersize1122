


<template>
    <div class="home">
        <li v-for="item in history" :key="item">
             {{ item}}
        </li>


    </div>
</template>

<script>

     // eslint-disable-next-line no-unused-vars
    import { hist } from '../main.js'
    
 
export default {
  name: 'HistoryView',
        data() {
            return {
                history: hist
            };
        }

            
        

}</script>
