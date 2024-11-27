// chat-bot-widget.tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X } from 'lucide-react'
import { Message } from "@/models/message"
import { CustomTheme, defaultTheme } from '@/models/customTheme'


interface ChatBotWidgetProps {
    customTheme: CustomTheme;
}



export function ChatBotWidget({ customTheme = defaultTheme  }: ChatBotWidgetProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
    const [inputMessage, setInputMessage] = useState('')
    const ws = useRef<WebSocket | null>(null)
    const messagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            ws.current = new WebSocket('wss://larek.tech/api/chat/ws/1')

            ws.current.onmessage = (event) => {
                const message: Message = JSON.parse(event.data)
                setMessages(prev => [...prev, { text: message.text, isUser: false }])
            }

            ws.current.onclose = () => {
                console.log('WebSocket connection closed')
            }

            return () => {
                ws.current?.close()
            }
        }
    }, [isOpen])

    const scrollToBottom = () => {
        messagesRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [])

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputMessage.trim() || !ws.current) return

        const userMessage: Message = {
            id: Date.now(),
            chatId: 1, // Replace with actual chatId
            userId: 1, // Replace with actual userId
            text: inputMessage,
            metadata: {},
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deleted: false
        }

        ws.current.send(JSON.stringify(userMessage))
        setMessages(prev => [...prev, { text: inputMessage, isUser: true }])
        setInputMessage('')
    }   

    return (
        <div className="fixed bottom-4 right-4 z-50 w-120">
            {isOpen ? (
                <Card className={`w-100 max-w-120 max-h-[calc(100vh-2rem)] flex flex-col overflow-y-auto ${customTheme.bgColor}`}>
                    <CardHeader className={`flex ${customTheme.headerColor} flex-row items-center justify-between space-y-0 pb-2`}>
                        <h2 className={` ${customTheme.textColor} text-sm font-bold`}>Chat Bot</h2>
                        <Button className={`${customTheme.buttonColor}`} variant="secondary" size="icon" onClick={() => setIsOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-72 w-100 pr-4 max-w-100">
                            <div ref={messagesRef}>
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`mb-2 p-2 rounded-lg max-w-prose ${
                                            msg.isUser
                                                ? `${customTheme.userMessageColor} text-primary-foreground ml-auto`
                                                : `${customTheme.messageColor}`
                                        } max-w-[60%] break-words ${msg.isUser ? 'ml-4' : 'mr-4'}`}
                                    >
                                        {msg.text}
                                    </div>
                                ))}
                            </div>
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
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') { handleSendMessage() }
                                }}
                            />
                            <Button className={`${customTheme.sendButtonColor}`} type="submit" size="icon">
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            ) : (
                <Button
                    className={`rounded-full h-12 w-12 ${customTheme.sendButtonColor}`}
                    onClick={() => setIsOpen(true)}
                >
                    <MessageCircle className="h-6 w-6" />
                </Button>
            )}
        </div>
    )
}