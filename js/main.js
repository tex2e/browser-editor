'use strict';

var file = new File("untitled.txt");

// class File
function File(name, text) {
  this.name = name || "untitled.txt";
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
  var mode = $(this).val();
  editor.getSession().setMode("ace/mode/" + mode);
  // file.name = "untitled." + ext
});
