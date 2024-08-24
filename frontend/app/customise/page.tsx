"use client"

import React from "react"

import { Separator } from "@/components/ui/separator"
import CustomiseForm from "@/components/customiseComponents/CustomiseForm"

import SidePanel from "../../components/Layout/SideBar"

const Customise = () => {
  return (
    <div className="m-8 flex flex-col justify-center">
      <div className="flex flex-row gap-24 rounded-xl border p-12">
        <div className="w-2/5">
          <SidePanel />
        </div>

        <Separator orientation="vertical" className="h-auto" />

        <div className="flex w-3/5 flex-col">
          <CustomiseForm />
        </div>
      </div>
    </div>
  )
}

export default Customise
