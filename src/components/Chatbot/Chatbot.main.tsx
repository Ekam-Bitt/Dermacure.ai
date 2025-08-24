import React, { useEffect } from 'react';

const BotsonicWidget: React.FC = () => {
  useEffect(() => {
    (function (
      w: any,
      d: any,
      s: any,
      o: any,
      f: any,
      js: HTMLScriptElement,
      fjs: HTMLScriptElement
    ) {
      w['botsonic_widget'] = o;
      w[o] =
        w[o] ||
        function () {
          (w[o].q = w[o].q || []).push(arguments);
        };
      (js = d.createElement(s)), (fjs = d.getElementsByTagName(s)[0]);
      js.id = o;
      js.src = f;
      js.async = true;
      fjs.parentNode!.insertBefore(js, fjs);
    })(
      window,
      document,
      'script',
      'Botsonic',
      'https://widget.writesonic.com/CDN/botsonic.min.js',
      document.createElement('script'),
      document.getElementsByTagName('script')[0]
    );

    (window as any).Botsonic('init', {
      serviceBaseUrl: 'https://api.botsonic.ai',
      token: 'bf47e39e-e149-4a73-9d63-a73535fb1c03'
    });
  }, []);

  return null;
};

export default BotsonicWidget;
