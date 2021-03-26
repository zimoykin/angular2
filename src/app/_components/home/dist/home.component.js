"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(http, io) {
        this.http = http;
        this.io = io;
        this.users$ = new rxjs_1.BehaviorSubject(undefined);
        this.online = new Array();
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!localStorage.getItem("usr")) {
            window.location.href = "/auth";
        }
        this.http.get('/api/user')
            .then(function (users) {
            _this.users$.next(users);
        })["catch"](function (err) {
            console.log(err);
        });
        this.io.connect()
            .subscribe(function (result) {
            _this.online.push(JSON.parse((result.data)));
        }, function (err) { return console.log(err); }, function () { console.log('ws done'); });
    };
    HomeComponent.prototype.isOnline = function (clientid) {
        return (this.online.filter(function (val) { return val == clientid; }).length != 0);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "app-home",
            templateUrl: "./home.component.html",
            styleUrls: ["./home.component.scss"]
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
