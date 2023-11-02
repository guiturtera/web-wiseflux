<script setup>
import WelcomeItem from './WelcomeItem.vue'
import NotificationIcon from './icons/IconNotification.vue'
import ElectricityIcon from './icons/IconElectricity.vue'
import GasIcon from './icons/IconGas.vue'
import WaterDrop from './icons/IconWaterDrop.vue'
import MonitoringIcon from './icons/IconMonitoring.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <MonitoringIcon />
    </template>
    <template #heading>Monitoramento</template>

    Controle em tempo real seu consumo doméstico a partir de gráficos modernos.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <NotificationIcon />
    </template>
    <template #heading>Notificações</template>

    Receba notificações caso seja detectada algum consumo fora do seu padrão, a partir de um algoritmo personalizado para seu perfil.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <WaterDrop />
    </template>
    <template #heading>Água</template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ElectricityIcon />
    </template>
    <template #heading>Eletricidade</template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <GasIcon />
    </template>
    <template #heading>Gás</template>
  </WelcomeItem>
</template>
