"use client";

import { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  SparklesIcon,
  AcademicCapIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import { useFormValidation } from "../hooks/useFormValidation";

const Login = ({ onLoginSuccess }) => {
  const {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validateAll,
    reset,
  } = useFormValidation({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [userType, setUserType] = useState("estudiante"); // "estudiante" or "aprendiz"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateAll()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
          let isValidLogin = false;
          let userData = {};

          if (userType === "estudiante") {
            // Credenciales para estudiantes
            if (
              values.email === "estudiante@grademanager.com" &&
              values.password === "est123"
            ) {
              isValidLogin = true;
              userData = {
                email: values.email,
                name: "Juan Pérez",
                type: "estudiante",
                role: "Estudiante",
              };
            }
          } else if (userType === "aprendiz") {
            // Credenciales para aprendices
            if (
              values.email === "aprendiz@grademanager.com" &&
              values.password === "apr123"
            ) {
              isValidLogin = true;
              userData = {
                email: values.email,
                name: "María González",
                type: "aprendiz",
                role: "Aprendiz",
              };
            }
          }

          if (isValidLogin) {
            resolve({ message: "Login exitoso", userData });
          } else {
            reject(`Credenciales incorrectas para ${userType}`);
          }
        }, 2000);
      });

      console.log("Login exitoso:", values, "Tipo:", userType);
      reset();

      if (onLoginSuccess) {
        onLoginSuccess(result.userData);
      } else {
        alert(`¡Login exitoso! Bienvenido ${userType}.`);
      }
    } catch (error) {
      setSubmitError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="text-center animate-scale-in">
        <div className="mx-auto h-24 w-24 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-2xl animate-pulse-glow mb-8">
          <SparklesIcon className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-4 text-shadow">
          Grade Manager
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          Sistema Inteligente de Gestión Académica
        </p>
        <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mt-4"></div>
      </div>

      {/* User Type Selection */}
      <div className="glass-card p-6 animate-fade-in-up">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Selecciona tu tipo de usuario
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setUserType("estudiante")}
            className={`p-4 rounded-2xl transition-all duration-300 border-2 ${
              userType === "estudiante"
                ? "bg-gradient-primary border-purple-400 text-white shadow-lg neon-glow"
                : "bg-gray-800/50 border-gray-600 text-gray-400 hover:border-gray-500 hover:bg-gray-700/50"
            }`}
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <AcademicCapIcon className="h-6 w-6 text-white" />
              </div>
              <div className="font-bold">Estudiante</div>
              <div className="text-xs mt-1 opacity-75">
                Acceso a calificaciones
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setUserType("aprendiz")}
            className={`p-4 rounded-2xl transition-all duration-300 border-2 ${
              userType === "aprendiz"
                ? "bg-gradient-primary border-purple-400 text-white shadow-lg neon-glow"
                : "bg-gray-800/50 border-gray-600 text-gray-400 hover:border-gray-500 hover:bg-gray-700/50"
            }`}
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                <CogIcon className="h-6 w-6 text-white" />
              </div>
              <div className="font-bold">Aprendiz</div>
              <div className="text-xs mt-1 opacity-75">
                Acceso especializado
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="glass-card p-8 animate-fade-in-up stagger-1">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Submit Error */}
          {submitError && (
            <div className="bg-gradient-danger p-4 rounded-2xl text-white animate-scale-in">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <span className="text-sm">!</span>
                </div>
                <span className="font-medium">{submitError}</span>
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-300 uppercase tracking-wider"
            >
              Correo Electrónico
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`input-modern pl-12 ${
                  errors.email && touched.email
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }`}
                placeholder={
                  userType === "estudiante"
                    ? "estudiante@grademanager.com"
                    : "aprendiz@grademanager.com"
                }
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <div className="w-6 h-6 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-white text-sm">@</span>
                </div>
              </div>
            </div>
            {errors.email && touched.email && (
              <p className="text-sm text-red-400 animate-fade-in-up flex items-center">
                <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center mr-2 text-xs">
                  !
                </span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-300 uppercase tracking-wider"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className={`input-modern pl-12 pr-12 ${
                  errors.password && touched.password
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }`}
                placeholder={userType === "estudiante" ? "est123" : "apr123"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <div className="w-6 h-6 rounded-lg bg-gradient-secondary flex items-center justify-center">
                  <span className="text-white text-sm">*</span>
                </div>
              </div>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                <div className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
                  {showPassword ? (
                    <EyeSlashIcon className="h-4 w-4 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="text-sm text-red-400 animate-fade-in-up flex items-center">
                <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center mr-2 text-xs">
                  !
                </span>
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only" />
              <div className="w-5 h-5 rounded-lg border-2 border-gray-600 flex items-center justify-center mr-3 transition-all">
                <div className="w-3 h-3 rounded bg-gradient-primary opacity-0 transition-opacity"></div>
              </div>
              <span className="text-sm text-gray-400 font-medium">
                Recordarme
              </span>
            </label>

            <a
              href="#"
              className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading || !isValid}
            className="btn-modern w-full py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                Iniciando sesión...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 mr-2" />
                Iniciar Sesión
              </div>
            )}
          </button>

          {/* Register link */}
          <div className="text-center pt-4">
            <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">
                Credenciales de prueba:
              </h4>
              {userType === "estudiante" ? (
                <div className="text-xs text-gray-400">
                  <p>
                    <strong>Email:</strong> estudiante@grademanager.com
                  </p>
                  <p>
                    <strong>Contraseña:</strong> est123
                  </p>
                </div>
              ) : (
                <div className="text-xs text-gray-400">
                  <p>
                    <strong>Email:</strong> aprendiz@grademanager.com
                  </p>
                  <p>
                    <strong>Contraseña:</strong> apr123
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
