<template>
  <div class="flash-section" @click="linkFlash">
      <div class="flash_section_title">
        <em class="em-ico flash-section-ico"></em>
        <span>
            {{isState==1?"Starting":isState==2?"Closing":""}} in <b>{{hrs>9?hrs:"0"+hrs}}</b> : <b>{{mins>9?mins:"0"+mins}}</b> : <b>{{secs>9?secs:"0"+secs}}</b>
        </span>
        <em class="em-ico flash-section-arrow"></em>
      </div>
      <div class="flash_section_con">
        <div class="flash_section_big_con clearfix" :style="'width:'+(3.3*goodList.length)+'rem'">
          <dl class="flash-section-good" v-for="item in goodList">
            <dt>
              <em class="em-ico" :style="'background-image:url('+item.goods_image+')'"></em>
            </dt>
            <dd>
              <p class="flash-section-price">{{currencyUnit}} {{item.flash_price.split('.')[0]}}</p>
              <p class="flash-section-oprice">{{currencyUnit}} {{item.goods_price.split('.')[0]}}</p>
            </dd>
          </dl>
          
        </div>
      </div>
  </div>
</template>

<script>
import {getFlashData} from '../../service/getData'
export default {
  data () {
    return {
      minusTime:0,
      nowStamp:0,
      isState:0,
      hrs:0,
      mins:0,
      secs:0,
      goodList:[],
      flashData:[],
      setTimeHandler:null,
    }
  },
  props:['flashList'],
  computed: {
    currencyUnit:function(){
      return this.$store.state.site.currency;
    },
  },
  watch:{
    minusTime:function(){
      var days=Math.floor(this.minusTime/(24*3600));
      this.hrs=Math.floor((this.minusTime/3600)-(days*24));
      this.mins=Math.floor((this.minusTime/60)-(days*24*60)-(this.hrs*60));
      this.secs=Math.floor(this.minusTime-(days*24*3600)-(this.hrs*3600)-(this.mins*60));
    }
  },
  mounted:function(){
    this.getData();
  },
  beforeDestroy:function(){
    if(this.setTimeHandler){
      clearInterval(this.setTimeHandler);
      this.setTimeHandler=null;
    }
  },
  methods:{
    getData:async function(){
      let res = await getFlashData();
      if(res.code == "200"){
        this.flashData=[...res.datas];
        this.nowStamp=res.datas[0].now_stamp;
        //初始数据 确定场次
       
        for(var i in this.flashData){
          if(i == 0){
            //所有场次未开始
            if(this.nowStamp<this.flashData[0].begin_stamp){
              this.goodList=this.flashData[0].goods_list;
              this.isState=1;
              this.minusTime=this.flashData[0].begin_stamp-this.nowStamp;
              break;
            }
          }
          //判断当前属于哪个场次
          if(this.nowStamp>=this.flashData[i].begin_stamp && this.nowStamp < this.flashData[i].end_stamp){
            this.goodList=this.flashData[i].goods_list;
            this.isState=2;
            this.minusTime=this.flashData[i].end_stamp-this.nowStamp;
            break;
          }
        }

        this.setTimer();
      }
    },
    linkFlash:function(){
      this.$router.push('/flashSale');
    },

    setTimer:function(){
      var that = this;
      //this.minusTime=10;
      this.setTimeHandler=setInterval(function(){
        //console.log(that.minusTime+"======"+this.setTimeHandler)
        if(that.minusTime>0){
          that.minusTime=that.minusTime-1;
        }else{
          clearInterval(that.setTimeHandler);
          that.setTimeHandler=null;
          that.getData();
        }
      }.bind(that),1000);
    }
  }
}
</script>
<style lang="less">
.flash-section{
    background-color: white;
    .flash_section_title{
        height: 0.56rem;
        padding: 0.28rem;
        border-bottom: 1px solid #ddd;
        .flash-section-ico{
          float: left;
          width: 2.78rem;
          height:  0.56rem;
          background-image: url(../../assets/images/flashSale/icon_home_flash_sale.png);
        }
        span{
          float: left;
          font-size: 0.36rem;
          margin-left: 0.56rem;
          b{
            font-weight: normal;
            display: inline-block;
            width: 0.6rem;
            height: 0.56rem;
            line-height: 0.56rem;
            background-color: #464545;
            color: white;
            text-align: center;
            font-size: 0.39rem;
          }
        }
        .flash-section-arrow{
          float: right;
          margin-top: 0.1rem;
          width: 0.42rem;
          height: 0.42rem;
          background-image:url(../../assets/index/right_arrow.png);
        }
    }
    .flash_section_con{
      width: 100%;
      margin:0.28rem 0;
      overflow-x: auto;
      overflow-y: hidden;
      height: 3.4rem;
      .flash_section_big_con{
        height: 3.4rem;
        width: 100rem;
        .flash-section-good{
          width: 3.3rem;
          text-align: center;
          float: left;
          dt{
            em{
              width: 2.22rem;
              height: 2.22rem;
            }
          }
          dd{
            .flash-section-price{
                font-size:0.39rem;
                color: #f87622;
            }
            .flash-section-oprice{
                font-size: 0.33rem;
                text-decoration: line-through;
            }
          }
        }
      }
      
    }
}


</style>
