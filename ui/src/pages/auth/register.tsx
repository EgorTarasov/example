'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github, Twitter } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import Logo from '@/components/logo'

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Registration attempted with:', { name, email, password, confirmPassword })
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Left side (hidden on mobile) */}
            <div className="hidden md:flex md:w-1/2 bg-blue-600 justify-center items-center flex-col space-y-4">
                <h1 className="text-4xl font-bold text-white">Join larek.tech!</h1>
                <p className="text-white text-lg">Create an account to get started.</p>
            </div>

            {/* Right side (full width on mobile) */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <div className="flex flex-col items-center space-y-2 mb-4">
                            <Logo />
                            <h3 className="text-xl font-semibold text-blue-600">larek.tech</h3>
                        </div>
                        <h2 className="text-2xl font-bold text-center">Create Your Account</h2>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Sign Up
                            </Button>
                        </form>

                        <div className="mt-4">
                            <Separator className="my-4">
                                <span className="px-2 text-gray-500">Or sign up with</span>
                            </Separator>
                            <div className="flex justify-center space-x-4 mt-4">
                                <Button variant="outline" size="icon">
                                    <Github className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Twitter className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to='/login'
                                className="text-blue-600 hover:underline"
                            >
                                Log in
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}