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

/***/ "(pages-dir-browser)/./components/Canvas.js":
/*!******************************!*\
  !*** ./components/Canvas.js ***!
  \******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(pages-dir-browser)/./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(pages-dir-browser)/./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _s = $RefreshSig$();\n\nconst Canvas = (param)=>{\n    let { canvasRef, currentTool, isDrawing, startDrawing, draw, stopDrawing, handleCanvasClick, handlePenClick, handleGeneration } = param;\n    _s();\n    // Add touch event prevention function\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"Canvas.useEffect\": ()=>{\n            // Function to prevent default touch behavior on canvas\n            const preventTouchDefault = {\n                \"Canvas.useEffect.preventTouchDefault\": (e)=>{\n                    if (isDrawing) {\n                        e.preventDefault();\n                    }\n                }\n            }[\"Canvas.useEffect.preventTouchDefault\"];\n            // Add event listener when component mounts\n            const canvas = canvasRef.current;\n            if (canvas) {\n                canvas.addEventListener('touchstart', preventTouchDefault, {\n                    passive: false\n                });\n                canvas.addEventListener('touchmove', preventTouchDefault, {\n                    passive: false\n                });\n            }\n            // Remove event listener when component unmounts\n            return ({\n                \"Canvas.useEffect\": ()=>{\n                    if (canvas) {\n                        canvas.removeEventListener('touchstart', preventTouchDefault);\n                        canvas.removeEventListener('touchmove', preventTouchDefault);\n                    }\n                }\n            })[\"Canvas.useEffect\"];\n        }\n    }[\"Canvas.useEffect\"], [\n        isDrawing,\n        canvasRef\n    ]);\n    const handleKeyDown = (e)=>{\n        // Add keyboard accessibility\n        if (e.key === 'Enter' || e.key === ' ') {\n            handleCanvasClick(e);\n        }\n    };\n    // Custom handler for stopping drawing with pen tool\n    const handleStopDrawing = (e)=>{\n        stopDrawing(e);\n        // If using the pen tool and we've just finished a drag, trigger generation\n        if (currentTool === 'pen' && isDrawing) {\n            // Small delay to ensure the drawing is complete\n            setTimeout(()=>{\n                handleGeneration();\n            }, 100);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"relative\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                className: \"text-lg font-bold mb-2\",\n                children: \"Draw here:\"\n            }, void 0, false, {\n                fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/Canvas.js\",\n                lineNumber: 61,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"canvas\", {\n                ref: canvasRef,\n                width: 960,\n                height: 540,\n                onMouseDown: (e)=>{\n                    if (currentTool === 'pen') {\n                        handlePenClick(e);\n                    } else {\n                        startDrawing(e);\n                    }\n                },\n                onMouseMove: draw,\n                onMouseUp: handleStopDrawing,\n                onMouseLeave: handleStopDrawing,\n                onClick: handleCanvasClick,\n                onTouchStart: startDrawing,\n                onTouchMove: draw,\n                onTouchEnd: handleStopDrawing,\n                onKeyDown: handleKeyDown,\n                tabIndex: 0,\n                className: \"border-2 border-black w-full sm:h-[60vh] h-[30vh] min-h-[320px] bg-white/90 touch-none \".concat(currentTool === 'pen' ? 'cursor-crosshair' : 'hover:cursor-crosshair'),\n                \"aria-label\": \"Drawing canvas\"\n            }, void 0, false, {\n                fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/Canvas.js\",\n                lineNumber: 62,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/trudyp/Desktop/dev-gemini-2.0/components/Canvas.js\",\n        lineNumber: 60,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Canvas, \"OD7bBpZva5O2jO+Puf00hKivP7c=\");\n_c = Canvas;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Canvas);\nvar _c;\n$RefreshReg$(_c, \"Canvas\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1icm93c2VyKS8uL2NvbXBvbmVudHMvQ2FudmFzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBMEM7QUFFMUMsTUFBTUUsU0FBUztRQUFDLEVBQ2RDLFNBQVMsRUFDVEMsV0FBVyxFQUNYQyxTQUFTLEVBQ1RDLFlBQVksRUFDWkMsSUFBSSxFQUNKQyxXQUFXLEVBQ1hDLGlCQUFpQixFQUNqQkMsY0FBYyxFQUNkQyxnQkFBZ0IsRUFDakI7O0lBQ0Msc0NBQXNDO0lBQ3RDVixnREFBU0E7NEJBQUM7WUFDUix1REFBdUQ7WUFDdkQsTUFBTVc7d0RBQXNCLENBQUNDO29CQUMzQixJQUFJUixXQUFXO3dCQUNiUSxFQUFFQyxjQUFjO29CQUNsQjtnQkFDRjs7WUFFQSwyQ0FBMkM7WUFDM0MsTUFBTUMsU0FBU1osVUFBVWEsT0FBTztZQUNoQyxJQUFJRCxRQUFRO2dCQUNWQSxPQUFPRSxnQkFBZ0IsQ0FBQyxjQUFjTCxxQkFBcUI7b0JBQUVNLFNBQVM7Z0JBQU07Z0JBQzVFSCxPQUFPRSxnQkFBZ0IsQ0FBQyxhQUFhTCxxQkFBcUI7b0JBQUVNLFNBQVM7Z0JBQU07WUFDN0U7WUFFQSxnREFBZ0Q7WUFDaEQ7b0NBQU87b0JBQ0wsSUFBSUgsUUFBUTt3QkFDVkEsT0FBT0ksbUJBQW1CLENBQUMsY0FBY1A7d0JBQ3pDRyxPQUFPSSxtQkFBbUIsQ0FBQyxhQUFhUDtvQkFDMUM7Z0JBQ0Y7O1FBQ0Y7MkJBQUc7UUFBQ1A7UUFBV0Y7S0FBVTtJQUV6QixNQUFNaUIsZ0JBQWdCLENBQUNQO1FBQ3JCLDZCQUE2QjtRQUM3QixJQUFJQSxFQUFFUSxHQUFHLEtBQUssV0FBV1IsRUFBRVEsR0FBRyxLQUFLLEtBQUs7WUFDdENaLGtCQUFrQkk7UUFDcEI7SUFDRjtJQUVBLG9EQUFvRDtJQUNwRCxNQUFNUyxvQkFBb0IsQ0FBQ1Q7UUFDekJMLFlBQVlLO1FBRVosMkVBQTJFO1FBQzNFLElBQUlULGdCQUFnQixTQUFTQyxXQUFXO1lBQ3RDLGdEQUFnRDtZQUNoRGtCLFdBQVc7Z0JBQ1RaO1lBQ0YsR0FBRztRQUNMO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ2E7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNDO2dCQUFHRCxXQUFVOzBCQUF5Qjs7Ozs7OzBCQUN2Qyw4REFBQ1Y7Z0JBQ0NZLEtBQUt4QjtnQkFDTHlCLE9BQU87Z0JBQ1BDLFFBQVE7Z0JBQ1JDLGFBQWEsQ0FBQ2pCO29CQUNaLElBQUlULGdCQUFnQixPQUFPO3dCQUN6Qk0sZUFBZUc7b0JBQ2pCLE9BQU87d0JBQ0xQLGFBQWFPO29CQUNmO2dCQUNGO2dCQUNBa0IsYUFBYXhCO2dCQUNieUIsV0FBV1Y7Z0JBQ1hXLGNBQWNYO2dCQUNkWSxTQUFTekI7Z0JBQ1QwQixjQUFjN0I7Z0JBQ2Q4QixhQUFhN0I7Z0JBQ2I4QixZQUFZZjtnQkFDWmdCLFdBQVdsQjtnQkFDWG1CLFVBQVU7Z0JBQ1ZkLFdBQVcsMEZBRVYsT0FEQ3JCLGdCQUFnQixRQUFRLHFCQUFxQjtnQkFFL0NvQyxjQUFXOzs7Ozs7Ozs7Ozs7QUFJbkI7R0F0Rk10QztLQUFBQTtBQXdGTixpRUFBZUEsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiL1VzZXJzL3RydWR5cC9EZXNrdG9wL2Rldi1nZW1pbmktMi4wL2NvbXBvbmVudHMvQ2FudmFzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVJlZiwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5jb25zdCBDYW52YXMgPSAoe1xuICBjYW52YXNSZWYsXG4gIGN1cnJlbnRUb29sLFxuICBpc0RyYXdpbmcsXG4gIHN0YXJ0RHJhd2luZyxcbiAgZHJhdyxcbiAgc3RvcERyYXdpbmcsXG4gIGhhbmRsZUNhbnZhc0NsaWNrLFxuICBoYW5kbGVQZW5DbGljayxcbiAgaGFuZGxlR2VuZXJhdGlvblxufSkgPT4ge1xuICAvLyBBZGQgdG91Y2ggZXZlbnQgcHJldmVudGlvbiBmdW5jdGlvblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIEZ1bmN0aW9uIHRvIHByZXZlbnQgZGVmYXVsdCB0b3VjaCBiZWhhdmlvciBvbiBjYW52YXNcbiAgICBjb25zdCBwcmV2ZW50VG91Y2hEZWZhdWx0ID0gKGUpID0+IHtcbiAgICAgIGlmIChpc0RyYXdpbmcpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgd2hlbiBjb21wb25lbnQgbW91bnRzXG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgaWYgKGNhbnZhcykge1xuICAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBwcmV2ZW50VG91Y2hEZWZhdWx0LCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHByZXZlbnRUb3VjaERlZmF1bHQsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVyIHdoZW4gY29tcG9uZW50IHVubW91bnRzXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChjYW52YXMpIHtcbiAgICAgICAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBwcmV2ZW50VG91Y2hEZWZhdWx0KTtcbiAgICAgICAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHByZXZlbnRUb3VjaERlZmF1bHQpO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtpc0RyYXdpbmcsIGNhbnZhc1JlZl0pO1xuXG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZSkgPT4ge1xuICAgIC8vIEFkZCBrZXlib2FyZCBhY2Nlc3NpYmlsaXR5XG4gICAgaWYgKGUua2V5ID09PSAnRW50ZXInIHx8IGUua2V5ID09PSAnICcpIHtcbiAgICAgIGhhbmRsZUNhbnZhc0NsaWNrKGUpO1xuICAgIH1cbiAgfTtcblxuICAvLyBDdXN0b20gaGFuZGxlciBmb3Igc3RvcHBpbmcgZHJhd2luZyB3aXRoIHBlbiB0b29sXG4gIGNvbnN0IGhhbmRsZVN0b3BEcmF3aW5nID0gKGUpID0+IHtcbiAgICBzdG9wRHJhd2luZyhlKTtcbiAgICBcbiAgICAvLyBJZiB1c2luZyB0aGUgcGVuIHRvb2wgYW5kIHdlJ3ZlIGp1c3QgZmluaXNoZWQgYSBkcmFnLCB0cmlnZ2VyIGdlbmVyYXRpb25cbiAgICBpZiAoY3VycmVudFRvb2wgPT09ICdwZW4nICYmIGlzRHJhd2luZykge1xuICAgICAgLy8gU21hbGwgZGVsYXkgdG8gZW5zdXJlIHRoZSBkcmF3aW5nIGlzIGNvbXBsZXRlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaGFuZGxlR2VuZXJhdGlvbigpO1xuICAgICAgfSwgMTAwKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgbWItMlwiPkRyYXcgaGVyZTo8L2gyPlxuICAgICAgPGNhbnZhc1xuICAgICAgICByZWY9e2NhbnZhc1JlZn1cbiAgICAgICAgd2lkdGg9ezk2MH1cbiAgICAgICAgaGVpZ2h0PXs1NDB9XG4gICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4ge1xuICAgICAgICAgIGlmIChjdXJyZW50VG9vbCA9PT0gJ3BlbicpIHtcbiAgICAgICAgICAgIGhhbmRsZVBlbkNsaWNrKGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGFydERyYXdpbmcoZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9fVxuICAgICAgICBvbk1vdXNlTW92ZT17ZHJhd31cbiAgICAgICAgb25Nb3VzZVVwPXtoYW5kbGVTdG9wRHJhd2luZ31cbiAgICAgICAgb25Nb3VzZUxlYXZlPXtoYW5kbGVTdG9wRHJhd2luZ31cbiAgICAgICAgb25DbGljaz17aGFuZGxlQ2FudmFzQ2xpY2t9XG4gICAgICAgIG9uVG91Y2hTdGFydD17c3RhcnREcmF3aW5nfVxuICAgICAgICBvblRvdWNoTW92ZT17ZHJhd31cbiAgICAgICAgb25Ub3VjaEVuZD17aGFuZGxlU3RvcERyYXdpbmd9XG4gICAgICAgIG9uS2V5RG93bj17aGFuZGxlS2V5RG93bn1cbiAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgIGNsYXNzTmFtZT17YGJvcmRlci0yIGJvcmRlci1ibGFjayB3LWZ1bGwgc206aC1bNjB2aF0gaC1bMzB2aF0gbWluLWgtWzMyMHB4XSBiZy13aGl0ZS85MCB0b3VjaC1ub25lICR7XG4gICAgICAgICAgY3VycmVudFRvb2wgPT09ICdwZW4nID8gJ2N1cnNvci1jcm9zc2hhaXInIDogJ2hvdmVyOmN1cnNvci1jcm9zc2hhaXInXG4gICAgICAgIH1gfVxuICAgICAgICBhcmlhLWxhYmVsPVwiRHJhd2luZyBjYW52YXNcIlxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhbnZhczsgIl0sIm5hbWVzIjpbInVzZVJlZiIsInVzZUVmZmVjdCIsIkNhbnZhcyIsImNhbnZhc1JlZiIsImN1cnJlbnRUb29sIiwiaXNEcmF3aW5nIiwic3RhcnREcmF3aW5nIiwiZHJhdyIsInN0b3BEcmF3aW5nIiwiaGFuZGxlQ2FudmFzQ2xpY2siLCJoYW5kbGVQZW5DbGljayIsImhhbmRsZUdlbmVyYXRpb24iLCJwcmV2ZW50VG91Y2hEZWZhdWx0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiY2FudmFzIiwiY3VycmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXNzaXZlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZUtleURvd24iLCJrZXkiLCJoYW5kbGVTdG9wRHJhd2luZyIsInNldFRpbWVvdXQiLCJkaXYiLCJjbGFzc05hbWUiLCJoMiIsInJlZiIsIndpZHRoIiwiaGVpZ2h0Iiwib25Nb3VzZURvd24iLCJvbk1vdXNlTW92ZSIsIm9uTW91c2VVcCIsIm9uTW91c2VMZWF2ZSIsIm9uQ2xpY2siLCJvblRvdWNoU3RhcnQiLCJvblRvdWNoTW92ZSIsIm9uVG91Y2hFbmQiLCJvbktleURvd24iLCJ0YWJJbmRleCIsImFyaWEtbGFiZWwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-browser)/./components/Canvas.js\n"));

/***/ })

});