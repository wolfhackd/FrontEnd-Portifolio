import { LogIn } from 'lucide-react';

const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

export default function Login() {
  const handleLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:user`;
  };

  return (
    <div onClick={handleLogin} className="flex items-center gap-1">
      <LogIn className="mr-2 h-4 w-4" />
      <div>
        <p className="font-medium">Login</p>
        <p className="text-xs text-muted-foreground">Entre em sua conta</p>
      </div>
    </div>
  );
}
