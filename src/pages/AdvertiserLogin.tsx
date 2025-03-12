
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import FadeIn from "@/components/animations/FadeIn";
import { useGoogleLogin } from "@react-oauth/google";
import { handleGoogleLoginSuccess, handleGoogleLoginError } from "@/lib/google-auth";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useAdvertiser } from "@/contexts/AdvertiserContext";

const AdvertiserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { advertiser } = useAdvertiser();
  
  // Redirect if already logged in
  useEffect(() => {
    if (advertiser) {
      navigate("/dashboard");
    }
  }, [advertiser, navigate]);
  
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);
        const result = await handleGoogleLoginSuccess(tokenResponse);
        if (result.success) {
          toast.success("Login com Google realizado com sucesso!");
          navigate("/dashboard");
        } else {
          toast.error("Falha ao fazer login com Google. Tente novamente.");
        }
      } catch (error) {
        toast.error("Ocorreu um erro durante o login com Google.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      handleGoogleLoginError();
      toast.error("Falha ao fazer login com Google. Tente novamente.");
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      
      if (error.message.includes("Invalid login credentials")) {
        toast.error("Email ou senha incorretos. Tente novamente.");
      } else {
        toast.error("Falha ao fazer login. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F0FB] px-4">
      <div className="absolute top-4 left-4 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/')}
          className="flex items-center justify-center rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Voltar para a página inicial</span>
        </Button>
      </div>
      
      <FadeIn>
        <Card className="w-full max-w-md shadow-sm border-[#e1e1e1] bg-white rounded-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-medium">Área do Anunciante</CardTitle>
            <CardDescription>
              Entre com seu e-mail e senha para gerenciar seus anúncios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="email"
                    placeholder="Seu e-mail"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Ocultar senha" : "Mostrar senha"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Lembrar-me
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-slate-700 hover:bg-slate-800 rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou</span>
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-gray-300 rounded-xl"
                onClick={() => googleLogin()}
                disabled={isLoading}
              >
                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
                Entrar com Google
              </Button>

              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Não tem uma conta?{" "}
                  <Link
                    to="/advertiser/register"
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Cadastre-se como anunciante
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default AdvertiserLogin;
