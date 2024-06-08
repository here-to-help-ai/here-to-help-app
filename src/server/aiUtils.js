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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTranscript = void 0;
var aiHelpers_1 = require("./aiHelpers"); // Adjust the import path as necessary
var transcript = "\nOperator: It's important to remember that your feelings and experiences are valid, and it's okay to seek support from those around you. Sometimes just sharing can make a big difference. Have you considered talking to a mental health professional, like a therapist or counselor?\nCustomer: I have, but I'm not sure where to start. It feels like such a huge step, and I'm scared they won't understand or be able to help.\nOperator: Starting therapy can feel daunting, but it's a positive step towards feeling better. Therapists are trained to help with exactly what you're going through, and there are many different types of support available. I can help you find resources or connect you with services that specialize in mental health support. Would that be helpful?\nCustomer: Maybe, yes. I just want to feel like myself again, but I don't know if it's possible.\nOperator: It's definitely possible, and reaching out like this is the first step. You don't have to go through this alone. Let's take it one step at a time. I can provide you with some resources and help you plan the next steps towards getting the support you need.\nCustomer: Thank you. That sounds like a good place to start. I appreciate you listening and not judging me.\nOperator: Of course. I'm here to support you, and there's absolutely no judgment. You're doing the right thing by seeking help. Let's work together to find the best path forward for you.\n";
var BUFFER_SIZE = 2;
var processTranscript = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var transcript, linesPerChunk, lines, chunks, i, results, conversationBuffer, summaryResult, i, chunk, summaryResult_1, summaryText, analysisResult, riskLevelResult, detectedIssuesResult, recommendationsResult, actionStepsResult, bufferLines;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transcript = input.transcript, linesPerChunk = input.linesPerChunk;
                lines = transcript.split('\n');
                chunks = [];
                for (i = 0; i < lines.length; i += linesPerChunk) {
                    chunks.push(lines.slice(i, i + linesPerChunk).join('\n'));
                }
                results = {};
                conversationBuffer = "";
                summaryResult = "";
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < chunks.length)) return [3 /*break*/, 9];
                chunk = chunks[i];
                return [4 /*yield*/, (0, aiHelpers_1.summarize)(chunk)];
            case 2:
                summaryResult_1 = _a.sent();
                summaryText = (summaryResult_1 === null || summaryResult_1 === void 0 ? void 0 : summaryResult_1.summary) || "";
                return [4 /*yield*/, (0, aiHelpers_1.emotionalState)(summaryText, conversationBuffer, chunk)];
            case 3:
                analysisResult = _a.sent();
                return [4 /*yield*/, (0, aiHelpers_1.riskLevel)(summaryText, conversationBuffer, chunk)];
            case 4:
                riskLevelResult = _a.sent();
                return [4 /*yield*/, (0, aiHelpers_1.detectedIssues)(summaryText, conversationBuffer, chunk)];
            case 5:
                detectedIssuesResult = _a.sent();
                return [4 /*yield*/, (0, aiHelpers_1.recommendations)(summaryText, conversationBuffer, chunk)];
            case 6:
                recommendationsResult = _a.sent();
                return [4 /*yield*/, (0, aiHelpers_1.actionSteps)(summaryText, conversationBuffer, chunk)];
            case 7:
                actionStepsResult = _a.sent();
                conversationBuffer += chunk + "\n";
                bufferLines = conversationBuffer.split('\n');
                if (bufferLines.length > BUFFER_SIZE * linesPerChunk) {
                    conversationBuffer = bufferLines.slice(bufferLines.length - BUFFER_SIZE * linesPerChunk).join('\n');
                }
                results["chunk_".concat(i + 1)] = {
                    analysis: analysisResult,
                    riskLevel: riskLevelResult,
                    detectedIssues: detectedIssuesResult,
                    recommendations: recommendationsResult,
                    actionSteps: actionStepsResult,
                };
                _a.label = 8;
            case 8:
                i++;
                return [3 /*break*/, 1];
            case 9: return [2 /*return*/, results];
        }
    });
}); };
exports.processTranscript = processTranscript;
await (0, exports.processTranscript)({ transcript: transcript, linesPerChunk: 2 });
