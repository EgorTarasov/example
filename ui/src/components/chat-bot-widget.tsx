'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X } from 'lucide-react'

// Simulating server communication
const sendMessageToServer = async (message: string): Promise<string> => {
    // In a real application, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
    return `Response to: ${message}`
}

export function ChatBotWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
    const [inputMessage, setInputMessage] = useState('')

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return

        // Add user message
        setMessages(prev => [...prev, { text: inputMessage, isUser: true }])
        setInputMessage('')

        // Simulate sending to server and getting response
        const response = await sendMessageToServer(inputMessage)

        // Add bot response
        setMessages(prev => [...prev, { text: response, isUser: false }])
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen ? (
                <Card className="w-80 h-96 flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h2 className="text-sm font-bold">Chat Bot</h2>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-72 w-full pr-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`mb-2 p-2 rounded-lg ${
                                        msg.isUser
                                            ? 'bg-primary text-primary-foreground ml-auto'
                                            : 'bg-muted'
                                    } max-w-[80%] ${msg.isUser ? 'ml-auto' : 'mr-auto'}`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                    <CardFooter>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSendMessage()
                            }}
                            className="flex w-full items-center space-x-2"
                        >
                            <Input
                                type="text"
                                placeholder="Type your message..."
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                            />
                            <Button type="submit" size="icon">
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            ) : (
                <Button
                    className="rounded-full h-12 w-12"
                    onClick={() => setIsOpen(true)}
                >
                    <MessageCircle className="h-6 w-6" />
                </Button>
            )}
        </div>
    )
}

