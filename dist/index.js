'use strict';
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _jsxFileName = 'src/index.js';
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactNative = require('react-native');
var _reactNative2 = _interopRequireDefault(_reactNative);
var _propTypes = require('prop-types');
var _propTypes2 = _interopRequireDefault(_propTypes);
var _createReactClass = require('create-react-class');
var _createReactClass2 = _interopRequireDefault(_createReactClass);
var _reactTimerMixin = require('react-timer-mixin');
var _reactTimerMixin2 = _interopRequireDefault(_reactTimerMixin);

function _interopRequireDefault (obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var _Dimensions$get = _reactNative.Dimensions.get('window'), width = _Dimensions$get.width,
  height = _Dimensions$get.height;
var styles = _reactNative.StyleSheet.create({
  container: {backgroundColor: 'transparent', position: 'relative'},
  wrapper: {backgroundColor: 'transparent'},
  slide: {backgroundColor: 'transparent'},
  pagination_x: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  pagination_y: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  title: {
    height: 30,
    justifyContent: 'center',
    position: 'absolute',
    paddingLeft: 10,
    bottom: -30,
    left: 0,
    flexWrap: 'nowrap',
    width: 250,
    backgroundColor: 'transparent'
  },
  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonText: {fontSize: 50, color: '#007aff', fontFamily: 'Arial'}
});
module.exports = (0, _createReactClass2.default)({
  displayName: 'exports',
  propTypes: {
    horizontal: _propTypes2.default.bool,
    children: _propTypes2.default.node.isRequired,
    style: _reactNative.ViewPropTypes.style,
    pagingEnabled: _propTypes2.default.bool,
    showsHorizontalScrollIndicator: _propTypes2.default.bool,
    showsVerticalScrollIndicator: _propTypes2.default.bool,
    bounces: _propTypes2.default.bool,
    scrollsToTop: _propTypes2.default.bool,
    removeClippedSubviews: _propTypes2.default.bool,
    automaticallyAdjustContentInsets: _propTypes2.default.bool,
    showsPagination: _propTypes2.default.bool,
    showsButtons: _propTypes2.default.bool,
    loop: _propTypes2.default.bool,
    autoplay: _propTypes2.default.bool,
    autoplayTimeout: _propTypes2.default.number,
    autoplayDirection: _propTypes2.default.bool,
    index: _propTypes2.default.number,
    renderPagination: _propTypes2.default.func,
    onScroll: _propTypes2.default.func
  },
  mixins: [_reactTimerMixin2.default],
  getDefaultProps: function getDefaultProps () {
    return {
      horizontal: true,
      pagingEnabled: true,
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      bounces: false,
      scrollsToTop: false,
      removeClippedSubviews: true,
      automaticallyAdjustContentInsets: false,
      showsPagination: true,
      showsButtons: false,
      loop: true,
      autoplay: false,
      autoplayTimeout: 2.5,
      autoplayDirection: true,
      index: 0
    };
  },
  getInitialState: function getInitialState () {
    return this.initState(this.props);
  },
  autoplayTimer: null,
  componentWillMount: function componentWillMount () {
    this.props = this.injectState(this.props);
  },
  componentWillReceiveProps: function componentWillReceiveProps (props) {
    this.setState(this.initState(props));
  },
  componentDidMount: function componentDidMount () {
    this.autoplay();
  },
  initState: function initState (props) {
    var initState = {isScrolling: false, autoplayEnd: false};
    initState.total = props.children ? props.children.length || 1 : 0;
    initState.index = initState.total > 1 ? Math.min(props.index, initState.total - 1) : 0;
    initState.dir = props.horizontal == false ? 'y' : 'x';
    initState.width = props.width || width;
    initState.height = props.height || height;
    initState.offset = {};
    if (initState.total > 1) {
      var setup = initState.index;
      if (props.loop) {
        setup++;
      }
      initState.offset[initState.dir] = initState.dir == 'y' ? initState.height * setup : initState.width * setup;
    }
    return initState;
  },
  autoplay: function autoplay () {
    var _this = this;
    if (!Array.isArray(this.props.children) || !this.props.autoplay || this.state.isScrolling || this.state.autoplayEnd) return;
    clearTimeout(this.autoplayTimer);
    this.autoplayTimer = this.setTimeout(function () {
      if (!_this.props.loop && (_this.props.autoplayDirection ? _this.state.index == _this.state.total - 1 : _this.state.index == 0)) return _this.setState({autoplayEnd: true});
      _this.scrollTo(_this.props.autoplayDirection ? 1 : -1);
    }, this.props.autoplayTimeout * 1000);
  },
  onScrollBegin: function onScrollBegin (e) {
    var _this2 = this;
    this.setState({isScrolling: true});
    this.setTimeout(function () {
      _this2.props.onScrollBeginDrag && _this2.props.onScrollBeginDrag(e, _this2.state, _this2);
    });
  },
  onScrollEnd: function onScrollEnd (e) {
    var _this3 = this;
    this.setState({isScrolling: false});
    if (!e.nativeEvent.contentOffset) {
      if (this.state.dir == 'x') {
        e.nativeEvent.contentOffset = {x: e.nativeEvent.position * this.state.width};
      } else {
        e.nativeEvent.contentOffset = {y: e.nativeEvent.position * this.state.height};
      }
    }
    this.updateIndex(e.nativeEvent.contentOffset, this.state.dir);
    this.setTimeout(function () {
      _this3.autoplay();
      _this3.props.onMomentumScrollEnd && _this3.props.onMomentumScrollEnd(e, _this3.state, _this3);
    });
  },
  onScroll: function onScroll (e) {
    this.props.onScroll({x: e.nativeEvent.contentOffset.x});
  },
  onAndroidScroll: function onAndroidScroll (e) {
    var event = e.nativeEvent;
    var x = event.position * this.state.width + event.offset * this.state.width;
    this.props.onScroll({x: x});
  },
  updateIndex: function updateIndex (offset, dir) {
    var state = this.state;
    var index = state.index;
    var diff = offset[dir] - state.offset[dir];
    var step = dir == 'x' ? state.width : state.height;
    if (!diff) return;
    index = index + diff / step;
    if (this.props.loop) {
      if (index <= -1) {
        index = state.total - 1;
        offset[dir] = step * state.total;
      } else if (index >= state.total) {
        index = 0;
        offset[dir] = step;
      }
    }
    this.setState({index: index, offset: offset});
  },
  scrollTo: function scrollTo (index) {
    var _this4 = this;
    if (this.state.isScrolling || this.state.total < 2) return;
    var state = this.state;
    var diff = (this.props.loop ? 1 : 0) + index + this.state.index;
    var x = 0;
    var y = 0;
    if (state.dir == 'x') x = diff * state.width;
    if (state.dir == 'y') y = diff * state.height;
    if (_reactNative.Platform.OS === 'android') {
      this.refs.scrollView && this.refs.scrollView.setPage(diff);
    } else {
      this.refs.scrollView && this.refs.scrollView.scrollTo({y: y, x: x});
    }
    this.setState({isScrolling: true, autoplayEnd: false});
    if (_reactNative.Platform.OS === 'android') {
      this.setTimeout(function () {
        _this4.onScrollEnd({nativeEvent: {position: diff}});
      }, 50);
    }
  },
  renderPagination: function renderPagination () {
    if (this.state.total <= 1) return null;
    var dots = [];
    var ActiveDot = this.props.activeDot || _react2.default.createElement(_reactNative.View, {
      style: {
        backgroundColor: '#007aff',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
      }, __source: {fileName: _jsxFileName, lineNumber: 378}
    });
    var Dot = this.props.dot || _react2.default.createElement(_reactNative.View, {
      style: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
      }, __source: {fileName: _jsxFileName, lineNumber: 388}
    });
    for (var i = 0; i < this.state.total; i++) {
      dots.push(i === this.state.index ? _react2.default.cloneElement(ActiveDot, {key: i}) : _react2.default.cloneElement(Dot, {key: i}));
    }
    return _react2.default.createElement(_reactNative.View, {
      pointerEvents: 'none',
      style: [styles['pagination_' + this.state.dir], this.props.paginationStyle],
      __source: {fileName: _jsxFileName, lineNumber: 408}
    }, dots);
  },
  renderTitle: function renderTitle () {
    var child = this.props.children[this.state.index];
    var title = child && child.props.title;
    return title ? _react2.default.createElement(_reactNative.View, {
      style: styles.title,
      __source: {fileName: _jsxFileName, lineNumber: 419}
    }, this.props.children[this.state.index].props.title) : null;
  },
  renderNextButton: function renderNextButton () {
    var _this5 = this;
    var button = void 0;
    if (this.props.loop || this.state.index != this.state.total - 1) {
      button = this.props.nextButton || _react2.default.createElement(_reactNative.Text, {
        style: styles.buttonText,
        __source: {fileName: _jsxFileName, lineNumber: 430}
      }, '\u203A');
    }
    return _react2.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress () {
        return button !== null && _this5.scrollTo.call(_this5, 1);
      }, __source: {fileName: _jsxFileName, lineNumber: 434}
    }, _react2.default.createElement(_reactNative.View, {__source: {fileName: _jsxFileName, lineNumber: 435}}, button));
  },
  renderPrevButton: function renderPrevButton () {
    var _this6 = this;
    var button = null;
    if (this.props.loop || this.state.index != 0) {
      button = this.props.prevButton || _react2.default.createElement(_reactNative.Text, {
        style: styles.buttonText,
        __source: {fileName: _jsxFileName, lineNumber: 446}
      }, '\u2039');
    }
    return _react2.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress () {
        return button !== null && _this6.scrollTo.call(_this6, -1);
      }, __source: {fileName: _jsxFileName, lineNumber: 450}
    }, _react2.default.createElement(_reactNative.View, {__source: {fileName: _jsxFileName, lineNumber: 451}}, button));
  },
  renderButtons: function renderButtons () {
    return _react2.default.createElement(_reactNative.View, {
      pointerEvents: 'box-none',
      style: [styles.buttonWrapper, {
        width: this.state.width,
        height: this.state.height
      }, this.props.buttonWrapperStyle],
      __source: {fileName: _jsxFileName, lineNumber: 460}
    }, this.renderPrevButton(), this.renderNextButton());
  },
  renderScrollView: function renderScrollView (pages) {
    if (_reactNative.Platform.OS === 'ios') return _react2.default.createElement(_reactNative.ScrollView, _extends({ref: 'scrollView'}, this.props, {
      contentContainerStyle: [styles.wrapper, this.props.style],
      contentOffset: this.state.offset,
      onScrollBeginDrag: this.onScrollBegin,
      onMomentumScrollEnd: this.onScrollEnd,
      onScroll: this.onScroll,
      scrollEventThrottle: 16,
      __source: {fileName: _jsxFileName, lineNumber: 469}
    }), pages);
    return _react2.default.createElement(_reactNative.ViewPagerAndroid, _extends({ref: 'scrollView'}, this.props, {
      initialPage: this.state.index,
      onPageSelected: this.onScrollEnd,
      style: {flex: 1},
      onPageScroll: this.onAndroidScroll,
      __source: {fileName: _jsxFileName, lineNumber: 482}
    }), pages);
  },
  injectState: function injectState (props) {
    var _this7 = this;
    for (var prop in props) {
      if (typeof props[prop] === 'function' && prop !== 'onMomentumScrollEnd' && prop !== 'renderPagination' && prop !== 'onScrollBeginDrag' && prop !== 'onScroll') {
        (function () {
          var originResponder = props[prop];
          props[prop] = function (e) {
            return originResponder(e, _this7.state, _this7);
          };
        })();
      }
    }
    return props;
  },
  render: function render () {
    var state = this.state;
    var props = this.props;
    var children = props.children;
    var index = state.index;
    var total = state.total;
    var loop = props.loop;
    var dir = state.dir;
    var key = 0;
    var pages = [];
    var pageStyle = [{width: state.width, height: state.height}, styles.slide];
    if (total > 1) {
      pages = Object.keys(children);
      if (loop) {
        pages.unshift(total - 1);
        pages.push(0);
      }
      pages = pages.map(function (page, i) {
        return _react2.default.createElement(_reactNative.View, {
          style: pageStyle,
          key: i,
          __source: {fileName: _jsxFileName, lineNumber: 551}
        }, children[page]);
      });
    } else pages = _react2.default.createElement(_reactNative.View, {
      style: pageStyle,
      __source: {fileName: _jsxFileName, lineNumber: 554}
    }, children);
    return _react2.default.createElement(_reactNative.View, {
      style: [styles.container, {
        width: state.width,
        height: state.height
      }], __source: {fileName: _jsxFileName, lineNumber: 557}
    }, this.renderScrollView(pages), props.showsPagination && (props.renderPagination ? this.props.renderPagination(state.index, state.total, this) : this.renderPagination()), this.renderTitle(), this.props.showsButtons && this.renderButtons());
  }
});
