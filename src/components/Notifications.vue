<template lang="pug">
  .notifications-holder
    .notification-counter(@click="markAllNotifications()") {{notifications.length}}
    .notification(v-for="(notification, key) in filteredNotifications" :key="key" :class="classNames(notification.type)")
      .notification-close(@click="removeNotification(notification.id)")
      .notification-title(v-if="notification.title") {{notification.title}}
      .notification-body(v-if="notification.body" v-html="notification.body")
      .notification-link: router-link(v-if="notification.link" :to="notification.link.to") {{notification.link.text || "Link"}}
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {

  name: 'Notifications',

  data () {
    return {
      showAll: false
    }
  },
  computed: {
    ...mapState(['notifications']),
    filteredNotifications() {
      return this.notifications.filter(n => !n.seen || this.showAll)
    }
  },
  methods: {
    ...mapMutations(['removeNotification', 'markAllNotifications']),
    classNames (type) {
      return {
        'notification-error': type === 'error',
        'notification-progress': type === 'progress',
        'notification-success': type === 'success'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.notification-counter {
  position: fixed;
  top:1em;
  right:50px;
  border: 1px solid black;
  padding: 5px;
  min-width:2em;
  min-height:1.5em;
  text-align:center;
  cursor: pointer;
}
.notifications-holder {
  position: fixed;
  top:0px;
  right:0px;
  padding:50px;
  max-width:500px;
  z-index:9;
  text-align: justify;
  margin-bottom:5px;
  .notification {
    position: relative;
    background-color: white;
    padding:10px;
    line-height: 1.2em;
    .notification-close {
      position: absolute;
      top:5px;
      right:10px;
      cursor: pointer;
      &:after {
        content: "\D7";
        font-size:32px;
      }
    }
    .notification-title {
      font-weight: bold;
      margin-bottom:1em;
      padding-right:2em;
    }
    .notification-link {
      margin-top: 1em;
      text-align: center;
    }
    &.notification-error {
      border: 3px solid red;
    }
  }
}
</style>
