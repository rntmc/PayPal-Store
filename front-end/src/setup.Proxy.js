import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(app) {
  app.use(
    '/my-server',
    createProxyMiddleware({
      target: 'http://localhost:8888', // Altere para o URL do seu servidor local
      changeOrigin: true,
    })
  );
}