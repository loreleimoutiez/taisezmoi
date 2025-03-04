<template>
  <div class="flex justify-center px-6 bg-fuchsia py-2.5 sm:px-3.5">
    <p class="text-sm leading-7 text-white md:text-base">
      <strong class="font-semibold hidden md:inline">J'atterris à Montréal dans</strong>
      <svg viewBox="0 0 2 2" class="mx-2 md:inline h-0.5 w-0.5 fill-current hidden" aria-hidden="true">
        <circle cx="1" cy="1" r="1" />
      </svg>
    </p>

    <span class="text-white font-semibold">
      <template v-if="countdownMessage === ''">
        {{ days }} jours, {{ hours }} heures, {{ minutes }} mins, {{ seconds }} sec
      </template>
      <template v-else>
        {{ countdownMessage }}
      </template>
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const targetDate = ref(new Date('2025-02-09T15:45:00-05:00'))
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const countdownMessage = ref('')

const formatCountdown = (time) => {
  const d = Math.floor(time / (1000 * 60 * 60 * 24))
  const h = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const m = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
  const s = Math.floor((time % (1000 * 60)) / 1000)
  return { d, h, m, s }
}

const updateCountdown = () => {
  const currentDate = new Date()
  const timeRemaining = targetDate.value - currentDate

  if (timeRemaining <= 0) {
    clearInterval(intervalId)
    countdownMessage.value = "Ok j'ai atterri et je suis à Montréal jusqu'au 22 février"
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
  } else {
    const formattedTime = formatCountdown(timeRemaining)
    days.value = formattedTime.d
    hours.value = formattedTime.h
    minutes.value = formattedTime.m
    seconds.value = formattedTime.s
  }
}

let intervalId

onMounted(() => {
  updateCountdown()
  intervalId = setInterval(() => {
    updateCountdown()
  }, 1000)
})
</script>
