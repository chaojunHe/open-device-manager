<template>
  <div class="home">
    <van-search
      v-model="filter"
      show-action
      placeholder="请输入关键词"
      clearable
      shape="round"
      @search="onSearch"
      class="search-tool"
    >
      <template #action>
        <div class="search-btn" @click="onSearch">搜索</div>
      </template>
    </van-search>
    <map-container />
    <van-button class="equ-control" icon="setting-o" @click="equControl" />
    <van-popup v-model="controlShow" round position="bottom" :style="{ height: '60%' }" class="control-box">
      <div class="wrap">
        <div class="message">

        </div>
        <div class="tool">            
          <van-row type="flex" justify="space-between">
            <van-col span="12">
              <van-button @click="toolSelect(0)" type="primary" :round="true" size="small" icon="photograph">拍照</van-button>
              <van-button @click="toolSelect(0)" type="primary" :round="true" size="small" icon="audio">录音</van-button>
            </van-col>
            <van-col span="12" style="text-align:right;margin-left:auto">
              <van-button @click="startRecorder(1)" type="primary" :round="true" size="small">
                <van-icon v-if="!recorderStatus" slot="icon" name="phone-circle-o" />
                <icon-l6 v-if="recorderStatus" slot="icon" />
                {{ !recorderStatus ? '对话' : '录音中...' }}
              </van-button>
              <van-button @click="toolSelect(2)" type="primary" :round="true" size="small" icon="chat-o">文本</van-button>
            </van-col>
          </van-row>
          <van-row v-if="toolSelected === 1" type="flex" justify="space-between" class="last">
            <van-col span="24" style="text-align:right">              
              <van-field
                v-model="textMessage"
                type="textarea"
              >
                <template v-slot:input>
                  <div class="duihua-wrap">
                    <div v-if="recordDuration > 0" class="sound-wrap" @click="playRecorder" >
                      <span style="margin-right: -10px;">{{recordDuration}}"</span>
                      <sound-play :classStyle="isPlayRecord ? 'play' : ''"/>
                    </div>
                  </div>
                </template>
                <template #button>
                  <van-button plain type="primary" :round="true" size="small">发送</van-button>
                </template>
              </van-field>
            </van-col>
          </van-row>
          <van-row v-if="toolSelected === 2" type="flex" justify="space-between" class="last">
            <van-col span="24" class="text-input">
              <van-field
                v-model="textMessage"
                rows="2"
                autosize
                type="textarea"
                placeholder="请输入"
                maxlength="100"
                show-word-limit
              >
                <template #button>
                  <van-button plain type="primary" :round="true" size="small">发送</van-button>
                </template>
              </van-field>
            </van-col>
          </van-row>
        </div>
      </div>
    </van-popup>
    <!-- <js-audio-recorder />
    <benz-amr-recorder />
    <record-button /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import MapContainer from '@/components/MapContainer/MapContainer'
import IconL6 from '@/components/icons/IconL6'
import SoundPlay from '@/components/icons/SoundPlay'
import BenzAMRRecorder from 'benz-amr-recorder'

export default {
  name: 'HomeView',
  components: {
    MapContainer,
    IconL6,
    SoundPlay
  },
  data() {
    return {
      filter: '',
      controlShow: false,
      radio: '1',
      toolSelected: 1,
      textMessage: '',
      
      recorder: null,
      recorderStatus: false,
      recordDuration: 0,
      limitFn: null,

      isPlayRecord: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
    },
    onSearch() {

    },
    equControl() {
      this.controlShow = true
    },
    toolSelect(val) {
      this.toolSelected = val
      var _this = this

      // 其他事件停止录音，停止播放
      if (val !== 1) {
        if (_this.recorder) {
          _this.stopRecorder()
          _this.recorder.stop()
        }
      }
    },
    // 开始录音
    startRecorder(val) {
      this.toolSelect(val)

      var _this = this
      // 开始录音
      if (!_this.recorderStatus) {
        // 录音中不操作
        if (amrForRecorder && amrForRecorder.isRecording()) return

        if (_this.recorder) _this.recorder.stop()
        if (_this.limitFn) clearTimeout(_this.limitFn)

        _this.recorder = new BenzAMRRecorder()
        _this.recordDuration = 0
        var amrForRecorder  = _this.recorder
        amrForRecorder.initWithRecord().then(() => {
            amrForRecorder.startRecord();
            _this.recorderStatus = true

            // 限制录音20秒
            _this.limitFn = setTimeout(() => {
              _this.limitFn = null
              _this.stopRecorder()
            }, 30000);
        }).catch(function(e) {
          _this.$toast({
            message: e.message || e.name || JSON.stringify(e),
            forbidClick: true,
          })
        });

        // 绑定事件
        amrForRecorder.onPlay(function () {
          console.log('onPlay');
        });
        amrForRecorder.onStop(function () {
          console.log('onStop');
        });
        amrForRecorder.onEnded(function () {
          console.log('onEnded');
          _this.isPlayRecord = false
        });
        amrForRecorder.onAutoEnded(function () {
          console.log('onAutoEnded');
        });
        amrForRecorder.onStartRecord(function () {
          console.log('onStartRecord');
        });
        amrForRecorder.onFinishRecord(function () {
          console.log('onFinishRecord');
        });
        amrForRecorder.onCancelRecord(function () {
          console.log('onCancelRecord');
        });
      } else {
        _this.stopRecorder()
      }
      this.isPlayRecord = false
    },
    // 结束录音
    stopRecorder() {
      var _this = this
      var amrForRecorder  = _this.recorder

      if (amrForRecorder && amrForRecorder.isRecording()) {
        amrForRecorder.finishRecord().then(() => {
          _this.recordDuration = amrForRecorder.getDuration().toFixed(2);
          
          _this.recorderStatus = false
        });
      }
    },
    // 录音播放
    playRecorder() {
      var amrForRecorder  = this.recorder
      if (!amrForRecorder) return

      this.isPlayRecord = !this.isPlayRecord
      if (this.isPlayRecord) {
        amrForRecorder.play()
      }
      else {
        amrForRecorder.stop()
      }
    },
  }
}
</script>
<style scoped>

.home {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100vh;
}
.home /deep/ .van-overlay {
  background-color: rgba(0,0,0,.3);
}
.search-tool {
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 1000;
}
.search-tool.van-search {
  background-color: transparent;
}
.search-tool /deep/ .van-search__content {
  box-shadow: 0 0 3px rgba(0,0,0,.5);
}
.search-tool /deep/ .van-search__action:active {
  border-radius: 5px;
}
.equ-control {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  box-shadow: 0 0 3px rgba(0,0,0,.5);
  border-radius: 50%;
  z-index: 1000;
}
.equ-control.van-button--default {
  background-color: rgba(255,255,255,.5);
}
.control-box {
  padding: 10px;
  box-sizing: border-box;
}
.control-box /deep/ .wrap {
  position: relative;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column
}
.control-box /deep/ .wrap .message {
  border: solid 1px #07c160;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-sizing: border-box;
  flex: 1;
}
.control-box /deep/ .wrap .tool {
  padding-top: 10px;
  font-size: 14px;
  height: 130px;
}
.control-box /deep/ .wrap .tool .van-button {
  margin-right: 3px;
}
.control-box /deep/ .wrap .tool .last {
  margin-top: 10px;
}
.control-box /deep/ .wrap .tool .right-item {
  justify-content: flex-end;
  margin-left: auto;
}
.control-box /deep/ .wrap .tool .van-field {
  padding: 0;
}
.control-box /deep/ .wrap .tool .text-input {
  text-align: right;
}
.control-box /deep/ .wrap .tool .text-input .van-field__control {
  border-radius: 17px;
  padding: 3px 5px;
  background-color: rgba(246, 246, 246, 1);
}
.control-box /deep/ .wrap .tool .text-input .van-field__word-limit {
  text-align: left;
  padding-left: 5px;
}
.control-box /deep/ .wrap .tool .duihua-wrap {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: end;
  align-items: end;
}
.control-box /deep/ .wrap .tool .duihua-wrap .btn{
  font-size:30px;
}
.control-box /deep/ .wrap .tool .duihua-wrap .sound-wrap {
  max-width: 60%;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  position: relative;
  background-color: #07c160;
  border-radius: 5px;
  text-align: right;
  padding-left: 10px;
}
.control-box /deep/ .wrap .tool .duihua-wrap .sound-wrap:after{
  content:'';
  width: 0;
  height: 0;
  border-width: 0 6px 6px;
  border-style: solid;
  border-color: transparent transparent #07c160;
  position: absolute;
  right: -6px;
  top: 6px;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent #07c160;
}
</style>
