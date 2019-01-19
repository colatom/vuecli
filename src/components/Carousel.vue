<template>
    <div>
        <div id="carouselmhw" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselmhw" data-slide-to="0" class="active"></li>
                <li data-target="#carouselmhw" data-slide-to="1"></li>
                <li data-target="#carouselmhw" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img class="d-block w-100" src="https://storage.googleapis.com/vue-course-api.appspot.com/colatom%2F1547694952902.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=BgMa6QMHcIukZak2VI1PXo7hm%2BnXpLI8FZT8M7%2F87kYJuYdYMAywFYpEYwUyCjCbql1HqbCgNGUca1Dyw5s5S5MQkod6xOD%2Bc1SuEUSz%2FqMk3iBZ0%2BQna6rF8VD%2Bey3Av2NdhenrbfFKuOMZTnosuBLDpVaJyTXAa%2FJlHcLWuPAKF8%2BRIOT6TOCAomGvP2BX%2F%2Fhz7FOUAK5kF6EIHkZW%2BKpMuHPbiYMiYeuF7qTdlx76IUQqgv1NYFh3uyyOmBRmpUjw%2Bi5YDdRH%2B2MyU1ksFfHucWDnl0rub0moWH%2B8O879QVwBJDKwHwqOvmX3H9yeHtW9sk5SQDOXmZIK6q1mtA%3D%3D" alt="First slide">
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src="https://storage.googleapis.com/vue-course-api.appspot.com/colatom%2F1547694968845.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=UGKiA%2FC83iSNLtyzC8YFq4OLAy%2BnH%2Bo0eIDmcTpn82juTG2rtOceYX9LOP1RrMt2OZhDCDSoEwqHhJuK3JgTYItcTcqh2TaKxwJWq0%2F9Q6V3KebcN%2BFLnER7F%2B5tTcP4RyQ211qEvVK0T893TblmYt5VJ5eA9vEDKNCz8ia3Y%2BFWyNsUmhTs3M0ULVmMZZ%2FSrTCj1nrWtXgfRpLH%2FO41Jp2te%2Bid%2FFTl1KQt0JejIiXoA%2FKN8AirmGEfXKi0BLEsCHU8z54mytKWS%2B%2BcX22psPrspxc8EfP%2BRUU4%2BN%2FTeCsl8G2tP2BnyB%2BWu5mFUnXz9ZXLCLBRsds83Nf08%2Fs%2B1w%3D%3D" alt="Second slide">
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src="https://storage.googleapis.com/vue-course-api.appspot.com/colatom%2F1547694985680.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=JE3jWF77sABV34rTeBCrwrs8izj816GOWx913ic41t7%2FX8H9wbn%2F87RiSyM7HSnCh9RBUpRLaMBJUsICJXmKnYRTz9A4jfTu0%2FlqaQTUfHmMPF1bV45yo6KqVY13M1sCVP7M3S%2B%2F4T6zvRXuMTN0J19jAcRWSFb0Xq6Y6gjMUQ0c2uL5sDXwObJzZ2BZjiciStxiLT0XQ8daiNsAt5a2Oj1maPUtKnLj9tqJub019ncYC0Avg77zvlNjhcHRUBFwBqjE2PyvkST66LC4GJUYiARSiGSBFSThmocEt8IDTTCgEKs2QKE9coRWl7XBW5obYy72TcZRzbCUn%2BL9HWmLPA%3D%3D" alt="Third slide">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselmhw" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselmhw" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
            </div>
    </div>
</template>

<script>
import $ from 'jquery'

export default {
    created(){
        $('#carouselmhw').carousel({
            interval: 200
        })
    }
}
</script>