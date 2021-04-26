/*
 * @Author: atdow
 * @Date: 2021-04-26 17:24:34
 * @LastEditors: null
 * @LastEditTime: 2021-04-26 17:32:00
 * @Description: file content
 */
import '/@/design/index.less';
import 'virtual:windi.css';

import { createApp } from 'vue';
import App from './App.vue';
import { initAppConfigStore } from '/@/logics/initAppConfig';
import router, { setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupStore } from '/@/store';
import { setupErrorHandle } from '/@/logics/error-handle';
import { setupGlobDirectives } from '/@/directives';
import { setupI18n } from '/@/locales/setupI18n';
import { registerGlobComp } from '/@/components/registerGlobComp';

// Register icon Sprite
import 'vite-plugin-svg-icons/register';

// 加快开发模式的速度
if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

(async () => {
  const app = createApp(App);

  // Configure vuex store
  setupStore(app);

  // Initialize internal system configuration
  initAppConfigStore();

  // Register global components
  registerGlobComp(app);

  // Multilingual configuration
  await setupI18n(app);

  // Configure routing
  setupRouter(app);

  // router-guard
  setupRouterGuard();

  // Register global directive
  setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);

  // Mount when the route is ready
  // https://next.router.vuejs.org/api/#isready
  await router.isReady();

  app.mount('#app', true);

  if (import.meta.env.DEV) {
    window.__APP__ = app;
  }
})();
