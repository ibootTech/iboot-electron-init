<template>
  <div class="home-temple">
    <div class="home-temple-content" v-if="!loadingStatus">
      <div class="home-temple-title">
        <h1>{{ title }}</h1>
        <a-button @click="openLink(github.html_url)">
          <template #icon><GithubOutlined /></template>
          Star: {{ github.stargazers_count }}
        </a-button>
      </div>
      <a-typography>
        <a-typography-title :level="3">简介 | Introduction</a-typography-title>
        <a-typography-paragraph>
          <ul>
            <li v-for="(item, index) in techs" :key="'tech_' + index">
              <a-tooltip placement="bottom">
                <template #title>varsion: {{ item.ver }}</template>
                <div class="li-item" @click="openLink(item.link)">{{ item.name }}</div>
              </a-tooltip>
              <span v-if="index < techs.length - 1">+</span>
            </li>
          </ul>
        </a-typography-paragraph>
      </a-typography>
    </div>
    <Loading v-else />
  </div>
</template>
<script lang="ts">
import { Button, Typography, Tooltip } from 'ant-design-vue'
import { GithubOutlined } from '@ant-design/icons-vue'
import { ref, computed, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onErrorCaptured, onRenderTracked, onRenderTriggered } from 'vue'
import { useStore } from 'vuex'
import Loading from '../components/loading.vue'
import HomeApi from '../api/homeApi'
export default {
  components: {
    Loading,
    [Button.name]: Button,
    [GithubOutlined.name]: GithubOutlined,
    [Typography.name]: Typography,
    'a-typography-title': Typography.Title,
    'a-typography-paragraph': Typography.Paragraph,
    'a-tooltip': Tooltip
  },
  mounted(): void {
    console.log('===mounted====')
  },
  setup(): any {
    const store = useStore()
    let loadingStatus = ref(true)
    const title = ref(document.title)
    const techs = [
      {
        name: 'Vue3',
        ver: '3.0.0',
        link: 'https://v3.cn.vuejs.org'
      },
      {
        name: 'TypeScript',
        ver: '4.1.5',
        link: 'https://www.typescriptlang.org'
      },
      {
        name: 'Antdv',
        ver: '2.1.2',
        link: 'https://2x.antdv.com'
      }
    ]
    let github = ref('')
    onBeforeMount(() => {
      console.log('===onBeforeMount===')
    })
    let openLink = url => {
      location.href = url
    }
    onMounted(() => {
      HomeApi.github().then(resp => {
        if (resp) {
          github.value = resp.data.data
        }
      })
      setTimeout(() => {
        loadingStatus.value = false
      }, 2000)
      console.log(window)
      console.log('===onMounted===')
    })
    onUpdated(() => {
      console.log('===onUpdated===')
    })
    onBeforeUpdate(() => {
      console.log('===onBeforeUpdate===')
    })
    onBeforeUnmount(() => {
      console.log('===onBeforeUnmount===')
    })
    onUnmounted(() => {
      console.log('===onUnmounted===')
    })
    onErrorCaptured(() => {
      console.log('===onErrorCaptured===')
    })
    onRenderTracked(() => {
      console.log('===onRenderTracked===')
    })
    onRenderTriggered(() => {
      console.log('===onRenderTriggered===')
    })
    return {
      AppInfo: computed(() => store.state.Home.AppInfo),
      title,
      loadingStatus,
      techs,
      openLink,
      github
    }
  }
}
</script>
<style lang="less">
.home-temple {
  .home-temple-content {
    height: 100vh;
    display: flex;
    margin-top: 35vh;
    justify-content: center;
    text-align: center;
    position: relative;
    .home-temple-title {
      position: absolute;
      width: 100%;
      top: -20vh;
    }
    ul {
      margin-top: 30px;
      display: flex;
      li {
        font-size: 26px;
        display: flex;
        .li-item {
          font-weight: 900;
          cursor: pointer;
        }
        span {
          padding: 0 10px 0 20px;
        }
      }
    }
  }
}
</style>
