import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@tanstack/react-router"
import { Code2, Brain, Eye, Send } from 'lucide-react'



export default function LandingPage() {
    const services = [
        {
            title: "Web Development",
            description: "Custom websites and web applications built with cutting-edge technologies",
            icon: <Code2 className="h-12 w-12 mb-4 text-primary" />,
        },
        {
            title: "AI & NLP Solutions",
            description: "Intelligent systems leveraging advanced natural language processing techniques",
            icon: <Brain className="h-12 w-12 mb-4 text-primary" />,
        },
        {
            title: "Computer Vision",
            description: "Innovative applications using state-of-the-art computer vision algorithms",
            icon: <Eye className="h-12 w-12 mb-4 text-primary" />,
        },
    ]

    const projects = [
        {
            title: "AI-Powered Content Management",
            description: "A web platform with NLP-based content categorization and summarization",
            image: "/placeholder.svg?height=200&width=400",
        },
        {
            title: "Smart Surveillance System",
            description: "Computer vision application for real-time object detection and tracking",
            image: "/placeholder.svg?height=200&width=400",
        },
        {
            title: "Intelligent Chatbot Interface",
            description: "Web-based chatbot with advanced NLP for natural conversations",
            image: "/placeholder.svg?height=200&width=400",
        },
    ]

    return (
        <div className="flex flex-col min-h-screen">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Code2 className="h-6 w-6" />
                        <span className="text-xl font-bold">larek.tech</span>
                    </div>
                    <nav>
                        <ul className="flex space-x-6">
                            <li><Link href="#services" className="hover:text-primary">Services</Link></li>
                            <li><Link href="#work" className="hover:text-primary">Our Work</Link></li>
                            <li><Link href="#contact" className="hover:text-primary">Contact</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="flex-grow">
                <section className="py-20 bg-muted">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Innovative Web & AI Solutions
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Transforming ideas into powerful digital experiences. We specialize in web development, AI-driven NLP, and computer vision projects.
                        </p>
                        <Button size="lg" asChild>
                            <Link href="#contact">Start Your Project</Link>
                        </Button>
                    </div>
                </section>

                <section id="services" className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Expertise</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <Card key={index} className="text-center">
                                    <CardHeader>
                                        <div className="flex justify-center">{service.icon}</div>
                                        <CardTitle>{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>{service.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="work" className="py-20 bg-muted">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <Card key={index} className="overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        width={400}
                                        height={200}
                                        className="w-full object-cover"
                                    />
                                    <CardHeader>
                                        <CardTitle>{project.title}</CardTitle>
                                        <CardDescription>{project.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="contact" className="py-20">
                    <div className="container mx-auto px-4 max-w-xl text-center">
                        <h2 className="text-3xl font-bold mb-12">Let's Innovate Together</h2>
                        <Card>
                            <CardHeader>
                                <CardTitle>Start a Project</CardTitle>
                                <CardDescription>
                                    Ready to bring your web and AI ideas to life? Get in touch with us.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" size="lg">
                                    <Send className="mr-2 h-4 w-4" />
                                    Contact Us
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>

            <footer className="border-t py-8">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                    <p>© {new Date().getFullYear()} larek.tech. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}