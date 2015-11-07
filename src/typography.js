/**
 * Created by binggg on 2015/11/6.
 */

import fs from 'fs';
import path from 'path';
import { htmlToReactStyle } from './utils';
import { Text } from './supportedProperties'

const typographyFilePath = path.join(__dirname,'../bower_components/paper-styles/');
const fileContent = fs.readFileSync(typographyFilePath + 'typography.html', 'utf8');

function getTypography() {
    return htmlToReactStyle(fileContent, Text);
}

export default getTypography;