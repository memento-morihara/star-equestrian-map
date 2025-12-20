interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_PUBLIC_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
