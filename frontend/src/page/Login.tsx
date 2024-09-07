import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/providers/AuthService";
import { useState } from "react";

export function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await authService.login(name, password);
  };

  return (
    <>
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="w-[400px]">
                <Input
                    className="m-2"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    className="m-2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="m-2" type="submit">Login</Button>
            </form>
        </div>
    </>
  );
}