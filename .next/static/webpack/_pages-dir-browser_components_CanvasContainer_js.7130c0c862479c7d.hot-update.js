"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("_pages-dir-browser_components_CanvasContainer_js",{

/***/ "(pages-dir-browser)/./components/DisplayCanvas.js":
/*!*************************************!*\
  !*** ./components/DisplayCanvas.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(pages-dir-browser)/./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _barrel_optimize_names_LoaderCircle_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=LoaderCircle,Sparkles!=!lucide-react */ \"(pages-dir-browser)/__barrel_optimize__?names=LoaderCircle,Sparkles!=!./node_modules/lucide-react/dist/esm/lucide-react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(pages-dir-browser)/./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _ActionBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ActionBar */ \"(pages-dir-browser)/./components/ActionBar.js\");\n\nvar _s = $RefreshSig$();\n\n\n\nconst DisplayCanvas = (param)=>{\n    let { displayCanvasRef, isLoading, handleSaveImage, handleRegenerate, hasDrawing, isDrawing } = param;\n    _s();\n    const [hasContent, setHasContent] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    // Check if display canvas has content\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"DisplayCanvas.useEffect\": ()=>{\n            const checkCanvasContent = {\n                \"DisplayCanvas.useEffect.checkCanvasContent\": ()=>{\n                    const canvas = displayCanvasRef.current;\n                    if (!canvas) return;\n                    const ctx = canvas.getContext('2d');\n                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);\n                    // More robust check for non-white pixels\n                    // Count how many pixels are significantly different from white\n                    let nonWhitePixelCount = 0;\n                    const THRESHOLD = 5; // Allow some slight variation from pure white (anti-aliasing, etc)\n                    const MINIMUM_PIXELS = 100; // Require at least this many non-white pixels to consider it has content\n                    for(let i = 0; i < imageData.data.length; i += 4){\n                        const r = imageData.data[i];\n                        const g = imageData.data[i + 1];\n                        const b = imageData.data[i + 2];\n                        // If any RGB channel is significantly different from white (255)\n                        if (255 - r > THRESHOLD || 255 - g > THRESHOLD || 255 - b > THRESHOLD) {\n                            nonWhitePixelCount++;\n                            if (nonWhitePixelCount > MINIMUM_PIXELS) {\n                                setHasContent(true);\n                                return;\n                            }\n                        }\n                    }\n                    setHasContent(false);\n                }\n            }[\"DisplayCanvas.useEffect.checkCanvasContent\"];\n            // Initial check\n            checkCanvasContent();\n            // Set up a MutationObserver to watch for changes to the canvas\n            const canvasNode = displayCanvasRef.current;\n            if (canvasNode) {\n                const observer = new MutationObserver(checkCanvasContent);\n                observer.observe(canvasNode, {\n                    attributes: true,\n                    childList: true,\n                    subtree: true\n                });\n                return ({\n                    \"DisplayCanvas.useEffect\": ()=>{\n                        observer.disconnect();\n                    }\n                })[\"DisplayCanvas.useEffect\"];\n            }\n        }\n    }[\"DisplayCanvas.useEffect\"], [\n        displayCanvasRef\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"relative\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"absolute top-3 right-3 z-10\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ActionBar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                    handleSaveImage: handleSaveImage,\n                    handleRegenerate: handleRegenerate\n                }, void 0, false, {\n                    fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                    lineNumber: 67,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                lineNumber: 66,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"canvas\", {\n                ref: displayCanvasRef,\n                width: 960,\n                height: 540,\n                className: \"border-2 border-black w-full sm:h-[60vh] h-[30vh] min-h-[320px] bg-white/90\",\n                \"aria-label\": \"Generated image canvas\"\n            }, void 0, false, {\n                fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                lineNumber: 73,\n                columnNumber: 7\n            }, undefined),\n            isLoading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"absolute inset-0 flex items-center justify-center bg-black/10\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"bg-white/80 rounded-full p-3\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_LoaderCircle_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_3__.LoaderCircle, {\n                        className: \"w-8 h-8 animate-spin text-black\"\n                    }, void 0, false, {\n                        fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                        lineNumber: 85,\n                        columnNumber: 13\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                    lineNumber: 84,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                lineNumber: 83,\n                columnNumber: 9\n            }, undefined),\n            !isLoading && hasContent && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"absolute inset-0 flex flex-col items-center justify-center pointer-events-none\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"animate-pulse\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_LoaderCircle_Sparkles_lucide_react__WEBPACK_IMPORTED_MODULE_3__.Sparkles, {\n                            className: \"w-14 h-14 text-gray-400 mb-3\",\n                            strokeWidth: 1.5\n                        }, void 0, false, {\n                            fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                            lineNumber: 94,\n                            columnNumber: 13\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                        lineNumber: 93,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-gray-400 text-xl font-mono text-center\",\n                        children: [\n                            \"Your stylized image\",\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                                fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                                lineNumber: 97,\n                                columnNumber: 32\n                            }, undefined),\n                            \"will appear here\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                        lineNumber: 96,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                lineNumber: 92,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n        lineNumber: 64,\n        columnNumber: 5\n    }, undefined);\n};\n_s(DisplayCanvas, \"5DzE9fzjjZ9ipMZOu5eYixF8XJc=\");\n_c = DisplayCanvas;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisplayCanvas);\nvar _c;\n$RefreshReg$(_c, \"DisplayCanvas\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1icm93c2VyKS8uL2NvbXBvbmVudHMvRGlzcGxheUNhbnZhcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBc0Q7QUFDVjtBQUNSO0FBRXBDLE1BQU1LLGdCQUFnQjtRQUFDLEVBQ3JCQyxnQkFBZ0IsRUFDaEJDLFNBQVMsRUFDVEMsZUFBZSxFQUNmQyxnQkFBZ0IsRUFDaEJDLFVBQVUsRUFDVkMsU0FBUyxFQUNWOztJQUNDLE1BQU0sQ0FBQ0MsWUFBWUMsY0FBYyxHQUFHViwrQ0FBUUEsQ0FBQztJQUU3QyxzQ0FBc0M7SUFDdENELGdEQUFTQTttQ0FBQztZQUNSLE1BQU1ZOzhEQUFxQjtvQkFDekIsTUFBTUMsU0FBU1QsaUJBQWlCVSxPQUFPO29CQUN2QyxJQUFJLENBQUNELFFBQVE7b0JBRWIsTUFBTUUsTUFBTUYsT0FBT0csVUFBVSxDQUFDO29CQUM5QixNQUFNQyxZQUFZRixJQUFJRyxZQUFZLENBQUMsR0FBRyxHQUFHTCxPQUFPTSxLQUFLLEVBQUVOLE9BQU9PLE1BQU07b0JBRXBFLHlDQUF5QztvQkFDekMsK0RBQStEO29CQUMvRCxJQUFJQyxxQkFBcUI7b0JBQ3pCLE1BQU1DLFlBQVksR0FBRyxtRUFBbUU7b0JBQ3hGLE1BQU1DLGlCQUFpQixLQUFLLHlFQUF5RTtvQkFFckcsSUFBSyxJQUFJQyxJQUFJLEdBQUdBLElBQUlQLFVBQVVRLElBQUksQ0FBQ0MsTUFBTSxFQUFFRixLQUFLLEVBQUc7d0JBQ2pELE1BQU1HLElBQUlWLFVBQVVRLElBQUksQ0FBQ0QsRUFBRTt3QkFDM0IsTUFBTUksSUFBSVgsVUFBVVEsSUFBSSxDQUFDRCxJQUFJLEVBQUU7d0JBQy9CLE1BQU1LLElBQUlaLFVBQVVRLElBQUksQ0FBQ0QsSUFBSSxFQUFFO3dCQUUvQixpRUFBaUU7d0JBQ2pFLElBQUksTUFBTUcsSUFBSUwsYUFBYSxNQUFNTSxJQUFJTixhQUFhLE1BQU1PLElBQUlQLFdBQVc7NEJBQ3JFRDs0QkFDQSxJQUFJQSxxQkFBcUJFLGdCQUFnQjtnQ0FDdkNaLGNBQWM7Z0NBQ2Q7NEJBQ0Y7d0JBQ0Y7b0JBQ0Y7b0JBRUFBLGNBQWM7Z0JBQ2hCOztZQUVBLGdCQUFnQjtZQUNoQkM7WUFFQSwrREFBK0Q7WUFDL0QsTUFBTWtCLGFBQWExQixpQkFBaUJVLE9BQU87WUFDM0MsSUFBSWdCLFlBQVk7Z0JBQ2QsTUFBTUMsV0FBVyxJQUFJQyxpQkFBaUJwQjtnQkFDdENtQixTQUFTRSxPQUFPLENBQUNILFlBQVk7b0JBQUVJLFlBQVk7b0JBQU1DLFdBQVc7b0JBQU1DLFNBQVM7Z0JBQUs7Z0JBRWhGOytDQUFPO3dCQUNMTCxTQUFTTSxVQUFVO29CQUNyQjs7WUFDRjtRQUNGO2tDQUFHO1FBQUNqQztLQUFpQjtJQUVyQixxQkFDRSw4REFBQ2tDO1FBQUlDLFdBQVU7OzBCQUViLDhEQUFDRDtnQkFBSUMsV0FBVTswQkFDYiw0RUFBQ3JDLGtEQUFTQTtvQkFDUkksaUJBQWlCQTtvQkFDakJDLGtCQUFrQkE7Ozs7Ozs7Ozs7OzBCQUl0Qiw4REFBQ007Z0JBQ0MyQixLQUFLcEM7Z0JBQ0xlLE9BQU87Z0JBQ1BDLFFBQVE7Z0JBQ1JtQixXQUFVO2dCQUNWRSxjQUFXOzs7Ozs7WUFJWnBDLDJCQUNDLDhEQUFDaUM7Z0JBQUlDLFdBQVU7MEJBQ2IsNEVBQUNEO29CQUFJQyxXQUFVOzhCQUNiLDRFQUFDekMsbUdBQVlBO3dCQUFDeUMsV0FBVTs7Ozs7Ozs7Ozs7Ozs7OztZQU03QixDQUFDbEMsYUFBYUssNEJBQ2IsOERBQUM0QjtnQkFBSUMsV0FBVTs7a0NBQ2IsOERBQUNEO3dCQUFJQyxXQUFVO2tDQUNiLDRFQUFDeEMsK0ZBQVFBOzRCQUFDd0MsV0FBVTs0QkFBK0JHLGFBQWE7Ozs7Ozs7Ozs7O2tDQUVsRSw4REFBQ0M7d0JBQUVKLFdBQVU7OzRCQUE4QzswQ0FDdEMsOERBQUNLOzs7Ozs0QkFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9wQztHQW5HTXpDO0tBQUFBO0FBcUdOLGlFQUFlQSxhQUFhQSxFQUFDIiwic291cmNlcyI6WyIvVXNlcnMvdHJ1ZHlwL0Rlc2t0b3AvZGV2LWdlbWluaS0yLjAvY29tcG9uZW50cy9EaXNwbGF5Q2FudmFzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRlckNpcmNsZSwgU3BhcmtsZXMgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBBY3Rpb25CYXIgZnJvbSAnLi9BY3Rpb25CYXInO1xuXG5jb25zdCBEaXNwbGF5Q2FudmFzID0gKHsgXG4gIGRpc3BsYXlDYW52YXNSZWYsIFxuICBpc0xvYWRpbmcsXG4gIGhhbmRsZVNhdmVJbWFnZSxcbiAgaGFuZGxlUmVnZW5lcmF0ZSxcbiAgaGFzRHJhd2luZyxcbiAgaXNEcmF3aW5nXG59KSA9PiB7XG4gIGNvbnN0IFtoYXNDb250ZW50LCBzZXRIYXNDb250ZW50XSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBDaGVjayBpZiBkaXNwbGF5IGNhbnZhcyBoYXMgY29udGVudFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGNoZWNrQ2FudmFzQ29udGVudCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGNhbnZhcyA9IGRpc3BsYXlDYW52YXNSZWYuY3VycmVudDtcbiAgICAgIGlmICghY2FudmFzKSByZXR1cm47XG4gICAgICBcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgY29uc3QgaW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgXG4gICAgICAvLyBNb3JlIHJvYnVzdCBjaGVjayBmb3Igbm9uLXdoaXRlIHBpeGVsc1xuICAgICAgLy8gQ291bnQgaG93IG1hbnkgcGl4ZWxzIGFyZSBzaWduaWZpY2FudGx5IGRpZmZlcmVudCBmcm9tIHdoaXRlXG4gICAgICBsZXQgbm9uV2hpdGVQaXhlbENvdW50ID0gMDtcbiAgICAgIGNvbnN0IFRIUkVTSE9MRCA9IDU7IC8vIEFsbG93IHNvbWUgc2xpZ2h0IHZhcmlhdGlvbiBmcm9tIHB1cmUgd2hpdGUgKGFudGktYWxpYXNpbmcsIGV0YylcbiAgICAgIGNvbnN0IE1JTklNVU1fUElYRUxTID0gMTAwOyAvLyBSZXF1aXJlIGF0IGxlYXN0IHRoaXMgbWFueSBub24td2hpdGUgcGl4ZWxzIHRvIGNvbnNpZGVyIGl0IGhhcyBjb250ZW50XG4gICAgICBcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VEYXRhLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgY29uc3QgciA9IGltYWdlRGF0YS5kYXRhW2ldO1xuICAgICAgICBjb25zdCBnID0gaW1hZ2VEYXRhLmRhdGFbaSArIDFdO1xuICAgICAgICBjb25zdCBiID0gaW1hZ2VEYXRhLmRhdGFbaSArIDJdO1xuICAgICAgICBcbiAgICAgICAgLy8gSWYgYW55IFJHQiBjaGFubmVsIGlzIHNpZ25pZmljYW50bHkgZGlmZmVyZW50IGZyb20gd2hpdGUgKDI1NSlcbiAgICAgICAgaWYgKDI1NSAtIHIgPiBUSFJFU0hPTEQgfHwgMjU1IC0gZyA+IFRIUkVTSE9MRCB8fCAyNTUgLSBiID4gVEhSRVNIT0xEKSB7XG4gICAgICAgICAgbm9uV2hpdGVQaXhlbENvdW50Kys7XG4gICAgICAgICAgaWYgKG5vbldoaXRlUGl4ZWxDb3VudCA+IE1JTklNVU1fUElYRUxTKSB7XG4gICAgICAgICAgICBzZXRIYXNDb250ZW50KHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICBzZXRIYXNDb250ZW50KGZhbHNlKTtcbiAgICB9O1xuXG4gICAgLy8gSW5pdGlhbCBjaGVja1xuICAgIGNoZWNrQ2FudmFzQ29udGVudCgpO1xuICAgIFxuICAgIC8vIFNldCB1cCBhIE11dGF0aW9uT2JzZXJ2ZXIgdG8gd2F0Y2ggZm9yIGNoYW5nZXMgdG8gdGhlIGNhbnZhc1xuICAgIGNvbnN0IGNhbnZhc05vZGUgPSBkaXNwbGF5Q2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgaWYgKGNhbnZhc05vZGUpIHtcbiAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2hlY2tDYW52YXNDb250ZW50KTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUoY2FudmFzTm9kZSwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgICBcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH07XG4gICAgfVxuICB9LCBbZGlzcGxheUNhbnZhc1JlZl0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgey8qIEFjdGlvbkJhciBjb21wb25lbnQgLSBwb3NpdGlvbmVkIGluIHRoZSB0b3AgcmlnaHQgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0zIHJpZ2h0LTMgei0xMFwiPlxuICAgICAgICA8QWN0aW9uQmFyXG4gICAgICAgICAgaGFuZGxlU2F2ZUltYWdlPXtoYW5kbGVTYXZlSW1hZ2V9XG4gICAgICAgICAgaGFuZGxlUmVnZW5lcmF0ZT17aGFuZGxlUmVnZW5lcmF0ZX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8Y2FudmFzXG4gICAgICAgIHJlZj17ZGlzcGxheUNhbnZhc1JlZn1cbiAgICAgICAgd2lkdGg9ezk2MH1cbiAgICAgICAgaGVpZ2h0PXs1NDB9XG4gICAgICAgIGNsYXNzTmFtZT1cImJvcmRlci0yIGJvcmRlci1ibGFjayB3LWZ1bGwgc206aC1bNjB2aF0gaC1bMzB2aF0gbWluLWgtWzMyMHB4XSBiZy13aGl0ZS85MFwiXG4gICAgICAgIGFyaWEtbGFiZWw9XCJHZW5lcmF0ZWQgaW1hZ2UgY2FudmFzXCJcbiAgICAgIC8+XG4gICAgICBcbiAgICAgIHsvKiBMb2FkaW5nIG92ZXJsYXkgKi99XG4gICAgICB7aXNMb2FkaW5nICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzEwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZS84MCByb3VuZGVkLWZ1bGwgcC0zXCI+XG4gICAgICAgICAgICA8TG9hZGVyQ2lyY2xlIGNsYXNzTmFtZT1cInctOCBoLTggYW5pbWF0ZS1zcGluIHRleHQtYmxhY2tcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgICBcbiAgICAgIHsvKiBQbGFjZWhvbGRlciBvdmVybGF5IC0gb25seSBzaG93IHdoZW4gbm90IGxvYWRpbmcgYW5kIGNhbnZhcyBpcyBlbXB0eSAqL31cbiAgICAgIHshaXNMb2FkaW5nICYmIGhhc0NvbnRlbnQgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcG9pbnRlci1ldmVudHMtbm9uZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5pbWF0ZS1wdWxzZVwiPlxuICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctMTQgaC0xNCB0ZXh0LWdyYXktNDAwIG1iLTNcIiBzdHJva2VXaWR0aD17MS41fSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC14bCBmb250LW1vbm8gdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgIFlvdXIgc3R5bGl6ZWQgaW1hZ2U8YnIvPlxuICAgICAgICAgICAgd2lsbCBhcHBlYXIgaGVyZVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGlzcGxheUNhbnZhczsgIl0sIm5hbWVzIjpbIkxvYWRlckNpcmNsZSIsIlNwYXJrbGVzIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJBY3Rpb25CYXIiLCJEaXNwbGF5Q2FudmFzIiwiZGlzcGxheUNhbnZhc1JlZiIsImlzTG9hZGluZyIsImhhbmRsZVNhdmVJbWFnZSIsImhhbmRsZVJlZ2VuZXJhdGUiLCJoYXNEcmF3aW5nIiwiaXNEcmF3aW5nIiwiaGFzQ29udGVudCIsInNldEhhc0NvbnRlbnQiLCJjaGVja0NhbnZhc0NvbnRlbnQiLCJjYW52YXMiLCJjdXJyZW50IiwiY3R4IiwiZ2V0Q29udGV4dCIsImltYWdlRGF0YSIsImdldEltYWdlRGF0YSIsIndpZHRoIiwiaGVpZ2h0Iiwibm9uV2hpdGVQaXhlbENvdW50IiwiVEhSRVNIT0xEIiwiTUlOSU1VTV9QSVhFTFMiLCJpIiwiZGF0YSIsImxlbmd0aCIsInIiLCJnIiwiYiIsImNhbnZhc05vZGUiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiYXR0cmlidXRlcyIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJkaXNjb25uZWN0IiwiZGl2IiwiY2xhc3NOYW1lIiwicmVmIiwiYXJpYS1sYWJlbCIsInN0cm9rZVdpZHRoIiwicCIsImJyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-browser)/./components/DisplayCanvas.js\n"));

/***/ })

});