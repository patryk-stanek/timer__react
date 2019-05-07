'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
};

var Timer = function (_React$Component) {
    _inherits(Timer, _React$Component);

    function Timer(display) {
        _classCallCheck(this, Timer);

        // this.state = {
        //     minutes: 0,
        //     seconds: 0,
        //     miliseconds: 0
        // }

        var _this = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this));

        _this.running = false;
        _this.display = display;
        _this.reset();
        _this.print(_this.times);

        _this.start = _this.start.bind(_this);
        _this.stop = _this.stop.bind(_this);
        _this.clear = _this.clear.bind(_this);
        _this.save = _this.save.bind(_this);
        _this.clearTimes = _this.clearTimes.bind(_this);
        return _this;
    }

    _createClass(Timer, [{
        key: 'reset',
        value: function reset() {
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (!this.running) {
                this.running = true;
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }

            console.log('start');
            console.log(this.format(this.times));
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.running = false;
            clearInterval(this.watch);

            console.log('stop');
            console.log(this.format(this.times));
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.reset();
            // this.display.innerText = this.format(this.times);

            console.log(this.watch);
        }
    }, {
        key: 'print',
        value: function print() {
            // this.display.innerText = this.format(this.times);
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            this.times.miliseconds += 1;
            if (this.times.miliseconds >= 100) {
                this.times.seconds += 1;
                this.times.miliseconds = 0;
            }
            if (this.times.seconds >= 60) {
                this.times.minutes += 1;
                this.times.seconds = 0;
            }
        }
    }, {
        key: 'format',
        value: function format(times) {
            return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.running) return;
            this.calculate();
            this.print();
        }
    }, {
        key: 'save',
        value: function save() {
            var results = document.getElementById('results');
            var li = document.createElement('li');
            li.appendChild(document.createTextNode('' + this.format(this.times)));
            results.appendChild(li);
        }
    }, {
        key: 'clearTimes',
        value: function clearTimes() {
            var results = document.getElementById('results');
            results.innerHTML = "";
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'nav',
                    { className: 'controls' },
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'start', onClick: this.start },
                        React.createElement('i', { className: 'fas fa-play' })
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'stop', onClick: this.stop },
                        React.createElement('i', { className: 'fas fa-stop' })
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'clear', onClick: this.clear },
                        React.createElement('i', { className: 'fas fa-redo-alt' })
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'save', onClick: this.save },
                        React.createElement('i', { className: 'fas fa-save' })
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'refresh', onClick: this.clearTimes },
                        React.createElement('i', { className: 'fas fa-broom' })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'stopwatch' },
                    this.format(this.times)
                ),
                React.createElement('ul', { id: 'results' })
            );
        }
    }]);

    return Timer;
}(React.Component);

var timer = React.createElement(Timer);
ReactDOM.render(timer, document.getElementById('timer'));
