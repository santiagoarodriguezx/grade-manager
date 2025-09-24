"use client";

import { useState } from "react";
import {
  CalendarIcon,
  ArrowLeftIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const FullSchedule = ({ user }) => {
  const [selectedTrimester, setSelectedTrimester] = useState("trimester1");

  const trimesters = [
    { id: "trimester1", name: "Trimestre I", period: "Enero - Abril 2024" },
    { id: "trimester2", name: "Trimestre II", period: "Mayo - Agosto 2024" },
    {
      id: "trimester3",
      name: "Trimestre III",
      period: "Septiembre - Diciembre 2024",
    },
  ];

  const weeklySchedule = {
    trimester1: {
      Lunes: [
        {
          subject: "Matemáticas Aplicadas",
          time: "08:00 - 10:00",
          room: "Aula 201",
          professor: "Prof. García",
        },
        {
          subject: "Programación Web",
          time: "10:30 - 12:30",
          room: "Lab 1",
          professor: "Prof. López",
        },
        {
          subject: "Base de Datos",
          time: "14:00 - 16:00",
          room: "Lab 2",
          professor: "Prof. Martínez",
        },
      ],
      Martes: [
        {
          subject: "Sistemas Operativos",
          time: "08:00 - 10:00",
          room: "Aula 302",
          professor: "Prof. Torres",
        },
        {
          subject: "Matemáticas Aplicadas",
          time: "10:30 - 12:30",
          room: "Aula 201",
          professor: "Prof. García",
        },
        {
          subject: "Programación Web",
          time: "14:00 - 16:00",
          room: "Lab 1",
          professor: "Prof. López",
        },
      ],
      Miércoles: [
        {
          subject: "Base de Datos",
          time: "08:00 - 10:00",
          room: "Lab 2",
          professor: "Prof. Martínez",
        },
        {
          subject: "Sistemas Operativos",
          time: "10:30 - 12:30",
          room: "Aula 302",
          professor: "Prof. Torres",
        },
        {
          subject: "Matemáticas Aplicadas",
          time: "14:00 - 16:00",
          room: "Aula 201",
          professor: "Prof. García",
        },
      ],
      Jueves: [
        {
          subject: "Programación Web",
          time: "08:00 - 10:00",
          room: "Lab 1",
          professor: "Prof. López",
        },
        {
          subject: "Base de Datos",
          time: "10:30 - 12:30",
          room: "Lab 2",
          professor: "Prof. Martínez",
        },
        {
          subject: "Sistemas Operativos",
          time: "14:00 - 16:00",
          room: "Aula 302",
          professor: "Prof. Torres",
        },
      ],
      Viernes: [
        {
          subject: "Matemáticas Aplicadas",
          time: "08:00 - 10:00",
          room: "Aula 201",
          professor: "Prof. García",
        },
        {
          subject: "Programación Web",
          time: "10:30 - 12:30",
          room: "Lab 1",
          professor: "Prof. López",
        },
      ],
    },
  };

  const currentSchedule = weeklySchedule[selectedTrimester] || {};
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  const totalHoursPerWeek = Object.values(currentSchedule).flat().length * 2; // 2 horas por clase

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Horario Completo
              </h1>
              <p className="text-gray-600">
                Horario semanal de {user?.name || "Estudiante"}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Horas semanales</p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalHoursPerWeek}h
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trimester Selector */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Seleccionar Trimestre
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trimesters.map((trimester) => (
              <button
                key={trimester.id}
                onClick={() => setSelectedTrimester(trimester.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedTrimester === trimester.id
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <p className="font-semibold text-gray-900">{trimester.name}</p>
                <p className="text-sm text-gray-600">{trimester.period}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {days.map((day) => (
            <div key={day} className="glass-card p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <CalendarIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">
                {day}
              </h3>

              <div className="space-y-4">
                {currentSchedule[day] && currentSchedule[day].length > 0 ? (
                  currentSchedule[day].map((class_, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                    >
                      <h4 className="font-medium text-gray-900 mb-2">
                        {class_.subject}
                      </h4>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          {class_.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          {class_.room}
                        </div>
                        <p className="text-sm text-gray-500">
                          {class_.professor}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">Sin clases</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Summary */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resumen Semanal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <ClockIcon className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {totalHoursPerWeek}
              </p>
              <p className="text-sm text-gray-600">Horas totales</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                <CalendarIcon className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {Object.values(currentSchedule).flat().length}
              </p>
              <p className="text-sm text-gray-600">Clases por semana</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-2">
                <MapPinIcon className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {
                  [
                    ...new Set(
                      Object.values(currentSchedule)
                        .flat()
                        .map((c) => c.subject)
                    ),
                  ].length
                }
              </p>
              <p className="text-sm text-gray-600">Materias</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <CalendarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-600">Días académicos</p>
            </div>
          </div>
        </div>

        {Object.keys(currentSchedule).length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="h-24 w-24 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay horarios disponibles
            </h3>
            <p className="text-gray-600">
              El horario para este trimestre estará disponible próximamente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullSchedule;
