<template lang="html">
  <div class="search-filter" >
    <ul class="filter-items" :style="isAndroid?'margin-top:0':''">
        <li v-for="item in sort_Item" class="item" >
          <a href="javascript:void(0);" :id="item.id"  @click="selectFilter(item.index)">{{item.default}}<i></i></a>
        </li>
    </ul>
  <div class="browse-mode" v-show="filterListShow" :style="isAndroid?'top:1.5rem':''">

    <div class="belong-list" :class="selectedList==0?'selected':'hide'" >
      <ul class="downdrop-list">
        <li v-for="(belong,index) in belong_list" @click="select(index,belong.index)" :class="{active:index==belongActive}">{{ belong.name }}<i></i></li>
      </ul>
    </div>

    <div class="key-sort" :class="selectedList==1?'selected':'hide'">
      <ul class="downdrop-list">
        <li v-for="(order,index) in key_sort" @click="select(index,order.index)" :class="{active:index==sortActive}">{{ order.name }}<i></i></li>
      </ul>
    </div>


  </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getSearchFilterAttr} from '../../service/getData'

// var disableScroll = function(){
//  var scrollList = document.querySelector(".goods-list");
//  if(scrollList){

//  scrollList.style.overflow = "hidden";
//  }
//  // var attriFilter  = document.querySelector(".attri-filter .attri-ul")
//  // attriFilter.style.overflow="scroll"
// };

// var enableScroll = function(){
//   var scrollList = document.querySelector(".goods-list");
//   if(scrollList){
//     scrollList.style.overflow = "initial";
//   }
// };

export default {
  props:['sortItem','filterParams'],
  computed: {
    ...mapState([
       'searchRecommands','searchList','site','isAndroid'
    ])
  },
  data(){
    return({
      sort_Item:this.sortItem,
      filterListShow:false,
      selectedList:0,
      belongActive:0,
      sortActive:0,
      searchWordInto:this.$route.params.searchItem,
      belong_list:[
        {name:"All",index:"l0",},
        {name:"Shipped by Kilimall",index:"l1",},
        {name:"Shipped from overseas",index:"l2"},
        {name:"Shipped by local seller",index:"l3"},
      ],
      key_sort:[
        {name:"Popularity",index:"k0",},
        {name:"Price from high to low",index:"k1"},
        {name:"Price form low to high",index:"k2",},
        {name:"Sales form high to low",index:"k3",}
      ],
      params:{},

    })
  },
  watch:{
    $route(){
        if(this.$route.params.searchItem!=undefined){
            this.params.keyword = this.$route.params.searchItem;
            this.$emit('filterChange',this.params);
        }
    },
    filterParams(){
        this.params.price_from = this.filterParams.lowestPrice;
        this.params.price_to = this.filterParams.highestPrice;
        this.$emit('filterChange',this.params);
        
    }
  },
  created(){

    if(this.$route.query.b_id){
        this.params.b_id = this.$route.query.b_id;
    }
    this.params.key=0;
    this.params.order=0;
    this.params.logisticsType=null;
    this.params.keyword = this.searchWordInto;
    this.$emit('filterChange',this.params);

  },
  methods:{
    closeFilter:function(){
      this.filterListShow = false;
    },
    selectFilter:function(i){
      if(this.selectedList == i){
        this.selectedList = i;
        this.filterListShow = !(this.filterListShow);
      }else{
        this.selectedList = i;
        this.filterListShow = true;
      }

      if(i==2){
        this.$emit('OpenFilter');
      }
    },
    select(activeIndex,index) {
        // this.sort_Item[0].default = event.target.innerHTML;
        let obj = {}
        switch (index){
            case "l0":
            this.belongActive=activeIndex;
            // this.params.key = 0;
            // this.params.order = 0;
            this.params.logisticsType=null
            break;
            case "l1":
            this.belongActive=activeIndex;
            // this.params.key = 0;
            // this.params.order = 0;
            this.params.logisticsType=1
            break;
            case "l2":
            this.belongActive=activeIndex;
            // this.params.key = 0;
            // this.params.order = 0;
            this.params.logisticsType=2
            break;
            case "l3":
            this.belongActive=activeIndex;
            // this.params.key = 0;
            // this.params.order = 0;
            this.params.logisticsType=3;
            break;
            case "k0":
            this.sortActive=activeIndex;
            this.params.key = 0;
            this.params.order = 0;
            // this.params.logisticsType=null
            break;
            case "k1":
            this.sortActive=activeIndex;
            this.params.key = 3;
            this.params.order = 1;
            // this.params.logisticsType=null
            break;
            case "k2":
            this.sortActive=activeIndex;
            this.params.key = 3;
            this.params.order = 2;
            // this.params.logisticsType=null
            break;
            case "k3":
            this.sortActive=activeIndex;
            this.params.key = 1;
            this.params.order = 1;
            // this.params.logisticsType=null
            break;
        }

        for( let i in this.belong_list){
            if(index==this.belong_list[i].index){
                obj.index = index;
                obj.val = this.belong_list[i].name
            }
        }
        for( let i in this.key_sort){
            if(index==this.key_sort[i].index){
                obj.index = index;
                obj.val = this.key_sort[i].name
            }
        }

        this.$emit('changeSortName',obj);
        this.$emit('filterChange',this.params);
        this.filterListShow = false;
    },
  }
}
</script>

<style lang="less" scoped >
.search-filter{

  background: #fff;
  position: relative;
  z-index: 99;
  .browse-mode{
    position: fixed;
    left: 0;
    right: 0;
    background: #fff;
    top: 3rem;
    .downdrop-list{
      box-shadow:0 .24rem .24rem 0px #ddd;
      li { padding:.3rem .8rem; border-bottom: 1px solid #ddd;position: relative;}
        i{
            display:none;
            width:0.444rem;
            height:0.444rem;
            position: absolute;
            right:0.667rem;
            top:0.389rem;
            background: url('../../assets/images/choosen-tab.png') 0% 0% / contain no-repeat;
            // background: red;
        }
        .active i{
            display:block;
        }
    }
  }
}
.filter-items{
  display: flex;
  justify-content: space-around;
  height:1.5rem;
  top:1.56rem;
      position: fixed;
    right: 0;
    left: 0;
    background-color: white;
  .item {
    width: 33%;display: flex;justify-content: center;align-items: center;padding-left: 0.611rem;
    a {display: flex;align-items: center;}
  }
  li i{
    width: 0;margin:.12rem 0 0 .12rem;height: 0;border-style: solid;
    border-width: .12rem;border-color: #000 transparent transparent transparent;
  }
  li.current { color:#f87622;
     i{
      border-color: #f87622 transparent transparent transparent;
    }
  }

}
.browse-mode{
  .selectd {display: block;}
  .hide {display: none;}
  .attri-filter{
    z-index: 9999;
    width: 100%;
    position: fixed; right:0; left: 0; bottom: 0;top: 0;
    .attri-ul{
      background-color: #fff;
      position: absolute;right:0; left: 0; bottom: 0;height: 10rem;
      li{background: #fff;padding:.3rem .8rem; border-bottom: 1px solid #ddd; }
    }

  }
  .attri-filter.show{
    transform: translateY(0px);overflow: scroll;
  }
}

</style>
