import { createContext, useContext, useState, useEffect } from "react";

const AcademicContext = createContext();

export const useAcademic = () => {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error("useAcademic must be used within an AcademicProvider");
  }
  return context;
};

export const AcademicProvider = ({ children }) => {
  const [academicSelection, setAcademicSelection] = useState(() => {
    // Recuperar datos del localStorage al inicializar solo en el cliente
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("academicSelection");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  // Guardar en localStorage cuando cambie la selección
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (academicSelection) {
        localStorage.setItem(
          "academicSelection",
          JSON.stringify(academicSelection)
        );
      } else {
        localStorage.removeItem("academicSelection");
      }
    }
  }, [academicSelection]);

  const saveAcademicSelection = (moduleData, trimesterData) => {
    const selection = {
      module: moduleData,
      trimester: trimesterData,
      timestamp: new Date().toISOString(),
    };
    setAcademicSelection(selection);
  };

  const clearAcademicSelection = () => {
    setAcademicSelection(null);
  };

  const hasAcademicSelection = () => {
    return (
      academicSelection !== null &&
      academicSelection.module &&
      academicSelection.trimester
    );
  };

  const getAcademicSummary = () => {
    if (!hasAcademicSelection()) return null;

    return {
      module: academicSelection.module,
      trimester: academicSelection.trimester,
      displayName: `${academicSelection.module.name} - ${academicSelection.trimester.name}`,
      period: academicSelection.trimester.period,
      timestamp: academicSelection.timestamp,
    };
  };

  const value = {
    academicSelection,
    saveAcademicSelection,
    clearAcademicSelection,
    hasAcademicSelection,
    getAcademicSummary,
  };

  return (
    <AcademicContext.Provider value={value}>
      {children}
    </AcademicContext.Provider>
  );
};
