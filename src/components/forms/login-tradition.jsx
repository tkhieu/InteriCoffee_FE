"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  return (
    <Card className="mx-auto max-w-sm bg-black border-black text-white">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Enter your email/phone and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required className="text-black"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required className="text-black"/>
          </div>
          <div className="flex justify-end">
            <Link href={"#"} className="text-xs text-gray-400 hover:text-gray-300 hover:underline">Forgot Password</Link>
          </div>
          <Button type="submit" className="w-full border-[1px] border-[#B88D6F] bg-[#B88D6F] hover:bg-[#A97653]">
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}