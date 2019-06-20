<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="dashboard-analytics">
    <div class="vx-row">
      <!-- CARD 5: SUPPORT TRACKER -->
      <div class="vx-col w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
        <vx-card title="Support Tracker">

          <div slot="no-body">
            <div class="vx-row text-center">
              <div class="vx-col sm:w-1/5 w-full flex flex-col justify-between mb-4">
                <div class="ml-6 mt-6">
                    <h1 class="font-bold text-5xl">163</h1>
                    <small>Tickets</small>
                </div>
              </div>
              <div class="vx-col sm:w-4/5 justify-center mx-auto">
                <vue-apex-charts type=radialBar height=250 :options="analyticsData.supportTrackerRadialBar.chartOptions" :series="analyticsData.supportTrackerRadialBar.series" />
              </div>
            </div>
              <div class="flex flex-row justify-between px-8 pb-4">
                  <p class="text-center"><span class="block">Open Tickets</span><span class="text-4xl">63</span></p>
                  <p class="text-center"><span class="block">Closed Ticket</span><span class="text-4xl">23</span></p>
              </div>
          </div>
        </vx-card>
      </div>
    </div>

  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import analyticsData from './ui-elements/card/analyticsData.js'
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'

export default {
    data() {
        return {
            analyticsData: analyticsData,
            isImp: false,
            navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
            show: false,
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            nextNum: 10,
            'tableList': [
                'vs-th: Component',
                'vs-tr: Component',
                'vs-td: Component',
                'thread: Slot',
                'tbody: Slot',
                'header: Slot'
            ],
            users: [{
                    "orderNo": 879985,
                    "status": "Moving",
                    "statusColor": "success",
                    "operator": "Cinar Knowles",
                    "operatorImg": "avatar-s-2.png",
                    usersLiked: [
                        { name: 'Vennie Mostowy', img: 'avatar-s-5.png' },
                        { name: 'Elicia Rieske', img: 'avatar-s-7.png' },
                        { name: 'Julee Rossignol', img: 'avatar-s-10.png' },
                        { name: 'Darcey Nooner', img: 'avatar-s-8.png' }
                    ],
                    "location": "Anniston, Alabama",
                    "distance": "130 km",
                    "distPercent": 80,
                    "startDate": "14:58 26/07/2018",
                    "estDelDate": "28/07/2018"
                },
                {
                    "orderNo": 156897,
                    "status": "Pending",
                    "statusColor": "warning",
                    "operator": "Britany Ryder",
                    "operatorImg": "avatar-s-4.png",
                    usersLiked: [
                        { name: 'Trina Lynes', img: 'avatar-s-1.png' },
                        { name: 'Lilian Nenez', img: 'avatar-s-2.png' },
                        { name: 'Alberto Glotzbach', img: 'avatar-s-3.png' }
                    ],
                    "location": "Cordova, Alaska",
                    "distance": "234 km",
                    "distPercent": 60,
                    "startDate": "14:58 26/07/2018",
                    "estDelDate": "28/07/2018"
                },
                {
                    "orderNo": 568975,
                    "status": "Moving",
                    "statusColor": "success",
                    "operator": "Kishan Ashton",
                    "operatorImg": "avatar-s-1.png",
                    usersLiked: [
                        { name: 'Lai Lewandowski', img: 'avatar-s-6.png' },
                        { name: 'Elicia Rieske', img: 'avatar-s-7.png' },
                        { name: 'Darcey Nooner', img: 'avatar-s-8.png' },
                        { name: 'Julee Rossignol', img: 'avatar-s-10.png' },
                        { name: 'Jeffrey Gerondale', img: 'avatar-s-9.png' },
                    ],
                    "location": "Florence, Alabama",
                    "distance": "168 km",
                    "distPercent": 70,
                    "startDate": "14:58 26/07/2018",
                    "estDelDate": "28/07/2018"
                },
                {
                    "orderNo": 245689,
                    "status": "Canceled",
                    "statusColor": "danger",
                    "operator": "Anabella Elliott",
                    "operatorImg": "avatar-s-6.png",
                    usersLiked: [
                        { name: 'Vennie Mostowy', img: 'avatar-s-5.png' },
                        { name: 'Elicia Rieske', img: 'avatar-s-7.png' }
                    ],
                    "location": "Clifton, Arizona",
                    "distance": "125 km",
                    "distPercent": 95,
                    "startDate": "14:58 26/07/2018",
                    "estDelDate": "28/07/2018"
                }

            ]
        }
    },
    components: {
        VueApexCharts,
        StatisticsCardLine,
        ChangeTimeDurationDropdown
    },
}
</script>

<style lang="scss">
#dashboard-analytics {
  .greet-user{
    position: relative;
    .decore-left{
      position: absolute;
      left:0;
      top: 0;
    }
    .decore-right{
      position: absolute;
      right:0;
      top: 0;
    }
  }

  @media(max-width: 576px) {
    .decore-left, .decore-right{
      width: 140px;
    }
  }
}
</style>
