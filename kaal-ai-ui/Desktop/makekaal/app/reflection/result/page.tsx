"use client"

import { useEffect, useState } from "react"

import { ReflectionResult } from "@/components/reflection-result"
import Navbar from "@/components/navbar"

export default function ReflectionResultPage() {
  const [stressLevel, setStressLevel] = useState<"Low" | "Moderate" | "High">("Moderate")
  const [score, setScore] = useState<number | undefined>()

  useEffect(() => {
    const result = sessionStorage.getItem("reflectionResult")
    if (result) {
      const parsed = JSON.parse(result)
      setStressLevel(parsed.level || "Moderate")
      setScore(parsed.score)
    }
  }, [])

  return (
    <main className="min-h-screen flex flex-col bg-background relative">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12">
        <ReflectionResult stressLevel={stressLevel} score={score} />
      </div>
    </main>
  )
}
