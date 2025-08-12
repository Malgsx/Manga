"use client"

import type React from "react"

interface MangaPanelLayoutProps {
  topPanel?: React.ReactNode
  leftPanel?: React.ReactNode
  topRightPanel?: React.ReactNode
  bottomRightPanel?: React.ReactNode
  className?: string
}

export default function MangaPanelLayout({
  topPanel,
  leftPanel,
  topRightPanel,
  bottomRightPanel,
  className = "",
}: MangaPanelLayoutProps) {
  return (
    <div className={`manga-page-layout ${className}`}>
      {/* Top Panel - Full Width */}
      {topPanel && (
        <div className="manga-panel top-panel comic-panel bg-black dark:bg-black border-4 border-white dark:border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
          {topPanel}
        </div>
      )}

      {/* Bottom Section - Two Columns */}
      <div className="bottom-section">
        {/* Left Panel - Tall */}
        {leftPanel && (
          <div className="manga-panel left-panel comic-panel bg-black dark:bg-black border-4 border-white dark:border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            {leftPanel}
          </div>
        )}

        {/* Right Column - Two Stacked Panels */}
        <div className="right-column">
          {topRightPanel && (
            <div className="manga-panel top-right-panel comic-panel bg-black dark:bg-black border-4 border-white dark:border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              {topRightPanel}
            </div>
          )}

          {bottomRightPanel && (
            <div className="manga-panel bottom-right-panel comic-panel bg-black dark:bg-black border-4 border-white dark:border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              {bottomRightPanel}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
