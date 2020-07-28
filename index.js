'use strict';
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
var instagram_private_api_1 = require("instagram-private-api");
var lodash_1 = require("lodash");
var inquirer = require("inquirer");
console.log("\n  - Instagram Auto View Story -\n  Contact? auliaahmad165@gmail.com (Email) / @auliaahmad16 (Instagram)\n");
var ig = new instagram_private_api_1.IgApiClient();
// Generate random number with range 
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
// sleep with promise return 
function sleep(timeout) {
    return new Promise(function (resolve) { return setTimeout(resolve, timeout); });
}
// generate timestamp
function getTimeStamp() {
    var currentTimestamp = new Date();
    var dateFormat = currentTimestamp.getDate() + "-" + currentTimestamp.getMonth() + "-" + currentTimestamp.getFullYear();
    var timeFormat = currentTimestamp.getHours() + ":" + currentTimestamp.getMinutes() + ":" + currentTimestamp.getSeconds();
    return dateFormat + " " + timeFormat;
}
// wrap console.log with timestamp
function print(text) {
    console.log("[" + getTimeStamp() + "] " + text);
}
// Main program
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, err_1, reelsTray, excute, loop;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, inquirer.prompt([
                    {
                        type: 'input',
                        name: 'username',
                        message: 'Enter Username'
                    },
                    {
                        type: 'password',
                        name: 'password',
                        message: 'Enter Password'
                    }
                ])];
            case 1:
                _a = _b.sent(), username = _a.username, password = _a.password;
                ig.state.generateDevice(username);
                _b.label = 2;
            case 2:
                _b.trys.push([2, 5, , 9]);
                return [4 /*yield*/, ig.simulate.preLoginFlow()];
            case 3:
                _b.sent();
                return [4 /*yield*/, ig.account.login(username, password)];
            case 4:
                _b.sent();
                return [3 /*break*/, 9];
            case 5:
                err_1 = _b.sent();
                if (!(err_1 instanceof instagram_private_api_1.IgCheckpointError)) return [3 /*break*/, 7];
                return [4 /*yield*/, resolveCheckpoint()];
            case 6:
                _b.sent();
                return [3 /*break*/, 8];
            case 7:
                print(err_1);
                return [2 /*return*/];
            case 8: return [3 /*break*/, 9];
            case 9:
                reelsTray = ig.feed.reelsTray();
                excute = function (nextRequestDelay) { return __awaiter(void 0, void 0, void 0, function () {
                    var reelsTrayItems, unseenReelsTrayItems, unseenUsers, _loop_1, _i, unseenReelsTrayItems_1, user;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, reelsTray.items()]; // request reels items
                            case 1:
                                reelsTrayItems = _a.sent() // request reels items
                                ;
                                unseenReelsTrayItems = reelsTrayItems // filter unseen items
                                    .filter(function (_a) {
                                    var seen = _a.seen, latest_reel_media = _a.latest_reel_media;
                                    return seen < latest_reel_media;
                                });
                                // return if nothing to seen
                                if (unseenReelsTrayItems.length < 1) {
                                    print("Nothing to seen ...");
                                    print("Next request reelsTray " + nextRequestDelay / 60000 + " minutes");
                                    return [2 /*return*/];
                                }
                                unseenUsers = unseenReelsTrayItems
                                    .map(function (_a) {
                                    var username = _a.user.username;
                                    return username;
                                });
                                print("Unseen users: " + unseenUsers.join(', '));
                                _loop_1 = function (user) {
                                    var items, chunkedItems, delay;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                items = user.media_ids
                                                    .map(function (media_id) {
                                                    return {
                                                        id: media_id + "_" + user.id,
                                                        taken_at: user.latest_reel_media,
                                                        user: { pk: user.id }
                                                    };
                                                });
                                                chunkedItems = lodash_1.chunk(items, 5);
                                                return [4 /*yield*/, Promise.all(chunkedItems
                                                        .map(function (item) { return ig.story.seen(item); }))];
                                            case 1:
                                                _a.sent();
                                                print(user.user.username + " story mark as seen, latest reel media id: " + user.latest_reel_media);
                                                delay = generateRandomNumber(1, 10) * 1000 // generate delay for next user request (in seconds)
                                                ;
                                                return [4 /*yield*/, sleep(delay)];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                };
                                _i = 0, unseenReelsTrayItems_1 = unseenReelsTrayItems;
                                _a.label = 2;
                            case 2:
                                if (!(_i < unseenReelsTrayItems_1.length)) return [3 /*break*/, 5];
                                user = unseenReelsTrayItems_1[_i];
                                return [5 /*yield**/, _loop_1(user)];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4:
                                _i++;
                                return [3 /*break*/, 2];
                            case 5:
                                print("Next request reelsTray " + nextRequestDelay / 60000 + " minutes");
                                return [2 /*return*/];
                        }
                    });
                }); };
                loop = function () {
                    var delay = generateRandomNumber(3, 5) * 60000; //generate delay for next request (in minutes)
                    print("Request reelsTray ...");
                    excute(delay);
                    setTimeout(loop, delay);
                };
                // call loop
                loop();
                return [2 /*return*/];
        }
    });
}); })();
function resolveCheckpoint() {
    return __awaiter(this, void 0, void 0, function () {
        var code, challangeResponse, checkpointSuccess;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    print("Challenge required!, try Requesting sms-code or click \"It was me\" button");
                    return [4 /*yield*/, ig.challenge.auto(true)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, inquirer.prompt([{
                                type: 'input',
                                name: 'code',
                                message: 'Enter code'
                            }])];
                case 2:
                    code = (_a.sent()).code;
                    return [4 /*yield*/, ig.challenge.sendSecurityCode(code)];
                case 3:
                    challangeResponse = _a.sent();
                    checkpointSuccess = challangeResponse.hasOwnProperty('logged_in_user') && challangeResponse.status === 'ok';
                    if (!checkpointSuccess) {
                        print('Could not resolve checkpoint, exit ...');
                        process.exit(1);
                    }
                    else {
                        print('Checkpoint resolve, next step!');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
