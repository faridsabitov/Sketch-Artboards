import sketch from "sketch";

let UI = require('sketch/ui') ;
let Settings = require("sketch/settings");
const pluginKey = "artboardsManager";
let document = sketch.fromNative(context.document);
let docData = context.document.documentData();

export function settings(context) {
  let alert = COSAlertWindow.new();
  const viewWidth = 300;
  const viewHeight = 100;

  // Alert window settings
  alert = alertSetup(alert, viewWidth, viewHeight);
  let view = NSView.alloc().initWithFrame(
    NSMakeRect(0, 0, viewWidth, viewHeight)
  );
  alert.addAccessoryView(view);

  // Checkbox: Auto-Zoom
  let checkAutoDraw = alertCheckbox(
    "Zoom out after managing artboards",
    "autoZoom",
    -1,
    viewHeight - 30,
    300,
    40
  );
  view.addSubview(checkAutoDraw);


  // Label: Plugin Info
  let pluginInfoLabel = alertLabel(
    "Made by @faridsabitov based on Oscar Oto's (@oodesign) plugin with the support of EPAM.com ❤️",
    true,
    -1,
    viewHeight - 100,
    280,
    60
  );
  view.addSubview(pluginInfoLabel);


  // Show modal and get the results
  let modalResponse = alert.runModal();

  if (modalResponse == NSAlertFirstButtonReturn) {
    // When user clicks on "Update Settings"
    // Need to save all this results into the Plugin Settings
    Settings.setSettingForKey(
      "autoZoom",
      alert
        .views()[0]
        .subviews()[0]
        .state()
    );
    UI.message("Settings are updated 🚀");
  }
}

// Functions



function alertLabel(message, state, x, y, width, height) {
  let infoLabel = NSTextField.alloc().initWithFrame(
    NSMakeRect(x, y, width, height)
  );

  infoLabel.setStringValue(message);
  infoLabel.setSelectable(false);
  infoLabel.setDrawsBackground(false);
  infoLabel.setBezeled(false);

  if (state == false) {
    infoLabel.textColor = NSColor.disabledControlTextColor();
  }

  return infoLabel;
}

function alertCheckbox(message, state, x, y, width, height) {
  let checkbox = NSButton.alloc().initWithFrame(
    NSMakeRect(x, y, width, height)
  );

  checkbox.setButtonType(NSSwitchButton);
  checkbox.setBezelStyle(0);
  checkbox.setTitle(message);

  let currentState = Settings.settingForKey(state);
  checkbox.setState(currentState);

  return checkbox;
}

function alertSetup(alert, viewWidth, viewHeight) {
    // Title
    alert.setMessageText("Artboard Manager Settings");

    // Creating dialog buttons
    alert.addButtonWithTitle("Update Settings");
    alert.addButtonWithTitle("Cancel");

    return alert;
}