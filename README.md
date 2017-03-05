# mFullPage

主要用于移动端

## 功能概述
可实现移动端的单页滚动效果，提供回调接口，和公开接口。

## 快速上手
### HTML

	<link rel="stylesheet" href="css/fullPage.css">
	<style>
        .page1{background: red;}
        .page2{background: blue;}
        .page3{background: pink;}
        .page4{background: firebrick;}
    </style>
	<div class="swiper-box">
        <div class="swiper-inner">
            <div class="page page1">1</div>
            <div class="page page2">2</div>
            <div class="page page3">3</div>
            <div class="page page4">4</div>
        </div>
    </div>
    <script src="js/fullPage.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded",function () {
            FullPage({
            ele:".swiper-inner",
            beforeChange:function (obj) {
                console.log(obj)
            },
            afterChange:function (obj) {
                console.log('after')
            }
          });
    
        })
    </script>


