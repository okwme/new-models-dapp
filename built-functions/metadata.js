(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 307);
/******/ })
/************************************************************************/
/******/ ({

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** @module route/nodes */


/**
 * Create a node for use with the parser, giving it a constructor that takes
 * props, children, and returns an object with props, children, and a
 * displayName.
 * @param  {String} displayName The display name for the node
 * @return {{displayName: string, props: Object, children: Array}}
 */
function createNode(displayName) {
  return function(props, children) {
    return {
      displayName: displayName,
      props: props,
      children: children || []
    };
  };
}

module.exports = {
  Root: createNode('Root'),
  Concat: createNode('Concat'),
  Literal: createNode('Literal'),
  Splat: createNode('Splat'),
  Param: createNode('Param'),
  Optional: createNode('Optional')
};


/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module route/visitors/create_visitor
 */

var nodeTypes = Object.keys(__webpack_require__(136));

/**
 * Helper for creating visitors. Take an object of node name to handler
 * mappings, returns an object with a "visit" method that can be called
 * @param  {Object.<string,function(node,context)>} handlers A mapping of node
 * type to visitor functions
 * @return {{visit: function(node,context)}}  A visitor object with a "visit"
 * method that can be called on a node with a context
 */
function createVisitor(handlers) {
  nodeTypes.forEach(function(nodeType) {
    if( typeof handlers[nodeType] === 'undefined') {
      throw new Error('No handler defined for ' + nodeType.displayName);
    }

  });

  return {
    /**
     * Call the given handler for this node type
     * @param  {Object} node    the AST node
     * @param  {Object} context context to pass through to handlers
     * @return {Object}
     */
    visit: function(node, context) {
      return this.handlers[node.displayName].call(this,node, context);
    },
    handlers: handlers
  };
}

module.exports = createVisitor;

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_assets_utils__ = __webpack_require__(314);


var Route = __webpack_require__(308);


exports.handler = function (event, context, callback) {
    console.log(event);
    var headers = {
        "Content-Type": "text/html; charset=utf-8",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
    };
    var route = new Route('/metadata/:tokenId');
    var route2 = new Route('/.netlify/functions/metadata/:tokenId');
    var result = route.match(event.path);
    if (!result) {
        result = route2.match(event.path);
    }
    var works = {
        "1": {
            name: "Name",
            description: "Description",
            meta: {
                artist: "Artist"
            }
        },
        "2": {
            name: "Name",
            description: "Description",
            meta: {
                artist: "Artist"
            }
        },
        "3": {
            name: "Name",
            description: "Description",
            meta: {
                artist: "Artist"
            }
        },
        "4": {
            name: "Name",
            description: "Description",
            meta: {
                artist: "Artist"
            }
        },
        "5": {
            name: "Name",
            description: "Description",
            meta: {
                artist: "Artist"
            }
        }
    };

    if (result && result.tokenId && works[Object(__WEBPACK_IMPORTED_MODULE_1__src_assets_utils__["b" /* workIdFromTokenId */])(result.tokenId)]) {

        headers["Content-Type"] = "application/json; charset=utf-8";

        var tokenId = result.tokenId;
        var workId = Object(__WEBPACK_IMPORTED_MODULE_1__src_assets_utils__["b" /* workIdFromTokenId */])(tokenId);
        var body = works[workId];
        body.meta.series = workId;
        body.meta.edition = Object(__WEBPACK_IMPORTED_MODULE_1__src_assets_utils__["a" /* editionFromTokenId */])(tokenId) + '/100';
        body.image = 'https://res.cloudinary.com/dszcbwdrl/image/upload/' + workId;
        body = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(body);
        callback(null, {
            statusCode: 200,
            headers: headers,
            body: body
        });
    } else {
        callback(null, {
            statusCode: 404,
            headers: headers,
            body: "¯\\_(ツ)_/¯"
        });
    }
};

/***/ }),

/***/ 308:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module Passage
 */


var Route = __webpack_require__(309);


module.exports = Route;

/***/ }),

/***/ 309:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Parser = __webpack_require__(310),
    RegexpVisitor = __webpack_require__(312),
    ReverseVisitor = __webpack_require__(313);

Route.prototype = Object.create(null)

/**
 * Match a path against this route, returning the matched parameters if
 * it matches, false if not.
 * @example
 * var route = new Route('/this/is/my/route')
 * route.match('/this/is/my/route') // -> {}
 * @example
 * var route = new Route('/:one/:two')
 * route.match('/foo/bar/') // -> {one: 'foo', two: 'bar'}
 * @param  {string} path the path to match this route against
 * @return {(Object.<string,string>|false)} A map of the matched route
 * parameters, or false if matching failed
 */
Route.prototype.match = function(path) {
  var re = RegexpVisitor.visit(this.ast),
      matched = re.match(path);

  return matched ? matched : false;

};

/**
 * Reverse a route specification to a path, returning false if it can't be
 * fulfilled
 * @example
 * var route = new Route('/:one/:two')
 * route.reverse({one: 'foo', two: 'bar'}) -> '/foo/bar'
 * @param  {Object} params The parameters to fill in
 * @return {(String|false)} The filled in path
 */
Route.prototype.reverse = function(params) {
  return ReverseVisitor.visit(this.ast, params);
};

/**
 * Represents a route
 * @example
 * var route = Route('/:foo/:bar');
 * @example
 * var route = Route('/:foo/:bar');
 * @param {string} spec -  the string specification of the route.
 *     use :param for single portion captures, *param for splat style captures,
 *     and () for optional route branches
 * @constructor
 */
function Route(spec) {
  var route;
  if (this) {
    // constructor called with new
    route = this;
  } else {
    // constructor called as a function
    route = Object.create(Route.prototype);
  }
  if( typeof spec === 'undefined' ) {
    throw new Error('A route spec is required');
  }
  route.spec = spec;
  route.ast = Parser.parse(spec);
  return route;
}

module.exports = Route;

/***/ }),

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module route/parser
 */


/** Wrap the compiled parser with the context to create node objects */
var parser = __webpack_require__(311).parser;
parser.yy = __webpack_require__(136);
module.exports = parser;


/***/ }),

/***/ 311:
/***/ (function(module, exports, __webpack_require__) {

/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,9],$V1=[1,10],$V2=[1,11],$V3=[1,12],$V4=[5,11,12,13,14,15];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"expressions":4,"EOF":5,"expression":6,"optional":7,"literal":8,"splat":9,"param":10,"(":11,")":12,"LITERAL":13,"SPLAT":14,"PARAM":15,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},
productions_: [0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
return new yy.Root({},[$$[$0-1]])
break;
case 2:
return new yy.Root({},[new yy.Literal({value: ''})])
break;
case 3:
this.$ = new yy.Concat({},[$$[$0-1],$$[$0]]);
break;
case 4: case 5:
this.$ = $$[$0];
break;
case 6:
this.$ = new yy.Literal({value: $$[$0]});
break;
case 7:
this.$ = new yy.Splat({name: $$[$0]});
break;
case 8:
this.$ = new yy.Param({name: $$[$0]});
break;
case 9:
this.$ = new yy.Optional({},[$$[$0-1]]);
break;
case 10:
this.$ = yytext;
break;
case 11: case 12:
this.$ = yytext.slice(1);
break;
}
},
table: [{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:$V0,13:$V1,14:$V2,15:$V3},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:$V0,13:$V1,14:$V2,15:$V3},{1:[2,2]},o($V4,[2,4]),o($V4,[2,5]),o($V4,[2,6]),o($V4,[2,7]),o($V4,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:$V0,13:$V1,14:$V2,15:$V3},o($V4,[2,10]),o($V4,[2,11]),o($V4,[2,12]),{1:[2,1]},o($V4,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:$V0,12:[1,16],13:$V1,14:$V2,15:$V3},o($V4,[2,9])],
defaultActions: {3:[2,2],13:[2,1]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        function _parseError (msg, hash) {
            this.message = msg;
            this.hash = hash;
        }
        _parseError.prototype = Error;

        throw new _parseError(str, hash);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return "(";
break;
case 1:return ")";
break;
case 2:return "SPLAT";
break;
case 3:return "PARAM";
break;
case 4:return "LITERAL";
break;
case 5:return "LITERAL";
break;
case 6:return "EOF";
break;
}
},
rules: [/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (true) {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
}

/***/ }),

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createVisitor  = __webpack_require__(137),
    escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

/**
 * @class
 * @private
 */
function Matcher(options) {
  this.captures = options.captures;
  this.re = options.re;
}

/**
 * Try matching a path against the generated regular expression
 * @param  {String} path The path to try to match
 * @return {Object|false}      matched parameters or false
 */
Matcher.prototype.match = function (path) {
  var match = this.re.exec(path),
      matchParams = {};

  if( !match ) {
    return;
  }

  this.captures.forEach( function(capture, i) {
    if( typeof match[i+1] === 'undefined' ) {
      matchParams[capture] = undefined;
    }
    else {
      matchParams[capture] = decodeURIComponent(match[i+1]);
    }
  });

  return matchParams;
};

/**
 * Visitor for the AST to create a regular expression matcher
 * @class RegexpVisitor
 * @borrows Visitor-visit
 */
var RegexpVisitor = createVisitor({
  'Concat': function(node) {
    return node.children
      .reduce(
        function(memo, child) {
          var childResult = this.visit(child);
          return {
            re: memo.re + childResult.re,
            captures: memo.captures.concat(childResult.captures)
          };
        }.bind(this),
        {re: '', captures: []}
      );
  },
  'Literal': function(node) {
    return {
      re: node.props.value.replace(escapeRegExp, '\\$&'),
      captures: []
    };
  },

  'Splat': function(node) {
    return {
      re: '([^?]*?)',
      captures: [node.props.name]
    };
  },

  'Param': function(node) {
    return {
      re: '([^\\/\\?]+)',
      captures: [node.props.name]
    };
  },

  'Optional': function(node) {
    var child = this.visit(node.children[0]);
    return {
      re: '(?:' + child.re + ')?',
      captures: child.captures
    };
  },

  'Root': function(node) {
    var childResult = this.visit(node.children[0]);
    return new Matcher({
      re: new RegExp('^' + childResult.re + '(?=\\?|$)' ),
      captures: childResult.captures
    });
  }
});

module.exports = RegexpVisitor;

/***/ }),

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createVisitor  = __webpack_require__(137);

/**
 * Visitor for the AST to construct a path with filled in parameters
 * @class ReverseVisitor
 * @borrows Visitor-visit
 */
var ReverseVisitor = createVisitor({
  'Concat': function(node, context) {
    var childResults =  node.children
      .map( function(child) {
        return this.visit(child,context);
      }.bind(this));

    if( childResults.some(function(c) { return c === false; }) ) {
      return false;
    }
    else {
      return childResults.join('');
    }
  },

  'Literal': function(node) {
    return decodeURI(node.props.value);
  },

  'Splat': function(node, context) {
    if( context[node.props.name] ) {
      return context[node.props.name];
    }
    else {
      return false;
    }
  },

  'Param': function(node, context) {
    if( context[node.props.name] ) {
      return context[node.props.name];
    }
    else {
      return false;
    }
  },

  'Optional': function(node, context) {
    var childResult = this.visit(node.children[0], context);
    if( childResult ) {
      return childResult;
    }
    else {
      return '';
    }
  },

  'Root': function(node, context) {
    context = context || {};
    var childResult = this.visit(node.children[0], context);
    if( !childResult ) {
      return false;
    }
    return encodeURI(childResult);
  }
});

module.exports = ReverseVisitor;

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return workIdFromTokenId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return editionFromTokenId; });

var workIdFromTokenId = function workIdFromTokenId(tokenId) {
  return (tokenId - tokenId % 100) / 100 + 1;
};

var editionFromTokenId = function editionFromTokenId(tokenId) {
  var workId = workIdFromTokenId(tokenId);
  return tokenId - (workId - 1) * 100;
};

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(8);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),

/***/ 8:
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ })

/******/ })));