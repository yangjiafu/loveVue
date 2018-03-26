<template>
  <div>
    <video style="width: 100%" :src="src"></video>
  </div>
</template>
<script>
  import {mapState,mapMutations,mapGetters} from 'vuex'
  export default{
      data(){
          return{
//              m_data:'大屏<<None<<magnet:?xt=urn:btih:dcee71fed5ac7a47a6b2c04d7a3e2cbdb1e1eafb&dn=Despicable Me (2010) BluRay 720p DTS 2Audio x264 CHD&tr=udp://tracker.coppersurfer.tk:6969/announce&tr=udp://tracker.openbittorrent.com/<<magnet:?xt=urn:btih:dcee71fed5ac7a47a6b2c04d7a3e2cbdb1e1eafb&dn=Despicable Me (2010) BluRay 720p DTS 2Audio x264 CHD&tr=udp://tracker.coppersurfer.tk:6969/announce&tr=udp://tracker.openbittorrent.com/[&大屏<<1.30G<<thunder://QUFodHRwOi8vZGwxNDUuODBzLmltOjkyMC8xNzEwL+elnnRu54i4L+elnnRu54i4Lm1wNFpa<<http://dl145.80s.im:920/1710/神tn爸/神tn爸.mp4[&高清<<812M<<thunder://QUFodHRwOi8vZGwxNDUuODBzLmltOjkyMC8xNzEwL+elnnRu54i4L+elnnRu54i4X2JkLm1wNFpa<<http://dl145.80s.im:920/1710/神tn爸/神tn爸_bd.mp4',
              src:'http://localhost:8011/%E5%AE%B6%E5%9B%AD_bd.mp4',
              m_info:[], //电影的所有信息内容
              v_info:'', //linkInfo内的所有信息
              v_arr:[],//每一种电影播放格式的数组
          }
      },
      computed:{
          ...mapGetters(['get_m_o_Info'])
      },
      created:function () {
          this.filterMovieInfo(this.$route.params.m_id);
          this.getLinkData()
      },
      methods:{
          ...mapMutations(['filterMovieInfo']),
          getLinkData(){
            this.m_info = this.get_m_o_Info;
            let m_info_linkInfo = this.m_info.linkInfo.split('[&');
//        let m_info_linkInfo = this.m_data.split('[&');
            for(let i in m_info_linkInfo){
              let current = m_info_linkInfo[i].split('<<');
              let v_obj = {format:current[0],capacity:current[1],link1:current[2],link2:current[3]};
              if(v_obj.link1.search('http://') !==-1 || v_obj.link2.search('http://') !==-1){
                if(v_obj.link2.search('http://') !==-1){
                  let link = v_obj.link2
                  v_obj.link2 = v_obj.link1
                  v_obj.link1 = link
                }
                this.v_arr.push(v_obj)
              }
            }
            console.log(this.v_arr);
          }
      }
  }

</script>
