"use client"

import { useState } from "react"
import { useEditMode } from "@/components/edit-mode-context"
import { Button } from "@/components/ui/button"

export default function EditModeToggle() {
  const { isEditMode, setEditMode, dirty, saveAll, clearSavers } = useEditMode()
  const [saving, setSaving] = useState(false)

  const enter = () => setEditMode(true)
  const close = () => setEditMode(false)
  const save = async () => { setSaving(true); await saveAll(); setSaving(false); setEditMode(false) }
  const discard = () => { clearSavers(); setEditMode(false); window.location.reload() }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-2">
      {!isEditMode ? (
        <Button size="sm" onClick={enter} className="font-comic">
          Enter Edit Mode
        </Button>
      ) : (
        <div className="flex items-center gap-2 bg-black/70 text-white px-3 py-2 rounded border border-white">
          <span className="font-comic text-sm mr-2">Edit Mode</span>
          <Button size="sm" variant="outline" onClick={save} disabled={!dirty || saving} className="font-comic bg-white text-black">
            {saving ? "Saving..." : "Save changes"}
          </Button>
          <Button size="sm" variant="outline" onClick={discard} className="font-comic bg-white text-black">
            Discard
          </Button>
          <Button size="sm" variant="ghost" onClick={close} className="font-comic">
            Close
          </Button>
        </div>
      )}
    </div>
  )
}
