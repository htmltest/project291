window.onload = function() {
    const html = document.documentElement;

    const fontsfile = document.createElement('link');
    fontsfile.href = pathTemplate + 'css/fonts.css';
    fontsfile.rel = 'stylesheet';
    document.head.appendChild(fontsfile);

    if (sessionStorage.fontsLoaded) {
        html.classList.add('fonts-loaded');
        window.setTimeout(function() { window.dispatchEvent(new Event('resize')); }, 500);
    } else {
        const script = document.createElement('script');
        script.src = pathTemplate + 'js/fontfaceobserver.js';
        script.async = true;

        script.onload = function () {
            const Inter300 = new FontFaceObserver('Inter', {
                weight: '300'
            });
            const Inter400 = new FontFaceObserver('Inter', {
                weight: 'normal'
            });
            const Inter500 = new FontFaceObserver('Inter', {
                weight: '500'
            });
            const PoliticaCondensed300 = new FontFaceObserver('PoliticaCondensed', {
                weight: '300'
            });

            Promise.all([
                Inter300.load(),
                Inter400.load(),
                Inter500.load(),
                PoliticaCondensed300.load()
            ]).then(function () {
                html.classList.add('fonts-loaded');
                sessionStorage.fontsLoaded = true;
                window.setTimeout(function() { window.dispatchEvent(new Event('resize')); }, 500);
            });
        };
        document.head.appendChild(script);
    }
}