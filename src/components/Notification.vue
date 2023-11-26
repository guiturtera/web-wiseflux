<template>
  <div class="notification-icon" v-if="notifications">
    <font-awesome-icon :icon="['fas', 'bell']" @click="toggleNotifications" />
    <div v-if="showNotifications" class="notification-dropdown">
      <div class="container">
        <ul class="list-group">
          <li class="list-group-item my-2" v-for="(notification, index) in formattedNotifications" :key="index" @mouseover="hoverItem(index)" @mouseout="unhoverItem(index)">
            <RouterLink :to="'/sensores/' + notification.sensor" class="nav-link active">{{ notification.formattedTxt }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service"
import { differenceInDays } from "date-fns"

export default {
  name: 'NotificationIcon',
    data() {
    return {
      showNotifications: false,
      notifications: [], 
      hoveredItem: null,
      formattedNotifications: [],
      noNotifications: true
    };
  },
  async created() {
    try {
        this.notifications = (await UserService.getUserNotifications()).data?.response
    } catch (error) {
        console.log(`Erro ao capturar notificações do usuário {error}`)
    }   

    this.noNotifications = this.notifications.length > 0

    this.formatNotifications(this.notifications)
  },
  methods: {
    formatNotifications(notifications) {
        this.formattedNotifications = []
        notifications = notifications.sort((a, b) => new Date(a.notificationTime) - new Date(b.notificationTime));
        for (let i = 0; i < notifications.length; i++) {
            let notification = notifications[i]
            let notificationDays = differenceInDays(new Date(), new Date(notification['notificationTime']))

            let formattedTxt = `Anomalia há ${notificationDays} dias no sensor...`
            this.formattedNotifications.push({
              ...notification,
              formattedTxt  
            })
        }
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
    },
    hoverItem(index) {
      this.hoveredItem = index;
    },
    unhoverItem() {
      this.hoveredItem = null;
    },
  },
};
</script>

<style scoped>
.notification-icon {
  position: relative;
  cursor: pointer;
}

.notification-dropdown {
  position: absolute;
  top: 100%;
  right: 10px; 
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.notification-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notification-dropdown li {
  margin-bottom: 5px;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease; 
}

.notification-dropdown li:hover {
  background-color: #d4edda; 
}

.list-group {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
}

.list-group-item {
  position: relative;
  display: block;
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.list-group-item:last-child {
  margin-bottom: 0;
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.list-group-item:hover {
  background-color: #d4edda; 
  
}

.list-group-item.active,
.list-group-item.active:hover {
  background-color: #c3e6cb; 
}
</style>
