<script>
   // import { ref } from 'vue'

    const searchValue = "";
    // eslint-disable-next-line no-unused-vars
    function Search() {
        // GET request using fetch with error handling
        fetch("http://hn.algolia.com/api/v1/search?query=" + searchValue)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                this.totalVuePackages = data.total;
                console.log(data);
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("There was an error!", error);
            });
    }

</script>





<template>
    <nav>
        <router-link to="/">Search</router-link> |
        <router-link to="/history">History</router-link>
    </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
