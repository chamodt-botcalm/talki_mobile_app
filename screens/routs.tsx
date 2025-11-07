import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'

export default function routs() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/(tabs)/wallet')
  }, [])

  return null
}