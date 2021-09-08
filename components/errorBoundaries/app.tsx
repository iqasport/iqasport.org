import ErrorBoundary from 'components/errorBoundaries';

const AppErrorBoundary = ({ children }) => (
  <ErrorBoundary
    renderError={
      <div
        style={{
          width: '100%',
          height: '100vh',
          background: '#EDF2F7',
          color: '#1A202C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'metropolis, sans-serif',
          flexDirection: 'column',
          margin: '-8px',
        }}
      >
        <h1 style={{ fontSize: '4rem', marginBottom: '0' }}>Error</h1>
        <p style={{ lineHeight: '1.5rem' }}>
          We are sorry an error has occured. Please refresh the page.
          <br /> If the error persists contact{' '}
          <a
            href="mailto:tech@iqasport.org"
            style={{ fontWeight: 'bold', color: '#1A202C' }}
          >
            our Technology Team
          </a>
        </p>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);

export default AppErrorBoundary;
