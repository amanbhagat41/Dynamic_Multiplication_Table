/*
File: script.js
GUI Assignment: HW4 Using the jQuery Plugin/UI with Your Dynamic Table
Aman Bhagat, Umass Lowell Computer Science, aman_bhagat@student.uml.edu
Copyright (c) 2021 by Aman.  All rights reserved.  May be freely copied or 
excerpted for educational purposes with credit to the author. 
updated by AB on Nov 13 4:30 pm
*/

$(function () {
  // makeTable()
  $("#minColSlider").slider({ //creates a slider for mincol
    min: -50,
    max: 50,
    slide: function (event, ui) {
      $("#minCol").val(ui.value);
      $("form[name='mTable']").first().trigger("submit"); //Submits the table
    },
  });
  $("#minCol").on("keyup", function () { // used https://codepen.io/DriftwoodJP/pen/zVJjrm https://codepen.io/anon/pen/bExger to make the textbox change the sliders
    $("#minColSlider").slider("value", this.value);
    if ($("form[name='mTable']").valid() == true) { //https://jqueryvalidation.org/valid/
      $("form[name='mTable']").first().trigger("submit");//Submits the table
    }
  });
  $("#maxColSlider").slider({//creates a slider for maxCol
    min: -50,
    max: 50,
    slide: function (event, ui) {
      $("#maxCol").val(ui.value);
      $("form[name='mTable']").first().trigger("submit");
    },
  });
  $("#maxCol").on("keyup", function () {//make the textbox change the sliders
    $("#maxColSlider").slider("value", this.value);
    if ($("form[name='mTable']").valid() == true) {
      $("form[name='mTable']").first().trigger("submit");
    }
  });
  $("#minRowSlider").slider({//creates a slider for minRow
    min: -50,
    max: 50,
    slide: function (event, ui) {
      $("#minRow").val(ui.value);
      $("form[name='mTable']").first().trigger("submit");
    },
  });
  $("#minRow").on("keyup", function () {//make the textbox change the sliders
    $("#minRowSlider").slider("value", this.value);
    if ($("form[name='mTable']").valid() == true) {
      $("form[name='mTable']").first().trigger("submit");
    }
  });
  $("#maxRowSlider").slider({//creates a slider for maxRow
    min: -50,
    max: 50,
    slide: function (event, ui) {
      $("#maxRow").val(ui.value);
      $("form[name='mTable']").first().trigger("submit");
    },
  });
  $("#maxRow").on("keyup", function () {//make the textbox change the sliders
    $("#maxRowSlider").slider("value", this.value);
    if ($("form[name='mTable']").valid() == true) {
      $("form[name='mTable']").first().trigger("submit");
    }
  });
  $(document).ready(function () {
    //https://stackoverflow.com/questions/32587177/jquery-validate-compare-two-fields
    jQuery.validator.addMethod("comparison", function (value, element, param) {//jquery Valadation for comparing two values
      return (
        this.optional(element) || parseInt(value) >= parseInt($(param).val())
      );
    });
  });
  $.validator.addMethod("noDecimal", function (value, element) { //jquery valadation for having no decimals
    return !(value % 1);
  });

  $("form[name='mTable']").validate({ //validate the form
    rules: {
      minCol: { //rules for minCol
        required: true,
        number: true,
        noDecimal: true,
        range: [-50, 50],
      },
      maxCol: {//rules for maxCol
        required: true,
        number: true,
        comparison: "#minCol",
        noDecimal: true,
        range: [-50, 50],
      },
      minRow: {//rules for minRow
        required: true,
        number: true,
        noDecimal: true,
        range: [-50, 50],
      },
      maxRow: {//rules for maxRow
        required: true,
        number: true,
        comparison: "#minRow",
        noDecimal: true,
        range: [-50, 50],
      },
    },
    messages: {//Messages for when the rule is violated
      minCol: {
        required: "<br/>Please enter your minCol",
        number: "<br/>Please enter a Number",
        range: "<br/>Range can only be from -50 to 50",
        noDecimal: "<br/>No Decimals",
      },
      maxCol: {
        required: "<br/>Please enter your minCol",
        number: "<br/>Please enter a Number",
        comparison: "<br/>Max Col Should be bigger than min Col",
        range: "<br/>Range can only be from -50 to 50",
        noDecimal: "<br/>No Decimals",
      },
      minRow: {
        required: "<br/>Please enter your minCol",
        number: "<br/>Please enter a Number",
        range: "<br/>Range can only be from -50 to 50",
        noDecimal: "<br/>No Decimals",
      },
      maxRow: {
        required: "<br/>Please enter your minCol",
        number: "<br/>Please enter a Number",
        comparison: "<br/>Max Row Should be bigger than min Row",
        range: "<br/>Range can only be from -50 to 50",
        noDecimal: "<br/>No Decimals",
      },
    },
    submitHandler: function (form, e) { //after valadations submit
      e.preventDefault();
      makeTable();
    },
  });
});
var numTab = 1;
$(function () { //https://codepen.io/bobo52310/pen/ZEwBar https://codepen.io/lalawork513/details/xRparL I used these two codepens to help figure out adding tabs
  $("#submit").click(function (form) {
  var minCol = Number(document.getElementById("minCol").value);
  var maxCol = Number(document.getElementById("maxCol").value);
  var minRow = Number(document.getElementById("minRow").value);
  var maxRow = Number(document.getElementById("maxRow").value);
    makeTable();
    console.log("Hi");
    $("#tabs").tabs();
    console.log(numTab);
    $("div#tabs ul").append('<li class="tab"><input type="checkbox"><a href="#tab-' + numTab +'"> ' +minCol + " to "+ maxCol+" by "+minRow + " to "+ maxRow+'</a><span class="ui-icon ui-icon-close""></li>'); //creates a tab
    $("div#tabs").append('<div id="tab-' + numTab + '">' + $("#table").html() + "</div>"); // https://stackoverflow.com/questions/34761583/how-to-clone-the-content-of-a-tab-to-the-rest-of-the-tabs-jquery puts table into tab
    $("div#tabs").tabs("refresh");
    $("#tabs").tabs("option", "active", -1); //goes into tab
    numTab++;
  });
});

var tabs = $("#tabs").tabs();

tabs.delegate("span.ui-icon-close", "click", function () {//deletes a single tab
  var panelId = $(this).closest("li").remove().attr("aria-controls");
  $("#" + panelId).remove();
  tabs.tabs("refresh");
  console.log(panelId);
});
$("#delTabs").on("click", function () { //https://stackoverflow.com/questions/26730986/delete-checked-checkboxes-in-jquery deletes all selected tabs
  $("input:checkbox").each(function () {
    if ($(this).is(":checked")) {
      var tabId = $(this).parent().remove().attr("aria-controls");
      $("#" + tabId).remove();
      tabs.tabs("refresh");
    }
  });
});

function makeTable() { //makes the table
  var minCol = Number(document.getElementById("minCol").value);
  var maxCol = Number(document.getElementById("maxCol").value);
  var minRow = Number(document.getElementById("minRow").value);
  var maxRow = Number(document.getElementById("maxRow").value);
  console.log(minCol);
  console.log(maxCol);
  console.log(minRow);
  console.log(maxRow);
  const errorElement = document.createElement("p");
  const errorMes = document.getElementById("errMes");
  const table = document.createElement("table");
  const tabledata = document.getElementById("table");

  tabledata.innerHTML = "";
  for (let i = minRow - 1; i <= maxRow; i++) {
    const row = document.createElement("tr");
    for (let j = minCol - 1; j <= maxCol; j++) {
      if (i === minRow - 1 && j === minCol - 1) {
        const colH = document.createElement("th");
        colH.innerText = "";
        row.appendChild(colH);
      } else if (i === minRow - 1) {
        const colH = document.createElement("th");
        colH.innerText = j;
        row.appendChild(colH);
      } else if (j == minCol - 1) {
        const colH = document.createElement("th");
        colH.innerText = i;
        row.appendChild(colH);
      } else {
        const col = document.createElement("td");
        col.innerText = i * j;
        row.appendChild(col);
      }
    }
    table.appendChild(row);
  }
  tabledata.appendChild(table);
  console.log(tabledata);
}