"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var promises_1 = require("fs/promises");
// UTILITIES
// const lorem = new LoremIpsum({
//   sentencesPerParagraph: {
//     max: 40,
//     min: 4,
//   },
//   wordsPerSentence: {
//     max: 30,
//     min: 10,
//   },
// });
// const getRandomDate = (start: Date, end:Date) => {
//   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// };
// const getList = (length: number) => [...Array(length).keys()];
// const getRanomdHeader = () => '#' + lorem.generateWords(getRandomValue(2, 5));
// const generateArticleBody = () => getList(getRandomValue(4, 13)).reduce((body) => {
//   const section = getRanomdHeader() + '\n' + lorem.generateParagraphs(3) + '\n ';
//   return body + section;
// } ,'');
// // MAIN
// const articleNames = Array.from({ length: 15 }, () => lorem.generateWords(1));
// articleNames.forEach((name) => {
// const articleContent = `---
// title: '${lorem.generateWords(getRandomValue(2, 6))}'
// date: '${getRandomDate(new Date(2012, 0, 1), new Date()).toISOString()}'
// description: "${lorem.generateSentences(getRandomValue(4, 7))}"
// thumbnailUrl: "https://source.unsplash.com/random/500x50${getRandomValue(0,9)}"
// tags: ${JSON.stringify(lorem.generateWords(5).split(" "))}
// ---
// ${generateArticleBody()}
// `;
//   writeFileSync(
//     resolve(__dirname, name + ".mdx"),
//     articleContent
//   );
// });
void function () {
    return __awaiter(this, void 0, void 0, function () {
        var articleNames;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, promises_1.readdir)(__dirname)];
                case 1:
                    articleNames = (_a.sent()).filter(function (src) { return src.endsWith('.mdx'); });
                    console.log(articleNames);
                    return [2 /*return*/];
            }
        });
    });
}();
