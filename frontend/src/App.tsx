import { useEffect, useState } from 'react'
import { Tasks } from './page/Tasks'
import { Login } from './page/Login'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { authService } from './providers/AuthService';
import { Button } from './components/ui/button';

function App() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    authService.subscribe(setIsAuthed);  
    if (localStorage.getItem('refreshToken')) {
      authService.refreshToken();
    }
    return () => authService.unsubscribe(setIsAuthed);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Manager</CardTitle>
        <CardDescription className="flex justify-between">
          <span>Manage your tasks</span>
          {isAuthed && <Button variant="outline" onClick={() => authService.logout()}>Logout</Button>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isAuthed ? (
          <Tasks />
        ) : (
          <Login />
        )}
      </CardContent>
      <CardFooter>
        <div>(c) mainglot</div>
      </CardFooter>
    </Card>
  )
}

export default App
