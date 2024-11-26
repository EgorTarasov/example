import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Logo from '@/components/logo'
import { Link } from '@tanstack/react-router'

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Left side (hidden on mobile) */}
            <div className="hidden md:flex md:w-1/2 bg-blue-600 justify-center items-center flex-col space-y-4">
                <h1 className="text-4xl font-bold text-white">Oops!</h1>
                <p className="text-white text-lg">The page you're looking for doesn't exist.</p>
            </div>

            {/* Right side (full width on mobile) */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <div className="flex flex-col items-center space-y-2 mb-4">
                            <Logo />
                            <h3 className="text-xl font-semibold text-blue-600">larek.tech</h3>
                        </div>
                        <h2 className="text-2xl font-bold text-center">404 - Page Not Found</h2>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-lg mb-4">Sorry, the page you are looking for does not exist.</p>
                        <Button asChild>
                            <Link to="/">Go to Home</Link>
                        </Button>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-gray-600">
                            Need help? {' '}
                            <Link
                                to='/'
                                className="text-blue-600 hover:underline"
                            >
                                Contact Us
                            </Link>

                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}