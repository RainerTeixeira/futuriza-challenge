(function() {
  'use strict';

  var API_URL = 'http://localhost:3000';
  var BANNER_ID = 'magic-banner-container';
  var CLOSED_KEY = 'magic-banner-closed';

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function getBannerUrl() {
    var script = document.currentScript || document.querySelector('script[src*="magic-banner.js"]');
    var dataUrl = script && script.getAttribute('data-url');
    return dataUrl || window.location.href;
  }

  function getApiUrl() {
    var script = document.currentScript || document.querySelector('script[src*="magic-banner.js"]');
    var dataApi = script && script.getAttribute('data-api');
    return dataApi || API_URL;
  }

  function isBannerClosed(bannerId) {
    try {
      var closed = localStorage.getItem(CLOSED_KEY);
      return closed === bannerId;
    } catch (e) {
      return false;
    }
  }

  function setBannerClosed(bannerId) {
    try {
      localStorage.setItem(CLOSED_KEY, bannerId);
    } catch (e) {}
  }

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

  function injectBanner(banner) {
    if (isBannerClosed(banner.id)) {
      return;
    }

    var container = document.createElement('div');
    container.id = BANNER_ID;
    container.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:999999;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.15);opacity:0;transform:translateY(-100%);transition:opacity 0.3s,transform 0.3s;';

    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = 'position:absolute;top:8px;right:8px;background:rgba(0,0,0,0.5);color:#fff;border:none;border-radius:50%;width:28px;height:28px;font-size:20px;line-height:1;cursor:pointer;z-index:1;';
    closeBtn.onclick = function() {
      setBannerClosed(banner.id);
      removeBanner();
    };

    var link = document.createElement('a');
    link.href = escapeHtml(banner.url);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.cssText = 'display:block;text-decoration:none;';

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

    container.appendChild(closeBtn);
    container.appendChild(link);

    var target = document.body;
    var script = document.currentScript || document.querySelector('script[src*="magic-banner.js"]');
    var dataTarget = script && script.getAttribute('data-target');
    if (dataTarget) {
      var customTarget = document.querySelector(dataTarget);
      if (customTarget) {
        target = customTarget;
      }
    }

    target.insertBefore(container, target.firstChild);

    setTimeout(function() {
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    }, 10);

    var bodyPadding = parseInt(window.getComputedStyle(document.body).paddingTop) || 0;
    document.body.style.paddingTop = (bodyPadding + container.offsetHeight) + 'px';
  }

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchBanner);
  } else {
    fetchBanner();
  }
})();
