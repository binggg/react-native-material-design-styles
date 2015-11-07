/**
 * Created by binggg on 2015/11/6.
 */

import fs from 'fs';
import path from 'path';
import { colorToReactStyle } from './utils';

const typographyFilePath = path.join(__dirname,'../bower_components/paper-styles/');
const fileContent = fs.readFileSync(typographyFilePath + 'default-theme.html', 'utf8');

function getDefaultTheme() {
    return colorToReactStyle(fileContent);
}

export default getDefaultTheme;