import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { rootStore } from '../stores/RootStore.ts'
import { Navbar } from '@/components/navbar.tsx';
import ApiService from '@/api/ApiService.ts';
import { ChatBotWidget } from '@/components/chat-bot-widget.tsx';



export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    if (!rootStore.token) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          ApiService.setAuthToken(token);
          await ApiService.me();
        } catch (error) {
          localStorage.removeItem('token');
          throw redirect({
            to: '/login',
          });
        }
      } else {
        throw redirect({
          to: '/login',
        });
      }
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <>
    <ChatBotWidget/>
    <Navbar />
    <Outlet />
  </>
}
