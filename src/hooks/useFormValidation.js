import { useState, useEffect } from 'react'

// Reglas de validación
const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Por favor ingresa un email válido'
  },
  password: {
    required: true,
    minLength: 6,
    message: 'La contraseña debe tener al menos 6 caracteres'
  }
}

export const useFormValidation = (initialState) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isValid, setIsValid] = useState(false)

  // Validar un campo específico
  const validateField = (name, value) => {
    const rule = validationRules[name]
    if (!rule) return ''

    if (rule.required && (!value || value.trim() === '')) {
      return `${name === 'email' ? 'Email' : 'Contraseña'} es requerido`
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message
    }

    if (rule.minLength && value.length < rule.minLength) {
      return rule.message
    }

    return ''
  }

  // Validar todos los campos
  const validateAll = () => {
    const newErrors = {}
    Object.keys(values).forEach(key => {
      const error = validateField(key, values[key])
      if (error) newErrors[key] = error
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))

    // Validar el campo si ya fue tocado
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  // Manejar cuando un campo pierde el foco
  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  // Resetear el formulario
  const reset = () => {
    setValues(initialState)
    setErrors({})
    setTouched({})
  }

  // Verificar si el formulario es válido
  useEffect(() => {
    const hasErrors = Object.values(errors).some(error => error !== '')
    const hasValues = Object.values(values).every(value => value !== '')
    setIsValid(hasValues && !hasErrors)
  }, [values, errors])

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validateAll,
    reset
  }
}