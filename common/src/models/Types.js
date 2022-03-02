"use strict";
exports.__esModule = true;
exports.KanjiSize = exports.PageType = exports.CollectionType = void 0;
var CollectionType;
(function (CollectionType) {
    CollectionType["JLPT"] = "jlpt";
    CollectionType["WANIKANI"] = "wanikani";
    CollectionType["GRADE"] = "grade";
    CollectionType["FREQUENCY"] = "frequency";
    CollectionType["KANJIGARDEN"] = "kanjigarden";
})(CollectionType = exports.CollectionType || (exports.CollectionType = {}));
var PageType;
(function (PageType) {
    /**
     * Paper Size: 210mm x 297mm
     */
    PageType["A4"] = "A4";
    /**
     * Paper Size: 148mm x 210mm
     */
    PageType["A5"] = "A5";
    /**
     * Paper Size: 215.9mm x 279.4mm
     */
    PageType["US_LETTER"] = "US Letter";
    /**
     * Paper Size: 215.9mm x 355.6mm
     */
    PageType["US_LEGAL"] = "US Legal";
    /**
     * Paper Size: 174mm x 235mm
     */
    PageType["REMARKABLE_2"] = "ReMarkable 2"; //  ??
})(PageType = exports.PageType || (exports.PageType = {}));
var KanjiSize;
(function (KanjiSize) {
    KanjiSize["MM10"] = "10mm";
    KanjiSize["MM13"] = "13mm";
    KanjiSize["MM15"] = "15mm";
})(KanjiSize = exports.KanjiSize || (exports.KanjiSize = {}));
