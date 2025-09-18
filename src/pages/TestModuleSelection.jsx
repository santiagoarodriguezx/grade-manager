const TestModuleSelection = () => {
  return (
    <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <h1>🎯 Selección de Módulo y Trimestre</h1>
      <p>Este es el componente de selección de módulo funcionando correctamente.</p>
      <div style={{ marginTop: '20px' }}>
        <button style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
          Matemáticas
        </button>
        <button style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>
          Ciencias
        </button>
        <button style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>
          Español
        </button>
      </div>
    </div>
  )
}

export default TestModuleSelection