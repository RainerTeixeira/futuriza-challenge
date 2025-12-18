/**
 * Magic Banner Plugin v1.0.0
 * 
 * @description Plugin JavaScript para exibição de banners dinâmicos em qualquer site.
 *              Carrega banners configurados via API, com suporte a agendamento,
 *              animações CSS e persistência de estado no localStorage.
 * 
 * @author Rainer Oliveira Teixeira
 * @license MIT
 * @repository https://github.com/RainerTeixeira/futuriza-challenge
 * 
 * @example Uso básico
 * <script src="https://futuriza-challenge.vercel.app/magic-banner.js"></script>
 * 
 * @example Uso com configurações customizadas
 * <script 
 *   src="https://futuriza-challenge.vercel.app/magic-banner.js"
 *   data-url="https://meusite.com/produto/123"
 *   data-api="https://futuriza-challenge.vercel.app"
 *   data-target="body">
 * </script>
 * 
 * @features
 * - Carregamento assíncrono (não bloqueia renderização da página)
 * - Compatibilidade ES5 (funciona em navegadores antigos)
 * - Animações CSS suaves (slide-in/fade-out)
 * - Persistência no localStorage (banner fechado não reaparece)
 * - Escape de HTML para segurança
 * - Ajuste automático de padding do body
 * - Atributos customizáveis (data-url, data-api, data-target)
 * - Tratamento de erros silencioso
 * 
 * @size ~2KB (minificado)
 */
(function() {
  'use strict';

  /**
   * URL base da API para buscar banners
   * @constant {string}
   * @default 'https://futuriza-challenge.vercel.app'
   */
  var API_URL = 'https://futuriza-challenge.vercel.app';
  
  /**
   * ID do elemento DOM do container do banner
   * @constant {string}
   * @default 'magic-banner-container'
   */
  var BANNER_ID = 'magic-banner-container';
  
  /**
   * Chave do localStorage para persistir estado de fechamento
   * @constant {string}
   * @default 'magic-banner-closed'
   */
  var CLOSED_KEY = 'magic-banner-closed';

  /**
   * Escapa caracteres HTML para prevenir XSS
   * @function escapeHtml
   * @param {string} text - Texto a ser escapado
   * @returns {string} Texto com caracteres HTML escapados
   * @example
   * escapeHtml('<script>alert("xss")</script>') 
   * // Retorna: '&lt;script&gt;alert("xss")&lt;/script&gt;'
   */
  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Obtém a URL para buscar o banner
   * @function getBannerUrl
   * @returns {string} URL customizada (data-url) ou URL atual da página
   * @description Prioriza o atributo data-url do script, caso contrário usa window.location.href
   */
  function getBannerUrl() {
    var script = document.currentScript || document.querySelector('script[src*="magic-banner.js"]');
    var dataUrl = script && script.getAttribute('data-url');
    return dataUrl || window.location.href;
  }

  /**
   * Obtém a URL base da API
   * @function getApiUrl
   * @returns {string} URL customizada (data-api) ou URL padrão da API
   * @description Permite customizar o endpoint da API via atributo data-api
   */
  function getApiUrl() {
    var script = document.currentScript || document.querySelector('script[src*="magic-banner.js"]');
    var dataApi = script && script.getAttribute('data-api');
    return dataApi || API_URL;
  }

  /**
   * Verifica se o banner foi fechado pelo usuário
   * @function isBannerClosed
   * @param {string} bannerId - ID do banner a verificar
   * @returns {boolean} true se o banner foi fechado, false caso contrário
   * @description Consulta localStorage para verificar se o usuário já fechou este banner
   */
  function isBannerClosed(bannerId) {
    try {
      var closed = localStorage.getItem(CLOSED_KEY);
      return closed === bannerId;
    } catch (e) {
      return false;
    }
  }

  /**
   * Marca o banner como fechado no localStorage
   * @function setBannerClosed
   * @param {string} bannerId - ID do banner a marcar como fechado
   * @description Persiste o estado de fechamento para não exibir o banner novamente
   */
  function setBannerClosed(bannerId) {
    try {
      localStorage.setItem(CLOSED_KEY, bannerId);
    } catch (e) {}
  }

  /**
   * Remove o banner do DOM com animação de fade-out
   * @function removeBanner
   * @description Aplica animação de fade-out (300ms) antes de remover o elemento do DOM
   */
  function removeBanner() {
    var container = document.getElementById(BANNER_ID);
    if (container) {
      container.style.opacity = '0';
      setTimeout(function() {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
      }, 300);
    }
  }

  /**
   * Injeta o banner no DOM da página
   * @function injectBanner
   * @param {Object} banner - Objeto do banner retornado pela API
   * @param {string} banner.id - ID único do banner
   * @param {string} banner.url - URL de destino ao clicar no banner
   * @param {string} [banner.image_url] - URL da imagem do banner (opcional)
   * @description Cria e injeta o banner no topo da página com animações CSS.
   *              Adiciona botão de fechar, ajusta padding do body e aplica estilos inline.
   */
  function injectBanner(banner) {
    if (isBannerClosed(banner.id)) {
      return;
    }

    // Cria container principal do banner
    var container = document.createElement('div');
    container.id = BANNER_ID;
    container.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:999999;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.15);opacity:0;transform:translateY(-100%);transition:opacity 0.3s,transform 0.3s;';

    // Cria botão de fechar (X)
    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = 'position:absolute;top:8px;right:8px;background:rgba(0,0,0,0.5);color:#fff;border:none;border-radius:50%;width:28px;height:28px;font-size:20px;line-height:1;cursor:pointer;z-index:1;';
    closeBtn.onclick = function() {
      setBannerClosed(banner.id);
      removeBanner();
    };

    // Cria link clicável do banner
    var link = document.createElement('a');
    link.href = escapeHtml(banner.url);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.cssText = 'display:block;text-decoration:none;';

    // Adiciona imagem ou texto ao banner
    if (banner.image_url) {
      var img = document.createElement('img');
      img.src = escapeHtml(banner.image_url);
      img.alt = 'Banner';
      img.style.cssText = 'width:100%;height:auto;display:block;';
      link.appendChild(img);
    } else {
      var textDiv = document.createElement('div');
      textDiv.textContent = banner.url;
      textDiv.style.cssText = 'padding:16px;color:#333;';
      link.appendChild(textDiv);
    }

    // Monta estrutura do banner
    container.appendChild(closeBtn);
    container.appendChild(link);

    // Define onde injetar o banner (body ou seletor customizado)
    var target = document.body;
    var script = document.currentScript || document.querySelector('script[src*="magic-banner.js"]');
    var dataTarget = script && script.getAttribute('data-target');
    if (dataTarget) {
      var customTarget = document.querySelector(dataTarget);
      if (customTarget) {
        target = customTarget;
      }
    }

    // Injeta banner no DOM
    target.insertBefore(container, target.firstChild);

    // Aplica animação de slide-in após pequeno delay
    setTimeout(function() {
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    }, 10);

    // Ajusta padding do body para não sobrepor conteúdo
    var bodyPadding = parseInt(window.getComputedStyle(document.body).paddingTop) || 0;
    document.body.style.paddingTop = (bodyPadding + container.offsetHeight) + 'px';
  }

  /**
   * Busca banner ativo na API e injeta na página
   * @function fetchBanner
   * @description Faz requisição GET para a API, valida resposta e injeta banner se encontrado.
   *              Trata erros silenciosamente para não quebrar a página hospedeira.
   */
  function fetchBanner() {
    var url = getBannerUrl();
    var apiUrl = getApiUrl();
    var endpoint = apiUrl + '/api/banners?url=' + encodeURIComponent(url);

    fetch(endpoint)
      .then(function(response) {
        if (!response.ok) {
          if (response.status === 404) {
            return null;
          }
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(function(banner) {
        if (banner) {
          injectBanner(banner);
        }
      })
      .catch(function(error) {
        console.warn('Magic Banner: Failed to load banner', error);
      });
  }

  // Inicializa o plugin quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchBanner);
  } else {
    fetchBanner();
  }
})();
