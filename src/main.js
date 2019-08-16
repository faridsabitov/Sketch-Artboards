import sketch from 'sketch';
import { DrawArtboards, DrawArtboardsRows, getFullArtboardList, zoomToView, ShowConfirmation } from "./organize.js";

let artboardList = [];

export function ArrangeArtboardsInColumns(context) {
  artboardList = getFullArtboardList(context);
  DrawArtboards(artboardList,0,0);
  zoomToView(context);
  sketch.UI.message("Hey ho! Artboards arranged! 🤘");
}

export function ArrangeArtboardsInRows (context) {
  artboardList = getFullArtboardList(context);
  DrawArtboardsRows(artboardList,0,0);
  zoomToView(context);
  sketch.UI.message("Hey ho! Artboards arranged! 🤘");
}