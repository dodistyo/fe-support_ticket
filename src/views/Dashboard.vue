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
                    <h1 class="font-bold text-5xl">{{total}}</h1>
                    <small>Tickets</small>
                </div>
              </div>
              <div class="vx-col sm:w-4/5 justify-center mx-auto">
                <vue-apex-charts type=radialBar height=250 :options="chartOptions" :series="persen" />
              </div>
            </div>
              <div class="flex flex-row justify-between px-8 pb-4">
                  <p class="text-center"><span class="block">Open Tickets</span><span class="text-4xl">{{opened}}</span></p>
                  <p class="text-center"><span class="block">Closed Ticket</span><span class="text-4xl">{{closed}}</span></p>
              </div>
          </div>
        </vx-card>
      </div>
    </div>

  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import ApiService from "@/auth/api.service";


export default {
    data() {
        return {
          total : 0,
          persen : 0,
          closed : 0,
          opened : 0,
          chartOptions: {
            plotOptions: {
                radialBar: {
                    size: 150,
                    startAngle: -150,
                    endAngle: 150,
                    hollow: {
                        size: '65%',
                    },
                    track: {
                        background: "#fff",
                        strokeWidth: '100%',

                    },
                    dataLabels: {
                        value: {
                            offsetY: 30,
                            color: '#99a2ac',
                            fontSize: '2rem'
                        }
                    }
                },
            },
            colors: ['#EA5455'],
            fill: {
                type: 'gradient',
                gradient: {
                    // enabled: true,
                    shade: 'dark',
                    type: 'horizontal',
                    shadeIntensity: 0.5,
                    gradientToColors: ['#7367F0'],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100]
                },
            },
            stroke: {
                dashArray: 8
            },
            chart: {
                sparkline: {
                }
            },
            labels: ['Completed Tickets'],
          }
        }
    },
    methods : {
      getDetailDashboard(){
        ApiService.setHeader();
        ApiService.get("ticket/detailDashboard")
        .then(({ data }) => {
          this.total = data.total
          this.persen = [data.persen]
          this.closed = data.closed
          this.opened = data.opened
          resolve(data);
        })
        .catch(({ response }) => {
          if(response){
            this.$store.dispatch('logout').then(() => {
              this.$store.dispatch('setError', response.data);
            });
          }
        }).finally(() => {
          // console.log('always executed')
        });
      }
    },
    created : function(){
      this.getDetailDashboard();
    },
    components: {
        VueApexCharts,
        // StatisticsCardLine,
        // ChangeTimeDurationDropdown
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
