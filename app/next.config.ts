/** @type {import('next').NextConfig} */
const config = {
  crossOrigin: 'anonymous',
  experimental: {
    serverActions: {
      allowedForwardedHosts: ['effective-system-5457w65966qf77x5-8443.app.github.dev'],
      allowedDevOrigins: [
        'localhost:3000',
        'localhost',
        'localhost:443',
        'localhost:8443',
        'effective-system-5457w65966qf77x5-8443.app.github.dev'
      ],
    }
  },
}

module.exports = config