<template>
	<div v-infinite-scroll="onScroll" infinite-scroll-disabled="true" infinite-scroll-distance="22" class="visitor">
        <Chead :msg="top_title"></Chead>
		<div class="top_menue">
		    <div v-tap="{ methods: getWorkerList, time_count: 'day', reset: true }" class="top_menue_item">
                <span class="m_txt">今天</span>
            </div>
            <div v-tap="{ methods: getWorkerList, time_count: 'week', reset: true }" class="top_menue_item">
                <span class="m_txt">最近一周</span>
            </div>
            <div v-tap="{ methods: getWorkerList, time_count: 'month', reset: true }" class="top_menue_item">
                <span class="m_txt">最近一月</span>
            </div>
		</div>
        <div class="item_list">
            <div v-tap="{ methods: goWorkerDetail, item: item }" class="item_list_item" :key="index" v-for="(item, index) in workers">
                <img class="work_photo" :src="workerAvatar(item.user_avatar)">
                <div class="work_info lb_item">
                    <div class="work_info_top">
                        <div class="lb_item worker_name">{{ item.user_name }}</div>
                        <div class="lb_item worker_type">{{ changeType(item.user_type) }}</div>
                    </div>
                    <div class="work_name">电视墙粉刷</div>
                    <div class="work_info_bottom">
                        <div class="lb_item">09：00</div>
                        <span class="lb_item">进入</span>
                        <div class="lb_item">B栋601</div>
                    </div>
                </div>
            </div>
        </div>
        <Menue></Menue>
	</div>
</template>

<script>
import Chead from './common/Header.vue'
import Menue from './common/Menue.vue'
import { HOST_CONFIG, API_ROUTER_CONFIG } from '@/api/config/api_config'
import { changeType2Number, changeRate2Number, changeType } from '@/util/util'
export default {
  	name: 'visitor',
  	data () {
    	return {
            top_title: '访客记录',
            workers: [],
            get_data_flag: true,
            page: 0,
            limitation: '',
		}
  	},
	methods: {
        changeType,
        goWorkerDetail(obj){
            var item = obj.item;
            this.$router.push({ name:'worker_detail', params:{ visitor: item }})
        },
        workerAvatar(url){
            return HOST_CONFIG.imageIp+url;
        },
        getWorkerList(params){
            if(params.time_count == 'day') {
                this.limitation = 1
            }
            if(params.time_count == 'week') {
                this.limitation = 7
            }
            if(params.time_count == 'month') {
                this.limitation = 30
            }
            if(params.reset) {
                this.page = 0
                this.workers = []
            }
            this.$http.post( API_ROUTER_CONFIG.visitor_list_limitation,
            {
                account: this.page,
                limitation: this.limitation,
                owner_type: localStorage.user_type,
                open_id: localStorage.open_id
            },
            {emulateJSON: true}).then((response) => {
                if(response.status == 200){
                    var worker_data = changeRate2Number(response.body.data)
                    this.workers = this.workers.concat(worker_data)
                }
            }, (response) => {
                    // error callback 
            })
        },
        onScroll() {
            if(this.get_data_flag) {
                this.page++ 
                if(this.limitation) {
                    this.getWorkerList({})
                } else {
                    this.getVisitorList(false)
                }
			}
        },
        getVisitorList(reset) {
            if(reset) {
                this.page = 0
                this.workers = []
            }
            this.$http.post( API_ROUTER_CONFIG.visitor_list,
            {
                owner_type: localStorage.user_type,
                open_id: localStorage.open_id,
                account: this.page
            },
            {emulateJSON: true}).then((response) => {
                if(response.status == 200){
                    var worker_data = changeRate2Number(response.body.data)
                    this.workers = this.workers.concat(worker_data)
                }
            }, (response) => {
                    // error callback 
            })
        }
    },
    created(){
        this.getVisitorList(true)
    },
    components: {
        Chead,
        Menue,
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.visitor {
    min-height: 100vh;
    background:#eee;
}
.top_menue {
    position: fixed;
    top: 45px;
    width: 100%;
    background: #fff;
    font-size: 0;
    height: 36px;
    border-top: 1px solid rgba(187,187,187,.6);
    border-bottom: 1px solid rgba(187,187,187,.6);
}
.top_menue_item {
    display: inline-block;
    vertical-align: top;
    height: 100%;
    font-size: 0;
    width: 33.3%;
    border-right: 1px solid rgba(187,187,187,.6);
}
.top_menue_item:last-child {
    border: 0;
}
.item_list {
     min-height: 88vh;
     padding-top: 36px;
     font-size: 0;
     padding-bottom: 60px;
}
.item_list_item {
    margin: 13px 13px;
    background: #fff;
    padding: 15px;
    text-align: left;
    border: 1px solid #fff;
    border-radius: 6px;
}
.work_photo {
    width: 26%;
    height: 66px;
    vertical-align: middle;
}
.work_info {
    width: 74%;
    padding-left: 18px;
    font-size: 14px;
}
.worker_type {
    font-size: 15px;
    font-weight: 500;
    margin-right: 10px;
}
.worker_name {
    margin-right: 7%;
}
.lb_item {
    vertical-align: middle;
    display: inline-block;
}
.m_txt {
    font-size: 13px;
    line-height: 36px;
    vertical-align: middle;
}
.work_name {
    line-height: 36px;
}
</style>