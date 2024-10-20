
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const DB_URL: string;
	export const DB_USER: string;
	export const DB_PASSWORD: string;
	export const ALLUSERSPROFILE: string;
	export const APPDATA: string;
	export const COMMONPROGRAMFILES: string;
	export const COMPUTERNAME: string;
	export const COMSPEC: string;
	export const ChocolateyInstall: string;
	export const ChocolateyLastPathUpdate: string;
	export const ChocolateyToolsLocation: string;
	export const CommonProgramW6432: string;
	export const DENO_INSTALL: string;
	export const DriverData: string;
	export const EXEPATH: string;
	export const FIVEMYSQL: string;
	export const FIVEMYSQLDATA: string;
	export const GOPATH: string;
	export const HOME: string;
	export const HOMEDRIVE: string;
	export const HOMEPATH: string;
	export const JAVA_HOME: string;
	export const LOCALAPPDATA: string;
	export const LOGONSERVER: string;
	export const LUA_DEV: string;
	export const LUA_PATH: string;
	export const MSYS: string;
	export const MSYSTEM: string;
	export const NODE_ENV: string;
	export const NUMBER_OF_PROCESSORS: string;
	export const NVM_BIN: string;
	export const NVM_CD_FLAGS: string;
	export const NVM_DIR: string;
	export const NVM_INC: string;
	export const OS: string;
	export const OneDrive: string;
	export const PATH: string;
	export const PATHEXT: string;
	export const PHP_FCGI_MAX_REQUESTS: string;
	export const PLINK_PROTOCOL: string;
	export const PNPM_HOME: string;
	export const PROCESSOR_ARCHITECTURE: string;
	export const PROCESSOR_IDENTIFIER: string;
	export const PROCESSOR_LEVEL: string;
	export const PROCESSOR_REVISION: string;
	export const PROGRAMFILES: string;
	export const PSModulePath: string;
	export const PUBLIC: string;
	export const PWD: string;
	export const ProgramData: string;
	export const ProgramW6432: string;
	export const QT_AUTO_SCREEN_SCALE_FACTOR: string;
	export const QT_OPENGL: string;
	export const SESSIONNAME: string;
	export const SHLVL: string;
	export const STARSHIP_SESSION_KEY: string;
	export const STARSHIP_SHELL: string;
	export const SYSTEMDRIVE: string;
	export const SYSTEMROOT: string;
	export const TEMP: string;
	export const TERM: string;
	export const TERMINAL_EMULATOR: string;
	export const TERM_SESSION_ID: string;
	export const TMP: string;
	export const TOOLBOX_VERSION: string;
	export const USERDOMAIN: string;
	export const USERDOMAIN_ROAMINGPROFILE: string;
	export const USERNAME: string;
	export const USERPROFILE: string;
	export const VBOX_HWVIRTEX_IGNORE_SVM_IN_USE: string;
	export const WINDIR: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	export const PUBLIC_BASE_PATH: string;
	export const PUBLIC_DB_URL: string;
	export const PUBLIC_DB_USER: string;
	export const PUBLIC_DB_PASSWORD: string;
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		DB_URL: string;
		DB_USER: string;
		DB_PASSWORD: string;
		ALLUSERSPROFILE: string;
		APPDATA: string;
		COMMONPROGRAMFILES: string;
		COMPUTERNAME: string;
		COMSPEC: string;
		ChocolateyInstall: string;
		ChocolateyLastPathUpdate: string;
		ChocolateyToolsLocation: string;
		CommonProgramW6432: string;
		DENO_INSTALL: string;
		DriverData: string;
		EXEPATH: string;
		FIVEMYSQL: string;
		FIVEMYSQLDATA: string;
		GOPATH: string;
		HOME: string;
		HOMEDRIVE: string;
		HOMEPATH: string;
		JAVA_HOME: string;
		LOCALAPPDATA: string;
		LOGONSERVER: string;
		LUA_DEV: string;
		LUA_PATH: string;
		MSYS: string;
		MSYSTEM: string;
		NODE_ENV: string;
		NUMBER_OF_PROCESSORS: string;
		NVM_BIN: string;
		NVM_CD_FLAGS: string;
		NVM_DIR: string;
		NVM_INC: string;
		OS: string;
		OneDrive: string;
		PATH: string;
		PATHEXT: string;
		PHP_FCGI_MAX_REQUESTS: string;
		PLINK_PROTOCOL: string;
		PNPM_HOME: string;
		PROCESSOR_ARCHITECTURE: string;
		PROCESSOR_IDENTIFIER: string;
		PROCESSOR_LEVEL: string;
		PROCESSOR_REVISION: string;
		PROGRAMFILES: string;
		PSModulePath: string;
		PUBLIC: string;
		PWD: string;
		ProgramData: string;
		ProgramW6432: string;
		QT_AUTO_SCREEN_SCALE_FACTOR: string;
		QT_OPENGL: string;
		SESSIONNAME: string;
		SHLVL: string;
		STARSHIP_SESSION_KEY: string;
		STARSHIP_SHELL: string;
		SYSTEMDRIVE: string;
		SYSTEMROOT: string;
		TEMP: string;
		TERM: string;
		TERMINAL_EMULATOR: string;
		TERM_SESSION_ID: string;
		TMP: string;
		TOOLBOX_VERSION: string;
		USERDOMAIN: string;
		USERDOMAIN_ROAMINGPROFILE: string;
		USERNAME: string;
		USERPROFILE: string;
		VBOX_HWVIRTEX_IGNORE_SVM_IN_USE: string;
		WINDIR: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		PUBLIC_BASE_PATH: string;
		PUBLIC_DB_URL: string;
		PUBLIC_DB_USER: string;
		PUBLIC_DB_PASSWORD: string;
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
