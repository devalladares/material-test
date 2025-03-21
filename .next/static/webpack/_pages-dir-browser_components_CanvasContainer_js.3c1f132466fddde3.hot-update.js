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

/***/ "(pages-dir-browser)/./components/utils/canvasUtils.js":
/*!*****************************************!*\
  !*** ./components/utils/canvasUtils.js ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   distanceToLineSegment: () => (/* binding */ distanceToLineSegment),\n/* harmony export */   drawBezierCurve: () => (/* binding */ drawBezierCurve),\n/* harmony export */   drawBezierGuides: () => (/* binding */ drawBezierGuides),\n/* harmony export */   drawImageToCanvas: () => (/* binding */ drawImageToCanvas),\n/* harmony export */   getCoordinates: () => (/* binding */ getCoordinates),\n/* harmony export */   getPromptForStyle: () => (/* binding */ getPromptForStyle),\n/* harmony export */   initializeCanvas: () => (/* binding */ initializeCanvas)\n/* harmony export */ });\n// Get the correct coordinates based on canvas scaling\nconst getCoordinates = (e, canvas)=>{\n    var _e_nativeEvent_touches_, _e_nativeEvent_touches, _e_nativeEvent_touches_1, _e_nativeEvent_touches1;\n    const rect = canvas.getBoundingClientRect();\n    // Calculate the scaling factor between the internal canvas size and displayed size\n    const scaleX = canvas.width / rect.width;\n    const scaleY = canvas.height / rect.height;\n    // Apply the scaling to get accurate coordinates\n    return {\n        x: (e.nativeEvent.offsetX || ((_e_nativeEvent_touches = e.nativeEvent.touches) === null || _e_nativeEvent_touches === void 0 ? void 0 : (_e_nativeEvent_touches_ = _e_nativeEvent_touches[0]) === null || _e_nativeEvent_touches_ === void 0 ? void 0 : _e_nativeEvent_touches_.clientX) - rect.left) * scaleX,\n        y: (e.nativeEvent.offsetY || ((_e_nativeEvent_touches1 = e.nativeEvent.touches) === null || _e_nativeEvent_touches1 === void 0 ? void 0 : (_e_nativeEvent_touches_1 = _e_nativeEvent_touches1[0]) === null || _e_nativeEvent_touches_1 === void 0 ? void 0 : _e_nativeEvent_touches_1.clientY) - rect.top) * scaleY\n    };\n};\n// Initialize canvas with white background\nconst initializeCanvas = (canvas)=>{\n    const ctx = canvas.getContext(\"2d\");\n    // Fill canvas with white background\n    ctx.fillStyle = \"#FFFFFF\";\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n};\n// Draw the background image to the canvas\nconst drawImageToCanvas = (canvas, backgroundImage)=>{\n    if (!canvas || !backgroundImage) return;\n    const ctx = canvas.getContext(\"2d\");\n    // Fill with white background first\n    ctx.fillStyle = \"#FFFFFF\";\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    // Draw the background image\n    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);\n};\n// Draw bezier curve\nconst drawBezierCurve = (canvas, points)=>{\n    const ctx = canvas.getContext('2d');\n    if (!points || points.length < 4) {\n        console.error('Need at least 4 points to draw a bezier curve');\n        return;\n    }\n    ctx.beginPath();\n    ctx.moveTo(points[0].x, points[0].y);\n    // If we have exactly 4 points, draw a single bezier curve\n    if (points.length === 4) {\n        ctx.bezierCurveTo(points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y);\n    } else {\n        for(let i = 0; i < points.length - 3; i += 3){\n            ctx.bezierCurveTo(points[i + 1].x, points[i + 1].y, points[i + 2].x, points[i + 2].y, points[i + 3].x, points[i + 3].y);\n        }\n    }\n    ctx.strokeStyle = '#000000';\n    ctx.lineWidth = 5;\n    ctx.stroke();\n};\n// Draw bezier guides (control points and lines)\nconst drawBezierGuides = (ctx, points)=>{\n    if (!points || points.length === 0) return;\n    // Draw guide lines connecting control points\n    ctx.beginPath();\n    ctx.strokeStyle = 'rgba(100, 100, 255, 0.5)';\n    ctx.lineWidth = 1;\n    ctx.moveTo(points[0].x, points[0].y);\n    for(let i = 1; i < points.length; i++){\n        ctx.lineTo(points[i].x, points[i].y);\n    }\n    ctx.stroke();\n    // Draw control points\n    points.forEach((point, index)=>{\n        // End points in red, control points in blue\n        ctx.fillStyle = index === 0 || index === points.length - 1 ? 'rgba(255, 100, 100, 0.8)' : 'rgba(100, 100, 255, 0.8)';\n        ctx.beginPath();\n        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);\n        ctx.fill();\n        // Add index label to each point\n        ctx.fillStyle = 'white';\n        ctx.font = '10px Arial';\n        ctx.textAlign = 'center';\n        ctx.textBaseline = 'middle';\n        ctx.fillText(index + 1, point.x, point.y);\n    });\n};\n// Helper function to calculate distance from point to line segment\nconst distanceToLineSegment = (p1, p2, p)=>{\n    const { x: x1, y: y1 } = p1;\n    const { x: x2, y: y2 } = p2;\n    const { x, y } = p;\n    // Length of the line segment squared\n    const lengthSquared = (x2 - x1) ** 2 + (y2 - y1) ** 2;\n    // If the line segment is just a point, return the distance to that point\n    if (lengthSquared === 0) return Math.sqrt((x - x1) ** 2 + (y - y1) ** 2);\n    // Calculate the projection ratio\n    const t = Math.max(0, Math.min(1, ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / lengthSquared));\n    // Calculate the closest point on the line segment\n    const projectionX = x1 + t * (x2 - x1);\n    const projectionY = y1 + t * (y2 - y1);\n    // Return the distance to the closest point\n    return Math.sqrt((x - projectionX) ** 2 + (y - projectionY) ** 2);\n};\n// Get prompt based on style mode\nconst getPromptForStyle = (styleMode)=>{\n    switch(styleMode){\n        case 'material':\n            return \"Recreate this doodle as a physical chrome sculpture made of a chromium metal tubes or pipes in a professional studio setting. If it is typography, render it accordingly, but always always have a black background and studio lighting. Render it in Cinema 4D with Octane, using studio lighting against a pure black background. Make it look like a high-end product rendering of a sculptural piece. Flat Black background always\";\n        case 'honey':\n            return \"Transform this sketch into a honey-like substance. Render it as if made entirely of translucent, golden honey with characteristic viscous drips and flows. Add realistic liquid properties including surface tension, reflections, and light refraction. Use studio lighting to highlight the amber tones and glossy surface against a black background. Make it appear as if captured in a high-end commercial photography setup.\";\n        case 'softbody':\n            return \"Convert this drawing into a soft body physics simulation. Render it as if made of a soft, jelly-like material that responds to gravity and motion. Add realistic deformation, bounce, and squash effects typical of soft body dynamics. Use dramatic lighting against a black background to emphasize the material's translucency and surface properties. Make it look like a high-end 3D animation frame.\";\n        default:\n            return \"Recreate this doodle as a physical chrome sculpture in a professional studio setting.\";\n    }\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1icm93c2VyKS8uL2NvbXBvbmVudHMvdXRpbHMvY2FudmFzVXRpbHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNEQUFzRDtBQUMvQyxNQUFNQSxpQkFBaUIsQ0FBQ0MsR0FBR0M7UUFTQUQseUJBQUFBLHdCQUNBQSwwQkFBQUE7SUFUaEMsTUFBTUUsT0FBT0QsT0FBT0UscUJBQXFCO0lBRXpDLG1GQUFtRjtJQUNuRixNQUFNQyxTQUFTSCxPQUFPSSxLQUFLLEdBQUdILEtBQUtHLEtBQUs7SUFDeEMsTUFBTUMsU0FBU0wsT0FBT00sTUFBTSxHQUFHTCxLQUFLSyxNQUFNO0lBRTFDLGdEQUFnRDtJQUNoRCxPQUFPO1FBQ0xDLEdBQUcsQ0FBQ1IsRUFBRVMsV0FBVyxDQUFDQyxPQUFPLElBQUtWLEVBQUFBLHlCQUFBQSxFQUFFUyxXQUFXLENBQUNFLE9BQU8sY0FBckJYLDhDQUFBQSwwQkFBQUEsc0JBQXVCLENBQUMsRUFBRSxjQUExQkEsOENBQUFBLHdCQUE0QlksT0FBTyxJQUFHVixLQUFLVyxJQUFJLElBQUtUO1FBQ2xGVSxHQUFHLENBQUNkLEVBQUVTLFdBQVcsQ0FBQ00sT0FBTyxJQUFLZixFQUFBQSwwQkFBQUEsRUFBRVMsV0FBVyxDQUFDRSxPQUFPLGNBQXJCWCwrQ0FBQUEsMkJBQUFBLHVCQUF1QixDQUFDLEVBQUUsY0FBMUJBLCtDQUFBQSx5QkFBNEJnQixPQUFPLElBQUdkLEtBQUtlLEdBQUcsSUFBS1g7SUFDbkY7QUFDRixFQUFFO0FBRUYsMENBQTBDO0FBQ25DLE1BQU1ZLG1CQUFtQixDQUFDakI7SUFDL0IsTUFBTWtCLE1BQU1sQixPQUFPbUIsVUFBVSxDQUFDO0lBRTlCLG9DQUFvQztJQUNwQ0QsSUFBSUUsU0FBUyxHQUFHO0lBQ2hCRixJQUFJRyxRQUFRLENBQUMsR0FBRyxHQUFHckIsT0FBT0ksS0FBSyxFQUFFSixPQUFPTSxNQUFNO0FBQ2hELEVBQUU7QUFFRiwwQ0FBMEM7QUFDbkMsTUFBTWdCLG9CQUFvQixD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RDtJQUNsRCxNQUFNSyxjQUFjVCxLQUFLTSxJQUFLSixDQUFBQSxLQUFLRixFQUFDO0lBQ3BDLE1BQU1VLGNBQWNULEtBQUtLLElBQUtILENBQUFBLEtBQUtGLEVBQUM7SUFFcEMsMkNBQTJDO0lBQzNDLE9BQU9aLEtBQUtnQixJQUFJLENBQUMsQ0FBQ3BELElBQUl3RCxXQUFVLEtBQU0sSUFBSSxDQUFDbEQsSUFBSW1ELFdBQVUsS0FBTTtBQUNqRSxFQUFFO0FBRUYsaUNBQWlDO0FBQzFCLE1BQU1DLG9CQUFvQixDQUFDQztJQUNoQyxPQUFPQTtRQUNMLEtBQUs7WUFDSCxPQUFPO1FBQ1QsS0FBSztZQUNILE9BQU87UUFDVCxLQUFLO1lBQ0gsT0FBTztRQUNUO1lBQ0UsT0FBTztJQUNYO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsiL1VzZXJzL3RydWR5cC9EZXNrdG9wL2Rldi1nZW1pbmktMi4wL2NvbXBvbmVudHMvdXRpbHMvY2FudmFzVXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gR2V0IHRoZSBjb3JyZWN0IGNvb3JkaW5hdGVzIGJhc2VkIG9uIGNhbnZhcyBzY2FsaW5nXG5leHBvcnQgY29uc3QgZ2V0Q29vcmRpbmF0ZXMgPSAoZSwgY2FudmFzKSA9PiB7XG4gIGNvbnN0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIFxuICAvLyBDYWxjdWxhdGUgdGhlIHNjYWxpbmcgZmFjdG9yIGJldHdlZW4gdGhlIGludGVybmFsIGNhbnZhcyBzaXplIGFuZCBkaXNwbGF5ZWQgc2l6ZVxuICBjb25zdCBzY2FsZVggPSBjYW52YXMud2lkdGggLyByZWN0LndpZHRoO1xuICBjb25zdCBzY2FsZVkgPSBjYW52YXMuaGVpZ2h0IC8gcmVjdC5oZWlnaHQ7XG4gIFxuICAvLyBBcHBseSB0aGUgc2NhbGluZyB0byBnZXQgYWNjdXJhdGUgY29vcmRpbmF0ZXNcbiAgcmV0dXJuIHtcbiAgICB4OiAoZS5uYXRpdmVFdmVudC5vZmZzZXRYIHx8IChlLm5hdGl2ZUV2ZW50LnRvdWNoZXM/LlswXT8uY2xpZW50WCAtIHJlY3QubGVmdCkpICogc2NhbGVYLFxuICAgIHk6IChlLm5hdGl2ZUV2ZW50Lm9mZnNldFkgfHwgKGUubmF0aXZlRXZlbnQudG91Y2hlcz8uWzBdPy5jbGllbnRZIC0gcmVjdC50b3ApKSAqIHNjYWxlWVxuICB9O1xufTtcblxuLy8gSW5pdGlhbGl6ZSBjYW52YXMgd2l0aCB3aGl0ZSBiYWNrZ3JvdW5kXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUNhbnZhcyA9IChjYW52YXMpID0+IHtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgXG4gIC8vIEZpbGwgY2FudmFzIHdpdGggd2hpdGUgYmFja2dyb3VuZFxuICBjdHguZmlsbFN0eWxlID0gXCIjRkZGRkZGXCI7XG4gIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xufTtcblxuLy8gRHJhdyB0aGUgYmFja2dyb3VuZCBpbWFnZSB0byB0aGUgY2FudmFzXG5leHBvcnQgY29uc3QgZHJhd0ltYWdlVG9DYW52YXMgPSAoY2FudmFzLCBiYWNrZ3JvdW5kSW1hZ2UpID0+IHtcbiAgaWYgKCFjYW52YXMgfHwgIWJhY2tncm91bmRJbWFnZSkgcmV0dXJuO1xuICBcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgXG4gIC8vIEZpbGwgd2l0aCB3aGl0ZSBiYWNrZ3JvdW5kIGZpcnN0XG4gIGN0eC5maWxsU3R5bGUgPSBcIiNGRkZGRkZcIjtcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gIFxuICAvLyBEcmF3IHRoZSBiYWNrZ3JvdW5kIGltYWdlXG4gIGN0eC5kcmF3SW1hZ2UoXG4gICAgYmFja2dyb3VuZEltYWdlLFxuICAgIDAsIDAsXG4gICAgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0XG4gICk7XG59O1xuXG4vLyBEcmF3IGJlemllciBjdXJ2ZVxuZXhwb3J0IGNvbnN0IGRyYXdCZXppZXJDdXJ2ZSA9IChjYW52YXMsIHBvaW50cykgPT4ge1xuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgXG4gIGlmICghcG9pbnRzIHx8IHBvaW50cy5sZW5ndGggPCA0KSB7XG4gICAgY29uc29sZS5lcnJvcignTmVlZCBhdCBsZWFzdCA0IHBvaW50cyB0byBkcmF3IGEgYmV6aWVyIGN1cnZlJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIFxuICBjdHguYmVnaW5QYXRoKCk7XG4gIGN0eC5tb3ZlVG8ocG9pbnRzWzBdLngsIHBvaW50c1swXS55KTtcbiAgXG4gIC8vIElmIHdlIGhhdmUgZXhhY3RseSA0IHBvaW50cywgZHJhdyBhIHNpbmdsZSBiZXppZXIgY3VydmVcbiAgaWYgKHBvaW50cy5sZW5ndGggPT09IDQpIHtcbiAgICBjdHguYmV6aWVyQ3VydmVUbyhcbiAgICAgIHBvaW50c1sxXS54LCBwb2ludHNbMV0ueSxcbiAgICAgIHBvaW50c1syXS54LCBwb2ludHNbMl0ueSxcbiAgICAgIHBvaW50c1szXS54LCBwb2ludHNbM10ueVxuICAgICk7XG4gIH0gXG4gIC8vIElmIHdlIGhhdmUgbW9yZSBwb2ludHMsIGRyYXcgbXVsdGlwbGUgY29ubmVjdGVkIGJlemllciBjdXJ2ZXNcbiAgLy8gRWFjaCBjdXJ2ZSByZXF1aXJlcyAzIG5ldyBwb2ludHMgYWZ0ZXIgdGhlIHN0YXJ0aW5nIHBvaW50ICh3aGljaCBpcyB0aGUgbGFzdCBwb2ludCBvZiB0aGUgcHJldmlvdXMgY3VydmUpXG4gIGVsc2Uge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aCAtIDM7IGkgKz0gMykge1xuICAgICAgY3R4LmJlemllckN1cnZlVG8oXG4gICAgICAgIHBvaW50c1tpICsgMV0ueCwgcG9pbnRzW2kgKyAxXS55LFxuICAgICAgICBwb2ludHNbaSArIDJdLngsIHBvaW50c1tpICsgMl0ueSxcbiAgICAgICAgcG9pbnRzW2kgKyAzXS54LCBwb2ludHNbaSArIDNdLnlcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIFxuICBjdHguc3Ryb2tlU3R5bGUgPSAnIzAwMDAwMCc7XG4gIGN0eC5saW5lV2lkdGggPSA1O1xuICBjdHguc3Ryb2tlKCk7XG59O1xuXG4vLyBEcmF3IGJlemllciBndWlkZXMgKGNvbnRyb2wgcG9pbnRzIGFuZCBsaW5lcylcbmV4cG9ydCBjb25zdCBkcmF3QmV6aWVyR3VpZGVzID0gKGN0eCwgcG9pbnRzKSA9PiB7XG4gIGlmICghcG9pbnRzIHx8IHBvaW50cy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgXG4gIC8vIERyYXcgZ3VpZGUgbGluZXMgY29ubmVjdGluZyBjb250cm9sIHBvaW50c1xuICBjdHguYmVnaW5QYXRoKCk7XG4gIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDEwMCwgMTAwLCAyNTUsIDAuNSknO1xuICBjdHgubGluZVdpZHRoID0gMTtcbiAgY3R4Lm1vdmVUbyhwb2ludHNbMF0ueCwgcG9pbnRzWzBdLnkpO1xuICBcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICBjdHgubGluZVRvKHBvaW50c1tpXS54LCBwb2ludHNbaV0ueSk7XG4gIH1cbiAgY3R4LnN0cm9rZSgpO1xuICBcbiAgLy8gRHJhdyBjb250cm9sIHBvaW50c1xuICBwb2ludHMuZm9yRWFjaCgocG9pbnQsIGluZGV4KSA9PiB7XG4gICAgLy8gRW5kIHBvaW50cyBpbiByZWQsIGNvbnRyb2wgcG9pbnRzIGluIGJsdWVcbiAgICBjdHguZmlsbFN0eWxlID0gaW5kZXggPT09IDAgfHwgaW5kZXggPT09IHBvaW50cy5sZW5ndGggLSAxID8gXG4gICAgICAncmdiYSgyNTUsIDEwMCwgMTAwLCAwLjgpJyA6ICdyZ2JhKDEwMCwgMTAwLCAyNTUsIDAuOCknO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKHBvaW50LngsIHBvaW50LnksIDUsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIFxuICAgIC8vIEFkZCBpbmRleCBsYWJlbCB0byBlYWNoIHBvaW50XG4gICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgY3R4LmZvbnQgPSAnMTBweCBBcmlhbCc7XG4gICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICBjdHguZmlsbFRleHQoaW5kZXggKyAxLCBwb2ludC54LCBwb2ludC55KTtcbiAgfSk7XG59O1xuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gY2FsY3VsYXRlIGRpc3RhbmNlIGZyb20gcG9pbnQgdG8gbGluZSBzZWdtZW50XG5leHBvcnQgY29uc3QgZGlzdGFuY2VUb0xpbmVTZWdtZW50ID0gKHAxLCBwMiwgcCkgPT4ge1xuICBjb25zdCB7IHg6IHgxLCB5OiB5MSB9ID0gcDE7XG4gIGNvbnN0IHsgeDogeDIsIHk6IHkyIH0gPSBwMjtcbiAgY29uc3QgeyB4LCB5IH0gPSBwO1xuICBcbiAgLy8gTGVuZ3RoIG9mIHRoZSBsaW5lIHNlZ21lbnQgc3F1YXJlZFxuICBjb25zdCBsZW5ndGhTcXVhcmVkID0gKHgyIC0geDEpICoqIDIgKyAoeTIgLSB5MSkgKiogMjtcbiAgXG4gIC8vIElmIHRoZSBsaW5lIHNlZ21lbnQgaXMganVzdCBhIHBvaW50LCByZXR1cm4gdGhlIGRpc3RhbmNlIHRvIHRoYXQgcG9pbnRcbiAgaWYgKGxlbmd0aFNxdWFyZWQgPT09IDApIHJldHVybiBNYXRoLnNxcnQoKHggLSB4MSkgKiogMiArICh5IC0geTEpICoqIDIpO1xuICBcbiAgLy8gQ2FsY3VsYXRlIHRoZSBwcm9qZWN0aW9uIHJhdGlvXG4gIGNvbnN0IHQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCAoKHggLSB4MSkgKiAoeDIgLSB4MSkgKyAoeSAtIHkxKSAqICh5MiAtIHkxKSkgLyBsZW5ndGhTcXVhcmVkKSk7XG4gIFxuICAvLyBDYWxjdWxhdGUgdGhlIGNsb3Nlc3QgcG9pbnQgb24gdGhlIGxpbmUgc2VnbWVudFxuICBjb25zdCBwcm9qZWN0aW9uWCA9IHgxICsgdCAqICh4MiAtIHgxKTtcbiAgY29uc3QgcHJvamVjdGlvblkgPSB5MSArIHQgKiAoeTIgLSB5MSk7XG4gIFxuICAvLyBSZXR1cm4gdGhlIGRpc3RhbmNlIHRvIHRoZSBjbG9zZXN0IHBvaW50XG4gIHJldHVybiBNYXRoLnNxcnQoKHggLSBwcm9qZWN0aW9uWCkgKiogMiArICh5IC0gcHJvamVjdGlvblkpICoqIDIpO1xufTtcblxuLy8gR2V0IHByb21wdCBiYXNlZCBvbiBzdHlsZSBtb2RlXG5leHBvcnQgY29uc3QgZ2V0UHJvbXB0Rm9yU3R5bGUgPSAoc3R5bGVNb2RlKSA9PiB7XG4gIHN3aXRjaChzdHlsZU1vZGUpIHtcbiAgICBjYXNlICdtYXRlcmlhbCc6XG4gICAgICByZXR1cm4gXCJSZWNyZWF0ZSB0aGlzIGRvb2RsZSBhcyBhIHBoeXNpY2FsIGNocm9tZSBzY3VscHR1cmUgbWFkZSBvZiBhIGNocm9taXVtIG1ldGFsIHR1YmVzIG9yIHBpcGVzIGluIGEgcHJvZmVzc2lvbmFsIHN0dWRpbyBzZXR0aW5nLiBJZiBpdCBpcyB0eXBvZ3JhcGh5LCByZW5kZXIgaXQgYWNjb3JkaW5nbHksIGJ1dCBhbHdheXMgYWx3YXlzIGhhdmUgYSBibGFjayBiYWNrZ3JvdW5kIGFuZCBzdHVkaW8gbGlnaHRpbmcuIFJlbmRlciBpdCBpbiBDaW5lbWEgNEQgd2l0aCBPY3RhbmUsIHVzaW5nIHN0dWRpbyBsaWdodGluZyBhZ2FpbnN0IGEgcHVyZSBibGFjayBiYWNrZ3JvdW5kLiBNYWtlIGl0IGxvb2sgbGlrZSBhIGhpZ2gtZW5kIHByb2R1Y3QgcmVuZGVyaW5nIG9mIGEgc2N1bHB0dXJhbCBwaWVjZS4gRmxhdCBCbGFjayBiYWNrZ3JvdW5kIGFsd2F5c1wiO1xuICAgIGNhc2UgJ2hvbmV5JzpcbiAgICAgIHJldHVybiBcIlRyYW5zZm9ybSB0aGlzIHNrZXRjaCBpbnRvIGEgaG9uZXktbGlrZSBzdWJzdGFuY2UuIFJlbmRlciBpdCBhcyBpZiBtYWRlIGVudGlyZWx5IG9mIHRyYW5zbHVjZW50LCBnb2xkZW4gaG9uZXkgd2l0aCBjaGFyYWN0ZXJpc3RpYyB2aXNjb3VzIGRyaXBzIGFuZCBmbG93cy4gQWRkIHJlYWxpc3RpYyBsaXF1aWQgcHJvcGVydGllcyBpbmNsdWRpbmcgc3VyZmFjZSB0ZW5zaW9uLCByZWZsZWN0aW9ucywgYW5kIGxpZ2h0IHJlZnJhY3Rpb24uIFVzZSBzdHVkaW8gbGlnaHRpbmcgdG8gaGlnaGxpZ2h0IHRoZSBhbWJlciB0b25lcyBhbmQgZ2xvc3N5IHN1cmZhY2UgYWdhaW5zdCBhIGJsYWNrIGJhY2tncm91bmQuIE1ha2UgaXQgYXBwZWFyIGFzIGlmIGNhcHR1cmVkIGluIGEgaGlnaC1lbmQgY29tbWVyY2lhbCBwaG90b2dyYXBoeSBzZXR1cC5cIjtcbiAgICBjYXNlICdzb2Z0Ym9keSc6XG4gICAgICByZXR1cm4gXCJDb252ZXJ0IHRoaXMgZHJhd2luZyBpbnRvIGEgc29mdCBib2R5IHBoeXNpY3Mgc2ltdWxhdGlvbi4gUmVuZGVyIGl0IGFzIGlmIG1hZGUgb2YgYSBzb2Z0LCBqZWxseS1saWtlIG1hdGVyaWFsIHRoYXQgcmVzcG9uZHMgdG8gZ3Jhdml0eSBhbmQgbW90aW9uLiBBZGQgcmVhbGlzdGljIGRlZm9ybWF0aW9uLCBib3VuY2UsIGFuZCBzcXVhc2ggZWZmZWN0cyB0eXBpY2FsIG9mIHNvZnQgYm9keSBkeW5hbWljcy4gVXNlIGRyYW1hdGljIGxpZ2h0aW5nIGFnYWluc3QgYSBibGFjayBiYWNrZ3JvdW5kIHRvIGVtcGhhc2l6ZSB0aGUgbWF0ZXJpYWwncyB0cmFuc2x1Y2VuY3kgYW5kIHN1cmZhY2UgcHJvcGVydGllcy4gTWFrZSBpdCBsb29rIGxpa2UgYSBoaWdoLWVuZCAzRCBhbmltYXRpb24gZnJhbWUuXCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcIlJlY3JlYXRlIHRoaXMgZG9vZGxlIGFzIGEgcGh5c2ljYWwgY2hyb21lIHNjdWxwdHVyZSBpbiBhIHByb2Zlc3Npb25hbCBzdHVkaW8gc2V0dGluZy5cIjtcbiAgfVxufTsgIl0sIm5hbWVzIjpbImdldENvb3JkaW5hdGVzIiwiZSIsImNhbnZhcyIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJzY2FsZVgiLCJ3aWR0aCIsInNjYWxlWSIsImhlaWdodCIsIngiLCJuYXRpdmVFdmVudCIsIm9mZnNldFgiLCJ0b3VjaGVzIiwiY2xpZW50WCIsImxlZnQiLCJ5Iiwib2Zmc2V0WSIsImNsaWVudFkiLCJ0b3AiLCJpbml0aWFsaXplQ2FudmFzIiwiY3R4IiwiZ2V0Q29udGV4dCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiZHJhd0ltYWdlVG9DYW52YXMiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJkcmF3SW1hZ2UiLCJkcmF3QmV6aWVyQ3VydmUiLCJwb2ludHMiLCJsZW5ndGgiLCJjb25zb2xlIiwiZXJyb3IiLCJiZWdpblBhdGgiLCJtb3ZlVG8iLCJiZXppZXJDdXJ2ZVRvIiwiaSIsInN0cm9rZVN0eWxlIiwibGluZVdpZHRoIiwic3Ryb2tlIiwiZHJhd0Jlemllckd1aWRlcyIsImxpbmVUbyIsImZvckVhY2giLCJwb2ludCIsImluZGV4IiwiYXJjIiwiTWF0aCIsIlBJIiwiZmlsbCIsImZvbnQiLCJ0ZXh0QWxpZ24iLCJ0ZXh0QmFzZWxpbmUiLCJmaWxsVGV4dCIsImRpc3RhbmNlVG9MaW5lU2VnbWVudCIsInAxIiwicDIiLCJwIiwieDEiLCJ5MSIsIngyIiwieTIiLCJsZW5ndGhTcXVhcmVkIiwic3FydCIsInQiLCJtYXgiLCJtaW4iLCJwcm9qZWN0aW9uWCIsInByb2plY3Rpb25ZIiwiZ2V0UHJvbXB0Rm9yU3R5bGUiLCJzdHlsZU1vZGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-browser)/./components/utils/canvasUtils.js\n"));

/***/ })

});