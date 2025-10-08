import axios from 'axios'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: 'http://localhost:5000/api/',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  nuxtApp.provide('api', api)
})
