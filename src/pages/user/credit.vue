<template lang="html">
<div class="credit-page">
  <div class="credit-canvas">
    <canvas id="canvas"  >
      <p>Sorry your broswer canvas</p>
    </canvas>
  </div>

  <div class='refresh-bar' >
    <span class='refresh-button' @click="refresh" >Refresh</span>
  </div>

  <article class="credit-instruction">
    <section>
      <h1>About Credit</h1>
      <p>Credit may not update instantly，you could push the How to increase Kilimall Credit. Besides, we have more rules. may not update instantly.</p>
    </section>
    <section  class="detail-table">
      <table>
        <thead>
          <tr>
           <th>Items</th>
           <th>Points Accumulated</th>
           <th>Points Limit</th>
         </tr>
        </thead>
        <tbody>
          <tr v-for="item in items">
           <td>{{item.title}}</td>
           <td>{{item.point}}</th>
           <td>{{item.limit}}</td>
         </tr>
        </tbody>
      </table>
    </section>
  </article>
</div>
</template>
<style lang="less" scoped >
.credit-instruction {margin-top: .3rem;}
section{
  h1 { font-size: .4rem;color: #000;margin-bottom: .3rem;}
  p {font-size: .32rem;}
  background: #fff;
  padding:.5rem;
  table{
    border:1px solid #dddfe4;
    thead{
      background-color:#f9fafc;
      th{
        padding:.2rem;
        text-align: left;
        border-left:1px solid #dddfe4;
        border-bottom:1px solid #dddfe4;
        &:first-of-type{width:4rem;border-left: none;}
        &:nth-of-type(2){width: 3rem;}
        }
    }
    tr{
      height: 1.2rem;
      td{
        border-left:1px solid #dddfe4;
        border-bottom:1px solid #dddfe4;
        padding:.2rem;
        text-align: left;
      }
    }
  }


}
html,body,#app,.credit-canvas,.refresh-bar {background-color: #fff;}
.credit-page {background-color: #eee;}
.refresh-bar {
  display: block;
  width: 100%;
  text-align: center;
  margin-top: -1px;
  padding:.36rem 0;
}
.refresh-button {  margin: auto;
  display: inline-block;
  font-size: .5rem;
  padding: .15rem .25rem;
  text-align: center;
  border: .03rem solid #000;}


</style>
<script>

import {getCreditInfo} from "../../service/getData";
export default {
  data:function(){
    return {
      fastclick:false,
      items:[
        {title:"Duration of Registration ",point:"+5/month",limit:50},
        {title:"Completed order",point:"+5/order",limit:500},
        {title:"Sum of Completed order",point:"+10/1000Ksh",limit:500},
        {title:"Valid Review",point:"+2/review",limit:50},
        {title:"Daily Sign-in",point:"+2/10 times",limit:50},
        {title:"Cancellation of paid order (Record as customer reason）",point:"-10/order",limit:"No limit"},
        {title:"Return product of order（No reason）",point:"-10/order",limit:"No limit"},
        {title:"Inviting new user（Download App and verify phone number）",point:"+2/person",limit:100},
        {title:"New invited user completes order（ Download App and verify phone number ）",point:"+10/person",limit:100}
      ],
      creditText : "Improvable",
      creditColor : "#ff4900",
      creditPoint : 0,
      creditLevel :0,
      percent : 0 // 最终百分比

    }
  },
  methods:{

    fresh(){
      var that = this;
      // 画圆
      var  clientWidth = document.documentElement.clientWidth;
      console.log(window);
      var  rem  =  clientWidth/20;
      //根据设计图中的canvas画布的占比进行设置
      var canvasWidth = clientWidth;
      console.log(clientWidth);
      var process = 0; // 进度

      canvas.setAttribute('width',canvasWidth+'px');
      canvas.setAttribute('height',canvasWidth/1.4+'px');

      var ctx = canvas.getContext("2d"),
          circleX = canvas.width / 2, // 中心x坐标
          circleY = canvas.height / 1.6,
          radius = clientWidth/4, // 圆环半径
          lineWidth = clientWidth/25, // 圆形线条的宽度
          fontSize = clientWidth/12, // 字体大小
          percent = this.percent;// 最终百分比

      var creditText = this.creditText;
      var creditColor = this.creditColor;
      var creditPoint = this.creditPoint;
      ctx.fillStyle = '#fff';
      var circleStart = 12.0 ;//degree
      var circleEnd   = 88.0 ;
      var circleLoading = window.setInterval(function () {
        loading();
        that.fastclick = true;
      }, 20);


      function circleLine(cx, cy, r,startAngle, endAngle,i) {
          ctx.moveTo(cx + r, cy);
          ctx.beginPath();
          ctx.lineWidth = 2;
          if(i%2){
            ctx.strokeStyle = "#fff";
          }else{
            ctx.strokeStyle = "#DDE0E4";
          }
          ctx.arc(cx, cy, r/1.15 ,startAngle * (Math.PI / 180.0)+(Math.PI / 2),
          endAngle * (Math.PI / 180.0)+(Math.PI / 2));
          ctx.stroke();
      }
      function circleBackground(cx, cy, r,startAngle, endAngle) {
          ctx.moveTo(cx + r, cy);
          ctx.beginPath();
          ctx.lineWidth = lineWidth;
          ctx.strokeStyle = '#eee';
          ctx.arc(cx, cy, r ,startAngle * (Math.PI / 180.0)+(Math.PI / 2),
          endAngle * (Math.PI / 180.0)+(Math.PI / 2));
          ctx.stroke();
      }
      function sector(cx, cy, r, startAngle, endAngle) {
          ctx.moveTo(cx, cy + r); // 移动画笔
          ctx.beginPath();        // 开始画圆
          ctx.lineWidth = lineWidth;
          var lineColor = creditColor;
          ctx.strokeStyle = lineColor;
          // 圆弧两端的样式
          ctx.lineCap = 'round';
          // 圆弧
          ctx.arc(
              cx, cy, r,
              startAngle * (Math.PI / 180.0) +  (Math.PI / 2) ,
              endAngle * (Math.PI / 180.0) + (Math.PI / 2)
          );
          ctx.stroke();
      }

      function texts(){
        var fontAmplify = 2.7
        if(creditPoint/1000.0>1){
         fontAmplify = 2.1
        }else{
         fontAmplify = 2.7
        }
        ctx.font = 'Bold '+  fontSize*fontAmplify + 'px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = creditColor;
        ctx.fillText(creditPoint, circleX, circleY);
        ctx.font = fontSize/2 + 'px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#666';
        ctx.fillText('My credit', circleX, circleY-rem*2.7);

        var f =  fontSize/2;
        ctx.font =  'Bold '+ f*1.2 + 'px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'baseline';
        ctx.fillStyle = creditColor;
        var lt = creditText.length;
        var xamp =0;
        lt>7?xamp=3.0:xamp=2.0
        ctx.fillRect(circleX-f*lt/xamp, circleY-f/1.15+rem*3.2, f*lt/xamp*2, f/0.6);
        ctx.fillStyle = '#fff';
        ctx.fillText(creditText, circleX, circleY+rem*3.2);

      }
      function loading() {
          if (process >= percent) {
              clearInterval(circleLoading);
              setTimeout(function(){that.fastclick = false;},20)
          }
          // 清除canvas内容
          ctx.clearRect(0, 0, circleX * 2, circleY * 2);
          // 圆形
          var inter = (circleEnd - circleStart)/41;
          for(var i = 0 ;i<41;i++){
            var start = circleStart+inter*i
            circleLine(circleX, circleY, radius,start/100*360,(start+inter)/100*360,i);
          }
          circleBackground(circleX, circleY, radius,circleStart/100*360,circleEnd/100*360)
          // 圆弧

        // 控制结束时动画的速度
    if (process / percent > 0.95) {
              process += 0.25;
          } else if (process / percent > 0.85) {
              process += 0.4;
          } else if (process / percent > 0.75) {
              process += 0.6;
          } else if (process / percent > 0.6) {
              process += 0.8;
          } else if (process / percent > 0.45) {
              process += 1.0;
          } else {
              process += 1.2;
          }
          var endOfSector = (circleEnd-circleStart)/100 *process+circleStart;
          sector(circleX, circleY, radius, circleStart/100*360, endOfSector/100*360);
          // 中间的字
          texts()

      }//end of drawing

    },
    refresh(){
      if(!this.fastclick){
        this.fresh();
        this.fastclick = false;
      }
      this.fastclick = false;
    },
    /*
    #ff4900 improvable
    #ff9500 poor
    #f9e800 normal
    #00f60a good
    #00da90 excellent
    */
    async initPage(){
      var level = {
        1:{label:"Improvable",color:"#ff4900"},
        2:{label:"Poor",color:"#ff9500"},
        3:{label:"Normal",color:"#f9e800"},
        4:{label:"Good",color:"#00f60a"},
        5:{label:"Excellent",color:"#00da90"}
      }
      var that = this;
      function getQueryStringKey(e){
        var url = ""+that.$route.fullPath;
        var a = url.match(/app_key=(\w*)(&?)/);
        if (a != null) return a[1];
        return ""
      }
      var paras = {};

      paras.key = getQueryStringKey("app_key") || common.getCookie("key");
      if(!paras.key){
        common.setCookie("redirect_url",this.$route.fullPath)
        this.$router.push("/login");
      }
      var res = await getCreditInfo(paras);
      canvas.style.opacity=1;
      if(res.code == 200 && res.datas.credit){
        this.creditLevel = res.datas.level
        this.creditText = level[this.creditLevel].label
        this.creditColor = level[this.creditLevel].color
        this.creditPoint = res.datas.credit
        var po = parseFloat(this.creditPoint)
        this.percent = po/(po+1e5/po) * 100;
      }else if(res.code == 444){
        common.setCookie("redirect_url",this.$route.fullPath)
        this.$router.push("/login");
      }
    },
  },
  watch:{
    creditPoint:function(){
      this.fresh();
    }
  },
  mounted(){
    this.initPage();
    var canvas = document.getElementById("canvas")
    canvas.style.opacity=0;
    this.fresh();
  }
}
</script>
