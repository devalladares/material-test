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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(pages-dir-browser)/./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _barrel_optimize_names_ImageIcon_LoaderCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=ImageIcon,LoaderCircle!=!lucide-react */ \"(pages-dir-browser)/__barrel_optimize__?names=ImageIcon,LoaderCircle!=!./node_modules/lucide-react/dist/esm/lucide-react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(pages-dir-browser)/./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _ActionBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ActionBar */ \"(pages-dir-browser)/./components/ActionBar.js\");\n\nvar _s = $RefreshSig$();\n\n\n\nconst DisplayCanvas = (param)=>{\n    let { displayCanvasRef, isLoading, handleSaveImage, handleRegenerate } = param;\n    _s();\n    const [hasContent, setHasContent] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    // Create a reusable function to check canvas content\n    const checkCanvasContent = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)({\n        \"DisplayCanvas.useCallback[checkCanvasContent]\": ()=>{\n            const canvas = displayCanvasRef.current;\n            if (!canvas) return false;\n            const ctx = canvas.getContext('2d');\n            try {\n                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);\n                // More robust check: look for any significant non-white pixel clusters\n                // Count pixels that aren't close to white\n                let nonWhitePixelCount = 0;\n                const threshold = 230; // Lower threshold to detect more subtle content\n                for(let i = 0; i < imageData.data.length; i += 4){\n                    const r = imageData.data[i];\n                    const g = imageData.data[i + 1];\n                    const b = imageData.data[i + 2];\n                    // If any RGB value is significantly below white, count it\n                    if (r < threshold || g < threshold || b < threshold) {\n                        nonWhitePixelCount++;\n                        // Early exit once we find enough non-white pixels\n                        if (nonWhitePixelCount > 100) {\n                            console.log('DisplayCanvas: Found significant content');\n                            return true;\n                        }\n                    }\n                }\n                // Consider it having content if we found enough non-white pixels\n                return nonWhitePixelCount > 50;\n            } catch (err) {\n                console.error(\"Error checking canvas content:\", err);\n                return false;\n            }\n        }\n    }[\"DisplayCanvas.useCallback[checkCanvasContent]\"], [\n        displayCanvasRef\n    ]);\n    // Check if display canvas has content initially\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"DisplayCanvas.useEffect\": ()=>{\n            const hasContentNow = checkCanvasContent();\n            console.log('Initial canvas content check:', hasContentNow);\n            setHasContent(hasContentNow);\n        }\n    }[\"DisplayCanvas.useEffect\"], [\n        checkCanvasContent\n    ]);\n    // Re-check after loading completes\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"DisplayCanvas.useEffect\": ()=>{\n            if (!isLoading) {\n                // Small delay to ensure canvas is updated after loading\n                const timer = setTimeout({\n                    \"DisplayCanvas.useEffect.timer\": ()=>{\n                        const hasContentNow = checkCanvasContent();\n                        console.log('Canvas content check after loading:', hasContentNow);\n                        setHasContent(hasContentNow);\n                    }\n                }[\"DisplayCanvas.useEffect.timer\"], 100);\n                return ({\n                    \"DisplayCanvas.useEffect\": ()=>clearTimeout(timer)\n                })[\"DisplayCanvas.useEffect\"];\n            }\n        }\n    }[\"DisplayCanvas.useEffect\"], [\n        isLoading,\n        checkCanvasContent\n    ]);\n    // Add a periodic check for content (every 1 second) \n    // This ensures we catch any content that gets added without state changes\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"DisplayCanvas.useEffect\": ()=>{\n            const intervalId = setInterval({\n                \"DisplayCanvas.useEffect.intervalId\": ()=>{\n                    const hasContentNow = checkCanvasContent();\n                    if (hasContentNow !== hasContent) {\n                        console.log('Periodic check detected content change:', hasContentNow);\n                        setHasContent(hasContentNow);\n                    }\n                }\n            }[\"DisplayCanvas.useEffect.intervalId\"], 1000);\n            return ({\n                \"DisplayCanvas.useEffect\": ()=>clearInterval(intervalId)\n            })[\"DisplayCanvas.useEffect\"];\n        }\n    }[\"DisplayCanvas.useEffect\"], [\n        checkCanvasContent,\n        hasContent\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"relative\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"absolute top-3 right-3 z-10\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ActionBar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                    handleSaveImage: handleSaveImage,\n                    handleRegenerate: handleRegenerate\n                }, void 0, false, {\n                    fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                    lineNumber: 92,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                lineNumber: 91,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"canvas\", {\n                ref: displayCanvasRef,\n                width: 960,\n                height: 540,\n                className: \"border-2 border-black w-full sm:h-[60vh] h-[30vh] min-h-[320px] bg-white/90\",\n                \"aria-label\": \"Generated image canvas\"\n            }, void 0, false, {\n                fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                lineNumber: 98,\n                columnNumber: 7\n            }, undefined),\n            isLoading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"absolute inset-0 flex items-center justify-center bg-black/10\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"bg-white/80 rounded-full p-3\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ImageIcon_LoaderCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__.LoaderCircle, {\n                        className: \"w-8 h-8 animate-spin text-black\"\n                    }, void 0, false, {\n                        fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                        lineNumber: 110,\n                        columnNumber: 13\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                    lineNumber: 109,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                lineNumber: 108,\n                columnNumber: 9\n            }, undefined),\n            !hasContent && !isLoading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"absolute inset-0 flex flex-col items-center justify-center pointer-events-none\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ImageIcon_LoaderCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__.ImageIcon, {\n                        className: \"w-12 h-12 text-gray-400 mb-3\"\n                    }, void 0, false, {\n                        fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                        lineNumber: 118,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-gray-400 text-xl font-mono\",\n                        children: \"Generation will appear here\"\n                    }, void 0, false, {\n                        fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                        lineNumber: 119,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n                lineNumber: 117,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/DisplayCanvas.js\",\n        lineNumber: 89,\n        columnNumber: 5\n    }, undefined);\n};\n_s(DisplayCanvas, \"o9xGAL9UdK0ZWmslL9LifKJ5nm8=\");\n_c = DisplayCanvas;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisplayCanvas);\nvar _c;\n$RefreshReg$(_c, \"DisplayCanvas\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1icm93c2VyKS8uL2NvbXBvbmVudHMvRGlzcGxheUNhbnZhcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBdUQ7QUFDRTtBQUNyQjtBQUVwQyxNQUFNTSxnQkFBZ0I7UUFBQyxFQUNyQkMsZ0JBQWdCLEVBQ2hCQyxTQUFTLEVBQ1RDLGVBQWUsRUFDZkMsZ0JBQWdCLEVBQ2pCOztJQUNDLE1BQU0sQ0FBQ0MsWUFBWUMsY0FBYyxHQUFHVCwrQ0FBUUEsQ0FBQztJQUU3QyxxREFBcUQ7SUFDckQsTUFBTVUscUJBQXFCVCxrREFBV0E7eURBQUM7WUFDckMsTUFBTVUsU0FBU1AsaUJBQWlCUSxPQUFPO1lBQ3ZDLElBQUksQ0FBQ0QsUUFBUSxPQUFPO1lBRXBCLE1BQU1FLE1BQU1GLE9BQU9HLFVBQVUsQ0FBQztZQUU5QixJQUFJO2dCQUNGLE1BQU1DLFlBQVlGLElBQUlHLFlBQVksQ0FBQyxHQUFHLEdBQUdMLE9BQU9NLEtBQUssRUFBRU4sT0FBT08sTUFBTTtnQkFFcEUsdUVBQXVFO2dCQUN2RSwwQ0FBMEM7Z0JBQzFDLElBQUlDLHFCQUFxQjtnQkFDekIsTUFBTUMsWUFBWSxLQUFLLGdEQUFnRDtnQkFFdkUsSUFBSyxJQUFJQyxJQUFJLEdBQUdBLElBQUlOLFVBQVVPLElBQUksQ0FBQ0MsTUFBTSxFQUFFRixLQUFLLEVBQUc7b0JBQ2pELE1BQU1HLElBQUlULFVBQVVPLElBQUksQ0FBQ0QsRUFBRTtvQkFDM0IsTUFBTUksSUFBSVYsVUFBVU8sSUFBSSxDQUFDRCxJQUFJLEVBQUU7b0JBQy9CLE1BQU1LLElBQUlYLFVBQVVPLElBQUksQ0FBQ0QsSUFBSSxFQUFFO29CQUUvQiwwREFBMEQ7b0JBQzFELElBQUlHLElBQUlKLGFBQWFLLElBQUlMLGFBQWFNLElBQUlOLFdBQVc7d0JBQ25ERDt3QkFFQSxrREFBa0Q7d0JBQ2xELElBQUlBLHFCQUFxQixLQUFLOzRCQUM1QlEsUUFBUUMsR0FBRyxDQUFDOzRCQUNaLE9BQU87d0JBQ1Q7b0JBQ0Y7Z0JBQ0Y7Z0JBRUEsaUVBQWlFO2dCQUNqRSxPQUFPVCxxQkFBcUI7WUFDOUIsRUFBRSxPQUFPVSxLQUFLO2dCQUNaRixRQUFRRyxLQUFLLENBQUMsa0NBQWtDRDtnQkFDaEQsT0FBTztZQUNUO1FBQ0Y7d0RBQUc7UUFBQ3pCO0tBQWlCO0lBRXJCLGdEQUFnRDtJQUNoREwsZ0RBQVNBO21DQUFDO1lBQ1IsTUFBTWdDLGdCQUFnQnJCO1lBQ3RCaUIsUUFBUUMsR0FBRyxDQUFDLGlDQUFpQ0c7WUFDN0N0QixjQUFjc0I7UUFDaEI7a0NBQUc7UUFBQ3JCO0tBQW1CO0lBRXZCLG1DQUFtQztJQUNuQ1gsZ0RBQVNBO21DQUFDO1lBQ1IsSUFBSSxDQUFDTSxXQUFXO2dCQUNkLHdEQUF3RDtnQkFDeEQsTUFBTTJCLFFBQVFDO3FEQUFXO3dCQUN2QixNQUFNRixnQkFBZ0JyQjt3QkFDdEJpQixRQUFRQyxHQUFHLENBQUMsdUNBQXVDRzt3QkFDbkR0QixjQUFjc0I7b0JBQ2hCO29EQUFHO2dCQUVIOytDQUFPLElBQU1HLGFBQWFGOztZQUM1QjtRQUNGO2tDQUFHO1FBQUMzQjtRQUFXSztLQUFtQjtJQUVsQyxxREFBcUQ7SUFDckQsMEVBQTBFO0lBQzFFWCxnREFBU0E7bUNBQUM7WUFDUixNQUFNb0MsYUFBYUM7c0RBQVk7b0JBQzdCLE1BQU1MLGdCQUFnQnJCO29CQUN0QixJQUFJcUIsa0JBQWtCdkIsWUFBWTt3QkFDaENtQixRQUFRQyxHQUFHLENBQUMsMkNBQTJDRzt3QkFDdkR0QixjQUFjc0I7b0JBQ2hCO2dCQUNGO3FEQUFHO1lBRUg7MkNBQU8sSUFBTU0sY0FBY0Y7O1FBQzdCO2tDQUFHO1FBQUN6QjtRQUFvQkY7S0FBVztJQUVuQyxxQkFDRSw4REFBQzhCO1FBQUlDLFdBQVU7OzBCQUViLDhEQUFDRDtnQkFBSUMsV0FBVTswQkFDYiw0RUFBQ3JDLGtEQUFTQTtvQkFDUkksaUJBQWlCQTtvQkFDakJDLGtCQUFrQkE7Ozs7Ozs7Ozs7OzBCQUl0Qiw4REFBQ0k7Z0JBQ0M2QixLQUFLcEM7Z0JBQ0xhLE9BQU87Z0JBQ1BDLFFBQVE7Z0JBQ1JxQixXQUFVO2dCQUNWRSxjQUFXOzs7Ozs7WUFJWnBDLDJCQUNDLDhEQUFDaUM7Z0JBQUlDLFdBQVU7MEJBQ2IsNEVBQUNEO29CQUFJQyxXQUFVOzhCQUNiLDRFQUFDMUMsb0dBQVlBO3dCQUFDMEMsV0FBVTs7Ozs7Ozs7Ozs7Ozs7OztZQU03QixDQUFDL0IsY0FBYyxDQUFDSCwyQkFDZiw4REFBQ2lDO2dCQUFJQyxXQUFVOztrQ0FDYiw4REFBQ3pDLGlHQUFTQTt3QkFBQ3lDLFdBQVU7Ozs7OztrQ0FDckIsOERBQUNHO3dCQUFFSCxXQUFVO2tDQUFrQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS3pEO0dBdkhNcEM7S0FBQUE7QUF5SE4saUVBQWVBLGFBQWFBLEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy90cnVkeXAvRGVza3RvcC9kZXYtZ2VtaW5pLTIuMC9jb21wb25lbnRzL0Rpc3BsYXlDYW52YXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZGVyQ2lyY2xlLCBJbWFnZUljb24gfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJy4vQWN0aW9uQmFyJztcblxuY29uc3QgRGlzcGxheUNhbnZhcyA9ICh7IFxuICBkaXNwbGF5Q2FudmFzUmVmLCBcbiAgaXNMb2FkaW5nLFxuICBoYW5kbGVTYXZlSW1hZ2UsXG4gIGhhbmRsZVJlZ2VuZXJhdGVcbn0pID0+IHtcbiAgY29uc3QgW2hhc0NvbnRlbnQsIHNldEhhc0NvbnRlbnRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIENyZWF0ZSBhIHJldXNhYmxlIGZ1bmN0aW9uIHRvIGNoZWNrIGNhbnZhcyBjb250ZW50XG4gIGNvbnN0IGNoZWNrQ2FudmFzQ29udGVudCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBjYW52YXMgPSBkaXNwbGF5Q2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjYW52YXMpIHJldHVybiBmYWxzZTtcbiAgICBcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgY29uc3QgaW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgXG4gICAgICAvLyBNb3JlIHJvYnVzdCBjaGVjazogbG9vayBmb3IgYW55IHNpZ25pZmljYW50IG5vbi13aGl0ZSBwaXhlbCBjbHVzdGVyc1xuICAgICAgLy8gQ291bnQgcGl4ZWxzIHRoYXQgYXJlbid0IGNsb3NlIHRvIHdoaXRlXG4gICAgICBsZXQgbm9uV2hpdGVQaXhlbENvdW50ID0gMDtcbiAgICAgIGNvbnN0IHRocmVzaG9sZCA9IDIzMDsgLy8gTG93ZXIgdGhyZXNob2xkIHRvIGRldGVjdCBtb3JlIHN1YnRsZSBjb250ZW50XG4gICAgICBcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VEYXRhLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgY29uc3QgciA9IGltYWdlRGF0YS5kYXRhW2ldO1xuICAgICAgICBjb25zdCBnID0gaW1hZ2VEYXRhLmRhdGFbaSArIDFdO1xuICAgICAgICBjb25zdCBiID0gaW1hZ2VEYXRhLmRhdGFbaSArIDJdO1xuICAgICAgICBcbiAgICAgICAgLy8gSWYgYW55IFJHQiB2YWx1ZSBpcyBzaWduaWZpY2FudGx5IGJlbG93IHdoaXRlLCBjb3VudCBpdFxuICAgICAgICBpZiAociA8IHRocmVzaG9sZCB8fCBnIDwgdGhyZXNob2xkIHx8IGIgPCB0aHJlc2hvbGQpIHtcbiAgICAgICAgICBub25XaGl0ZVBpeGVsQ291bnQrKztcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBFYXJseSBleGl0IG9uY2Ugd2UgZmluZCBlbm91Z2ggbm9uLXdoaXRlIHBpeGVsc1xuICAgICAgICAgIGlmIChub25XaGl0ZVBpeGVsQ291bnQgPiAxMDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEaXNwbGF5Q2FudmFzOiBGb3VuZCBzaWduaWZpY2FudCBjb250ZW50Jyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gQ29uc2lkZXIgaXQgaGF2aW5nIGNvbnRlbnQgaWYgd2UgZm91bmQgZW5vdWdoIG5vbi13aGl0ZSBwaXhlbHNcbiAgICAgIHJldHVybiBub25XaGl0ZVBpeGVsQ291bnQgPiA1MDtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjaGVja2luZyBjYW52YXMgY29udGVudDpcIiwgZXJyKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sIFtkaXNwbGF5Q2FudmFzUmVmXSk7XG5cbiAgLy8gQ2hlY2sgaWYgZGlzcGxheSBjYW52YXMgaGFzIGNvbnRlbnQgaW5pdGlhbGx5XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFzQ29udGVudE5vdyA9IGNoZWNrQ2FudmFzQ29udGVudCgpO1xuICAgIGNvbnNvbGUubG9nKCdJbml0aWFsIGNhbnZhcyBjb250ZW50IGNoZWNrOicsIGhhc0NvbnRlbnROb3cpO1xuICAgIHNldEhhc0NvbnRlbnQoaGFzQ29udGVudE5vdyk7XG4gIH0sIFtjaGVja0NhbnZhc0NvbnRlbnRdKTtcblxuICAvLyBSZS1jaGVjayBhZnRlciBsb2FkaW5nIGNvbXBsZXRlc1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNMb2FkaW5nKSB7XG4gICAgICAvLyBTbWFsbCBkZWxheSB0byBlbnN1cmUgY2FudmFzIGlzIHVwZGF0ZWQgYWZ0ZXIgbG9hZGluZ1xuICAgICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgaGFzQ29udGVudE5vdyA9IGNoZWNrQ2FudmFzQ29udGVudCgpO1xuICAgICAgICBjb25zb2xlLmxvZygnQ2FudmFzIGNvbnRlbnQgY2hlY2sgYWZ0ZXIgbG9hZGluZzonLCBoYXNDb250ZW50Tm93KTtcbiAgICAgICAgc2V0SGFzQ29udGVudChoYXNDb250ZW50Tm93KTtcbiAgICAgIH0sIDEwMCk7XG4gICAgICBcbiAgICAgIHJldHVybiAoKSA9PiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIH1cbiAgfSwgW2lzTG9hZGluZywgY2hlY2tDYW52YXNDb250ZW50XSk7XG4gIFxuICAvLyBBZGQgYSBwZXJpb2RpYyBjaGVjayBmb3IgY29udGVudCAoZXZlcnkgMSBzZWNvbmQpIFxuICAvLyBUaGlzIGVuc3VyZXMgd2UgY2F0Y2ggYW55IGNvbnRlbnQgdGhhdCBnZXRzIGFkZGVkIHdpdGhvdXQgc3RhdGUgY2hhbmdlc1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBjb25zdCBoYXNDb250ZW50Tm93ID0gY2hlY2tDYW52YXNDb250ZW50KCk7XG4gICAgICBpZiAoaGFzQ29udGVudE5vdyAhPT0gaGFzQ29udGVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnUGVyaW9kaWMgY2hlY2sgZGV0ZWN0ZWQgY29udGVudCBjaGFuZ2U6JywgaGFzQ29udGVudE5vdyk7XG4gICAgICAgIHNldEhhc0NvbnRlbnQoaGFzQ29udGVudE5vdyk7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gICAgXG4gICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gIH0sIFtjaGVja0NhbnZhc0NvbnRlbnQsIGhhc0NvbnRlbnRdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgIHsvKiBBY3Rpb25CYXIgY29tcG9uZW50IC0gcG9zaXRpb25lZCBpbiB0aGUgdG9wIHJpZ2h0ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMyByaWdodC0zIHotMTBcIj5cbiAgICAgICAgPEFjdGlvbkJhclxuICAgICAgICAgIGhhbmRsZVNhdmVJbWFnZT17aGFuZGxlU2F2ZUltYWdlfVxuICAgICAgICAgIGhhbmRsZVJlZ2VuZXJhdGU9e2hhbmRsZVJlZ2VuZXJhdGV9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGNhbnZhc1xuICAgICAgICByZWY9e2Rpc3BsYXlDYW52YXNSZWZ9XG4gICAgICAgIHdpZHRoPXs5NjB9XG4gICAgICAgIGhlaWdodD17NTQwfVxuICAgICAgICBjbGFzc05hbWU9XCJib3JkZXItMiBib3JkZXItYmxhY2sgdy1mdWxsIHNtOmgtWzYwdmhdIGgtWzMwdmhdIG1pbi1oLVszMjBweF0gYmctd2hpdGUvOTBcIlxuICAgICAgICBhcmlhLWxhYmVsPVwiR2VuZXJhdGVkIGltYWdlIGNhbnZhc1wiXG4gICAgICAvPlxuICAgICAgXG4gICAgICB7LyogTG9hZGluZyBvdmVybGF5ICovfVxuICAgICAge2lzTG9hZGluZyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ibGFjay8xMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUvODAgcm91bmRlZC1mdWxsIHAtM1wiPlxuICAgICAgICAgICAgPExvYWRlckNpcmNsZSBjbGFzc05hbWU9XCJ3LTggaC04IGFuaW1hdGUtc3BpbiB0ZXh0LWJsYWNrXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAgXG4gICAgICB7LyogUGxhY2Vob2xkZXIgb3ZlcmxheSAqL31cbiAgICAgIHshaGFzQ29udGVudCAmJiAhaXNMb2FkaW5nICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHBvaW50ZXItZXZlbnRzLW5vbmVcIj5cbiAgICAgICAgICA8SW1hZ2VJY29uIGNsYXNzTmFtZT1cInctMTIgaC0xMiB0ZXh0LWdyYXktNDAwIG1iLTNcIiAvPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC14bCBmb250LW1vbm9cIj5HZW5lcmF0aW9uIHdpbGwgYXBwZWFyIGhlcmU8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERpc3BsYXlDYW52YXM7ICJdLCJuYW1lcyI6WyJMb2FkZXJDaXJjbGUiLCJJbWFnZUljb24iLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZUNhbGxiYWNrIiwiQWN0aW9uQmFyIiwiRGlzcGxheUNhbnZhcyIsImRpc3BsYXlDYW52YXNSZWYiLCJpc0xvYWRpbmciLCJoYW5kbGVTYXZlSW1hZ2UiLCJoYW5kbGVSZWdlbmVyYXRlIiwiaGFzQ29udGVudCIsInNldEhhc0NvbnRlbnQiLCJjaGVja0NhbnZhc0NvbnRlbnQiLCJjYW52YXMiLCJjdXJyZW50IiwiY3R4IiwiZ2V0Q29udGV4dCIsImltYWdlRGF0YSIsImdldEltYWdlRGF0YSIsIndpZHRoIiwiaGVpZ2h0Iiwibm9uV2hpdGVQaXhlbENvdW50IiwidGhyZXNob2xkIiwiaSIsImRhdGEiLCJsZW5ndGgiLCJyIiwiZyIsImIiLCJjb25zb2xlIiwibG9nIiwiZXJyIiwiZXJyb3IiLCJoYXNDb250ZW50Tm93IiwidGltZXIiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiaW50ZXJ2YWxJZCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImRpdiIsImNsYXNzTmFtZSIsInJlZiIsImFyaWEtbGFiZWwiLCJwIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-browser)/./components/DisplayCanvas.js\n"));

/***/ })

});