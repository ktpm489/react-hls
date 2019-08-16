'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hls = require('hls.js');

var _hls2 = _interopRequireDefault(_hls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactHls = function (_React$Component) {
    _inherits(ReactHls, _React$Component);

    function ReactHls(props) {
        _classCallCheck(this, ReactHls);

        var _this = _possibleConstructorReturn(this, (ReactHls.__proto__ || Object.getPrototypeOf(ReactHls)).call(this, props));

        _this.state = {
            playerId: Date.now()
        };

        _this.hls = null;
        return _this;
    }

    _createClass(ReactHls, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this._initPlayer();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._initPlayer();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var hls = this.hls;


            if (hls) {
                hls.destroy();
            }
        }
    }, {
        key: '_initPlayer',
        value: function _initPlayer() {
            var _this2 = this;

            if (this.hls) {
                this.hls.destroy();
            }

            var _props = this.props,
                url = _props.url,
                autoplay = _props.autoplay,
                hlsConfig = _props.hlsConfig;
            var $video = this.refs.video;

            var hls = new _hls2.default(hlsConfig);

            hls.loadSource(url);
            hls.attachMedia($video);
            hls.on(_hls2.default.Events.MANIFEST_PARSED, function () {
                if (autoplay) {
                    $video.play();
                }
            });
            hls.on(_hls2.default.Events.ERROR, function (e, data) {
                _this2.props.onError && _this2.props.onError(e, data);
            });

            this.hls = hls;
        }
    }, {
        key: 'render',
        value: function render() {
            var playerId = this.state.playerId;
            var _props2 = this.props,
                controls = _props2.controls,
                width = _props2.width,
                height = _props2.height,
                poster = _props2.poster,
                videoProps = _props2.videoProps;


            return _react2.default.createElement(
                'div',
                { key: playerId, className: 'player-area' },
                _react2.default.createElement('video', _extends({ ref: 'video',
                    className: 'hls-player',
                    id: 'react-hls-' + playerId,
                    controls: controls,
                    crossOrigin: 'anonymous',
                    width: width,
                    height: height,
                    poster: poster
                }, videoProps))
            );
        }
    }]);

    return ReactHls;
}(_react2.default.Component);

ReactHls.propTypes = {
    url: _propTypes2.default.string.isRequired,
    autoplay: _propTypes2.default.bool,
    hlsConfig: _propTypes2.default.object, //https://github.com/dailymotion/hls.js/blob/master/API.md#fine-tuning
    controls: _propTypes2.default.bool,
    width: _propTypes2.default.number,
    height: _propTypes2.default.number,
    poster: _propTypes2.default.string,
    videoProps: _propTypes2.default.object,
    onError: _propTypes2.default.func
};

ReactHls.defaultProps = {
    autoplay: true,
    hlsConfig: {},
    controls: true,
    width: 500,
    height: 375,
    onError: null
};

exports.default = ReactHls;