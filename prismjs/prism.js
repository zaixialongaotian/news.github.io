/* PrismJS 1.15.0
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+c+csharp+bash+basic+cpp+coffeescript+css-extras+markup-templating+git+less+http+java+json+markdown+livescript+makefile+matlab+nginx+opencl+php+sql+python+sass+tcl+vhdl&plugins=line-highlight+line-numbers+file-highlight+toolbar+autoloader+command-line+data-uri-highlight+show-language+copy-to-clipboard */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
	Prism = function() {
		var e = /\blang(?:uage)?-([\w-]+)\b/i,
			t = 0,
			n = _self.Prism = {
				manual: _self.Prism && _self.Prism.manual,
				disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
				util: {
					encode: function(e) {
						return e instanceof r ? new r(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
					},
					type: function(e) {
						return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
					},
					objId: function(e) {
						return e.__id || Object.defineProperty(e, "__id", {
							value: ++t
						}), e.__id
					},
					clone: function(e, t) {
						var r = n.util.type(e);
						switch(t = t || {}, r) {
							case "Object":
								if(t[n.util.objId(e)]) return t[n.util.objId(e)];
								var a = {};
								t[n.util.objId(e)] = a;
								for(var l in e) e.hasOwnProperty(l) && (a[l] = n.util.clone(e[l], t));
								return a;
							case "Array":
								if(t[n.util.objId(e)]) return t[n.util.objId(e)];
								var a = [];
								return t[n.util.objId(e)] = a, e.forEach(function(e, r) {
									a[r] = n.util.clone(e, t)
								}), a
						}
						return e
					}
				},
				languages: {
					extend: function(e, t) {
						var r = n.util.clone(n.languages[e]);
						for(var a in t) r[a] = t[a];
						return r
					},
					insertBefore: function(e, t, r, a) {
						a = a || n.languages;
						var l = a[e];
						if(2 == arguments.length) {
							r = arguments[1];
							for(var i in r) r.hasOwnProperty(i) && (l[i] = r[i]);
							return l
						}
						var o = {};
						for(var s in l)
							if(l.hasOwnProperty(s)) {
								if(s == t)
									for(var i in r) r.hasOwnProperty(i) && (o[i] = r[i]);
								o[s] = l[s]
							}
						var u = a[e];
						return a[e] = o, n.languages.DFS(n.languages, function(t, n) {
							n === u && t != e && (this[t] = o)
						}), o
					},
					DFS: function(e, t, r, a) {
						a = a || {};
						for(var l in e) e.hasOwnProperty(l) && (t.call(e, l, e[l], r || l), "Object" !== n.util.type(e[l]) || a[n.util.objId(e[l])] ? "Array" !== n.util.type(e[l]) || a[n.util.objId(e[l])] || (a[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, l, a)) : (a[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, null, a)))
					}
				},
				plugins: {},
				highlightAll: function(e, t) {
					n.highlightAllUnder(document, e, t)
				},
				highlightAllUnder: function(e, t, r) {
					var a = {
						callback: r,
						selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
					};
					n.hooks.run("before-highlightall", a);
					for(var l, i = a.elements || e.querySelectorAll(a.selector), o = 0; l = i[o++];) n.highlightElement(l, t === !0, a.callback)
				},
				highlightElement: function(t, r, a) {
					for(var l, i, o = t; o && !e.test(o.className);) o = o.parentNode;
					o && (l = (o.className.match(e) || [, ""])[1].toLowerCase(), i = n.languages[l]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, t.parentNode && (o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l));
					var s = t.textContent,
						u = {
							element: t,
							language: l,
							grammar: i,
							code: s
						};
					if(n.hooks.run("before-sanity-check", u), !u.code || !u.grammar) return u.code && (n.hooks.run("before-highlight", u), u.element.textContent = u.code, n.hooks.run("after-highlight", u)), n.hooks.run("complete", u), void 0;
					if(n.hooks.run("before-highlight", u), r && _self.Worker) {
						var g = new Worker(n.filename);
						g.onmessage = function(e) {
							u.highlightedCode = e.data, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, a && a.call(u.element), n.hooks.run("after-highlight", u), n.hooks.run("complete", u)
						}, g.postMessage(JSON.stringify({
							language: u.language,
							code: u.code,
							immediateClose: !0
						}))
					} else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, a && a.call(t), n.hooks.run("after-highlight", u), n.hooks.run("complete", u)
				},
				highlight: function(e, t, a) {
					var l = {
						code: e,
						grammar: t,
						language: a
					};
					return n.hooks.run("before-tokenize", l), l.tokens = n.tokenize(l.code, l.grammar), n.hooks.run("after-tokenize", l), r.stringify(n.util.encode(l.tokens), l.language)
				},
				matchGrammar: function(e, t, r, a, l, i, o) {
					var s = n.Token;
					for(var u in r)
						if(r.hasOwnProperty(u) && r[u]) {
							if(u == o) return;
							var g = r[u];
							g = "Array" === n.util.type(g) ? g : [g];
							for(var c = 0; c < g.length; ++c) {
								var h = g[c],
									f = h.inside,
									d = !!h.lookbehind,
									m = !!h.greedy,
									p = 0,
									y = h.alias;
								if(m && !h.pattern.global) {
									var v = h.pattern.toString().match(/[imuy]*$/)[0];
									h.pattern = RegExp(h.pattern.source, v + "g")
								}
								h = h.pattern || h;
								for(var b = a, k = l; b < t.length; k += t[b].length, ++b) {
									var w = t[b];
									if(t.length > e.length) return;
									if(!(w instanceof s)) {
										if(m && b != t.length - 1) {
											h.lastIndex = k;
											var _ = h.exec(e);
											if(!_) break;
											for(var j = _.index + (d ? _[1].length : 0), P = _.index + _[0].length, A = b, x = k, O = t.length; O > A && (P > x || !t[A].type && !t[A - 1].greedy); ++A) x += t[A].length, j >= x && (++b, k = x);
											if(t[b] instanceof s) continue;
											I = A - b, w = e.slice(k, x), _.index -= k
										} else {
											h.lastIndex = 0;
											var _ = h.exec(w),
												I = 1
										}
										if(_) {
											d && (p = _[1] ? _[1].length : 0);
											var j = _.index + p,
												_ = _[0].slice(p),
												P = j + _.length,
												N = w.slice(0, j),
												S = w.slice(P),
												C = [b, I];
											N && (++b, k += N.length, C.push(N));
											var E = new s(u, f ? n.tokenize(_, f) : _, y, _, m);
											if(C.push(E), S && C.push(S), Array.prototype.splice.apply(t, C), 1 != I && n.matchGrammar(e, t, r, b, k, !0, u), i) break
										} else if(i) break
									}
								}
							}
						}
				},
				tokenize: function(e, t) {
					var r = [e],
						a = t.rest;
					if(a) {
						for(var l in a) t[l] = a[l];
						delete t.rest
					}
					return n.matchGrammar(e, r, t, 0, 0, !1), r
				},
				hooks: {
					all: {},
					add: function(e, t) {
						var r = n.hooks.all;
						r[e] = r[e] || [], r[e].push(t)
					},
					run: function(e, t) {
						var r = n.hooks.all[e];
						if(r && r.length)
							for(var a, l = 0; a = r[l++];) a(t)
					}
				}
			},
			r = n.Token = function(e, t, n, r, a) {
				this.type = e, this.content = t, this.alias = n, this.length = 0 | (r || "").length, this.greedy = !!a
			};
		if(r.stringify = function(e, t, a) {
				if("string" == typeof e) return e;
				if("Array" === n.util.type(e)) return e.map(function(n) {
					return r.stringify(n, t, e)
				}).join("");
				var l = {
					type: e.type,
					content: r.stringify(e.content, t, a),
					tag: "span",
					classes: ["token", e.type],
					attributes: {},
					language: t,
					parent: a
				};
				if(e.alias) {
					var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
					Array.prototype.push.apply(l.classes, i)
				}
				n.hooks.run("wrap", l);
				var o = Object.keys(l.attributes).map(function(e) {
					return e + '="' + (l.attributes[e] || "").replace(/"/g, "&quot;") + '"'
				}).join(" ");
				return "<" + l.tag + ' class="' + l.classes.join(" ") + '"' + (o ? " " + o : "") + ">" + l.content + "</" + l.tag + ">"
			}, !_self.document) return _self.addEventListener ? (n.disableWorkerMessageHandler || _self.addEventListener("message", function(e) {
			var t = JSON.parse(e.data),
				r = t.language,
				a = t.code,
				l = t.immediateClose;
			_self.postMessage(n.highlight(a, n.languages[r], r)), l && _self.close()
		}, !1), _self.Prism) : _self.Prism;
		var a = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
		return a && (n.filename = a.src, n.manual || a.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(n.highlightAll) : window.setTimeout(n.highlightAll, 16) : document.addEventListener("DOMContentLoaded", n.highlightAll))), _self.Prism
	}();
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
	comment: /<!--[\s\S]*?-->/,
	prolog: /<\?[\s\S]+?\?>/,
	doctype: /<!DOCTYPE[\s\S]+?>/i,
	cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
	tag: {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		greedy: !0,
		inside: {
			tag: {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					punctuation: /^<\/?/,
					namespace: /^[^\s>\/:]+:/
				}
			},
			"attr-value": {
				pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
				inside: {
					punctuation: [/^=/, {
						pattern: /(^|[^\\])["']/,
						lookbehind: !0
					}]
				}
			},
			punctuation: /\/?>/,
			"attr-name": {
				pattern: /[^\s>\/]+/,
				inside: {
					namespace: /^[^\s>\/:]+:/
				}
			}
		}
	},
	entity: /&#?[\da-z]{1,8};/i
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.hooks.add("wrap", function(a) {
	"entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
Prism.languages.css = {
	comment: /\/\*[\s\S]*?\*\//,
	atrule: {
		pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
		inside: {
			rule: /@[\w-]+/
		}
	},
	url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	selector: /[^{}\s][^{};]*?(?=\s*\{)/,
	string: {
		pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: !0
	},
	property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
	important: /\B!important\b/i,
	"function": /[-a-z0-9]+(?=\()/i,
	punctuation: /[(){};:]/
}, Prism.languages.css.atrule.inside.rest = Prism.languages.css, Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
	style: {
		pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
		lookbehind: !0,
		inside: Prism.languages.css,
		alias: "language-css",
		greedy: !0
	}
}), Prism.languages.insertBefore("inside", "attr-value", {
	"style-attr": {
		pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
		inside: {
			"attr-name": {
				pattern: /^\s*style/i,
				inside: Prism.languages.markup.tag.inside
			},
			punctuation: /^\s*=\s*['"]|['"]\s*$/,
			"attr-value": {
				pattern: /.+/i,
				inside: Prism.languages.css
			}
		},
		alias: "language-css"
	}
}, Prism.languages.markup.tag));
Prism.languages.clike = {
	comment: [{
		pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
		lookbehind: !0
	}, {
		pattern: /(^|[^\\:])\/\/.*/,
		lookbehind: !0,
		greedy: !0
	}],
	string: {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: !0
	},
	"class-name": {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
		lookbehind: !0,
		inside: {
			punctuation: /[.\\]/
		}
	},
	keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	"boolean": /\b(?:true|false)\b/,
	"function": /\w+(?=\()/,
	number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
	operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
	"class-name": [Prism.languages.clike["class-name"], {
		pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
		lookbehind: !0
	}],
	keyword: [{
		pattern: /((?:^|})\s*)(?:catch|finally)\b/,
		lookbehind: !0
	}, /\b(?:as|async|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/],
	number: /\b(?:(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+)n?|\d+n|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
	"function": /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\(|\.(?:apply|bind|call)\()/,
	operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
}), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
	regex: {
		pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
		lookbehind: !0,
		greedy: !0
	},
	"function-variable": {
		pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
		alias: "function"
	},
	constant: /\b[A-Z][A-Z\d_]*\b/
}), Prism.languages.insertBefore("javascript", "string", {
	"template-string": {
		pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
		greedy: !0,
		inside: {
			interpolation: {
				pattern: /\${[^}]+}/,
				inside: {
					"interpolation-punctuation": {
						pattern: /^\${|}$/,
						alias: "punctuation"
					},
					rest: Prism.languages.javascript
				}
			},
			string: /[\s\S]+/
		}
	}
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
	script: {
		pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
		lookbehind: !0,
		inside: Prism.languages.javascript,
		alias: "language-javascript",
		greedy: !0
	}
}), Prism.languages.js = Prism.languages.javascript;
Prism.languages.c = Prism.languages.extend("clike", {
	keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
	operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*\/%&|^!=<>]=?/,
	number: /(?:\b0x[\da-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i
}), Prism.languages.insertBefore("c", "string", {
	macro: {
		pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
		lookbehind: !0,
		alias: "property",
		inside: {
			string: {
				pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/,
				lookbehind: !0
			},
			directive: {
				pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
				lookbehind: !0,
				alias: "keyword"
			}
		}
	},
	constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
}), delete Prism.languages.c["class-name"], delete Prism.languages.c["boolean"];
Prism.languages.csharp = Prism.languages.extend("clike", {
	keyword: /\b(?:abstract|add|alias|as|ascending|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|descending|do|double|dynamic|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|from|get|global|goto|group|if|implicit|in|int|interface|internal|into|is|join|let|lock|long|namespace|new|null|object|operator|orderby|out|override|params|partial|private|protected|public|readonly|ref|remove|return|sbyte|sealed|select|set|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|value|var|virtual|void|volatile|where|while|yield)\b/,
	string: [{
		pattern: /@("|')(?:\1\1|\\[\s\S]|(?!\1)[^\\])*\1/,
		greedy: !0
	}, {
		pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*?\1/,
		greedy: !0
	}],
	"class-name": [{
		pattern: /\b[A-Z]\w*(?:\.\w+)*\b(?=\s+\w+)/,
		inside: {
			punctuation: /\./
		}
	}, {
		pattern: /(\[)[A-Z]\w*(?:\.\w+)*\b/,
		lookbehind: !0,
		inside: {
			punctuation: /\./
		}
	}, {
		pattern: /(\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*)[A-Z]\w*(?:\.\w+)*\b/,
		lookbehind: !0,
		inside: {
			punctuation: /\./
		}
	}, {
		pattern: /((?:\b(?:class|interface|new)\s+)|(?:catch\s+\())[A-Z]\w*(?:\.\w+)*\b/,
		lookbehind: !0,
		inside: {
			punctuation: /\./
		}
	}],
	number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)f?/i
}), Prism.languages.insertBefore("csharp", "class-name", {
	"generic-method": {
		pattern: /\w+\s*<[^>\r\n]+?>\s*(?=\()/,
		inside: {
			"function": /^\w+/,
			"class-name": {
				pattern: /\b[A-Z]\w*(?:\.\w+)*\b/,
				inside: {
					punctuation: /\./
				}
			},
			keyword: Prism.languages.csharp.keyword,
			punctuation: /[<>(),.:]/
		}
	},
	preprocessor: {
		pattern: /(^\s*)#.*/m,
		lookbehind: !0,
		alias: "property",
		inside: {
			directive: {
				pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
				lookbehind: !0,
				alias: "keyword"
			}
		}
	}
}), Prism.languages.dotnet = Prism.languages.csharp;
! function(e) {
	var t = {
		variable: [{
			pattern: /\$?\(\([\s\S]+?\)\)/,
			inside: {
				variable: [{
					pattern: /(^\$\(\([\s\S]+)\)\)/,
					lookbehind: !0
				}, /^\$\(\(/],
				number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
				operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
				punctuation: /\(\(?|\)\)?|,|;/
			}
		}, {
			pattern: /\$\([^)]+\)|`[^`]+`/,
			greedy: !0,
			inside: {
				variable: /^\$\(|^`|\)$|`$/
			}
		}, /\$(?:[\w#?*!@]+|\{[^}]+\})/i]
	};
	e.languages.bash = {
		shebang: {
			pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,
			alias: "important"
		},
		comment: {
			pattern: /(^|[^"{\\])#.*/,
			lookbehind: !0
		},
		string: [{
			pattern: /((?:^|[^<])<<\s*)["']?(\w+?)["']?\s*\r?\n(?:[\s\S])*?\r?\n\2/,
			lookbehind: !0,
			greedy: !0,
			inside: t
		}, {
			pattern: /(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\1)[^\\])*\1/,
			greedy: !0,
			inside: t
		}],
		variable: t.variable,
		"function": {
			pattern: /(^|[\s;|&])(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|[\s;|&])/,
			lookbehind: !0
		},
		keyword: {
			pattern: /(^|[\s;|&])(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|[\s;|&])/,
			lookbehind: !0
		},
		"boolean": {
			pattern: /(^|[\s;|&])(?:true|false)(?=$|[\s;|&])/,
			lookbehind: !0
		},
		operator: /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
		punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];]/
	};
	var a = t.variable[1].inside;
	a.string = e.languages.bash.string, a["function"] = e.languages.bash["function"], a.keyword = e.languages.bash.keyword, a["boolean"] = e.languages.bash["boolean"], a.operator = e.languages.bash.operator, a.punctuation = e.languages.bash.punctuation, e.languages.shell = e.languages.bash
}(Prism);
Prism.languages.basic = {
	comment: {
		pattern: /(?:!|REM\b).+/i,
		inside: {
			keyword: /^REM/i
		}
	},
	string: {
		pattern: /"(?:""|[!#$%&'()*,\/:;<=>?^_ +\-.A-Z\d])*"/i,
		greedy: !0
	},
	number: /(?:\b\d+\.?\d*|\B\.\d+)(?:E[+-]?\d+)?/i,
	keyword: /\b(?:AS|BEEP|BLOAD|BSAVE|CALL(?: ABSOLUTE)?|CASE|CHAIN|CHDIR|CLEAR|CLOSE|CLS|COM|COMMON|CONST|DATA|DECLARE|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DIM|DO|DOUBLE|ELSE|ELSEIF|END|ENVIRON|ERASE|ERROR|EXIT|FIELD|FILES|FOR|FUNCTION|GET|GOSUB|GOTO|IF|INPUT|INTEGER|IOCTL|KEY|KILL|LINE INPUT|LOCATE|LOCK|LONG|LOOP|LSET|MKDIR|NAME|NEXT|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPEN|OPTION BASE|OUT|POKE|PUT|READ|REDIM|REM|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SHARED|SINGLE|SELECT CASE|SHELL|SLEEP|STATIC|STEP|STOP|STRING|SUB|SWAP|SYSTEM|THEN|TIMER|TO|TROFF|TRON|TYPE|UNLOCK|UNTIL|USING|VIEW PRINT|WAIT|WEND|WHILE|WRITE)(?:\$|\b)/i,
	"function": /\b(?:ABS|ACCESS|ACOS|ANGLE|AREA|ARITHMETIC|ARRAY|ASIN|ASK|AT|ATN|BASE|BEGIN|BREAK|CAUSE|CEIL|CHR|CLIP|COLLATE|COLOR|CON|COS|COSH|COT|CSC|DATE|DATUM|DEBUG|DECIMAL|DEF|DEG|DEGREES|DELETE|DET|DEVICE|DISPLAY|DOT|ELAPSED|EPS|ERASABLE|EXLINE|EXP|EXTERNAL|EXTYPE|FILETYPE|FIXED|FP|GO|GRAPH|HANDLER|IDN|IMAGE|IN|INT|INTERNAL|IP|IS|KEYED|LBOUND|LCASE|LEFT|LEN|LENGTH|LET|LINE|LINES|LOG|LOG10|LOG2|LTRIM|MARGIN|MAT|MAX|MAXNUM|MID|MIN|MISSING|MOD|NATIVE|NUL|NUMERIC|OF|OPTION|ORD|ORGANIZATION|OUTIN|OUTPUT|PI|POINT|POINTER|POINTS|POS|PRINT|PROGRAM|PROMPT|RAD|RADIANS|RANDOMIZE|RECORD|RECSIZE|RECTYPE|RELATIVE|REMAINDER|REPEAT|REST|RETRY|REWRITE|RIGHT|RND|ROUND|RTRIM|SAME|SEC|SELECT|SEQUENTIAL|SET|SETTER|SGN|SIN|SINH|SIZE|SKIP|SQR|STANDARD|STATUS|STR|STREAM|STYLE|TAB|TAN|TANH|TEMPLATE|TEXT|THERE|TIME|TIMEOUT|TRACE|TRANSFORM|TRUNCATE|UBOUND|UCASE|USE|VAL|VARIABLE|VIEWPORT|WHEN|WINDOW|WITH|ZER|ZONEWIDTH)(?:\$|\b)/i,
	operator: /<[=>]?|>=?|[+\-*\/^=&]|\b(?:AND|EQV|IMP|NOT|OR|XOR)\b/i,
	punctuation: /[,;:()]/
};
Prism.languages.cpp = Prism.languages.extend("c", {
	keyword: /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
	"boolean": /\b(?:true|false)\b/,
	operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*\/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/
}), Prism.languages.insertBefore("cpp", "keyword", {
	"class-name": {
		pattern: /(class\s+)\w+/i,
		lookbehind: !0
	}
}), Prism.languages.insertBefore("cpp", "string", {
	"raw-string": {
		pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
		alias: "string",
		greedy: !0
	}
});
! function(e) {
	var t = /#(?!\{).+/,
		n = {
			pattern: /#\{[^}]+\}/,
			alias: "variable"
		};
	e.languages.coffeescript = e.languages.extend("javascript", {
		comment: t,
		string: [{
			pattern: /'(?:\\[\s\S]|[^\\'])*'/,
			greedy: !0
		}, {
			pattern: /"(?:\\[\s\S]|[^\\"])*"/,
			greedy: !0,
			inside: {
				interpolation: n
			}
		}],
		keyword: /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
		"class-member": {
			pattern: /@(?!\d)\w+/,
			alias: "variable"
		}
	}), e.languages.insertBefore("coffeescript", "comment", {
		"multiline-comment": {
			pattern: /###[\s\S]+?###/,
			alias: "comment"
		},
		"block-regex": {
			pattern: /\/{3}[\s\S]*?\/{3}/,
			alias: "regex",
			inside: {
				comment: t,
				interpolation: n
			}
		}
	}), e.languages.insertBefore("coffeescript", "string", {
		"inline-javascript": {
			pattern: /`(?:\\[\s\S]|[^\\`])*`/,
			inside: {
				delimiter: {
					pattern: /^`|`$/,
					alias: "punctuation"
				},
				rest: e.languages.javascript
			}
		},
		"multiline-string": [{
			pattern: /'''[\s\S]*?'''/,
			greedy: !0,
			alias: "string"
		}, {
			pattern: /"""[\s\S]*?"""/,
			greedy: !0,
			alias: "string",
			inside: {
				interpolation: n
			}
		}]
	}), e.languages.insertBefore("coffeescript", "keyword", {
		property: /(?!\d)\w+(?=\s*:(?!:))/
	}), delete e.languages.coffeescript["template-string"]
}(Prism);
Prism.languages.css.selector = {
	pattern: /[^{}\s][^{}]*(?=\s*\{)/,
	inside: {
		"pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
		"pseudo-class": /:[-\w]+(?:\(.*\))?/,
		"class": /\.[-:.\w]+/,
		id: /#[-:.\w]+/,
		attribute: /\[[^\]]+\]/
	}
}, Prism.languages.insertBefore("css", "function", {
	hexcode: /#[\da-f]{3,8}/i,
	entity: /\\[\da-f]{1,8}/i,
	number: /[\d%.]+/
});
Prism.languages["markup-templating"] = {}, Object.defineProperties(Prism.languages["markup-templating"], {
	buildPlaceholders: {
		value: function(e, t, n, a) {
			e.language === t && (e.tokenStack = [], e.code = e.code.replace(n, function(n) {
				if("function" == typeof a && !a(n)) return n;
				for(var r = e.tokenStack.length; - 1 !== e.code.indexOf("___" + t.toUpperCase() + r + "___");) ++r;
				return e.tokenStack[r] = n, "___" + t.toUpperCase() + r + "___"
			}), e.grammar = Prism.languages.markup)
		}
	},
	tokenizePlaceholders: {
		value: function(e, t) {
			if(e.language === t && e.tokenStack) {
				e.grammar = Prism.languages[t];
				var n = 0,
					a = Object.keys(e.tokenStack),
					r = function(o) {
						if(!(n >= a.length))
							for(var i = 0; i < o.length; i++) {
								var g = o[i];
								if("string" == typeof g || g.content && "string" == typeof g.content) {
									var c = a[n],
										s = e.tokenStack[c],
										l = "string" == typeof g ? g : g.content,
										p = l.indexOf("___" + t.toUpperCase() + c + "___");
									if(p > -1) {
										++n;
										var f, u = l.substring(0, p),
											_ = new Prism.Token(t, Prism.tokenize(s, e.grammar, t), "language-" + t, s),
											k = l.substring(p + ("___" + t.toUpperCase() + c + "___").length);
										if(u || k ? (f = [u, _, k].filter(function(e) {
												return !!e
											}), r(f)) : f = _, "string" == typeof g ? Array.prototype.splice.apply(o, [i, 1].concat(f)) : g.content = f, n >= a.length) break
									}
								} else g.content && "string" != typeof g.content && r(g.content)
							}
					};
				r(e.tokens)
			}
		}
	}
});
Prism.languages.git = {
	comment: /^#.*/m,
	deleted: /^[-–].*/m,
	inserted: /^\+.*/m,
	string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
	command: {
		pattern: /^.*\$ git .*$/m,
		inside: {
			parameter: /\s--?\w+/m
		}
	},
	coord: /^@@.*@@$/m,
	commit_sha1: /^commit \w{40}$/m
};
Prism.languages.less = Prism.languages.extend("css", {
	comment: [/\/\*[\s\S]*?\*\//, {
		pattern: /(^|[^\\])\/\/.*/,
		lookbehind: !0
	}],
	atrule: {
		pattern: /@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i,
		inside: {
			punctuation: /[:()]/
		}
	},
	selector: {
		pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,
		inside: {
			variable: /@+[\w-]+/
		}
	},
	property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
	punctuation: /[{}();:,]/,
	operator: /[+\-*\/]/
}), Prism.languages.insertBefore("less", "punctuation", {
	"function": Prism.languages.less.function
}), Prism.languages.insertBefore("less", "property", {
	variable: [{
		pattern: /@[\w-]+\s*:/,
		inside: {
			punctuation: /:/
		}
	}, /@@?[\w-]+/],
	"mixin-usage": {
		pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
		lookbehind: !0,
		alias: "function"
	}
});
Prism.languages.http = {
	"request-line": {
		pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,
		inside: {
			property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
			"attr-name": /:\w+/
		}
	},
	"response-status": {
		pattern: /^HTTP\/1.[01] \d+.*/m,
		inside: {
			property: {
				pattern: /(^HTTP\/1.[01] )\d+.*/i,
				lookbehind: !0
			}
		}
	},
	"header-name": {
		pattern: /^[\w-]+:(?=.)/m,
		alias: "keyword"
	}
};
var httpLanguages = {
	"application/json": Prism.languages.javascript,
	"application/xml": Prism.languages.markup,
	"text/xml": Prism.languages.markup,
	"text/html": Prism.languages.markup
};
for(var contentType in httpLanguages)
	if(httpLanguages[contentType]) {
		var options = {};
		options[contentType] = {
			pattern: RegExp("(content-type:\\s*" + contentType + "[\\w\\W]*?)(?:\\r?\\n|\\r){2}[\\w\\W]*", "i"),
			lookbehind: !0,
			inside: {
				rest: httpLanguages[contentType]
			}
		}, Prism.languages.insertBefore("http", "header-name", options)
	};
Prism.languages.java = Prism.languages.extend("clike", {
	keyword: /\b(?:var|abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
	number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp-]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?[df]?/i,
	operator: {
		pattern: /(^|[^.])(?:<<=?|>>>?=?|->|([-+&|])\2|[?:~]|[-+*\/%&|^!=<>]=?)/m,
		lookbehind: !0
	}
}), Prism.languages.insertBefore("java", "function", {
	annotation: {
		alias: "punctuation",
		pattern: /(^|[^.])@\w+/,
		lookbehind: !0
	}
}), Prism.languages.insertBefore("java", "class-name", {
	generics: {
		pattern: /<\s*\w+(?:\.\w+)?(?:\s*,\s*\w+(?:\.\w+)?)*>/i,
		alias: "function",
		inside: {
			keyword: Prism.languages.java.keyword,
			punctuation: /[<>(),.:]/
		}
	}
});
Prism.languages.json = {
	property: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/i,
	string: {
		pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
		greedy: !0
	},
	number: /-?\d+\.?\d*([Ee][+-]?\d+)?/,
	punctuation: /[{}[\],]/,
	operator: /:/g,
	"boolean": /\b(?:true|false)\b/i,
	"null": /\bnull\b/i
}, Prism.languages.jsonp = Prism.languages.json;
Prism.languages.markdown = Prism.languages.extend("markup", {}), Prism.languages.insertBefore("markdown", "prolog", {
	blockquote: {
		pattern: /^>(?:[\t ]*>)*/m,
		alias: "punctuation"
	},
	code: [{
		pattern: /^(?: {4}|\t).+/m,
		alias: "keyword"
	}, {
		pattern: /``.+?``|`[^`\n]+`/,
		alias: "keyword"
	}],
	title: [{
		pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
		alias: "important",
		inside: {
			punctuation: /==+$|--+$/
		}
	}, {
		pattern: /(^\s*)#+.+/m,
		lookbehind: !0,
		alias: "important",
		inside: {
			punctuation: /^#+|#+$/
		}
	}],
	hr: {
		pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
		lookbehind: !0,
		alias: "punctuation"
	},
	list: {
		pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
		lookbehind: !0,
		alias: "punctuation"
	},
	"url-reference": {
		pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
		inside: {
			variable: {
				pattern: /^(!?\[)[^\]]+/,
				lookbehind: !0
			},
			string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
			punctuation: /^[\[\]!:]|[<>]/
		},
		alias: "url"
	},
	bold: {
		pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
		lookbehind: !0,
		inside: {
			punctuation: /^\*\*|^__|\*\*$|__$/
		}
	},
	italic: {
		pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
		lookbehind: !0,
		inside: {
			punctuation: /^[*_]|[*_]$/
		}
	},
	url: {
		pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
		inside: {
			variable: {
				pattern: /(!?\[)[^\]]+(?=\]$)/,
				lookbehind: !0
			},
			string: {
				pattern: /"(?:\\.|[^"\\])*"(?=\)$)/
			}
		}
	}
}), Prism.languages.markdown.bold.inside.url = Prism.languages.markdown.url, Prism.languages.markdown.italic.inside.url = Prism.languages.markdown.url, Prism.languages.markdown.bold.inside.italic = Prism.languages.markdown.italic, Prism.languages.markdown.italic.inside.bold = Prism.languages.markdown.bold;
Prism.languages.livescript = {
	comment: [{
		pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
		lookbehind: !0
	}, {
		pattern: /(^|[^\\])#.*/,
		lookbehind: !0
	}],
	"interpolated-string": {
		pattern: /(^|[^"])("""|")(?:\\[\s\S]|(?!\2)[^\\])*\2(?!")/,
		lookbehind: !0,
		greedy: !0,
		inside: {
			variable: {
				pattern: /(^|[^\\])#[a-z_](?:-?[a-z]|[\d_])*/m,
				lookbehind: !0
			},
			interpolation: {
				pattern: /(^|[^\\])#\{[^}]+\}/m,
				lookbehind: !0,
				inside: {
					"interpolation-punctuation": {
						pattern: /^#\{|\}$/,
						alias: "variable"
					}
				}
			},
			string: /[\s\S]+/
		}
	},
	string: [{
		pattern: /('''|')(?:\\[\s\S]|(?!\1)[^\\])*\1/,
		greedy: !0
	}, {
		pattern: /<\[[\s\S]*?\]>/,
		greedy: !0
	}, /\\[^\s,;\])}]+/],
	regex: [{
		pattern: /\/\/(\[.+?]|\\.|(?!\/\/)[^\\])+\/\/[gimyu]{0,5}/,
		greedy: !0,
		inside: {
			comment: {
				pattern: /(^|[^\\])#.*/,
				lookbehind: !0
			}
		}
	}, {
		pattern: /\/(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}/,
		greedy: !0
	}],
	keyword: {
		pattern: /(^|(?!-).)\b(?:break|case|catch|class|const|continue|default|do|else|extends|fallthrough|finally|for(?: ever)?|function|if|implements|it|let|loop|new|null|otherwise|own|return|super|switch|that|then|this|throw|try|unless|until|var|void|when|while|yield)(?!-)\b/m,
		lookbehind: !0
	},
	"keyword-operator": {
		pattern: /(^|[^-])\b(?:(?:delete|require|typeof)!|(?:and|by|delete|export|from|import(?: all)?|in|instanceof|is(?:nt| not)?|not|of|or|til|to|typeof|with|xor)(?!-)\b)/m,
		lookbehind: !0,
		alias: "operator"
	},
	"boolean": {
		pattern: /(^|[^-])\b(?:false|no|off|on|true|yes)(?!-)\b/m,
		lookbehind: !0
	},
	argument: {
		pattern: /(^|(?!\.&\.)[^&])&(?!&)\d*/m,
		lookbehind: !0,
		alias: "variable"
	},
	number: /\b(?:\d+~[\da-z]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[a-z]\w*)?)/i,
	identifier: /[a-z_](?:-?[a-z]|[\d_])*/i,
	operator: [{
		pattern: /( )\.(?= )/,
		lookbehind: !0
	}, /\.(?:[=~]|\.\.?)|\.(?:[&|^]|<<|>>>?)\.|:(?:=|:=?)|&&|\|[|>]|<(?:<<?<?|--?!?|~~?!?|[|=?])?|>[>=?]?|-(?:->?|>)?|\+\+?|@@?|%%?|\*\*?|!(?:~?=|--?>|~?~>)?|~(?:~?>|=)?|==?|\^\^?|[\/?]/],
	punctuation: /[(){}\[\]|.,:;`]/
}, Prism.languages.livescript["interpolated-string"].inside.interpolation.inside.rest = Prism.languages.livescript;
Prism.languages.makefile = {
	comment: {
		pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
		lookbehind: !0
	},
	string: {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: !0
	},
	builtin: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
	symbol: {
		pattern: /^[^:=\r\n]+(?=\s*:(?!=))/m,
		inside: {
			variable: /\$+(?:[^(){}:#=\s]+|(?=[({]))/
		}
	},
	variable: /\$+(?:[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
	keyword: [/-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/, {
		pattern: /(\()(?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:s|list)?)(?=[ \t])/,
		lookbehind: !0
	}],
	operator: /(?:::|[?:+!])?=|[|@]/,
	punctuation: /[:;(){}]/
};
Prism.languages.matlab = {
	comment: [/%\{[\s\S]*?\}%/, /%.+/],
	string: {
		pattern: /\B'(?:''|[^'\r\n])*'/,
		greedy: !0
	},
	number: /(?:\b\d+\.?\d*|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
	keyword: /\b(?:break|case|catch|continue|else|elseif|end|for|function|if|inf|NaN|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
	"function": /(?!\d)\w+(?=\s*\()/,
	operator: /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
	punctuation: /\.{3}|[.,;\[\](){}!]/
};
Prism.languages.nginx = Prism.languages.extend("clike", {
	comment: {
		pattern: /(^|[^"{\\])#.*/,
		lookbehind: !0
	},
	keyword: /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types)\b/i
}), Prism.languages.insertBefore("nginx", "keyword", {
	variable: /\$[a-z_]+/i
});
! function(E) {
	E.languages.opencl = E.languages.extend("c", {
		keyword: /\b(?:__attribute__|(?:__)?(?:constant|global|kernel|local|private|read_only|read_write|write_only)|_cl_(?:command_queue|context|device_id|event|kernel|mem|platform_id|program|sampler)|auto|break|case|cl_(?:image_format|mem_fence_flags)|clk_event_t|complex|const|continue|default|do|(?:float|double)(?:16(?:x(?:1|16|2|4|8))?|1x(?:1|16|2|4|8)|2(?:x(?:1|16|2|4|8))?|3|4(?:x(?:1|16|2|4|8))?|8(?:x(?:1|16|2|4|8))?)?|else|enum|event_t|extern|for|goto|(?:u?(?:char|short|int|long)|half|quad|bool)(?:2|3|4|8|16)?|if|image(?:1d_(?:array_|buffer_)?t|2d_(?:array_(?:depth_|msaa_depth_|msaa_)?|depth_|msaa_depth_|msaa_)?t|3d_t)|imaginary|inline|intptr_t|ndrange_t|packed|pipe|ptrdiff_t|queue_t|register|reserve_id_t|restrict|return|sampler_t|signed|size_t|sizeof|static|struct|switch|typedef|uintptr_t|uniform|union|unsigned|void|volatile|while)\b/,
		"function-opencl-kernel": {
			pattern: /\b(?:abs(?:_diff)?|a?(?:cos|sin)(?:h|pi)?|add_sat|aligned|all|and|any|async(?:_work_group_copy|_work_group_strided_copy)?|atan(?:2?(?:pi)?|h)?|atom_(?:add|and|cmpxchg|dec|inc|max|min|or|sub|xchg|xor)|barrier|bitselect|cbrt|ceil|clamp|clz|copies|copysign|cross|degrees|distance|dot|endian|erf|erfc|exp(?:2|10)?|expm1|fabs|fast_(?:distance|length|normalize)|fdim|floor|fma|fmax|fmin|fract|frexp|fro|from|get_(?:global_(?:id|offset|size)|group_id|image_(?:channel_data_type|channel_order|depth|dim|height|width)|local(?:_id|_size)|num_groups|work_dim)|hadd|(?:half|native)_(?:cos|divide|exp(?:2|10)?|log(?:2|10)?|powr|recip|r?sqrt|sin|tan)|hypot|ilogb|is(?:equal|finite|greater(?:equal)?|inf|less(?:equal|greater)?|nan|normal|notequal|(?:un)?ordered)|ldexp|length|lgamma|lgamma_r|log(?:b|1p|2|10)?|mad(?:24|_hi|_sat)?|max|mem(?:_fence)?|min|mix|modf|mul24|mul_hi|nan|nextafter|normalize|pow[nr]?|prefetch|radians|read_(?:image)(?:f|h|u?i)|read_mem_fence|remainder|remquo|reqd_work_group_size|rhadd|rint|rootn|rotate|round|rsqrt|select|shuffle2?|sign|signbit|sincos|smoothstep|sqrt|step|sub_sat|tan|tanh|tanpi|tgamma|to|trunc|upsample|vec_(?:step|type_hint)|v(?:load|store)(?:_half)?(?:2|3|4|8|16)?|v(?:loada_half|storea?(?:_half)?)(?:2|3|4|8|16)?(?:_(?:rte|rtn|rtp|rtz))?|wait_group_events|work_group_size_hint|write_image(?:f|h|u?i)|write_mem_fence)\b/,
			alias: "function"
		},
		"constant-opencl-kernel": {
			pattern: /\b(?:CHAR_(?:BIT|MAX|MIN)|CLK_(?:ADDRESS_(?:CLAMP(?:_TO_EDGE)?|NONE|REPEAT)|FILTER_(?:LINEAR|NEAREST)|(?:LOCAL|GLOBAL)_MEM_FENCE|NORMALIZED_COORDS_(?:FALSE|TRUE))|CL_(?:BGRA|(?:HALF_)?FLOAT|INTENSITY|LUMINANCE|A?R?G?B?[Ax]?|(?:(?:UN)?SIGNED|[US]NORM)_(?:INT(?:8|16|32))|UNORM_(?:INT_101010|SHORT_(?:555|565)))|(?:DBL|FLT)_(?:DIG|EPSILON|MANT_DIG|(?:MIN|MAX)(?:(?:_10)?_EXP)?)|FLT_RADIX|HUGE_VALF|INFINITY|(?:INT|LONG|SCHAR|SHRT|UCHAR|UINT|ULONG)_(?:MAX|MIN)|MAXFLOAT|M_(?:[12]_PI|2_SQRTPI|E|LN(?:2|10)|LOG(?:10|2)E?|PI[24]?|SQRT(?:1_2|2))|NAN)\b/,
			alias: "constant"
		}
	});
	var _ = {
		"type-opencl-host": {
			pattern: /\b(?:cl_(?:GLenum|GLint|GLuin|addressing_mode|bitfield|bool|buffer_create_type|build_status|channel_(?:order|type)|(?:u?(?:char|short|int|long)|float|double)(?:2|3|4|8|16)?|command_(?:queue(?:_info|_properties)?|type)|context(?:_info|_properties)?|device_(?:exec_capabilities|fp_config|id|info|local_mem_type|mem_cache_type|type)|(?:event|sampler)(?:_info)?|filter_mode|half|image_info|kernel(?:_info|_work_group_info)?|map_flags|mem(?:_flags|_info|_object_type)?|platform_(?:id|info)|profiling_info|program(?:_build_info|_info)?))\b/,
			alias: "keyword"
		},
		"boolean-opencl-host": {
			pattern: /\bCL_(?:TRUE|FALSE)\b/,
			alias: "boolean"
		},
		"constant-opencl-host": {
			pattern: /\bCL_(?:A|ABGR|ADDRESS_(?:CLAMP(?:_TO_EDGE)?|MIRRORED_REPEAT|NONE|REPEAT)|ARGB|BGRA|BLOCKING|BUFFER_CREATE_TYPE_REGION|BUILD_(?:ERROR|IN_PROGRESS|NONE|PROGRAM_FAILURE|SUCCESS)|COMMAND_(?:ACQUIRE_GL_OBJECTS|BARRIER|COPY_(?:BUFFER(?:_RECT|_TO_IMAGE)?|IMAGE(?:_TO_BUFFER)?)|FILL_(?:BUFFER|IMAGE)|MAP(?:_BUFFER|_IMAGE)|MARKER|MIGRATE(?:_SVM)?_MEM_OBJECTS|NATIVE_KERNEL|NDRANGE_KERNEL|READ_(?:BUFFER(?:_RECT)?|IMAGE)|RELEASE_GL_OBJECTS|SVM_(?:FREE|MAP|MEMCPY|MEMFILL|UNMAP)|TASK|UNMAP_MEM_OBJECT|USER|WRITE_(?:BUFFER(?:_RECT)?|IMAGE))|COMPILER_NOT_AVAILABLE|COMPILE_PROGRAM_FAILURE|COMPLETE|CONTEXT_(?:DEVICES|INTEROP_USER_SYNC|NUM_DEVICES|PLATFORM|PROPERTIES|REFERENCE_COUNT)|DEPTH(?:_STENCIL)?|DEVICE_(?:ADDRESS_BITS|AFFINITY_DOMAIN_(?:L[1-4]_CACHE|NEXT_PARTITIONABLE|NUMA)|AVAILABLE|BUILT_IN_KERNELS|COMPILER_AVAILABLE|DOUBLE_FP_CONFIG|ENDIAN_LITTLE|ERROR_CORRECTION_SUPPORT|EXECUTION_CAPABILITIES|EXTENSIONS|GLOBAL_(?:MEM_(?:CACHELINE_SIZE|CACHE_SIZE|CACHE_TYPE|SIZE)|VARIABLE_PREFERRED_TOTAL_SIZE)|HOST_UNIFIED_MEMORY|IL_VERSION|IMAGE(?:2D_MAX_(?:HEIGHT|WIDTH)|3D_MAX_(?:DEPTH|HEIGHT|WIDTH)|_BASE_ADDRESS_ALIGNMENT|_MAX_ARRAY_SIZE|_MAX_BUFFER_SIZE|_PITCH_ALIGNMENT|_SUPPORT)|LINKER_AVAILABLE|LOCAL_MEM_SIZE|LOCAL_MEM_TYPE|MAX_(?:CLOCK_FREQUENCY|COMPUTE_UNITS|CONSTANT_ARGS|CONSTANT_BUFFER_SIZE|GLOBAL_VARIABLE_SIZE|MEM_ALLOC_SIZE|NUM_SUB_GROUPS|ON_DEVICE_(?:EVENTS|QUEUES)|PARAMETER_SIZE|PIPE_ARGS|READ_IMAGE_ARGS|READ_WRITE_IMAGE_ARGS|SAMPLERS|WORK_GROUP_SIZE|WORK_ITEM_DIMENSIONS|WORK_ITEM_SIZES|WRITE_IMAGE_ARGS)|MEM_BASE_ADDR_ALIGN|MIN_DATA_TYPE_ALIGN_SIZE|NAME|NATIVE_VECTOR_WIDTH_(?:CHAR|DOUBLE|FLOAT|HALF|INT|LONG|SHORT)|NOT_(?:AVAILABLE|FOUND)|OPENCL_C_VERSION|PARENT_DEVICE|PARTITION_(?:AFFINITY_DOMAIN|BY_AFFINITY_DOMAIN|BY_COUNTS|BY_COUNTS_LIST_END|EQUALLY|FAILED|MAX_SUB_DEVICES|PROPERTIES|TYPE)|PIPE_MAX_(?:ACTIVE_RESERVATIONS|PACKET_SIZE)|PLATFORM|PREFERRED_(?:GLOBAL_ATOMIC_ALIGNMENT|INTEROP_USER_SYNC|LOCAL_ATOMIC_ALIGNMENT|PLATFORM_ATOMIC_ALIGNMENT|VECTOR_WIDTH_(?:CHAR|DOUBLE|FLOAT|HALF|INT|LONG|SHORT))|PRINTF_BUFFER_SIZE|PROFILE|PROFILING_TIMER_RESOLUTION|QUEUE_(?:ON_(?:DEVICE_(?:MAX_SIZE|PREFERRED_SIZE|PROPERTIES)|HOST_PROPERTIES)|PROPERTIES)|REFERENCE_COUNT|SINGLE_FP_CONFIG|SUB_GROUP_INDEPENDENT_FORWARD_PROGRESS|SVM_(?:ATOMICS|CAPABILITIES|COARSE_GRAIN_BUFFER|FINE_GRAIN_BUFFER|FINE_GRAIN_SYSTEM)|TYPE(?:_ACCELERATOR|_ALL|_CPU|_CUSTOM|_DEFAULT|_GPU)?|VENDOR(?:_ID)?|VERSION)|DRIVER_VERSION|EVENT_(?:COMMAND_(?:EXECUTION_STATUS|QUEUE|TYPE)|CONTEXT|REFERENCE_COUNT)|EXEC_(?:KERNEL|NATIVE_KERNEL|STATUS_ERROR_FOR_EVENTS_IN_WAIT_LIST)|FILTER_(?:LINEAR|NEAREST)|FLOAT|FP_(?:CORRECTLY_ROUNDED_DIVIDE_SQRT|DENORM|FMA|INF_NAN|ROUND_TO_INF|ROUND_TO_NEAREST|ROUND_TO_ZERO|SOFT_FLOAT)|GLOBAL|HALF_FLOAT|IMAGE_(?:ARRAY_SIZE|BUFFER|DEPTH|ELEMENT_SIZE|FORMAT|FORMAT_MISMATCH|FORMAT_NOT_SUPPORTED|HEIGHT|NUM_MIP_LEVELS|NUM_SAMPLES|ROW_PITCH|SLICE_PITCH|WIDTH)|INTENSITY|INVALID_(?:ARG_INDEX|ARG_SIZE|ARG_VALUE|BINARY|BUFFER_SIZE|BUILD_OPTIONS|COMMAND_QUEUE|COMPILER_OPTIONS|CONTEXT|DEVICE|DEVICE_PARTITION_COUNT|DEVICE_QUEUE|DEVICE_TYPE|EVENT|EVENT_WAIT_LIST|GLOBAL_OFFSET|GLOBAL_WORK_SIZE|GL_OBJECT|HOST_PTR|IMAGE_DESCRIPTOR|IMAGE_FORMAT_DESCRIPTOR|IMAGE_SIZE|KERNEL|KERNEL_ARGS|KERNEL_DEFINITION|KERNEL_NAME|LINKER_OPTIONS|MEM_OBJECT|MIP_LEVEL|OPERATION|PIPE_SIZE|PLATFORM|PROGRAM|PROGRAM_EXECUTABLE|PROPERTY|QUEUE_PROPERTIES|SAMPLER|VALUE|WORK_DIMENSION|WORK_GROUP_SIZE|WORK_ITEM_SIZE)|KERNEL_(?:ARG_(?:ACCESS_(?:NONE|QUALIFIER|READ_ONLY|READ_WRITE|WRITE_ONLY)|ADDRESS_(?:CONSTANT|GLOBAL|LOCAL|PRIVATE|QUALIFIER)|INFO_NOT_AVAILABLE|NAME|TYPE_(?:CONST|NAME|NONE|PIPE|QUALIFIER|RESTRICT|VOLATILE))|ATTRIBUTES|COMPILE_NUM_SUB_GROUPS|COMPILE_WORK_GROUP_SIZE|CONTEXT|EXEC_INFO_SVM_FINE_GRAIN_SYSTEM|EXEC_INFO_SVM_PTRS|FUNCTION_NAME|GLOBAL_WORK_SIZE|LOCAL_MEM_SIZE|LOCAL_SIZE_FOR_SUB_GROUP_COUNT|MAX_NUM_SUB_GROUPS|MAX_SUB_GROUP_SIZE_FOR_NDRANGE|NUM_ARGS|PREFERRED_WORK_GROUP_SIZE_MULTIPLE|PRIVATE_MEM_SIZE|PROGRAM|REFERENCE_COUNT|SUB_GROUP_COUNT_FOR_NDRANGE|WORK_GROUP_SIZE)|LINKER_NOT_AVAILABLE|LINK_PROGRAM_FAILURE|LOCAL|LUMINANCE|MAP_(?:FAILURE|READ|WRITE|WRITE_INVALIDATE_REGION)|MEM_(?:ALLOC_HOST_PTR|ASSOCIATED_MEMOBJECT|CONTEXT|COPY_HOST_PTR|COPY_OVERLAP|FLAGS|HOST_NO_ACCESS|HOST_PTR|HOST_READ_ONLY|HOST_WRITE_ONLY|KERNEL_READ_AND_WRITE|MAP_COUNT|OBJECT_(?:ALLOCATION_FAILURE|BUFFER|IMAGE1D|IMAGE1D_ARRAY|IMAGE1D_BUFFER|IMAGE2D|IMAGE2D_ARRAY|IMAGE3D|PIPE)|OFFSET|READ_ONLY|READ_WRITE|REFERENCE_COUNT|SIZE|SVM_ATOMICS|SVM_FINE_GRAIN_BUFFER|TYPE|USES_SVM_POINTER|USE_HOST_PTR|WRITE_ONLY)|MIGRATE_MEM_OBJECT_(?:CONTENT_UNDEFINED|HOST)|MISALIGNED_SUB_BUFFER_OFFSET|NONE|NON_BLOCKING|OUT_OF_(?:HOST_MEMORY|RESOURCES)|PIPE_(?:MAX_PACKETS|PACKET_SIZE)|PLATFORM_(?:EXTENSIONS|HOST_TIMER_RESOLUTION|NAME|PROFILE|VENDOR|VERSION)|PROFILING_(?:COMMAND_(?:COMPLETE|END|QUEUED|START|SUBMIT)|INFO_NOT_AVAILABLE)|PROGRAM_(?:BINARIES|BINARY_SIZES|BINARY_TYPE(?:_COMPILED_OBJECT|_EXECUTABLE|_LIBRARY|_NONE)?|BUILD_(?:GLOBAL_VARIABLE_TOTAL_SIZE|LOG|OPTIONS|STATUS)|CONTEXT|DEVICES|IL|KERNEL_NAMES|NUM_DEVICES|NUM_KERNELS|REFERENCE_COUNT|SOURCE)|QUEUED|QUEUE_(?:CONTEXT|DEVICE|DEVICE_DEFAULT|ON_DEVICE|ON_DEVICE_DEFAULT|OUT_OF_ORDER_EXEC_MODE_ENABLE|PROFILING_ENABLE|PROPERTIES|REFERENCE_COUNT|SIZE)|R|RA|READ_(?:ONLY|WRITE)_CACHE|RG|RGB|RGBA|RGBx|RGx|RUNNING|Rx|SAMPLER_(?:ADDRESSING_MODE|CONTEXT|FILTER_MODE|LOD_MAX|LOD_MIN|MIP_FILTER_MODE|NORMALIZED_COORDS|REFERENCE_COUNT)|(?:UN)?SIGNED_INT(?:8|16|32)|SNORM_INT(?:8|16)|SUBMITTED|SUCCESS|UNORM_INT(?:16|24|8|_101010|_101010_2)|UNORM_SHORT_(?:555|565)|VERSION_(?:1_0|1_1|1_2|2_0|2_1)|sBGRA|sRGB|sRGBA|sRGBx)\b/,
			alias: "constant"
		},
		"function-opencl-host": {
			pattern: /\bcl(?:BuildProgram|CloneKernel|CompileProgram|Create(?:Buffer|CommandQueue(?:WithProperties)?|Context|ContextFromType|Image|Image2D|Image3D|Kernel|KernelsInProgram|Pipe|ProgramWith(?:Binary|BuiltInKernels|IL|Source)|Sampler|SamplerWithProperties|SubBuffer|SubDevices|UserEvent)|Enqueue(?:(?:Barrier|Marker)(?:WithWaitList)?|Copy(?:Buffer(?:Rect|ToImage)?|Image(?:ToBuffer)?)|(?:Fill|Map)(?:Buffer|Image)|MigrateMemObjects|NDRangeKernel|NativeKernel|(?:Read|Write)(?:Buffer(?:Rect)?|Image)|SVM(?:Free|Map|MemFill|Memcpy|MigrateMem|Unmap)|Task|UnmapMemObject|WaitForEvents)|Finish|Flush|Get(?:CommandQueueInfo|ContextInfo|Device(?:AndHostTimer|IDs|Info)|Event(?:Profiling)?Info|ExtensionFunctionAddress(?:ForPlatform)?|HostTimer|ImageInfo|Kernel(?:ArgInfo|Info|SubGroupInfo|WorkGroupInfo)|MemObjectInfo|PipeInfo|Platform(?:IDs|Info)|Program(?:Build)?Info|SamplerInfo|SupportedImageFormats)|LinkProgram|(?:Release|Retain)(?:CommandQueue|Context|Device|Event|Kernel|MemObject|Program|Sampler)|SVM(?:Alloc|Free)|Set(?:CommandQueueProperty|DefaultDeviceCommandQueue|EventCallback|Kernel(?:Arg(?:SVMPointer)?|ExecInfo)|Kernel|MemObjectDestructorCallback|UserEventStatus)|Unload(?:Platform)?Compiler|WaitForEvents)\b/,
			alias: "function"
		}
	};
	E.languages.insertBefore("c", "keyword", _), _["type-opencl-host-c++"] = {
		pattern: /\b(?:Buffer|BufferGL|BufferRenderGL|CommandQueue|Context|Device|DeviceCommandQueue|EnqueueArgs|Event|Image|Image1D|Image1DArray|Image1DBuffer|Image2D|Image2DArray|Image2DGL|Image3D|Image3DGL|ImageFormat|ImageGL|Kernel|KernelFunctor|LocalSpaceArg|Memory|NDRange|Pipe|Platform|Program|Sampler|SVMAllocator|SVMTraitAtomic|SVMTraitCoarse|SVMTraitFine|SVMTraitReadOnly|SVMTraitReadWrite|SVMTraitWriteOnly|UserEvent)\b/,
		alias: "keyword"
	}, E.languages.insertBefore("cpp", "keyword", _)
}(Prism);
! function(e) {
	e.languages.php = e.languages.extend("clike", {
		keyword: /\b(?:and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
		constant: /\b[A-Z0-9_]{2,}\b/,
		comment: {
			pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
			lookbehind: !0
		}
	}), e.languages.insertBefore("php", "string", {
		"shell-comment": {
			pattern: /(^|[^\\])#.*/,
			lookbehind: !0,
			alias: "comment"
		}
	}), e.languages.insertBefore("php", "keyword", {
		delimiter: {
			pattern: /\?>|<\?(?:php|=)?/i,
			alias: "important"
		},
		variable: /\$+(?:\w+\b|(?={))/i,
		"package": {
			pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
			lookbehind: !0,
			inside: {
				punctuation: /\\/
			}
		}
	}), e.languages.insertBefore("php", "operator", {
		property: {
			pattern: /(->)[\w]+/,
			lookbehind: !0
		}
	});
	var n = {
		pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/,
		lookbehind: !0,
		inside: {
			rest: e.languages.php
		}
	};
	e.languages.insertBefore("php", "string", {
		"nowdoc-string": {
			pattern: /<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/,
			greedy: !0,
			alias: "string",
			inside: {
				delimiter: {
					pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
					alias: "symbol",
					inside: {
						punctuation: /^<<<'?|[';]$/
					}
				}
			}
		},
		"heredoc-string": {
			pattern: /<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,
			greedy: !0,
			alias: "string",
			inside: {
				delimiter: {
					pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
					alias: "symbol",
					inside: {
						punctuation: /^<<<"?|[";]$/
					}
				},
				interpolation: n
			}
		},
		"single-quoted-string": {
			pattern: /'(?:\\[\s\S]|[^\\'])*'/,
			greedy: !0,
			alias: "string"
		},
		"double-quoted-string": {
			pattern: /"(?:\\[\s\S]|[^\\"])*"/,
			greedy: !0,
			alias: "string",
			inside: {
				interpolation: n
			}
		}
	}), delete e.languages.php.string, e.hooks.add("before-tokenize", function(n) {
		if(/(?:<\?php|<\?)/gi.test(n.code)) {
			var t = /(?:<\?php|<\?)[\s\S]*?(?:\?>|$)/gi;
			e.languages["markup-templating"].buildPlaceholders(n, "php", t)
		}
	}), e.hooks.add("after-tokenize", function(n) {
		e.languages["markup-templating"].tokenizePlaceholders(n, "php")
	})
}(Prism);
Prism.languages.sql = {
	comment: {
		pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
		lookbehind: !0
	},
	variable: [{
		pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
		greedy: !0
	}, /@[\w.$]+/],
	string: {
		pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
		greedy: !0,
		lookbehind: !0
	},
	"function": /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
	keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
	"boolean": /\b(?:TRUE|FALSE|NULL)\b/i,
	number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
	operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
	punctuation: /[;[\]()`,.]/
};
Prism.languages.python = {
	comment: {
		pattern: /(^|[^\\])#.*/,
		lookbehind: !0
	},
	"triple-quoted-string": {
		pattern: /("""|''')[\s\S]+?\1/,
		greedy: !0,
		alias: "string"
	},
	string: {
		pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
		greedy: !0
	},
	"function": {
		pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
		lookbehind: !0
	},
	"class-name": {
		pattern: /(\bclass\s+)\w+/i,
		lookbehind: !0
	},
	keyword: /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|pass|print|raise|return|try|while|with|yield)\b/,
	builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
	"boolean": /\b(?:True|False|None)\b/,
	number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
	operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
	punctuation: /[{}[\];(),.:]/
};
! function(e) {
	e.languages.sass = e.languages.extend("css", {
		comment: {
			pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
			lookbehind: !0
		}
	}), e.languages.insertBefore("sass", "atrule", {
		"atrule-line": {
			pattern: /^(?:[ \t]*)[@+=].+/m,
			inside: {
				atrule: /(?:@[\w-]+|[+=])/m
			}
		}
	}), delete e.languages.sass.atrule;
	var a = /\$[-\w]+|#\{\$[-\w]+\}/,
		t = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/, {
			pattern: /(\s+)-(?=\s)/,
			lookbehind: !0
		}];
	e.languages.insertBefore("sass", "property", {
		"variable-line": {
			pattern: /^[ \t]*\$.+/m,
			inside: {
				punctuation: /:/,
				variable: a,
				operator: t
			}
		},
		"property-line": {
			pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
			inside: {
				property: [/[^:\s]+(?=\s*:)/, {
					pattern: /(:)[^:\s]+/,
					lookbehind: !0
				}],
				punctuation: /:/,
				variable: a,
				operator: t,
				important: e.languages.sass.important
			}
		}
	}), delete e.languages.sass.property, delete e.languages.sass.important, delete e.languages.sass.selector, e.languages.insertBefore("sass", "punctuation", {
		selector: {
			pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
			lookbehind: !0
		}
	})
}(Prism);
Prism.languages.tcl = {
	comment: {
		pattern: /(^|[^\\])#.*/,
		lookbehind: !0
	},
	string: {
		pattern: /"(?:[^"\\\r\n]|\\(?:\r\n|[\s\S]))*"/,
		greedy: !0
	},
	variable: [{
		pattern: /(\$)(?:::)?(?:[a-zA-Z0-9]+::)*\w+/,
		lookbehind: !0
	}, {
		pattern: /(\$){[^}]+}/,
		lookbehind: !0
	}, {
		pattern: /(^\s*set[ \t]+)(?:::)?(?:[a-zA-Z0-9]+::)*\w+/m,
		lookbehind: !0
	}],
	"function": {
		pattern: /(^\s*proc[ \t]+)[^\s]+/m,
		lookbehind: !0
	},
	builtin: [{
		pattern: /(^\s*)(?:proc|return|class|error|eval|exit|for|foreach|if|switch|while|break|continue)\b/m,
		lookbehind: !0
	}, /\b(?:elseif|else)\b/],
	scope: {
		pattern: /(^\s*)(?:global|upvar|variable)\b/m,
		lookbehind: !0,
		alias: "constant"
	},
	keyword: {
		pattern: /(^\s*|\[)(?:after|append|apply|array|auto_(?:execok|import|load|mkindex|qualify|reset)|automkindex_old|bgerror|binary|catch|cd|chan|clock|close|concat|dde|dict|encoding|eof|exec|expr|fblocked|fconfigure|fcopy|file(?:event|name)?|flush|gets|glob|history|http|incr|info|interp|join|lappend|lassign|lindex|linsert|list|llength|load|lrange|lrepeat|lreplace|lreverse|lsearch|lset|lsort|math(?:func|op)|memory|msgcat|namespace|open|package|parray|pid|pkg_mkIndex|platform|puts|pwd|re_syntax|read|refchan|regexp|registry|regsub|rename|Safe_Base|scan|seek|set|socket|source|split|string|subst|Tcl|tcl(?:_endOfWord|_findLibrary|startOf(?:Next|Previous)Word|wordBreak(?:After|Before)|test|vars)|tell|time|tm|trace|unknown|unload|unset|update|uplevel|vwait)\b/m,
		lookbehind: !0
	},
	operator: /!=?|\*\*?|==|&&?|\|\|?|<[=<]?|>[=>]?|[-+~\/%?^]|\b(?:eq|ne|in|ni)\b/,
	punctuation: /[{}()\[\]]/
};
Prism.languages.vhdl = {
	comment: /--.+/,
	"vhdl-vectors": {
		pattern: /\b[oxb]"[\da-f_]+"|"[01uxzwlh-]+"/i,
		alias: "number"
	},
	"quoted-function": {
		pattern: /"\S+?"(?=\()/,
		alias: "function"
	},
	string: /"(?:[^\\"\r\n]|\\(?:\r\n|[\s\S]))*"/,
	constant: /\b(?:use|library)\b/i,
	keyword: /\b(?:'active|'ascending|'base|'delayed|'driving|'driving_value|'event|'high|'image|'instance_name|'last_active|'last_event|'last_value|'left|'leftof|'length|'low|'path_name|'pos|'pred|'quiet|'range|'reverse_range|'right|'rightof|'simple_name|'stable|'succ|'transaction|'val|'value|access|after|alias|all|architecture|array|assert|attribute|begin|block|body|buffer|bus|case|component|configuration|constant|disconnect|downto|else|elsif|end|entity|exit|file|for|function|generate|generic|group|guarded|if|impure|in|inertial|inout|is|label|library|linkage|literal|loop|map|new|next|null|of|on|open|others|out|package|port|postponed|procedure|process|pure|range|record|register|reject|report|return|select|severity|shared|signal|subtype|then|to|transport|type|unaffected|units|until|use|variable|wait|when|while|with)\b/i,
	"boolean": /\b(?:true|false)\b/i,
	"function": /\w+(?=\()/,
	number: /'[01uxzwlh-]'|\b(?:\d+#[\da-f_.]+#|\d[\d_.]*)(?:e[-+]?\d+)?/i,
	operator: /[<>]=?|:=|[-+*\/&=]|\b(?:abs|not|mod|rem|sll|srl|sla|sra|rol|ror|and|or|nand|xnor|xor|nor)\b/i,
	punctuation: /[{}[\];(),.:]/
};
! function() {
	function e(e, t) {
		return Array.prototype.slice.call((t || document).querySelectorAll(e))
	}

	function t(e, t) {
		return t = " " + t + " ", (" " + e.className + " ").replace(/[\n\t]/g, " ").indexOf(t) > -1
	}

	function n(e, n, i) {
		n = "string" == typeof n ? n : e.getAttribute("data-line");
		for(var o, l = n.replace(/\s+/g, "").split(","), a = +e.getAttribute("data-line-offset") || 0, s = r() ? parseInt : parseFloat, d = s(getComputedStyle(e).lineHeight), u = t(e, "line-numbers"), c = 0; o = l[c++];) {
			var p = o.split("-"),
				m = +p[0],
				f = +p[1] || m,
				h = e.querySelector('.line-highlight[data-range="' + o + '"]') || document.createElement("div");
			if(h.setAttribute("aria-hidden", "true"), h.setAttribute("data-range", o), h.className = (i || "") + " line-highlight", u && Prism.plugins.lineNumbers) {
				var g = Prism.plugins.lineNumbers.getLine(e, m),
					y = Prism.plugins.lineNumbers.getLine(e, f);
				g && (h.style.top = g.offsetTop + "px"), y && (h.style.height = y.offsetTop - g.offsetTop + y.offsetHeight + "px")
			} else h.setAttribute("data-start", m), f > m && h.setAttribute("data-end", f), h.style.top = (m - a - 1) * d + "px", h.textContent = new Array(f - m + 2).join(" \n");
			u ? e.appendChild(h) : (e.querySelector("code") || e).appendChild(h)
		}
	}

	function i() {
		var t = location.hash.slice(1);
		e(".temporary.line-highlight").forEach(function(e) {
			e.parentNode.removeChild(e)
		});
		var i = (t.match(/\.([\d,-]+)$/) || [, ""])[1];
		if(i && !document.getElementById(t)) {
			var r = t.slice(0, t.lastIndexOf(".")),
				o = document.getElementById(r);
			o && (o.hasAttribute("data-line") || o.setAttribute("data-line", ""), n(o, i, "temporary "), document.querySelector(".temporary.line-highlight").scrollIntoView())
		}
	}
	if("undefined" != typeof self && self.Prism && self.document && document.querySelector) {
		var r = function() {
				var e;
				return function() {
					if("undefined" == typeof e) {
						var t = document.createElement("div");
						t.style.fontSize = "13px", t.style.lineHeight = "1.5", t.style.padding = 0, t.style.border = 0, t.innerHTML = "&nbsp;<br />&nbsp;", document.body.appendChild(t), e = 38 === t.offsetHeight, document.body.removeChild(t)
					}
					return e
				}
			}(),
			o = 0;
		Prism.hooks.add("before-sanity-check", function(t) {
			var n = t.element.parentNode,
				i = n && n.getAttribute("data-line");
			if(n && i && /pre/i.test(n.nodeName)) {
				var r = 0;
				e(".line-highlight", n).forEach(function(e) {
					r += e.textContent.length, e.parentNode.removeChild(e)
				}), r && /^( \n)+$/.test(t.code.slice(-r)) && (t.code = t.code.slice(0, -r))
			}
		}), Prism.hooks.add("complete", function l(e) {
			var r = e.element.parentNode,
				a = r && r.getAttribute("data-line");
			if(r && a && /pre/i.test(r.nodeName)) {
				clearTimeout(o);
				var s = Prism.plugins.lineNumbers,
					d = e.plugins && e.plugins.lineNumbers;
				t(r, "line-numbers") && s && !d ? Prism.hooks.add("line-numbers", l) : (n(r, a), o = setTimeout(i, 1))
			}
		}), window.addEventListener("hashchange", i), window.addEventListener("resize", function() {
			var e = document.querySelectorAll("pre[data-line]");
			Array.prototype.forEach.call(e, function(e) {
				n(e)
			})
		})
	}
}();
! function() {
	if("undefined" != typeof self && self.Prism && self.document) {
		var e = "line-numbers",
			t = /\n(?!$)/g,
			n = function(e) {
				var n = r(e),
					s = n["white-space"];
				if("pre-wrap" === s || "pre-line" === s) {
					var l = e.querySelector("code"),
						i = e.querySelector(".line-numbers-rows"),
						a = e.querySelector(".line-numbers-sizer"),
						o = l.textContent.split(t);
					a || (a = document.createElement("span"), a.className = "line-numbers-sizer", l.appendChild(a)), a.style.display = "block", o.forEach(function(e, t) {
						a.textContent = e || "\n";
						var n = a.getBoundingClientRect().height;
						i.children[t].style.height = n + "px"
					}), a.textContent = "", a.style.display = "none"
				}
			},
			r = function(e) {
				return e ? window.getComputedStyle ? getComputedStyle(e) : e.currentStyle || null : null
			};
		window.addEventListener("resize", function() {
			Array.prototype.forEach.call(document.querySelectorAll("pre." + e), n)
		}), Prism.hooks.add("complete", function(e) {
			if(e.code) {
				var r = e.element.parentNode,
					s = /\s*\bline-numbers\b\s*/;
				if(r && /pre/i.test(r.nodeName) && (s.test(r.className) || s.test(e.element.className)) && !e.element.querySelector(".line-numbers-rows")) {
					s.test(e.element.className) && (e.element.className = e.element.className.replace(s, " ")), s.test(r.className) || (r.className += " line-numbers");
					var l, i = e.code.match(t),
						a = i ? i.length + 1 : 1,
						o = new Array(a + 1);
					o = o.join("<span></span>"), l = document.createElement("span"), l.setAttribute("aria-hidden", "true"), l.className = "line-numbers-rows", l.innerHTML = o, r.hasAttribute("data-start") && (r.style.counterReset = "linenumber " + (parseInt(r.getAttribute("data-start"), 10) - 1)), e.element.appendChild(l), n(r), Prism.hooks.run("line-numbers", e)
				}
			}
		}), Prism.hooks.add("line-numbers", function(e) {
			e.plugins = e.plugins || {}, e.plugins.lineNumbers = !0
		}), Prism.plugins.lineNumbers = {
			getLine: function(t, n) {
				if("PRE" === t.tagName && t.classList.contains(e)) {
					var r = t.querySelector(".line-numbers-rows"),
						s = parseInt(t.getAttribute("data-start"), 10) || 1,
						l = s + (r.children.length - 1);
					s > n && (n = s), n > l && (n = l);
					var i = n - s;
					return r.children[i]
				}
			}
		}
	}
}();
! function() {
	"undefined" != typeof self && self.Prism && self.document && document.querySelector && (self.Prism.fileHighlight = function() {
		var t = {
			js: "javascript",
			py: "python",
			rb: "ruby",
			ps1: "powershell",
			psm1: "powershell",
			sh: "bash",
			bat: "batch",
			h: "c",
			tex: "latex"
		};
		Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(e) {
			for(var a, n = e.getAttribute("data-src"), r = e, o = /\blang(?:uage)?-([\w-]+)\b/i; r && !o.test(r.className);) r = r.parentNode;
			if(r && (a = (e.className.match(o) || [, ""])[1]), !a) {
				var s = (n.match(/\.(\w+)$/) || [, ""])[1];
				a = t[s] || s
			}
			var l = document.createElement("code");
			l.className = "language-" + a, e.textContent = "", l.textContent = "Loading…", e.appendChild(l);
			var i = new XMLHttpRequest;
			i.open("GET", n, !0), i.onreadystatechange = function() {
				4 == i.readyState && (i.status < 400 && i.responseText ? (l.textContent = i.responseText, Prism.highlightElement(l)) : l.textContent = i.status >= 400 ? "✖ Error " + i.status + " while fetching file: " + i.statusText : "✖ Error: File does not exist or is empty")
			}, i.send(null)
		}), Prism.plugins.toolbar && Prism.plugins.toolbar.registerButton("download-file", function(t) {
			var e = t.element.parentNode;
			if(e && /pre/i.test(e.nodeName) && e.hasAttribute("data-src") && e.hasAttribute("data-download-link")) {
				var a = e.getAttribute("data-src"),
					n = document.createElement("a");
				return n.textContent = e.getAttribute("data-download-link-label") || "Download", n.setAttribute("download", ""), n.href = a, n
			}
		})
	}, document.addEventListener("DOMContentLoaded", self.Prism.fileHighlight))
}();
! function() {
	if("undefined" != typeof self && self.Prism && self.document) {
		var t = [],
			e = {},
			n = function() {};
		Prism.plugins.toolbar = {};
		var a = Prism.plugins.toolbar.registerButton = function(n, a) {
				var o;
				o = "function" == typeof a ? a : function(t) {
					var e;
					return "function" == typeof a.onClick ? (e = document.createElement("button"), e.type = "button", e.addEventListener("click", function() {
						a.onClick.call(this, t)
					})) : "string" == typeof a.url ? (e = document.createElement("a"), e.href = a.url) : e = document.createElement("span"), e.textContent = a.text, e
				}, t.push(e[n] = o)
			},
			o = Prism.plugins.toolbar.hook = function(a) {
				var o = a.element.parentNode;
				if(o && /pre/i.test(o.nodeName) && !o.parentNode.classList.contains("code-toolbar")) {
					var r = document.createElement("div");
					r.classList.add("code-toolbar"), o.parentNode.insertBefore(r, o), r.appendChild(o);
					var i = document.createElement("div");
					i.classList.add("toolbar"), document.body.hasAttribute("data-toolbar-order") && (t = document.body.getAttribute("data-toolbar-order").split(",").map(function(t) {
						return e[t] || n
					})), t.forEach(function(t) {
						var e = t(a);
						if(e) {
							var n = document.createElement("div");
							n.classList.add("toolbar-item"), n.appendChild(e), i.appendChild(n)
						}
					}), r.appendChild(i)
				}
			};
		a("label", function(t) {
			var e = t.element.parentNode;
			if(e && /pre/i.test(e.nodeName) && e.hasAttribute("data-label")) {
				var n, a, o = e.getAttribute("data-label");
				try {
					a = document.querySelector("template#" + o)
				} catch(r) {}
				return a ? n = a.content : (e.hasAttribute("data-url") ? (n = document.createElement("a"), n.href = e.getAttribute("data-url")) : n = document.createElement("span"), n.textContent = o), n
			}
		}), Prism.hooks.add("complete", o)
	}
}();
! function() {
	if("undefined" != typeof self && self.Prism && self.document && document.createElement) {
		var e = {
				javascript: "clike",
				actionscript: "javascript",
				arduino: "cpp",
				aspnet: ["markup", "csharp"],
				bison: "c",
				c: "clike",
				csharp: "clike",
				cpp: "c",
				coffeescript: "javascript",
				crystal: "ruby",
				"css-extras": "css",
				d: "clike",
				dart: "clike",
				django: "markup",
				erb: ["ruby", "markup-templating"],
				fsharp: "clike",
				flow: "javascript",
				glsl: "clike",
				gml: "clike",
				go: "clike",
				groovy: "clike",
				haml: "ruby",
				handlebars: "markup-templating",
				haxe: "clike",
				java: "clike",
				jolie: "clike",
				kotlin: "clike",
				less: "css",
				markdown: "markup",
				"markup-templating": "markup",
				n4js: "javascript",
				nginx: "clike",
				objectivec: "c",
				opencl: "cpp",
				parser: "markup",
				php: ["clike", "markup-templating"],
				"php-extras": "php",
				plsql: "sql",
				processing: "clike",
				protobuf: "clike",
				pug: "javascript",
				qore: "clike",
				jsx: ["markup", "javascript"],
				tsx: ["jsx", "typescript"],
				reason: "clike",
				ruby: "clike",
				sass: "css",
				scss: "css",
				scala: "java",
				smarty: "markup-templating",
				soy: "markup-templating",
				swift: "clike",
				tap: "yaml",
				textile: "markup",
				tt2: ["clike", "markup-templating"],
				twig: "markup",
				typescript: "javascript",
				vbnet: "basic",
				velocity: "markup",
				wiki: "markup",
				xeora: "markup",
				xquery: "markup"
			},
			a = {},
			c = "none",
			t = document.getElementsByTagName("script");
		t = t[t.length - 1];
		var r = "components/";
		if(t.hasAttribute("data-autoloader-path")) {
			var s = t.getAttribute("data-autoloader-path").trim();
			s.length > 0 && !/^[a-z]+:\/\//i.test(t.src) && (r = s.replace(/\/?$/, "/"))
		} else /[\w-]+\.js$/.test(t.src) && (r = t.src.replace(/[\w-]+\.js$/, "components/"));
		var i = Prism.plugins.autoloader = {
				languages_path: r,
				use_minified: !0
			},
			n = function(e, a, c) {
				var t = document.createElement("script");
				t.src = e, t.async = !0, t.onload = function() {
					document.body.removeChild(t), a && a()
				}, t.onerror = function() {
					document.body.removeChild(t), c && c()
				}, document.body.appendChild(t)
			},
			l = function(e) {
				return i.languages_path + "prism-" + e + (i.use_minified ? ".min" : "") + ".js"
			},
			o = function(e, c) {
				var t = a[e];
				t || (t = a[e] = {});
				var r = c.getAttribute("data-dependencies");
				!r && c.parentNode && "pre" === c.parentNode.tagName.toLowerCase() && (r = c.parentNode.getAttribute("data-dependencies")), r = r ? r.split(/\s*,\s*/g) : [], p(r, function() {
					u(e, function() {
						Prism.highlightElement(c)
					})
				})
			},
			p = function(e, a, c) {
				"string" == typeof e && (e = [e]);
				var t = 0,
					r = e.length,
					s = function() {
						r > t ? u(e[t], function() {
							t++, s()
						}, function() {
							c && c(e[t])
						}) : t === r && a && a(e)
					};
				s()
			},
			u = function(c, t, r) {
				var s = function() {
						var e = !1;
						c.indexOf("!") >= 0 && (e = !0, c = c.replace("!", ""));
						var s = a[c];
						if(s || (s = a[c] = {}), t && (s.success_callbacks || (s.success_callbacks = []), s.success_callbacks.push(t)), r && (s.error_callbacks || (s.error_callbacks = []), s.error_callbacks.push(r)), !e && Prism.languages[c]) m(c);
						else if(!e && s.error) k(c);
						else if(e || !s.loading) {
							s.loading = !0;
							var i = l(c);
							n(i, function() {
								s.loading = !1, m(c)
							}, function() {
								s.loading = !1, s.error = !0, k(c)
							})
						}
					},
					i = e[c];
				i && i.length ? p(i, s) : s()
			},
			m = function(e) {
				a[e] && a[e].success_callbacks && a[e].success_callbacks.length && a[e].success_callbacks.forEach(function(a) {
					a(e)
				})
			},
			k = function(e) {
				a[e] && a[e].error_callbacks && a[e].error_callbacks.length && a[e].error_callbacks.forEach(function(a) {
					a(e)
				})
			};
		Prism.hooks.add("complete", function(e) {
			e.element && e.language && !e.grammar && e.language !== c && o(e.language, e.element)
		})
	}
}();
! function() {
	if("undefined" != typeof self && self.Prism && self.document) {
		var e = /\s*\bcommand-line\b\s*/;
		Prism.hooks.add("before-highlight", function(a) {
			if(a.vars = a.vars || {}, a.vars["command-line"] = a.vars["command-line"] || {}, a.vars["command-line"].complete || !a.code) return a.vars["command-line"].complete = !0, void 0;
			var n = a.element.parentNode;
			if(!n || !/pre/i.test(n.nodeName) || !e.test(n.className) && !e.test(a.element.className)) return a.vars["command-line"].complete = !0, void 0;
			if(a.element.querySelector(".command-line-prompt")) return a.vars["command-line"].complete = !0, void 0;
			var t = a.code.split("\n");
			a.vars["command-line"].numberOfLines = t.length, a.vars["command-line"].outputLines = [];
			var r = n.getAttribute("data-output"),
				s = n.getAttribute("data-filter-output");
			if(r || "" === r) {
				r = r.split(",");
				for(var o = 0; o < r.length; o++) {
					var m = r[o].split("-"),
						i = parseInt(m[0], 10),
						l = 2 === m.length ? parseInt(m[1], 10) : i;
					if(!isNaN(i) && !isNaN(l)) {
						1 > i && (i = 1), l > t.length && (l = t.length), i--, l--;
						for(var d = i; l >= d; d++) a.vars["command-line"].outputLines[d] = t[d], t[d] = ""
					}
				}
			} else if(s)
				for(var o = 0; o < t.length; o++) 0 === t[o].indexOf(s) && (a.vars["command-line"].outputLines[o] = t[o].slice(s.length), t[o] = "");
			a.code = t.join("\n")
		}), Prism.hooks.add("before-insert", function(e) {
			if(e.vars = e.vars || {}, e.vars["command-line"] = e.vars["command-line"] || {}, !e.vars["command-line"].complete) {
				for(var a = e.highlightedCode.split("\n"), n = 0; n < e.vars["command-line"].outputLines.length; n++) e.vars["command-line"].outputLines.hasOwnProperty(n) && (a[n] = e.vars["command-line"].outputLines[n]);
				e.highlightedCode = a.join("\n")
			}
		}), Prism.hooks.add("complete", function(a) {
			if(a.vars = a.vars || {}, a.vars["command-line"] = a.vars["command-line"] || {}, !a.vars["command-line"].complete) {
				var n = a.element.parentNode;
				e.test(a.element.className) && (a.element.className = a.element.className.replace(e, " ")), e.test(n.className) || (n.className += " command-line");
				var t = function(e, a) {
						return(n.getAttribute(e) || a).replace(/"/g, "&quot")
					},
					r = new Array(a.vars["command-line"].numberOfLines + 1),
					s = t("data-prompt", "");
				if("" !== s) r = r.join('<span data-prompt="' + s + '"></span>');
				else {
					var o = t("data-user", "user"),
						m = t("data-host", "localhost");
					r = r.join('<span data-user="' + o + '" data-host="' + m + '"></span>')
				}
				var i = document.createElement("span");
				i.className = "command-line-prompt", i.innerHTML = r;
				for(var l = 0; l < a.vars["command-line"].outputLines.length; l++)
					if(a.vars["command-line"].outputLines.hasOwnProperty(l)) {
						var d = i.children[l];
						d.removeAttribute("data-user"), d.removeAttribute("data-host"), d.removeAttribute("data-prompt")
					}
				a.element.insertBefore(i, a.element.firstChild), a.vars["command-line"].complete = !0
			}
		})
	}
}();
! function() {
	if(("undefined" == typeof self || self.Prism) && ("undefined" == typeof global || global.Prism)) {
		var i = function(i) {
				return Prism.plugins.autolinker && Prism.plugins.autolinker.processGrammar(i), i
			},
			a = {
				pattern: /(.)\bdata:[^\/]+\/[^,]+,(?:(?!\1)[\s\S]|\\\1)+(?=\1)/,
				lookbehind: !0,
				inside: {
					"language-css": {
						pattern: /(data:[^\/]+\/(?:[^+,]+\+)?css,)[\s\S]+/,
						lookbehind: !0
					},
					"language-javascript": {
						pattern: /(data:[^\/]+\/(?:[^+,]+\+)?javascript,)[\s\S]+/,
						lookbehind: !0
					},
					"language-json": {
						pattern: /(data:[^\/]+\/(?:[^+,]+\+)?json,)[\s\S]+/,
						lookbehind: !0
					},
					"language-markup": {
						pattern: /(data:[^\/]+\/(?:[^+,]+\+)?(?:html|xml),)[\s\S]+/,
						lookbehind: !0
					}
				}
			},
			n = ["url", "attr-value", "string"];
		Prism.plugins.dataURIHighlight = {
			processGrammar: function(i) {
				i && !i["data-uri"] && (Prism.languages.DFS(i, function(i, e, r) {
					n.indexOf(r) > -1 && "Array" !== Prism.util.type(e) && (e.pattern || (e = this[i] = {
						pattern: e
					}), e.inside = e.inside || {}, "attr-value" == r ? Prism.languages.insertBefore("inside", e.inside["url-link"] ? "url-link" : "punctuation", {
						"data-uri": a
					}, e) : e.inside["url-link"] ? Prism.languages.insertBefore("inside", "url-link", {
						"data-uri": a
					}, e) : e.inside["data-uri"] = a)
				}), i["data-uri"] = a)
			}
		}, Prism.hooks.add("before-highlight", function(n) {
			if(a.pattern.test(n.code))
				for(var e in a.inside)
					if(a.inside.hasOwnProperty(e) && !a.inside[e].inside && a.inside[e].pattern.test(n.code)) {
						var r = e.match(/^language-(.+)/)[1];
						Prism.languages[r] && (a.inside[e].inside = {
							rest: i(Prism.languages[r])
						})
					}
			Prism.plugins.dataURIHighlight.processGrammar(n.grammar)
		})
	}
}();
! function() {
	if("undefined" != typeof self && self.Prism && self.document) {
		if(!Prism.plugins.toolbar) return console.warn("Show Languages plugin loaded before Toolbar plugin."), void 0;
		var e = {
			html: "HTML",
			xml: "XML",
			svg: "SVG",
			mathml: "MathML",
			css: "CSS",
			clike: "C-like",
			javascript: "JavaScript",
			abap: "ABAP",
			actionscript: "ActionScript",
			apacheconf: "Apache Configuration",
			apl: "APL",
			applescript: "AppleScript",
			arff: "ARFF",
			asciidoc: "AsciiDoc",
			asm6502: "6502 Assembly",
			aspnet: "ASP.NET (C#)",
			autohotkey: "AutoHotkey",
			autoit: "AutoIt",
			shell: "Shell",
			basic: "BASIC",
			csharp: "C#",
			cpp: "C++",
			coffeescript: "CoffeeScript",
			csp: "Content-Security-Policy",
			"css-extras": "CSS Extras",
			django: "Django/Jinja2",
			erb: "ERB",
			fsharp: "F#",
			gedcom: "GEDCOM",
			glsl: "GLSL",
			gml: "GameMaker Language",
			graphql: "GraphQL",
			http: "HTTP",
			hpkp: "HTTP Public-Key-Pins",
			hsts: "HTTP Strict-Transport-Security",
			ichigojam: "IchigoJam",
			inform7: "Inform 7",
			json: "JSON",
			jsonp: "JSONP",
			latex: "LaTeX",
			livescript: "LiveScript",
			lolcode: "LOLCODE",
			"markup-templating": "Markup templating",
			matlab: "MATLAB",
			mel: "MEL",
			n4js: "N4JS",
			nasm: "NASM",
			nginx: "nginx",
			nsis: "NSIS",
			objectivec: "Objective-C",
			ocaml: "OCaml",
			opencl: "OpenCL",
			parigp: "PARI/GP",
			objectpascal: "Object Pascal",
			php: "PHP",
			"php-extras": "PHP Extras",
			plsql: "PL/SQL",
			powershell: "PowerShell",
			properties: ".properties",
			protobuf: "Protocol Buffers",
			q: "Q (kdb+ database)",
			jsx: "React JSX",
			tsx: "React TSX",
			renpy: "Ren'py",
			rest: "reST (reStructuredText)",
			sas: "SAS",
			sass: "Sass (Sass)",
			scss: "Sass (Scss)",
			sql: "SQL",
			soy: "Soy (Closure Template)",
			tap: "TAP",
			tt2: "Template Toolkit 2",
			typescript: "TypeScript",
			vbnet: "VB.Net",
			vhdl: "VHDL",
			vim: "vim",
			"visual-basic": "Visual Basic",
			wasm: "WebAssembly",
			wiki: "Wiki markup",
			xeoracube: "XeoraCube",
			xojo: "Xojo (REALbasic)",
			xquery: "XQuery",
			yaml: "YAML"
		};
		Prism.plugins.toolbar.registerButton("show-language", function(a) {
			var t = a.element.parentNode;
			if(t && /pre/i.test(t.nodeName)) {
				var s = t.getAttribute("data-language") || e[a.language] || a.language && a.language.substring(0, 1).toUpperCase() + a.language.substring(1);
				if(s) {
					var r = document.createElement("span");
					return r.textContent = s, r
				}
			}
		})
	}
}();
! function() {
	if("undefined" != typeof self && self.Prism && self.document) {
		if(!Prism.plugins.toolbar) return console.warn("Copy to Clipboard plugin loaded before Toolbar plugin."), void 0;
		var o = window.ClipboardJS || void 0;
		o || "function" != typeof require || (o = require("clipboard"));
		var e = [];
		if(!o) {
			var t = document.createElement("script"),
				n = document.querySelector("head");
			t.onload = function() {
				if(o = window.ClipboardJS)
					for(; e.length;) e.pop()()
			}, t.src = "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js", n.appendChild(t)
		}
		Prism.plugins.toolbar.registerButton("copy-to-clipboard", function(t) {
			function n() {
				var e = new o(i, {
					text: function() {
						return t.code
					}
				});
				e.on("success", function() {
					i.textContent = "Copied!", r()
				}), e.on("error", function() {
					i.textContent = "Press Ctrl+C to copy", r()
				})
			}

			function r() {
				setTimeout(function() {
					i.textContent = "Copy"
				}, 5e3)
			}
			var i = document.createElement("a");
			return i.textContent = "Copy", o ? n() : e.push(n), i
		})
	}
}();