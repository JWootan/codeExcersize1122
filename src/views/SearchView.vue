<script setup>
    //Used to hold search history.  Sessionstorage would remain on refresh, but isn't good for sensitive data (and I wanted to demonstrate state management)
    import { hist } from '../main.js'

    import { ref } from 'vue'

    // var we'll get the response in, and var we'll pass the array to
    var data;
    const table = ref([]);

    
    var searchValue = '';


     //vars for page control, data needs to exist before the page can load, and others will direct going to the next or previous pages
    const dataExist = ref(false);
    const pageNav = ref("0");
    const first = ref(true);
    const last = ref(false);


    //function to update history
    function history() {
        searchValue = document.getElementById("searchHistory").value;
        hist.value.push(searchValue);
    }

    //function to call api
    function Search(page) {


        if (page == 0) {
            first.value = true;
        }
        else {
            first.value = false;
        }

        pageNav.value = page;
        searchValue = document.getElementById("searchHistory").value;
        // GET request using fetch with error handling
        fetch("http://hn.algolia.com/api/v1/search?query=" + searchValue + "&page=" + page)
            .then(async response => {
                data = await response.json();
               table.value = data.hits
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

               
                 
                
              

               
               
                dataExist.value = true;
               
                if (page == data.nbPages) {
                    last.value = true;
                }
                else {
                    last.value = false;
                }

            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
    }
   </script> 
   

<template>
    <div class="home">
       
        <input id="searchHistory"/>
        <button @click ='Search(0); history();'>Search</button>

        <div class="content" v-if="dataExist">
            <table class="format">
                <tr>
                    <th class="columns">
                        Title
                    </th>
                    <th class="columns">
                        Author
                    </th>
                    <th class="columns">
                        Url
                    </th>
                    <th class="columns">
                        Date
                    </th>
                </tr>
                <tr class="row" v-for="items in table" :key="items.objectID">
                    <td class="title columns">
                        {{items.title}}
                    </td>
                    <td class="author columns">
                        {{items.author}}
                    </td>
                    <td class="url columns">
                        {{items.url}}
                    </td>
                    <td class="date columns">
                        {{items.created_at}}
                    </td>
                </tr>
            </table>
            <button @click="Search(pageNav - 1)" v-if="!first">Prev</button>
            <button @click="Search(pageNav + 1)" v-if="!last">Next</button>
        </div>

    </div>
</template>

<style>
    .format{
        margin-left: auto;
        margin-right:auto;
    }
   .column{
       width:25%;
   }

</style>

