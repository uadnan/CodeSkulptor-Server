var a = a || {};
a.CSView = function (b, c) {
    var d, e, f, g = function () {
            this.folder = a.newFoldFunction(a.pythonRangeFinder);
            var c = function (a) {
                var b = a.getCursor(!0),
                    c = a.getCursor(!1),
                    d = b.line,
                    e = c.line;
                c.ch === 0 ? e -= 1 : c.ch += 1, a.operation(function () {
                    for (var f = d; f <= e; f++) {
                        var g = a.getLine(f);
                        a.setLine(f, "#" + g)
                    }
                    a.setSelection(b, c)
                })
            }, d = function (a) {
                    var b = a.getCursor(!0),
                        c = a.getCursor(!1),
                        d = b.line,
                        e = c.line;
                    c.ch === 0 && (e -= 1);
                    var f = /^(\s*)\#/;
                    a.operation(function () {
                        var g, h;
                        for (var i = d; i <= e; i++) g = a.getLine(i), h = g.replace(f, "$1"), g !== h && a.setLine(i, h);
                        g !== h && c.ch !== 0 && (c.ch -= 1), a.setSelection(b, c)
                    })
                };
            this.tabStop = 4, this.editor = CodeMirror.fromTextArea(b("#code")[0], {
                mode: {
                    name: "python",
                    version: 2,
                    singleLineStringErrors: !1
                },
                gutters: ["fold-gutter"],
                fixedGutter: !1,
                lineNumbers: !0,
                indentUnit: this.tabStop,
                tabMode: "indent",
                matchBrackets: !0,
                extraKeys: {
                    "Ctrl-Q": function (a) {
                        g.folder(a, a.getCursor().line)
                    },
                    "Ctrl-K": c,
                    "Shift-Ctrl-K": d
                }
            }), this.editor.on("gutterClick", this.folder), this.errorLine = null, this.pre = null;
            var e = {
                console: "#console",
                splitBar: "#splitbar",
                grip: "#grip",
                runButton: "#run",
                saveButton: "#save",
                dlButton: "#dl",
                freshButton: "#fresh",
                loadLocalButton: "#loadlocal",
                resetButton: "#reset",
                docButton: "#docs",
                demoButton: "#demos",
                tipsButton: "#tips",
                localFile: "#localfile",
                dlanchor: "#dlhref",
                topbar: "#controls",
                brand: "#brand"
            };
            for (var f in e) this[f] = b(e[f]);
            var g = this;
            CodeMirror.commands.save = function (a) {
                g.saveButton.click()
            }, this.minheight = this.console.height();
            var h = this.console.offset().top,
                i = b("#bottom").height() * 3;
            this.extraheight = h + i, this.split = !0, this.edwidth = b(this.editor.getWrapperElement()).width(), this.conwidth = this.console.width(), this.width = this.edwidth + this.conwidth
        }, h = function (a, b) {
            if (a[b]) return a[b]();
            if (document.createEvent) {
                var c = document.createEvent("HTMLEvents");
                return c.initEvent(b, !0, !0), !a.dispatchEvent(c)
            }
            var c = document.createEventObject();
            return a.fireEvent("on" + b, c)
        };
    return g.prototype.configure = function (a) {
        this.model = a, this.runButton.button({
            text: !1,
            icons: {
                primary: "ui-icon-play"
            }
        }), this.saveButton.button({
            text: !1,
            icons: {
                primary: "ui-icon-disk"
            }
        }), this.dlButton.button({
            text: !1,
            disabled: !0,
            icons: {
                primary: "ui-icon-arrowthickstop-1-s"
            }
        }), this.freshButton.button({
            text: !1,
            icons: {
                primary: "ui-icon-suitcase"
            }
        }), this.loadLocalButton.button({
            text: !1,
            icons: {
                primary: "ui-icon-folder-open"
            }
        }), this.resetButton.button({
            text: !1,
            icons: {
                primary: "ui-icon-arrowreturnthick-1-w"
            }
        }), this.docButton.button({
            icons: {
                primary: "ui-icon-info"
            }
        }), this.demoButton.button({
            icons: {
                primary: "ui-icon-script"
            }
        }), this.tipsButton.button({
            icons: {
                primary: "ui-icon-lightbulb"
            }
        })
    }, d = function (a, b) {
        var c = a.width - b;
        a.editor.setSize(b, null), c |= 0, a.console.width(c), a.editor.refresh()
    }, e = function (a, b) {
        b -= a.extraheight, b < a.minheight && (b = a.minheight), a.editor.setSize(null, b), a.splitBar.height(b), a.grip[0].style.top = b / 2 - a.grip.height() / 2 + "px", a.console.height(b), a.editor.refresh()
    }, f = function (a, b) {
        var c = b.parentNode;
        while (c !== null) {
            if (c === a) return !0;
            c = c.parentNode
        }
        return !1
    }, g.prototype.start = function () {
        var a, g, i, j, k, l = this.model,
            m = this,
            n = document.getElementById("active"),
            o = function (a, b) {
                var c = a / 2 - b / 2;
                m.brand.css({
                    left: c + "px"
                })
            };
        this.brand.load(function () {
            var a = m.topbar.outerWidth(),
                b = m.brand.width();
            o(a, b)
        }), o(this.topbar.outerWidth(), 129), this.runButton.click(function () {
            m.runButton.blur(), l.run()
        }), this.saveButton.click(function () {
            m.saveButton.blur(), l.save()
        }), this.freshButton.click(function () {
            m.freshButton.blur(), l.save(!0)
        }), this.dlButton.click(function () {
            var a, c, d = m.dlanchor[0];
            m.dlButton.blur(), a = d.href, c = b.ajax({
                url: a,
                type: "GET",
                success: function () {
                    h(d, "click")
                },
                error: function () {
                    h(d, "click")
                }
            })
        }), a = function (a) {
            var b = n,
                d = 0,
                e = 0;
            while (b && b.tagName != "BODY") d += b.offsetTop, e += b.offsetLeft, b = b.offsetParent;
            return {
                x: a.clientX - e + c.pageXOffset,
                y: a.clientY - d + c.pageYOffset
            }
        }, g = function (b) {
            var c = a(b),
                e = c.x >= m.width ? m.width : c.x;
            d(m, e), m.edwidth = e, m.conwidth = m.width - m.edwidth, m.split = !0
        }, i = function (a) {
            n.removeEventListener("mousemove", g, !0), n.removeEventListener("mouseup", i, !0), n.removeEventListener("mouseout", j, !0)
        }, j = function (a) {
            var b = a.toElement;
            b !== n && !f(n, b) && (n.removeEventListener("mousemove", g, !0), n.removeEventListener("mouseup", i, !0), n.removeEventListener("mouseout", j, !0))
        }, this.splitBar.hover(function () {
            b(this).css("cursor", "col-resize")
        }, function () {
            b(this).css("cursor", "auto")
        }), this.splitBar.mousedown(function () {
            return document.body.focus(), n.addEventListener("mousemove", g, !0), n.addEventListener("mouseup", i, !0), n.addEventListener("mouseout", j, !0), !1
        }), this.splitBar.dblclick(function () {
            m.split ? (d(m, m.width), m.split = !1) : (d(m, m.edwidth), m.split = !0)
        }), c.onresize = function () {
            var a = b(c).height();
            e(m, a)
        }, e(m, b(c).height()), k = function (a) {
            var b = a.target.files[0];
            l.loadLocal(b)
        }, this.localFile.on("change", k), b(document).on("change", "#localfile", k), this.loadLocalButton.click(function () {
            m.loadLocalButton.blur(), navigator.userAgent.indexOf("Firefox") != -1 && m.localFile.click()
        }), this.resetButton.click(function () {
            m.resetButton.blur(), l.reset()
        }), this.docButton.click(function () {
            var a;
            m.docButton.blur(), a = document.getElementById("docanchor"), h(a, "click")
        }), this.demoButton.click(function () {
            var a;
            m.demoButton.blur(), a = document.getElementById("demoanchor"), h(a, "click")
        }), this.tipsButton.click(function () {
            var a;
            m.tipsButton.blur(), a = document.getElementById("tipanchor"), h(a, "click")
        }), b(c).bind("hashchange", function () {
            l.loadRemote(c.location.hash)
        }), this.model.loadRemote(c.location.hash)
    }, g.prototype.setFilename = function (a) {
        c.location.hash = a
    }, g.prototype.showDownload = function (a) {
        var b = this,
            c = function (a, d) {
                b.dlButton.button("option", "disabled", !0), b.saveButton.button("option", "disabled", !1), b.editor.off("change", c), b.saveButton.blur(), b.saveButton.removeClass("ui-state-hover")
            };
        this.dlanchor.attr("href", a), this.dlButton.button("option", "disabled", !1), this.saveButton.button("option", "disabled", !0), this.editor.on("change", c)
    }, g.prototype.getEditState = function () {
        var a, b, c, d, e, f, g = this.editor.getScrollInfo(),
            h = this.editor.getCursor(),
            i = [],
            j = !1;
        for (a = 0, b = this.editor.lineCount(); a < b; ++a) {
            c = this.editor.findMarksAt({
                line: a,
                ch: 0
            }), d = !1;
            for (e = 0; e < c.length; ++e) c[e].__isFold && (d = !0, j || (i.push(a - 1), j = !0));
            j && !d && (j = !1)
        }
        return f = {
            x: g.left,
            y: g.top,
            cursor: h,
            folded: i
        }, f
    }, g.prototype.setCode = function (a, b) {
        var c, d = this.editor,
            e = this.folder;
        d.setValue(a);
        if (b) {
            d.setCursor(b.cursor), d.scrollTo(b.x, b.y);
            for (c = 0; c < b.folded.length; c++) e(d, b.folded[c])
        }
    }, g.prototype.getCode = function () {
        return this.editor.getValue()
    }, g.prototype.getTabStop = function () {
        return this.tabStop
    }, g.prototype.setHash = function (a) {
        c.location.hash = a
    }, g.prototype.consoleOutput = function (a) {
        var c;
        this.pre || (this.pre = b("<pre />"), this.console.append(this.pre)), c = b("<div />").text(a).html(), this.pre.append(c), this.console.scrollTop(this.console.prop("scrollHeight"))
    }, g.prototype.colorOutput = function (a, c) {
        var d, e = b("<pre />"),
            f = b("<span />");
        f.css("color", c), d = b("<div />").text(a).html(), f.append(d), e.append(f), this.console.append(e), this.console.scrollTop(this.console.prop("scrollHeight")), this.pre = null
    }, g.prototype.exceptOutput = function (a, b, c) {
        var d = "",
            e = c(),
            f = b();
        e && (d += "File '" + e + "', "), f && (d += "Line " + f + ": "), d += a, this.colorOutput(d, "red"), f && e === undefined && (this.errorLine = this.editor.addLineClass(f - 1, "background", "activeline"), this.editor.setCursor(f - 1), this.editor.focus())
    }, g.prototype.reset = function () {
        this.errorLine && (this.editor.removeLineClass(this.errorLine, "background", "activeline"), this.errorLine = null), this.console.html(""), this.pre = null, CodeMirror.commands.clearSearch !== undefined && CodeMirror.commands.clearSearch(this.editor)
    }, g
}(jQuery, window), a = a || {}, a.pythonRangeFinder = function (a, b) {
    var c, d, e, f = a.getOption("tabSize"),
        g = a.getLine(b.line),
        h = CodeMirror.countColumn(g, null, f),
        i = null;
    for (c = b.line + 1, d = a.lineCount(); c < d; ++c) {
        e = a.getLine(c);
        if (!/^\s*(?:\#.*)?$/.test(e)) {
            if (CodeMirror.countColumn(e, null, f) <= h) break;
            i = c
        }
    }
    return i ? {
        from: {
            line: b.line,
            ch: g.length
        },
        to: {
            line: i,
            ch: a.getLine(i).length
        }
    } : null
}, a.newFoldFunction = function (a, b) {
    var c;
    return b == null && (b = "↔"), typeof b == "string" && (c = document.createTextNode(b), b = document.createElement("span"), b.appendChild(c), b.className = "CodeMirror-foldmarker"),
    function (c, d) {
        var e, f, g, h, i, j, k;
        typeof d == "number" && (d = {
            line: d,
            ch: 0
        }), e = a(c, d);
        if (!e) return;
        f = c.findMarksAt(e.from), g = 0;
        for (h = 0; h < f.length; ++h) f[h].__isFold && (++g, f[h].clear());
        if (g) {
            c.setGutterMarker(d.line, "fold-gutter", null);
            return
        }
        i = b.cloneNode(!0), j = c.markText(e.from, e.to, {
            replacedWith: i,
            clearOnEnter: !0,
            __isFold: !0
        }), CodeMirror.on(i, "mousedown", function () {
            j.clear()
        }), CodeMirror.on(j, "clear", function () {
            c.setGutterMarker(d.line, "fold-gutter", null)
        }), k = document.createElement("span"), k.appendChild(document.createTextNode("▶")), k.style.color = "#600", c.setGutterMarker(d.line, "fold-gutter", k)
    }
}, a = a || {}, a.GoogleData = {
    baseURL: "/storage/",
    writeBucket: "ud"
}, a = a || {}, String.prototype.format = function () {
    var a = arguments;
    return this.replace(/{(\d+)}/g, function (b, c) {
        return typeof a[c] != "undefined" ? a[c] : b
    })
}, a.CSModel = function (a) {
    var b, c, d, e, f, g, h, i = function (a, b, c) {
            this.bucket = undefined, this.uid = undefined, this.seqnum = undefined, this.ext = undefined, this.filename = undefined, this.hashLen = a, this.shareLen = 1.5 * a | 0, this.baseURL = b, this.writeBucket = c
        }, j = ".py",
        k = 4;
    return i.prototype.configure = function (a) {
        this.view = a
    }, b = '', i.prototype.spaceRE = /^ *\t[ \t]*/gm, i.prototype.spacesForTabs = function (a) {
        return function (b) {
            var c, d, e = "";
            for (c = 0; c < b.length; c++) b.charAt(c) === "	" ? (d = a - e.length % a, e += Array(d + 1).join(" ")) : e += " ";
            return e
        }
    }, i.prototype.start = function () {
        var c = this,
            d = function (a) {
                var b = /^\.\/([a-zA-Z][a-zA-Z0-9]*)\_([\w]+?)(?:\_(\d+))?\.py$/,
                    c = a.match(b),
                    d, e, f, g;
                return c == null ? null : (d = c[1], e = c[2], c[3] === undefined ? f = null : f = parseInt(c[3]), g = d + "_" + e, f != null && (g += "_" + f), g += ".py", console.log("Import: bucket: " + d + " uid: " + e + " seqnum: " + f + " filename: " + g), {
                    bucket: d,
                    filename: g
                })
            }, e = function (b) {
                if (Sk.builtinFiles !== undefined && Sk.builtinFiles.files[b] !== undefined) return Sk.builtinFiles.files[b];
                var e = d(b);
                if (e !== null) {
                    var f = c.baseURL.format(e.bucket) + e.filename,
                        g = {
                            async: !1,
                            error: function (a, c, d) {
                                throw "File not found: '" + b + "'"
                            },
                            timeout: 5e3
                        }, h = a.ajax(f, g).responseText,
                        i = c.view.getTabStop();
                    return h = h.replace(c.spaceRE, c.spacesForTabs(i)), Sk.execStart = new Date, h
                }
                throw "File not found: '" + b + "'"
            };
        Sk.configure({
            output: this.view.stdout,
            debugout: this.view.stddbg,
            read: e,
            error: this.view.stderr
        }), this.view.setCode(b)
    }, c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", i.prototype.createHash = function (a) {
        var b, d = "",
            e = a || this.hashLen;
        for (b = 0; b < e; b++) d += c.charAt(Math.random() * c.length | 0);
        return d
    }, i.prototype.getLineNo = function () {
        return Sk.currLineNo ? Sk.currLineNo : undefined
    }, i.prototype.getFilename = function () {
        var a;
        return Sk.currFilename && Sk.currFilename !== "<stdin>.py" ? (a = Sk.currFilename.split("/"), a[a.length - 1]) : undefined
    }, i.prototype.reset = function () {
        Sk.simplegui && (Sk.simplegui.cleanup(), Sk.simplegui = undefined), Sk.simpleplot && (Sk.simpleplot.cleanup(), Sk.simpleplot = undefined), this.view.reset()
    }, i.prototype.run = function () {
        var a, b, c, d, e, f, g, h = this.view.getTabStop();
        try {
            a = this.view.getCode(), b = this.view.getEditState(), a = a.replace(this.spaceRE, this.spacesForTabs(h)), this.view.setCode(a, b), this.reset(), Sk.currLineNo = undefined, Sk.currColNo = undefined, Sk.currFilename = undefined, Sk.setExecLimit(5e3), c = Sk.importMainWithBody("<stdin>", !1, a)
        }
        catch (i) {
            if (i instanceof Sk.builtin.ParseError || i instanceof Sk.builtin.SyntaxError || i instanceof Sk.builtin.IndentationError || i instanceof Sk.builtin.TokenError) try {
                i.args.v[2] !== undefined && (Sk.currLineNo = i.args.v[2]), i.args.v[1] !== undefined && (Sk.currFilename = i.args.v[1].v), d = i.args.v[3][0][1], e = i.args.v[3][1][1], f = i.args.v[3][2].substring(d, e), i.args.v[0] = i.args.v[0].sq$concat(new Sk.builtin.str(" ('" + f + "')"))
            }
            catch (j) {}
            g = i.tp$name + ": " + i, this.view.stderr(g), Sk.simplegui && (Sk.simplegui.cleanup(), Sk.simplegui = undefined), Sk.simpleplot && (Sk.simpleplot.cleanup(), Sk.simpleplot = undefined)
        }
    }, d = function (a, b, c, d) {
        var e = a + "_" + b;
        return c >= 0 && (e += "_" + c.toString()), d === undefined ? e += j : e += d, e
    }, e = function (b, c, f, g) {
        g = g || 1;
        if (g > k) {
            alert("Unable to save at this time.");
            return
        }
        h = d(b.writeBucket, c, f), console.log("Save key: " + h + " attempt: " + g);

        var i = b.baseURL.format(b.writeBucket) + h,
            l = a.ajax({
                url: i,
                type: "HEAD",
                success: function (a, d) {
                    c = b.createHash(), f >= 0 && (f = 0), e(b, c, f, g++)
                },
                error: function (d, e, g) {                	
                    g == "Not Found" ? (b.bucket = b.writeBucket, b.uid = c, b.seqnum = f, b.ext = j, b.filename = h, b.view.setHash(h), b.view.showDownload(i, h), $.ajax({
					  type: "POST",
					  url: $("#codeform")[0].action,
					  data: { path: h,
		                      code: b.view.getCode() }
					})) : alert("Unable to save at this time.")
                }
            })
    }, i.prototype.save = function (a) {
        var b, c, d, f, g;
        a ? (b = this.createHash(this.shareLen), c = -1) : this.uid ? (b = this.uid, c = this.seqnum + 1) : (b = this.createHash(), c = 0), d = this.view.getTabStop(), f = this.view.getCode(), g = this.view.getEditState(), f = f.replace(this.spaceRE, this.spacesForTabs(d)), this.view.setCode(f, g), e(this, b, c)

    }, f = function (a) {
        a.uid ? a.view.setHash(a.filename) : a.view.setHash("")
    }, g = function (a) {
        var b = /^#([a-zA-Z][a-zA-Z0-9]*)[\-_]([\w\-]+?)(?:[\-_](\d+))?(\.py)$/,
            c = a.match(b),
            d, e, f, g;
        return c == null ? null : (d = c[1], e = c[2], c[3] === undefined ? f = -1 : f = parseInt(c[3]), g = c[4], console.log("New: bucket: " + d + " uid: " + e + " seqnum: " + f + " ext: " + g), {
            bucket: d,
            uid: e,
            seqnum: f,
            ext: g
        })
    }, i.prototype.loadRemote = function (b) {
        var c, d, e, h, i;
        if (!b) {
            this.bucket = undefined, this.uid = undefined, this.seqnum = undefined, this.ext = undefined, this.filename = undefined;
            return
        }
        c = g(b), d = b.slice(1);
        if (!c) {
            alert("Invalid file name: " + d), f(this);
            return
        }
        if (this.filename == d) return;
        e = this, h = e.baseURL.format(c.bucket) + d, i = a.get(h), i.success(function (a) {
            e.view.setCode(a), e.reset(), e.bucket = c.bucket, e.uid = c.uid, e.seqnum = c.seqnum, e.ext = c.ext, e.filename = d
        }), i.error(function () {
            f(e), alert("Unable to load file: " + d)
        })
    }, h = function (a) {
        var b = "";
        switch (a.currentTarget.error.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            b = "QUOTA EXCEEDED";
            break;
        case FileError.NOT_FOUND_ERR:
            b = "NOT FOUND";
            break;
        case FileError.SECURITY_ERR:
            b = "SECURITY ERROR";
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            b = "INVALID MODIFICATION";
            break;
        case FileError.INVALID_STATE_ERR:
            b = "INVALID STATE";
            break;
        default:
            b = "Unknown Error"
        }
        alert("Error opening file: " + b)
    }, i.prototype.loadLocal = function (a) {
        var b = this,
            c = new FileReader;
        c.onload = function (a) {
            b.view.setCode(a.target.result)
        }, c.onerror = h, c.readAsText(a)
    }, i
}(jQuery), a = a || {}, a.Controller = function () {
    var b, c, d, e;
    this.view = new a.CSView, this.model = new a.CSModel(10, a.GoogleData.baseURL, a.GoogleData.writeBucket), b = a.GoogleData.baseURL.format(a.GoogleData.writeBucket), $("#codeform")[0].action = b, c = function (a, b) {
        return function () {
            return a.apply(b, arguments)
        }
    }, d = {
        stdout: c(this.view.consoleOutput, this.view),
        stddbg: c(function (a) {
            this.view.colorOutput(a, "blue")
        }, this),
        stderr: c(function (a) {
            this.view.exceptOutput(a, this.model.getLineNo, this.model.getFilename)
        }, this),
        setFilename: c(this.view.setFilename, this.view),
        showDownload: c(this.view.showDownload, this.view),
        getEditState: c(this.view.getEditState, this.view),
        setCode: c(this.view.setCode, this.view),
        getCode: c(this.view.getCode, this.view),
        getTabStop: c(this.view.getTabStop, this.view),
        setHash: c(this.view.setHash, this.view),
        reset: c(this.view.reset, this.view)
    }, e = {
        run: c(this.model.run, this.model),
        save: c(this.model.save, this.model),
        loadRemote: c(this.model.loadRemote, this.model),
        loadLocal: c(this.model.loadLocal, this.model),
        reset: c(this.model.reset, this.model)
    }, this.view.configure(e), this.model.configure(d), this.model.start(), this.view.start()
}, jQuery(function () {
    var b = new a.Controller
});