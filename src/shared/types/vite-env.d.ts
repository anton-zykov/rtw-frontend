interface ImportMetaEnv {
  readonly VITE_KEY_PATH: string
  readonly VITE_CERT_PATH: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
