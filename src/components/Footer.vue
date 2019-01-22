<template>
    <div class="footer-color p-1 mt-3">
        <div class="container">
            <div class="row mt-5 ">
                <div class="col-md-6 footer-text">
                    <h5>© Copyright 2019</h5>
                </div>
                <div class="col-md-6 footer-link">
                    <a href="" class="d-inline-block"><h5><i class="fab fa-instagram"></i>Instagram</h5></a>
                    <a href="" class="d-inline-block"><h5><i class="fab fa-facebook"></i>Facebook</h5></a>
                </div>
            </div>
            <div class="text-center mt-3 mb-5">
                <h6>Made with Bootstrap4 測試製作，無任何商業用途</h6>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$light-blue:#66FFFF;

.footer-color{
    background: $light-blue;
}
.footer-text{
    text-align: right;
}
.footer-link{
    text-align: left;
}
@media screen and (max-width: 768px){
    .footer-text{
        text-align: center;
    }
    .footer-link{
        text-align: center;
    }
}
</style>
