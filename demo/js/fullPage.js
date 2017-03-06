/**
 * Created by Administrator on 2017/3/5.
 */
(function (doc,window) {
    function FullPage(opt) {
        return new F(opt);
    }

    function F(opt) {
        this.ele=doc.querySelector(opt.ele);//页面容器
        this.page=doc.querySelectorAll('.page');//页面元素
        this.pageLen=this.page.length;
        this.beforeChange=opt.beforeChange;//切换页面前
        this.afterChange=opt.afterChange;//切换页面后
        this.h=doc.documentElement.clientHeight;//可视高度
        this.distance=20;//距离
        this.moveY=0;//滑动距离
        this.index=0;//默认下标
        this.initData();
        this.initEvent();
    }
    F.prototype={
        constructor:F,
        initData:function () {
            var pages=Array.prototype.slice.call(this.page);
            pages[this.index].classList.add("active");
            this.slide(-this.index*this.h);
            for (var i=0;i<pages.length;i++){
                pages[i].index=i;//设置页面下标
                pages[i].style.height=this.h+'px';
            }

        },
        update:function () {
            this.h=doc.documentElement.clientHeight;//可视高度
            this.initData();
        },
        initEvent:function () {
            var startY,//开始Y坐标
                endY;//结束Y坐标
            this.ele.addEventListener('touchstart',function (e) {
                e.preventDefault();//为了兼容android touchmove、touchend
                startY = e.changedTouches[0].pageY;
            }.bind(this));
//                this.ele.addEventListener('touchmove',function (e) {});
            this.ele.addEventListener('touchend',function (event) {
                endY = event.changedTouches[0].pageY;
                this.moveY=endY-startY;
                this.calculateIndex(this.direction());
                this.beforeChange(this);
                this.slide(-this.index*this.h);
                this.afterChange(this);
            }.bind(this));
            window.addEventListener('resize', function() {
                this.update();
            }.bind(this));


        },
        /**
         * 方向
         * @return 0:上 1：下
         * */
        direction:function () {
            if(this.moveY>0&&this.moveY>this.distance){
                return "0";
            }else if(this.moveY<0&&Math.abs(this.moveY)>this.distance){
                return "1";
            }
        },
        /**
         * 计算下标
         * @param dir 方向
         * @return index 下标
         */
        calculateIndex:function (dir) {
            if(dir=="0"){//上
                if(this.index-1 >= 0){
                    this.index--;
                }
            }else if(dir=="1"){//下
                if(this.index+1 < this.pageLen){
                    this.index++;
                }
            }
        },
        /**
         * 滑动
         * @param yPx 滑动距离
         */
        slide:function (yPx) {
            this.ele.querySelector(".active").classList.remove("active");
            this.page[this.index].classList.add("active");
            this.ele.style.webkitTransform='translate3d(0px, ' + yPx + 'px, 0px)';
            this.ele.style.transform='translate3d(0px, ' + yPx + 'px, 0px)';
        },


    }

    window.FullPage=FullPage;

})(document,window);