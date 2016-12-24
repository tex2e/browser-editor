'use strict';

var file = new File("untitled.txt", "plain");

// class File
function File(name, plain, text) {
  this.name = name;
  this.mode = plain;
  this.text = text || "";
}
File.prototype.download = function (args) {
  if (!this.isValidName) return false;
  var args = args || {};
  var type = args.type || "text/plain";
  var a = document.createElement("a");
  var file = new Blob([this.text], {type: type});
  a.href = URL.createObjectURL(file);
  a.download = this.name;
  a.click();
};
File.prototype.isValidName = function () {
  return this.text.match(/[^\/\\¥?*:|<>]+/);
};
File.untitledFileTemplates = {
  plain: "untitled.txt",//
  adap: "untitled.abp",//
  abc: "untitled",
  actionscript: "untitled.as",//
  ada: "untitled",
  apache_conf: "untitled",
  applescript: "untitled.applescript",//
  asciidoc: "untitled",
  assembly_x86: "untitled.asm",//
  autohotkey: "untitled",
  batchfile: "untitled.bat",
  c9search: "untitled",
  c_cpp: "untitled.cpp",//
  cirru: "untitled",
  clojure: "untitled.clj",//
  cobol: "untitled.cbl",//
  coffee: "untitled.coffee",//
  coldfusion: "untitled",
  csharp: "untitled.cs",//
  css: "untitled.css",//
  curly: "untitled",
  d: "untitled.d",//
  dart: "untitled.dart",//
  diff: "untitled",
  django: "untitled",
  dockerfile: "untitled",
  dot: "untitled.dot",//
  drools: "untitled",
  eiffel: "untitled",
  ejs: "untitled",
  elixir: "untitled.exs",//
  elm: "untitled",
  erlang: "untitled.erl",//
  forth: "untitled.forth",//
  fortran: "untitled",
  ftl: "untitled",
  gcode: "untitled",
  gherkin: "untitled",
  gitignore: ".gitignore",//
  glsl: "untitled",
  gobstones: "untitled",
  golang: "untitled.go",//
  groovy: "untitled",
  haml: "untitled",
  handlebars: "untitled",
  haskell: "untitled.hs",//
  haskell_cabal: "untitled.hs",//
  haxe: "untitled",
  html: "untitled.html",//
  html_elixir: "untitled.html.eex",//
  html_ruby: "untitled.html.erb",//
  ini: "untitled",
  io: "untitled",
  jack: "untitled",
  jade: "untitled.jade",//
  java: "untitled.java",//
  javascript: "untitled.js",//
  json: "untitled.json",//
  jsp: "untitled.jsp",//
  julia: "untitled",
  kotlin: "untitled.kts",//
  latex: "untitled.tex",//
  less: "untitled.less",//
  liquid: "untitled",
  list: "untitled",
  livescript: "untitled",
  logiql: "untitled",
  lsl: "untitled",
  lua: "untitled",
  luapage: "untitled",
  lucene: "untitled",
  makefile: "Makefile",//
  markdown: "untitled.md",//
  mask: "untitled",
  matlab: "untitled.mat",//
  maze: "untitled",
  mel: "untitled",
  mushcode: "untitled",
  mysql: "untitled.sql",//
  nix: "untitled",
  nsis: "untitled",
  objectivec: "untitled.m",//
  ocaml: "untitled.ml",//
  pascal: "untitled.pas",//
  perl: "untitled.pl",//
  pgsql: "untitled.sql",//
  php: "untitled.php",//
  powershell: "untitled.ps1",//
  praat: "untitled",
  prolog: "untitled.pl",//
  properties: "untitled",
  protobuf: "untitled",
  python: "untitled.py",//
  r: "untitled.r",//
  razor: "untitled",
  rdoc: "untitled.rb",//
  rhtml: "untitled",
  rst: "untitled",
  ruby: "untitled.rb",//
  rust: "untitled.rs",//
  sass: "untitled.sass",//
  scad: "untitled",
  scala: "untitled.scala",//
  scheme: "untitled.scm",//
  scss: "untitled.scss",//
  sh: "untitled.sh",//
  sjs: "untitled",
  smarty: "untitled.tpl",//
  snippets: "untitled",
  soy_template: "untitled",
  space: "untitled",
  sql: "untitled.sql",//
  sqlserver: "untitled.sql",//
  stylus: "untitled.styl",//
  svg: "untitled.svg",//
  swift: "untitled.swift",//
  tcl: "untitled",
  tex: "untitled.tex",//
  text: "untitled",
  textile: "untitled",
  toml: "untitled",
  tsx: "untitled",
  twing: "untitled",
  typescript: "untitled.ts",//
  vala: "untitled",
  vbscript: "untitled.vbs",//
  velocity: "untitled",
  verilog: "untitled.v",//
  chdl: "untitled",
  wollok: "untitled",
  xml: "untitled.xml",//
  xquery: "untitled.xquery",//
  yaml: "untitled.yml",//
}


// --- main ---

// font size
$('#js_text_size').find('a').click(function () {
  // change font size
  var textSize = $(this).data('size');
  editor.setFontSize(textSize);

  // toggle class "active"
  $('#js_text_size').find('a').removeClass('active');
  $(this).addClass('active');
});

// save file
$('#js_file_io').find('a[data-action=save]').click(function() {
  $('#js_modal_save_input_filename').attr('value', file.name);
});
$('#js_modal_save_input_filename').change(function () {
  file.name = $(this).val();
});
$('#js_modal_save_submit').click(function() {
  file.text = editor.getValue();
  file.download();
});

// open file
$('#js_file_io').find('a[data-action=open]').click(function(event) {
  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    $('#js_input_file').trigger('click');
  } else {
    alert('The File APIs are not fully supported in this browser.');
    return false;
  }
});
$('#js_input_file').change(function () {
  var $input = $(this);
  var inputFiles = this.files;
  console.log(inputFiles);
  if(inputFiles == undefined || inputFiles.length == 0) return;
  var inputFile = inputFiles[0];

  var reader = new FileReader();
  reader.onload = function(event) {
    editor.setValue(event.target.result);
    editor.navigateDown();
  };
  reader.onerror = function(event) {
    alert("I AM ERROR: " + event.target.error.code);
  };
  reader.readAsText(inputFile);
});

// search box
$('#js_search_text').click(function() {
  editor.execCommand("find");
});

// settings window
$('#js_editor_settings').click(function () {
  editor.execCommand("showSettingsMenu");
});

// editor syntax mode
$('#js_select_mode').change(function() {
  // change syntax mode
  var mode = $(this).val();
  editor.getSession().setMode("ace/mode/" + mode);

  // update file name
  file.name = File.untitledFileTemplates[mode];
});


// make file drag-and-droppable so as to load text
(function () {
  var droppable = $("#droppable");

  if (!window.FileReader) {
    alert("File API is not supported in this browser!");
    return false;
  }

  // Cancel the defualt process of dragenter and dragover event.
  var cancelEvent = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
  droppable.bind("dragenter", cancelEvent);
  droppable.bind("dragover",  cancelEvent);

  // Set the event handler for dropped file.
  droppable.bind("drop", function handleDroppedFile(event) {
    var file = event.originalEvent.dataTransfer.files[0];

    var fileReader = new FileReader();
    fileReader.onload = function (event) {
      // event.target.result
      // $("#droppable").text("[" + file.name + "]" + event.target.result);
      // editor.session.reset();
      // editor.session.insert({ row: 0, column: 0 }, event.target.result);
      editor.session.setValue(event.target.result);
    }
    fileReader.readAsText(file);

    return cancelEvent(event);
  });
}())
