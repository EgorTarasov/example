export interface CustomTheme {
    bgColor: string;
    headerColor: string;
    textColor: string;
    buttonColor: string;
    sendButtonColor: string;
    messageColor: string;
    userMessageColor: string;
}

export const defaultTheme: CustomTheme = {
    bgColor: "bg-secondary",
    headerColor: "bg-green-500",
    textColor: "text-primary",
    buttonColor: "bg-sky-500",
    sendButtonColor: "bg-sky-500",
    messageColor: "bg-muted",
    userMessageColor: "bg-sky-500",
};