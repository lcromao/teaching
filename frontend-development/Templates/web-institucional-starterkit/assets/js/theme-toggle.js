/**
 * Theme Toggle Script
 * Gerencia a alternância entre modo claro e escuro
 * Persistência através de localStorage
 */

(function () {
	"use strict";

	// Configurações
	const THEME_KEY = "site-theme";
	const THEME_DARK = "dark";
	const THEME_LIGHT = "light";

	// Elementos
	let themeToggleBtn = null;
	let themeIcon = null;

	/**
	 * Obtém o tema atual do localStorage ou do sistema
	 */
	function getCurrentTheme() {
		const storedTheme = localStorage.getItem(THEME_KEY);

		if (storedTheme) {
			return storedTheme;
		}

		// Verifica preferência do sistema
		if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			return THEME_DARK;
		}

		return THEME_LIGHT;
	}

	/**
	 * Aplica o tema ao documento
	 */
	function applyTheme(theme) {
		const root = document.documentElement;

		if (theme === THEME_DARK) {
			root.setAttribute("data-theme", THEME_DARK);
			updateThemeIcon(THEME_DARK);
		} else {
			root.removeAttribute("data-theme");
			updateThemeIcon(THEME_LIGHT);
		}

		// Salva no localStorage
		localStorage.setItem(THEME_KEY, theme);
	}

	/**
	 * Atualiza o ícone do botão de alternância
	 */
	function updateThemeIcon(theme) {
		if (!themeIcon) return;

		if (theme === THEME_DARK) {
			themeIcon.innerHTML = "☀️"; // Sol para modo escuro (para mudar para claro)
			if (themeToggleBtn) {
				themeToggleBtn.setAttribute("aria-label", "Ativar modo claro");
				themeToggleBtn.setAttribute("title", "Ativar modo claro");
			}
		} else {
			themeIcon.innerHTML = "🌙"; // Lua para modo claro (para mudar para escuro)
			if (themeToggleBtn) {
				themeToggleBtn.setAttribute("aria-label", "Ativar modo escuro");
				themeToggleBtn.setAttribute("title", "Ativar modo escuro");
			}
		}
	}

	/**
	 * Alterna entre os temas
	 */
	function toggleTheme() {
		const currentTheme = getCurrentTheme();
		const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;

		applyTheme(newTheme);

		// Adiciona animação suave
		document.body.style.transition =
			"background-color 0.3s ease, color 0.3s ease";
		setTimeout(() => {
			document.body.style.transition = "";
		}, 300);
	}

	/**
	 * Inicializa o tema ao carregar a página
	 */
	function initTheme() {
		// Aplica o tema antes do carregamento completo para evitar flash
		const theme = getCurrentTheme();
		applyTheme(theme);
	}

	/**
	 * Configura os event listeners
	 */
	function setupEventListeners() {
		themeToggleBtn = document.getElementById("theme-toggle");
		themeIcon = document.getElementById("theme-icon");

		if (themeToggleBtn) {
			themeToggleBtn.addEventListener("click", toggleTheme);

			// Atualiza o ícone inicial
			const currentTheme = getCurrentTheme();
			updateThemeIcon(currentTheme);
		}

		// Detecta mudanças na preferência do sistema
		if (window.matchMedia) {
			window
				.matchMedia("(prefers-color-scheme: dark)")
				.addEventListener("change", (e) => {
					// Só aplica se o usuário não tiver preferência salva
					if (!localStorage.getItem(THEME_KEY)) {
						const newTheme = e.matches ? THEME_DARK : THEME_LIGHT;
						applyTheme(newTheme);
					}
				});
		}
	}

	/**
	 * Inicialização imediata do tema (antes do DOM)
	 */
	initTheme();

	/**
	 * Configuração após o DOM estar pronto
	 */
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", setupEventListeners);
	} else {
		setupEventListeners();
	}

	// Exporta funções para uso externo (opcional)
	window.ThemeManager = {
		toggle: toggleTheme,
		setTheme: applyTheme,
		getCurrentTheme: getCurrentTheme,
		THEME_DARK: THEME_DARK,
		THEME_LIGHT: THEME_LIGHT,
	};
})();
