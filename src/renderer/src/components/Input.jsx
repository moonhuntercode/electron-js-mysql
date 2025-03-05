// src/renderer/src/components/Input.jsx

import React from 'react'
import PropTypes from 'prop-types'

/**
 * Componente Input reutilizable con mejoras de accesibilidad y estilo.
 * @param {string} label - Etiqueta del input.
 * @param {string} type - Tipo del input (text, password, etc.).
 * @param {string} value - Valor del input.
 * @param {function} onChange - Función para manejar el cambio del input.
 * @param {boolean} required - Indica si el input es requerido.
 * @param {string} id - ID del input (opcional, para accesibilidad).
 * @param {string} ariaLabel - Etiqueta ARIA para accesibilidad (opcional).
 * @param {string} ariaDescribedBy - ID del elemento que describe el input (opcional, para accesibilidad).
 * @param {string} autoComplete - Valor del atributo autoComplete (opcional).
 * @param {boolean} error - Indica si el input tiene un valor inválido.
 */
export function Input({
  label,
  type,
  value,
  onChange,
  required,
  id,
  ariaLabel,
  ariaDescribedBy,
  autoComplete,
  error
}) {
  return (
    <div className="input-container">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        id={id}
        className={`input-field ${error ? 'input-error' : ''}`}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        autoComplete={autoComplete}
        aria-invalid={error}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

// Validación de props con PropTypes
Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  ariaDescribedBy: PropTypes.string,
  autoComplete: PropTypes.string,
  error: PropTypes.string
}
