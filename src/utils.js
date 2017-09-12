export const toCamelCase = function (s1) {
    return s1.replace(/\-(\w)/g, function (x) {
        return x.slice(1).toUpperCase();
    });
};

export const htmlToReactStyle = function (fileContent, Text) {
    let classes = fileContent.match(/--[^\{\}]+\{[^\{\}]*}/mg);
    let classObj = {};

    for (let i in classes) {
        const cls = classes[i];
        let clearCls = cls.replace(/\s/g, '');
        let className = clearCls.match(/--[^:\{]*/)[0].slice(2);
        let classNameCamel = toCamelCase(className);
        let rules = clearCls.match(/[\{;\/][^;\*\/}]+/g);

        classObj[classNameCamel] = {};

        for (let j in rules) {
            const rule = rules[j];
            const clearRule = rule.slice(1);
            let [ prop, value ]  = clearRule.split(':');
            const propCamel = toCamelCase(prop);
            const supportedPrpps = Object.keys(Text);

            if (supportedPrpps.indexOf(propCamel) !== -1) {
                if (Text[propCamel] === 'number') {
                    value = value.replace(/px|rem|em/g, '');
                }
                if(propCamel === 'fontFamily'){
                    // React native (iOS) doesn't support multiple font families in the styles
                    // Presumably because you ship fonts with the app.
                    var fonts = value.split(',');
                    if(fonts.length > 1){
                        value = fonts[0];
                    }
                }
                value = value.replace(/'/g, '');
                if (!/[^0-9\-\.]/.test(value) && propCamel != 'fontWeight') {
                    value = Number(value);
                }
                classObj[classNameCamel][propCamel] = value;
            }
        }
    }

    return classObj;
};

export const colorToReactStyle = function (fileContent) {
    let classes = fileContent.match(/--[^;\@\>/\n]+/mg)
    let classObj = {};
    for (let i in classes) {
        const cls = classes[i];
        let clearCls = cls.replace(/\s/g, '');
        let [ className, value ]  = clearCls.split(':');
        let clearClassName = className.slice(2);
        let classNameCamel = toCamelCase(clearClassName);

        classObj[classNameCamel] = {};

        if (value && value.indexOf('#') != -1) {
            classObj[classNameCamel]['color'] = value;
        }

        if (classNameCamel.indexOf('Opacity') != -1) {
            classObj[classNameCamel]['opacity'] = Number(value);
        }
    }

    return classObj;
};