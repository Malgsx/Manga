"use client"

import React from "react"

type Saver = () => Promise<void>

type EditModeContextType = {
  isEditMode: boolean
  setEditMode: (v: boolean) => void
  dirty: boolean
  addSaver: (fn: Saver) => void
  clearSavers: () => void
  saveAll: () => Promise<void>
  markDirty: () => void
}

const EditModeContext = React.createContext<EditModeContextType | null>(null)

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setEditMode] = React.useState(false)
  const [dirty, setDirty] = React.useState(false)
  const saversRef = React.useRef<Set<Saver>>(new Set())

  const addSaver = React.useCallback((fn: Saver) => {
    saversRef.current.add(fn)
    setDirty(true)
  }, [])

  const clearSavers = React.useCallback(() => {
    saversRef.current.clear()
    setDirty(false)
  }, [])

  const saveAll = React.useCallback(async () => {
    for (const fn of Array.from(saversRef.current)) {
      await fn()
    }
    saversRef.current.clear()
    setDirty(false)
  }, [])

  const markDirty = React.useCallback(() => setDirty(true), [])

  return (
    <EditModeContext.Provider value={{ isEditMode, setEditMode, dirty, addSaver, clearSavers, saveAll, markDirty }}>
      {children}
    </EditModeContext.Provider>
  )
}

export function useEditMode() {
  const ctx = React.useContext(EditModeContext)
  if (!ctx) throw new Error("useEditMode must be used within EditModeProvider")
  return ctx
}

export function IfEdit({ children }: { children: React.ReactNode }) {
  const { isEditMode } = useEditMode()
  if (!isEditMode) return null
  return <>{children}</>
}
