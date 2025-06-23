// Declaraciones de tipos para Module Federation
// Aquí se configurarán los tipos para el nuevo MFE

// Dashboard MFE - React + Vite
declare module 'mfeDashboard/Dashboard' {
  const Dashboard: React.ComponentType<any>;
  export default Dashboard;
}

// SimpleTest MFE - React + Vite (para testing sin hooks)
declare module 'mfeDashboard/SimpleTest' {
  const SimpleTest: React.ComponentType<any>;
  export default SimpleTest;
}

// SimpleHooksTest MFE - React + Vite (para testing con hooks)
declare module 'mfeDashboard/SimpleHooksTest' {
  const SimpleHooksTest: React.ComponentType<any>;
  export default SimpleHooksTest;
}
