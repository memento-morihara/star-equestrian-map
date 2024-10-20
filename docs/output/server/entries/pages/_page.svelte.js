import { c as create_ssr_component, i as compute_rest_props, j as compute_slots, e as escape, g as spread, k as escape_attribute_value, h as escape_object, f as add_attribute, l as add_styles, n as each, s as setContext, o as getContext, d as createEventDispatcher, v as validate_component, m as missing_component, b as subscribe, p as is_promise, q as noop, r as onDestroy, t as get_store_value } from "../../chunks/ssr.js";
import { a as settings, f as filterStore, d as collectibleStores, e as selectedMarker, h as allMarkers, b as mapStore, w as windowParams, j as categories, k as flatNames, g as getModalStore, l as inlineSvg, n as slugifyName, o as points, q as itemsCollected } from "../../chunks/stores.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { p as page } from "../../chunks/stores2.js";
const cBase$5 = "textarea relative flex justify-center items-center";
const cInput = "w-full absolute top-0 left-0 right-0 bottom-0 z-[1] opacity-0 disabled:!opacity-0 cursor-pointer";
const cInterface$1 = "flex justify-center items-center text-center";
const FileDropzone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let classesInput;
  let classesInterface;
  let $$restProps = compute_rest_props($$props, [
    "files",
    "fileInput",
    "name",
    "border",
    "padding",
    "rounded",
    "regionInterface",
    "regionInterfaceText",
    "slotLead",
    "slotMessage",
    "slotMeta"
  ]);
  let $$slots = compute_slots(slots);
  let { files = void 0 } = $$props;
  let { fileInput = void 0 } = $$props;
  let { name } = $$props;
  let { border = "border-2 border-dashed" } = $$props;
  let { padding = "p-4 py-8" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { regionInterface = "" } = $$props;
  let { regionInterfaceText = "" } = $$props;
  let { slotLead = "mb-4" } = $$props;
  let { slotMessage = "" } = $$props;
  let { slotMeta = "opacity-75" } = $$props;
  function prunedRestProps() {
    delete $$restProps.class;
    return $$restProps;
  }
  if ($$props.files === void 0 && $$bindings.files && files !== void 0)
    $$bindings.files(files);
  if ($$props.fileInput === void 0 && $$bindings.fileInput && fileInput !== void 0)
    $$bindings.fileInput(fileInput);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.regionInterface === void 0 && $$bindings.regionInterface && regionInterface !== void 0)
    $$bindings.regionInterface(regionInterface);
  if ($$props.regionInterfaceText === void 0 && $$bindings.regionInterfaceText && regionInterfaceText !== void 0)
    $$bindings.regionInterfaceText(regionInterfaceText);
  if ($$props.slotLead === void 0 && $$bindings.slotLead && slotLead !== void 0)
    $$bindings.slotLead(slotLead);
  if ($$props.slotMessage === void 0 && $$bindings.slotMessage && slotMessage !== void 0)
    $$bindings.slotMessage(slotMessage);
  if ($$props.slotMeta === void 0 && $$bindings.slotMeta && slotMeta !== void 0)
    $$bindings.slotMeta(slotMeta);
  classesBase = `${cBase$5} ${border} ${padding} ${rounded} ${$$props.class ?? ""}`;
  classesInput = `${cInput}`;
  classesInterface = `${cInterface$1}`;
  return `<div class="${[
    "dropzone " + escape(classesBase, true),
    $$restProps.disabled ? "opacity-50" : ""
  ].join(" ").trim()}" data-testid="file-dropzone">  <input${spread(
    [
      { type: "file" },
      { name: escape_attribute_value(name) },
      {
        class: "dropzone-input " + escape(classesInput, true)
      },
      escape_object(prunedRestProps())
    ],
    {}
  )}>  <div class="${"dropzone-interface " + escape(classesInterface, true) + " " + escape(regionInterface, true)}"><div class="${"dropzone-interface-text " + escape(regionInterfaceText, true)}"> ${$$slots.lead ? `<div class="${"dropzone-lead " + escape(slotLead, true)}">${slots.lead ? slots.lead({}) : ``}</div>` : ``}  <div class="${"dropzone-message " + escape(slotMessage, true)}">${slots.message ? slots.message({}) : `<strong data-svelte-h="svelte-13uz6lq">Upload a file</strong> or drag and drop`}</div>  ${$$slots.meta ? `<small class="${"dropzone-meta " + escape(slotMeta, true)}">${slots.meta ? slots.meta({}) : ``}</small>` : ``}</div></div></div>`;
});
const css$2 = {
  code: ".animIndeterminate.svelte-meqa4r{transform-origin:0% 50%;animation:svelte-meqa4r-animIndeterminate 2s infinite linear}@keyframes svelte-meqa4r-animIndeterminate{0%{transform:translateX(0) scaleX(0)}40%{transform:translateX(0) scaleX(0.4)}100%{transform:translateX(100%) scaleX(0.5)}}",
  map: null
};
const cTrack = "w-full overflow-hidden";
const cMeter = "h-full";
const ProgressBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fillPercent;
  let indeterminate;
  let classesIndeterminate;
  let classesTrack;
  let classesMeter;
  let { value = void 0 } = $$props;
  let { min = 0 } = $$props;
  let { max = 100 } = $$props;
  let { height = "h-2" } = $$props;
  let { rounded = "rounded-token" } = $$props;
  let { transition = "transition-[width]" } = $$props;
  let { meter = "bg-surface-900-50-token" } = $$props;
  let { track = "bg-surface-200-700-token" } = $$props;
  let { labelledby = "" } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.meter === void 0 && $$bindings.meter && meter !== void 0)
    $$bindings.meter(meter);
  if ($$props.track === void 0 && $$bindings.track && track !== void 0)
    $$bindings.track(track);
  if ($$props.labelledby === void 0 && $$bindings.labelledby && labelledby !== void 0)
    $$bindings.labelledby(labelledby);
  $$result.css.add(css$2);
  fillPercent = value ? 100 * (value - min) / (max - min) : 0;
  indeterminate = value === void 0 || value < 0;
  classesIndeterminate = indeterminate ? "animIndeterminate" : "";
  classesTrack = `${cTrack} ${track} ${height} ${rounded} ${$$props.class ?? ""}`;
  classesMeter = `${cMeter} ${meter} ${rounded} ${classesIndeterminate} ${transition}`;
  return ` <div class="${"progress-bar " + escape(classesTrack, true) + " svelte-meqa4r"}" data-testid="progress-bar" role="progressbar"${add_attribute("aria-labelledby", labelledby, 0)}${add_attribute("aria-valuenow", value, 0)}${add_attribute("aria-valuemin", min, 0)}${add_attribute("aria-valuemax", max - min, 0)}> <div class="${"progress-bar-meter " + escape(classesMeter, true) + " " + escape(classesMeter, true) + " svelte-meqa4r"}"${add_styles({
    "width": `${indeterminate ? 100 : fillPercent}%`
  })}></div> </div>`;
});
const cBase$4 = "progress-radial relative overflow-hidden";
const cBaseTrack = "fill-transparent";
const cBaseMeter = "fill-transparent -rotate-90 origin-[50%_50%]";
const baseSize = 512;
const ProgressRadial = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let $$slots = compute_slots(slots);
  let { value = void 0 } = $$props;
  let { stroke = 40 } = $$props;
  let { font = 56 } = $$props;
  let { strokeLinecap = "butt" } = $$props;
  let { transition = "transition-[stroke-dashoffset]" } = $$props;
  let { width = "w-36" } = $$props;
  let { meter = "stroke-surface-900 dark:stroke-surface-50" } = $$props;
  let { track = "stroke-surface-500/30" } = $$props;
  let { fill = "fill-token" } = $$props;
  let { labelledby = "" } = $$props;
  const radius = baseSize / 2 - stroke / 2;
  let circumference = radius;
  let dashoffset;
  function setProgress(percent) {
    circumference = radius * 2 * Math.PI;
    dashoffset = circumference - percent / 100 * circumference;
  }
  setProgress(0);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.stroke === void 0 && $$bindings.stroke && stroke !== void 0)
    $$bindings.stroke(stroke);
  if ($$props.font === void 0 && $$bindings.font && font !== void 0)
    $$bindings.font(font);
  if ($$props.strokeLinecap === void 0 && $$bindings.strokeLinecap && strokeLinecap !== void 0)
    $$bindings.strokeLinecap(strokeLinecap);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.meter === void 0 && $$bindings.meter && meter !== void 0)
    $$bindings.meter(meter);
  if ($$props.track === void 0 && $$bindings.track && track !== void 0)
    $$bindings.track(track);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0)
    $$bindings.fill(fill);
  if ($$props.labelledby === void 0 && $$bindings.labelledby && labelledby !== void 0)
    $$bindings.labelledby(labelledby);
  classesBase = `${cBase$4} ${width} ${$$props.class ?? ""}`;
  return `  <figure class="${"progress-radial " + escape(classesBase, true)}" data-testid="progress-radial" role="meter"${add_attribute("aria-labelledby", labelledby, 0)}${add_attribute("aria-valuenow", value || 0, 0)}${add_attribute("aria-valuetext", value ? `${value}%` : "Indeterminate Spinner", 0)}${add_attribute("aria-valuemin", 0, 0)}${add_attribute("aria-valuemax", 100, 0)}> <svg viewBox="${"0 0 " + escape(baseSize, true) + " " + escape(baseSize, true)}" class="${["rounded-full", value === void 0 ? "animate-spin" : ""].join(" ").trim()}"><circle class="${"progress-radial-track " + escape(cBaseTrack, true) + " " + escape(track, true)}"${add_attribute("stroke-width", stroke, 0)}${add_attribute("r", radius, 0)} cx="50%" cy="50%"></circle><circle class="${"progress-radial-meter " + escape(cBaseMeter, true) + " " + escape(meter, true) + " " + escape(transition, true)}"${add_attribute("stroke-width", stroke, 0)}${add_attribute("r", radius, 0)} cx="50%" cy="50%"${add_attribute("stroke-linecap", strokeLinecap, 0)}${add_styles({
    "stroke-dasharray": `${circumference}
			${circumference}`,
    "stroke-dashoffset": dashoffset
  })}></circle>${value != void 0 && value >= 0 && $$slots.default ? `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-weight="bold"${add_attribute("font-size", font, 0)} class="${"progress-radial-text " + escape(fill, true)}">${slots.default ? slots.default({}) : ``}</text>` : ``}</svg></figure>`;
});
const cBase$3 = "space-y-2";
const cBaseLabel = "";
const cBaseContent = "flex justify-center py-2";
const cBaseInput = "w-full h-2";
const RangeSlider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let classesInput;
  let $$restProps = compute_rest_props($$props, ["name", "id", "value", "min", "max", "step", "ticked", "accent", "label"]);
  let $$slots = compute_slots(slots);
  let { name } = $$props;
  let { id = String(Math.random()) } = $$props;
  let { value = 0 } = $$props;
  let { min = 0 } = $$props;
  let { max = 100 } = $$props;
  let { step = 1 } = $$props;
  let { ticked = false } = $$props;
  let { accent = "accent-surface-900 dark:accent-surface-50" } = $$props;
  let { label = "" } = $$props;
  let tickmarks;
  function setTicks() {
    if (ticked == false)
      return;
    tickmarks = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  }
  if (ticked)
    setTicks();
  function prunedRestProps() {
    delete $$restProps.class;
    return $$restProps;
  }
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.step === void 0 && $$bindings.step && step !== void 0)
    $$bindings.step(step);
  if ($$props.ticked === void 0 && $$bindings.ticked && ticked !== void 0)
    $$bindings.ticked(ticked);
  if ($$props.accent === void 0 && $$bindings.accent && accent !== void 0)
    $$bindings.accent(accent);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  classesBase = `${cBase$3} ${$$props.class ?? ""}`;
  classesInput = `${cBaseInput} ${accent}`;
  return `<div class="${"range-slider " + escape(classesBase, true)}" data-testid="range-slider"> ${$$slots.default ? `<label class="${"range-slider-label " + escape(cBaseLabel, true)}"${add_attribute("for", id, 0)}>${slots.default ? slots.default({}) : ``}</label>` : ``}  <div class="${"range-content " + escape(cBaseContent, true)}"> <input${spread(
    [
      { type: "range" },
      { id: escape_attribute_value(id) },
      { name: escape_attribute_value(name) },
      {
        class: "range-slider-input " + escape(classesInput, true)
      },
      { list: "tickmarks-" + escape(id, true) },
      {
        "aria-label": escape_attribute_value(label)
      },
      { min: escape_attribute_value(min) },
      { max: escape_attribute_value(max) },
      { step: escape_attribute_value(step) },
      escape_object(prunedRestProps())
    ],
    {}
  )}${add_attribute("value", value, 0)}>  ${ticked && tickmarks && tickmarks.length ? `<datalist id="${"tickmarks-" + escape(id, true)}" class="range-slider-ticks">${each(tickmarks, (tm) => {
    return `<option${add_attribute("value", tm, 0)}${add_attribute("label", tm, 0)}></option>`;
  })}</datalist>` : ``}</div>  ${$$slots.trail ? `<div class="range-slider-trail">${slots.trail ? slots.trail({}) : ``}</div>` : ``}</div>`;
});
const cBase$2 = "space-y-4";
const cList = "flex overflow-x-auto hide-scrollbar";
const cPanel = "";
const TabGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let classesList;
  let classesPanel;
  let $$slots = compute_slots(slots);
  let { justify = "justify-start" } = $$props;
  let { border = "border-b border-surface-400-500-token" } = $$props;
  let { active = "border-b-2 border-surface-900-50-token" } = $$props;
  let { hover = "hover:variant-soft" } = $$props;
  let { flex = "flex-none" } = $$props;
  let { padding = "px-4 py-2" } = $$props;
  let { rounded = "rounded-tl-container-token rounded-tr-container-token" } = $$props;
  let { spacing = "space-y-1" } = $$props;
  let { regionList = "" } = $$props;
  let { regionPanel = "" } = $$props;
  let { labelledby = "" } = $$props;
  let { panel = "" } = $$props;
  setContext("active", active);
  setContext("hover", hover);
  setContext("flex", flex);
  setContext("padding", padding);
  setContext("rounded", rounded);
  setContext("spacing", spacing);
  if ($$props.justify === void 0 && $$bindings.justify && justify !== void 0)
    $$bindings.justify(justify);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.flex === void 0 && $$bindings.flex && flex !== void 0)
    $$bindings.flex(flex);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.regionList === void 0 && $$bindings.regionList && regionList !== void 0)
    $$bindings.regionList(regionList);
  if ($$props.regionPanel === void 0 && $$bindings.regionPanel && regionPanel !== void 0)
    $$bindings.regionPanel(regionPanel);
  if ($$props.labelledby === void 0 && $$bindings.labelledby && labelledby !== void 0)
    $$bindings.labelledby(labelledby);
  if ($$props.panel === void 0 && $$bindings.panel && panel !== void 0)
    $$bindings.panel(panel);
  classesBase = `${cBase$2} ${$$props.class ?? ""}`;
  classesList = `${cList} ${justify} ${border} ${regionList}`;
  classesPanel = `${cPanel} ${regionPanel}`;
  return `  <div class="${"tab-group " + escape(classesBase, true)}" data-testid="tab-group"> <div class="${"tab-list " + escape(classesList, true)}" role="tablist"${add_attribute("aria-labelledby", labelledby, 0)}>${slots.default ? slots.default({}) : ``}</div>  ${$$slots.panel ? `<div class="${"tab-panel " + escape(classesPanel, true)}" role="tabpanel"${add_attribute("aria-labelledby", panel, 0)} tabindex="0">${slots.panel ? slots.panel({}) : ``}</div>` : ``}</div>`;
});
const cBase$1 = "text-center cursor-pointer transition-colors duration-100";
const cInterface = "";
const Tab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected;
  let classesActive;
  let classesBase;
  let classesInterface;
  let classesTab;
  let $$restProps = compute_rest_props($$props, [
    "group",
    "name",
    "value",
    "title",
    "controls",
    "regionTab",
    "active",
    "hover",
    "flex",
    "padding",
    "rounded",
    "spacing"
  ]);
  let $$slots = compute_slots(slots);
  let { group } = $$props;
  let { name } = $$props;
  let { value } = $$props;
  let { title = "" } = $$props;
  let { controls = "" } = $$props;
  let { regionTab = "" } = $$props;
  let { active = getContext("active") } = $$props;
  let { hover = getContext("hover") } = $$props;
  let { flex = getContext("flex") } = $$props;
  let { padding = getContext("padding") } = $$props;
  let { rounded = getContext("rounded") } = $$props;
  let { spacing = getContext("spacing") } = $$props;
  let elemInput;
  function prunedRestProps() {
    delete $$restProps.class;
    return $$restProps;
  }
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.controls === void 0 && $$bindings.controls && controls !== void 0)
    $$bindings.controls(controls);
  if ($$props.regionTab === void 0 && $$bindings.regionTab && regionTab !== void 0)
    $$bindings.regionTab(regionTab);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.flex === void 0 && $$bindings.flex && flex !== void 0)
    $$bindings.flex(flex);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  selected = value === group;
  classesActive = selected ? active : hover;
  classesBase = `${cBase$1} ${flex} ${padding} ${rounded} ${classesActive} ${$$props.class ?? ""}`;
  classesInterface = `${cInterface} ${spacing}`;
  classesTab = `${regionTab}`;
  return `<label${add_attribute("class", classesBase, 0)}${add_attribute("title", title, 0)}> <div class="${"tab " + escape(classesTab, true)}" data-testid="tab" role="tab"${add_attribute("aria-controls", controls, 0)}${add_attribute("aria-selected", selected, 0)}${add_attribute("tabindex", selected ? 0 : -1, 0)}> <div class="h-0 w-0 overflow-hidden"><input${spread(
    [
      { type: "radio" },
      { name: escape_attribute_value(name) },
      { value: escape_attribute_value(value) },
      escape_object(prunedRestProps()),
      { tabindex: "-1" }
    ],
    {}
  )}${add_attribute("this", elemInput, 0)}${value === group ? add_attribute("checked", true, 1) : ""}></div>  <div class="${"tab-interface " + escape(classesInterface, true)}">${$$slots.lead ? `<div class="tab-lead">${slots.lead ? slots.lead({}) : ``}</div>` : ``} <div class="tab-label">${slots.default ? slots.default({}) : ``}</div></div></div></label>`;
});
const cBase = "";
const cSummary = "list-none [&::-webkit-details-marker]:hidden flex items-center cursor-pointer";
const cSymbol = "fill-current w-3 text-center transition-transform duration-[200ms]";
const cChildren = "";
const cDisabled = "opacity-50 !cursor-not-allowed";
const TreeViewItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesCaretState;
  let classesDisabled;
  let classesBase;
  let classesSummary;
  let classesSymbol;
  let classesCaret;
  let classesHyphen;
  let classesChildren;
  let $$slots = compute_slots(slots);
  let { group = void 0 } = $$props;
  let { name = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { checked = false } = $$props;
  let { children = [] } = $$props;
  let { spacing = "space-x-4" } = $$props;
  let { open = getContext("open") } = $$props;
  let { selection = getContext("selection") } = $$props;
  let { multiple = getContext("multiple") } = $$props;
  let { disabled = getContext("disabled") } = $$props;
  let { indeterminate = false } = $$props;
  let { padding = getContext("padding") } = $$props;
  let { indent = getContext("indent") } = $$props;
  let { hover = getContext("hover") } = $$props;
  let { rounded = getContext("rounded") } = $$props;
  let { caretOpen = getContext("caretOpen") } = $$props;
  let { caretClosed = getContext("caretClosed") } = $$props;
  let { hyphenOpacity = getContext("hyphenOpacity") } = $$props;
  let { regionSummary = getContext("regionSummary") } = $$props;
  let { regionSymbol = getContext("regionSymbol") } = $$props;
  let { regionChildren = getContext("regionChildren") } = $$props;
  let { hideLead = false } = $$props;
  let { hideChildren = false } = $$props;
  let treeItem;
  let childrenDiv;
  function updateCheckbox(group2, indeterminate2) {
    if (!Array.isArray(group2))
      return;
    checked = group2.indexOf(value) >= 0;
    dispatch("groupChange", { checked, indeterminate: indeterminate2 });
    dispatch("childChange");
  }
  function updateGroup(checked2, indeterminate2) {
    if (!Array.isArray(group))
      return;
    const index = group.indexOf(value);
    if (checked2) {
      if (index < 0) {
        group.push(value);
        group = group;
      }
    } else {
      if (index >= 0) {
        group.splice(index, 1);
        group = group;
      }
    }
    if (!indeterminate2) {
      onParentChange();
    }
  }
  function updateRadio(group2) {
    checked = group2 === value;
    dispatch("groupChange", { checked, indeterminate: false });
    if (group2)
      dispatch("childChange");
  }
  function updateRadioGroup(checked2) {
    if (checked2 && group !== value)
      group = value;
    else if (!checked2 && group === value)
      group = "";
  }
  function onChildValueChange() {
    if (multiple) {
      if (!Array.isArray(group))
        return;
      const childrenValues = children.map((c) => c.value);
      const childrenGroup = children[0].group;
      const index = group.indexOf(value);
      if (children.some((c) => c.indeterminate)) {
        indeterminate = true;
        if (index >= 0) {
          group.splice(index, 1);
          group = group;
        }
      } else if (childrenValues.every((c) => Array.isArray(childrenGroup) && childrenGroup.includes(c))) {
        indeterminate = false;
        if (index < 0) {
          group.push(value);
          group = group;
        }
      } else if (childrenValues.some((c) => Array.isArray(childrenGroup) && childrenGroup.includes(c))) {
        indeterminate = true;
        if (index >= 0) {
          group.splice(index, 1);
          group = group;
        }
      } else {
        indeterminate = false;
        if (index >= 0) {
          group.splice(index, 1);
          group = group;
        }
      }
    } else {
      if (group !== value && children.some((c) => c.checked)) {
        group = value;
      } else if (group === value && !children.some((c) => c.checked)) {
        group = "";
      }
    }
    dispatch("childChange");
  }
  function onParentChange() {
    if (!multiple || !children || children.length === 0)
      return;
    if (!Array.isArray(group))
      return;
    const index = group.indexOf(value);
    const checkChild = (child) => {
      if (!child || !Array.isArray(child.group))
        return;
      child.indeterminate = false;
      if (child.group.indexOf(child.value) < 0) {
        child.group.push(child.value);
        child.group = child.group;
      }
    };
    const uncheckChild = (child) => {
      if (!child || !Array.isArray(child.group))
        return;
      child.indeterminate = false;
      const childIndex = child.group.indexOf(child.value);
      if (childIndex >= 0) {
        child.group.splice(childIndex, 1);
        child.group = child.group;
      }
    };
    children.forEach((child) => {
      if (!child)
        return;
      index >= 0 ? checkChild(child) : uncheckChild(child);
      child.onParentChange();
    });
  }
  const dispatch = createEventDispatcher();
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.children === void 0 && $$bindings.children && children !== void 0)
    $$bindings.children(children);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.selection === void 0 && $$bindings.selection && selection !== void 0)
    $$bindings.selection(selection);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.indeterminate === void 0 && $$bindings.indeterminate && indeterminate !== void 0)
    $$bindings.indeterminate(indeterminate);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.indent === void 0 && $$bindings.indent && indent !== void 0)
    $$bindings.indent(indent);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.caretOpen === void 0 && $$bindings.caretOpen && caretOpen !== void 0)
    $$bindings.caretOpen(caretOpen);
  if ($$props.caretClosed === void 0 && $$bindings.caretClosed && caretClosed !== void 0)
    $$bindings.caretClosed(caretClosed);
  if ($$props.hyphenOpacity === void 0 && $$bindings.hyphenOpacity && hyphenOpacity !== void 0)
    $$bindings.hyphenOpacity(hyphenOpacity);
  if ($$props.regionSummary === void 0 && $$bindings.regionSummary && regionSummary !== void 0)
    $$bindings.regionSummary(regionSummary);
  if ($$props.regionSymbol === void 0 && $$bindings.regionSymbol && regionSymbol !== void 0)
    $$bindings.regionSymbol(regionSymbol);
  if ($$props.regionChildren === void 0 && $$bindings.regionChildren && regionChildren !== void 0)
    $$bindings.regionChildren(regionChildren);
  if ($$props.hideLead === void 0 && $$bindings.hideLead && hideLead !== void 0)
    $$bindings.hideLead(hideLead);
  if ($$props.hideChildren === void 0 && $$bindings.hideChildren && hideChildren !== void 0)
    $$bindings.hideChildren(hideChildren);
  if ($$props.onParentChange === void 0 && $$bindings.onParentChange && onParentChange !== void 0)
    $$bindings.onParentChange(onParentChange);
  {
    if (multiple)
      updateCheckbox(group, indeterminate);
  }
  {
    if (multiple)
      updateGroup(checked, indeterminate);
  }
  {
    if (!multiple)
      updateRadio(group);
  }
  {
    if (!multiple)
      updateRadioGroup(checked);
  }
  {
    if (!multiple && group !== void 0) {
      if (group !== value) {
        children.forEach((child) => {
          if (child)
            child.group = "";
        });
      }
    }
  }
  {
    dispatch("toggle", { open });
  }
  {
    children.forEach((child) => {
      if (child)
        child.$on("childChange", onChildValueChange);
    });
  }
  classesCaretState = open && $$slots.children && !hideChildren ? caretOpen : caretClosed;
  classesDisabled = disabled ? cDisabled : "";
  classesBase = `${cBase} ${$$props.class ?? ""}`;
  classesSummary = `${cSummary} ${classesDisabled} ${spacing} ${rounded} ${padding} ${hover} ${regionSummary}`;
  classesCaret = `${classesCaretState}`;
  classesSymbol = `${cSymbol} ${classesCaret} ${regionSymbol}`;
  classesHyphen = `${hyphenOpacity}`;
  classesChildren = `${cChildren} ${indent} ${regionChildren}`;
  return `   <details class="${"tree-item " + escape(classesBase, true)}" data-testid="tree-item"${add_attribute("aria-disabled", disabled, 0)}${add_attribute("this", treeItem, 0)}${add_attribute("open", open, 1)}><summary class="${"tree-item-summary " + escape(classesSummary, true)}" role="treeitem"${add_attribute("aria-selected", selection ? checked : void 0, 0)}${add_attribute("aria-expanded", $$slots.children ? open : void 0, 0)}> <div class="${"tree-summary-symbol " + escape(classesSymbol, true)}">${$$slots.children && !hideChildren ? ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="${"w-3 " + escape(classesHyphen, true)}"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path></svg>`}</div>  ${selection && name && group !== void 0 ? `${multiple ? `<input class="checkbox tree-item-checkbox" type="checkbox"${add_attribute("name", name, 0)}${add_attribute("value", value, 0)}${add_attribute("checked", checked, 1)}${add_attribute("indeterminate", indeterminate, 0)}>` : `<input class="radio tree-item-radio" type="radio"${add_attribute("name", name, 0)}${add_attribute("value", value, 0)}${value === group ? add_attribute("checked", true, 1) : ""}>`}` : ``}  ${$$slots.lead && !hideLead ? `<div class="tree-item-lead">${slots.lead ? slots.lead({}) : ``}</div>` : ``}  <div class="tree-item-content">${slots.default ? slots.default({}) : ``}</div></summary> <div class="${"tree-item-children " + escape(classesChildren, true)}" role="group"${add_attribute("this", childrenDiv, 0)}>${slots.children ? slots.children({}) : ``}</div></details>`;
});
const RecursiveTreeViewItem_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { nodes = [] } = $$props;
  let { expandedNodes = [] } = $$props;
  let { disabledNodes = [] } = $$props;
  let { checkedNodes = [] } = $$props;
  let { indeterminateNodes = [] } = $$props;
  let selection = getContext("selection");
  let multiple = getContext("multiple");
  getContext("relational");
  let group = multiple ? [] : "";
  let name = "";
  createEventDispatcher();
  if (selection) {
    if (multiple) {
      nodes.forEach((node) => {
        if (!Array.isArray(group))
          return;
        if (checkedNodes.includes(node.id) && !group.includes(node.id)) {
          group.push(node.id);
        }
      });
      group = group;
    } else {
      nodes.forEach((node) => {
        if (checkedNodes.includes(node.id) && group !== node.id) {
          group = node.id;
        }
      });
    }
  }
  let { treeItems = [] } = $$props;
  let children = [];
  if ($$props.nodes === void 0 && $$bindings.nodes && nodes !== void 0)
    $$bindings.nodes(nodes);
  if ($$props.expandedNodes === void 0 && $$bindings.expandedNodes && expandedNodes !== void 0)
    $$bindings.expandedNodes(expandedNodes);
  if ($$props.disabledNodes === void 0 && $$bindings.disabledNodes && disabledNodes !== void 0)
    $$bindings.disabledNodes(disabledNodes);
  if ($$props.checkedNodes === void 0 && $$bindings.checkedNodes && checkedNodes !== void 0)
    $$bindings.checkedNodes(checkedNodes);
  if ($$props.indeterminateNodes === void 0 && $$bindings.indeterminateNodes && indeterminateNodes !== void 0)
    $$bindings.indeterminateNodes(indeterminateNodes);
  if ($$props.treeItems === void 0 && $$bindings.treeItems && treeItems !== void 0)
    $$bindings.treeItems(treeItems);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${nodes && nodes.length > 0 ? `${each(nodes, (node, i) => {
      return `${validate_component(TreeViewItem, "TreeViewItem").$$render(
        $$result,
        {
          hideLead: !node.lead,
          hideChildren: !node.children || node.children.length === 0,
          open: expandedNodes.includes(node.id),
          disabled: disabledNodes.includes(node.id),
          checked: checkedNodes.includes(node.id),
          indeterminate: indeterminateNodes.includes(node.id),
          this: treeItems[i],
          children: children[i],
          group,
          name,
          value: node.id
        },
        {
          this: ($$value) => {
            treeItems[i] = $$value;
            $$settled = false;
          },
          children: ($$value) => {
            children[i] = $$value;
            $$settled = false;
          },
          group: ($$value) => {
            group = $$value;
            $$settled = false;
          },
          name: ($$value) => {
            name = $$value;
            $$settled = false;
          },
          value: ($$value) => {
            node.id = $$value;
            $$settled = false;
          }
        },
        {
          children: () => {
            return `${validate_component(RecursiveTreeViewItem_1, "RecursiveTreeViewItem").$$render(
              $$result,
              {
                nodes: node.children,
                expandedNodes,
                disabledNodes,
                checkedNodes,
                indeterminateNodes,
                treeItems: children[i]
              },
              {
                expandedNodes: ($$value) => {
                  expandedNodes = $$value;
                  $$settled = false;
                },
                disabledNodes: ($$value) => {
                  disabledNodes = $$value;
                  $$settled = false;
                },
                checkedNodes: ($$value) => {
                  checkedNodes = $$value;
                  $$settled = false;
                },
                indeterminateNodes: ($$value) => {
                  indeterminateNodes = $$value;
                  $$settled = false;
                },
                treeItems: ($$value) => {
                  children[i] = $$value;
                  $$settled = false;
                }
              },
              {}
            )} `;
          },
          lead: () => {
            return `${typeof node.lead === "string" ? `<!-- HTML_TAG_START -->${node.lead}<!-- HTML_TAG_END -->` : `${validate_component(node.lead || missing_component, "svelte:component").$$render($$result, Object.assign({}, node.leadProps), {}, {})}`} `;
          },
          default: () => {
            return `${typeof node.content === "string" ? `<!-- HTML_TAG_START -->${node.content}<!-- HTML_TAG_END -->` : `${validate_component(node.content || missing_component, "svelte:component").$$render($$result, Object.assign({}, node.contentProps), {}, {})}`} `;
          }
        }
      )}`;
    })}` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
const RecursiveTreeView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let { selection = false } = $$props;
  let { multiple = false } = $$props;
  let { relational = false } = $$props;
  let { nodes = [] } = $$props;
  let { expandedNodes = [] } = $$props;
  let { disabledNodes = [] } = $$props;
  let { checkedNodes = [] } = $$props;
  let { indeterminateNodes = [] } = $$props;
  let { width = "w-full" } = $$props;
  let { spacing = "space-y-1" } = $$props;
  let { open = false } = $$props;
  let { disabled = false } = $$props;
  let { padding = "py-4 px-4" } = $$props;
  let { indent = "ml-4" } = $$props;
  let { hover = "hover:variant-soft" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { caretOpen = "rotate-180" } = $$props;
  let { caretClosed = "" } = $$props;
  let { hyphenOpacity = "opacity-10" } = $$props;
  let { regionSummary = "" } = $$props;
  let { regionSymbol = "" } = $$props;
  let { regionChildren = "" } = $$props;
  let { labelledby = "" } = $$props;
  setContext("open", open);
  setContext("selection", selection);
  setContext("multiple", multiple);
  setContext("relational", relational);
  setContext("disabled", disabled);
  setContext("padding", padding);
  setContext("indent", indent);
  setContext("hover", hover);
  setContext("rounded", rounded);
  setContext("caretOpen", caretOpen);
  setContext("caretClosed", caretClosed);
  setContext("hyphenOpacity", hyphenOpacity);
  setContext("regionSummary", regionSummary);
  setContext("regionSymbol", regionSymbol);
  setContext("regionChildren", regionChildren);
  createEventDispatcher();
  if ($$props.selection === void 0 && $$bindings.selection && selection !== void 0)
    $$bindings.selection(selection);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  if ($$props.relational === void 0 && $$bindings.relational && relational !== void 0)
    $$bindings.relational(relational);
  if ($$props.nodes === void 0 && $$bindings.nodes && nodes !== void 0)
    $$bindings.nodes(nodes);
  if ($$props.expandedNodes === void 0 && $$bindings.expandedNodes && expandedNodes !== void 0)
    $$bindings.expandedNodes(expandedNodes);
  if ($$props.disabledNodes === void 0 && $$bindings.disabledNodes && disabledNodes !== void 0)
    $$bindings.disabledNodes(disabledNodes);
  if ($$props.checkedNodes === void 0 && $$bindings.checkedNodes && checkedNodes !== void 0)
    $$bindings.checkedNodes(checkedNodes);
  if ($$props.indeterminateNodes === void 0 && $$bindings.indeterminateNodes && indeterminateNodes !== void 0)
    $$bindings.indeterminateNodes(indeterminateNodes);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.indent === void 0 && $$bindings.indent && indent !== void 0)
    $$bindings.indent(indent);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.caretOpen === void 0 && $$bindings.caretOpen && caretOpen !== void 0)
    $$bindings.caretOpen(caretOpen);
  if ($$props.caretClosed === void 0 && $$bindings.caretClosed && caretClosed !== void 0)
    $$bindings.caretClosed(caretClosed);
  if ($$props.hyphenOpacity === void 0 && $$bindings.hyphenOpacity && hyphenOpacity !== void 0)
    $$bindings.hyphenOpacity(hyphenOpacity);
  if ($$props.regionSummary === void 0 && $$bindings.regionSummary && regionSummary !== void 0)
    $$bindings.regionSummary(regionSummary);
  if ($$props.regionSymbol === void 0 && $$bindings.regionSymbol && regionSymbol !== void 0)
    $$bindings.regionSymbol(regionSymbol);
  if ($$props.regionChildren === void 0 && $$bindings.regionChildren && regionChildren !== void 0)
    $$bindings.regionChildren(regionChildren);
  if ($$props.labelledby === void 0 && $$bindings.labelledby && labelledby !== void 0)
    $$bindings.labelledby(labelledby);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    classesBase = `${width} ${spacing} ${$$props.class ?? ""}`;
    $$rendered = `<div class="${"tree " + escape(classesBase, true)}" data-testid="tree" role="tree"${add_attribute("aria-multiselectable", multiple, 0)}${add_attribute("aria-label", labelledby, 0)}${add_attribute("aria-disabled", disabled, 0)}>${nodes && nodes.length > 0 ? `${validate_component(RecursiveTreeViewItem_1, "RecursiveTreeViewItem").$$render(
      $$result,
      {
        nodes,
        expandedNodes,
        disabledNodes,
        checkedNodes,
        indeterminateNodes
      },
      {
        expandedNodes: ($$value) => {
          expandedNodes = $$value;
          $$settled = false;
        },
        disabledNodes: ($$value) => {
          disabledNodes = $$value;
          $$settled = false;
        },
        checkedNodes: ($$value) => {
          checkedNodes = $$value;
          $$settled = false;
        },
        indeterminateNodes: ($$value) => {
          indeterminateNodes = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}</div>`;
  } while (!$$settled);
  return $$rendered;
});
dayjs.extend(relativeTime);
const Marker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_settings;
  let $$unsubscribe_filterStore;
  let $$unsubscribe_collectibleStores;
  let $$unsubscribe_selectedMarker;
  let $$unsubscribe_allMarkers;
  $$unsubscribe_settings = subscribe(settings, (value) => value);
  $$unsubscribe_filterStore = subscribe(filterStore, (value) => value);
  $$unsubscribe_collectibleStores = subscribe(collectibleStores, (value) => value);
  $$unsubscribe_selectedMarker = subscribe(selectedMarker, (value) => value);
  $$unsubscribe_allMarkers = subscribe(allMarkers, (value) => value);
  let { location } = $$props;
  let { isBronco = false } = $$props;
  let marker;
  setContext("marker", () => marker);
  getContext("groups")();
  getContext("map")();
  if ($$props.location === void 0 && $$bindings.location && location !== void 0)
    $$bindings.location(location);
  if ($$props.isBronco === void 0 && $$bindings.isBronco && isBronco !== void 0)
    $$bindings.isBronco(isBronco);
  $$unsubscribe_settings();
  $$unsubscribe_filterStore();
  $$unsubscribe_collectibleStores();
  $$unsubscribe_selectedMarker();
  $$unsubscribe_allMarkers();
  return `${``}`;
});
const Map = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_selectedMarker;
  let $$unsubscribe_allMarkers;
  let $$unsubscribe_mapStore;
  let $page, $$unsubscribe_page;
  $$unsubscribe_selectedMarker = subscribe(selectedMarker, (value) => value);
  $$unsubscribe_allMarkers = subscribe(allMarkers, (value) => value);
  $$unsubscribe_mapStore = subscribe(mapStore, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let map;
  let featureGroups = {};
  JSON.parse($page.data.data);
  setContext("map", () => map);
  setContext("groups", () => featureGroups);
  $$unsubscribe_selectedMarker();
  $$unsubscribe_allMarkers();
  $$unsubscribe_mapStore();
  $$unsubscribe_page();
  return `<div id="map">${``}</div>`;
});
const Spiderfier = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_settings;
  let $$unsubscribe_allMarkers;
  $$unsubscribe_settings = subscribe(settings, (value) => value);
  $$unsubscribe_allMarkers = subscribe(allMarkers, (value) => value);
  getContext("map")();
  $$unsubscribe_settings();
  $$unsubscribe_allMarkers();
  return `${slots.default ? slots.default({}) : ``}`;
});
const css$1 = {
  code: '.leaflet-condensed-attribution a{text-decoration:none}.leaflet-condensed-attribution a:hover{text-decoration:underline}.leaflet-condensed-attribution.svelte-gfl4dl.svelte-gfl4dl{position:absolute;bottom:0;right:0;display:flex;border-radius:20px;border:6px solid rgb(0, 0, 0, 0.2);background:rgba(255, 255, 255, 0.8);margin:10px;padding:0;z-index:1000;font-size:0.75rem}.emblem.svelte-gfl4dl.svelte-gfl4dl{text-align:center;margin:0 auto;width:28px;height:28px;line-height:28px;font-size:1.2em;font-family:"Helvetica Neue", Arial, Helvetica, sans-serif}.attributes-body.svelte-gfl4dl.svelte-gfl4dl{display:none;padding:0 4px 0 12px;height:28px;line-height:28px;text-decoration:none}.leaflet-condensed-attribution.svelte-gfl4dl.svelte-gfl4dl:hover{width:auto}.leaflet-condensed-attribution.svelte-gfl4dl:hover .attributes-body.svelte-gfl4dl{display:inline-block}@media(max-width: 450px){.leaflet-condensed-attribution.svelte-gfl4dl.svelte-gfl4dl{border-radius:1000px 0 0 50%;bottom:-1.2rem;right:-1rem;border-width:3px}.emblem.svelte-gfl4dl.svelte-gfl4dl{width:1.7rem;padding-left:8px}.leaflet-condensed-attribution.svelte-gfl4dl.svelte-gfl4dl:hover{border-radius:24px 0 0 0}}',
  map: null
};
const CondensedAttribution = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $windowParams, $$unsubscribe_windowParams;
  $$unsubscribe_windowParams = subscribe(windowParams, (value) => $windowParams = value);
  let { emblem = "?" } = $$props;
  let { width } = $windowParams;
  if ($$props.emblem === void 0 && $$bindings.emblem && emblem !== void 0)
    $$bindings.emblem(emblem);
  $$result.css.add(css$1);
  width = width;
  $$unsubscribe_windowParams();
  return `<div class="leaflet-condensed-attribution text-black svelte-gfl4dl"><div class="attributes-body svelte-gfl4dl">${escape(width >= 300 ? "Images " : "")}©
    <a href="https://foxieventures.com" data-svelte-h="svelte-1in1uyu">Foxie Ventures</a>
    |
    ${width >= 300 ? `Rendered with
    ` : ``}<a href="https://maptiler.com" data-svelte-h="svelte-1r6qwfw">MapTiler Engine</a></div> <p class="emblem svelte-gfl4dl">${escape(emblem)}</p> </div>`;
});
const Check_square = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<g fill="currentColor"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093l3.473-4.425a.235.235 0 0 1 .02-.022z"/></g>`}<!-- HTML_TAG_END --></svg>`;
});
const Square = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const FilterTree = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let areAllNodesChecked;
  let $filterStore, $$unsubscribe_filterStore;
  let $settings, $$unsubscribe_settings;
  let $$unsubscribe_allMarkers;
  let $page, $$unsubscribe_page;
  $$unsubscribe_filterStore = subscribe(filterStore, (value) => $filterStore = value);
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  $$unsubscribe_allMarkers = subscribe(allMarkers, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { map } = $$props;
  let nodes;
  getContext("groups")();
  JSON.parse($page.data.data);
  categories.flatMap((c) => c.items);
  if ($$props.map === void 0 && $$bindings.map && map !== void 0)
    $$bindings.map(map);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $filterStore.filter((item) => !flatNames.includes(item));
    areAllNodesChecked = nodes;
    $$rendered = `<div class="chip-container flex flex-row-reverse dark:bg-surface-800 mb-3 w-full text-[0.8rem]"><button class="chip absolute right-2.5 variant-primary">${areAllNodesChecked ? `${validate_component(Check_square, "CheckIcon").$$render($$result, {}, {}, {})}` : `${validate_component(Square, "SquareIcon").$$render($$result, {}, {}, {})}`} <span class="leading-[1.2rem] my-auto align-text-bottom">${escape(areAllNodesChecked ? "Uncheck all" : "Check all")}</span></button></div> <div class="h-full w-full text-sm md:text-base"><label class="ml-11 mb-4"><input class="checkbox mr-2.5" type="checkbox"${add_attribute("checked", $settings.broncoEnabled, 1)}> <span class="align-middle" data-svelte-h="svelte-1rtp6in">Bronco items</span></label> ${validate_component(RecursiveTreeView, "RecursiveTreeView").$$render(
      $$result,
      {
        multiple: true,
        nodes,
        regionSummary: "hover:bg-transparent max-w-[90%]",
        relational: true,
        selection: true,
        checkedNodes: $filterStore
      },
      {
        checkedNodes: ($$value) => {
          $filterStore = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>`;
  } while (!$$settled);
  $$unsubscribe_filterStore();
  $$unsubscribe_settings();
  $$unsubscribe_allMarkers();
  $$unsubscribe_page();
  return $$rendered;
});
const DataFileHandler = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_allMarkers;
  $$unsubscribe_allMarkers = subscribe(allMarkers, (value) => value);
  let files;
  getModalStore();
  getContext("map")();
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<button class="btn variant-ghost-primary mb-4" data-svelte-h="svelte-rcfgrf">Export data</button> ${validate_component(FileDropzone, "FileDropzone").$$render(
      $$result,
      {
        accept: "application/json",
        class: "bg-primary-100",
        name: "import",
        files
      },
      {
        files: ($$value) => {
          files = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  $$unsubscribe_allMarkers();
  return $$rendered;
});
const Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let disableCheckbox;
  let $settings, $$unsubscribe_settings;
  let $allMarkers, $$unsubscribe_allMarkers;
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  $$unsubscribe_allMarkers = subscribe(allMarkers, (value) => $allMarkers = value);
  getContext("map")();
  let keepNonRespawning = true;
  function changeOpacity() {
    $allMarkers.forEach((marker) => {
      marker.options.toggle();
    });
  }
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    disableCheckbox = !$settings.spiderfyMarkers;
    $settings.markerOpacity && changeOpacity();
    $$rendered = `<div class="text-base align-baseline px-2.5 h-full flex flex-col justify-between"><div class="flex flex-col md:gap-12 gap-7"><div class="flex flex-col gap-1"><h2 class="h3 mb-3" data-svelte-h="svelte-1g971vg">Settings</h2> <div class="space-y-3 mx-2">${window.__TAURI__ ? `<label><input class="checkbox" id="keep-on-top" name="keep-on-top" type="checkbox"${add_attribute("checked", $settings.keepOnTop, 1)}><span class="ml-2" data-svelte-h="svelte-1y310yq">Keep window on top</span></label>` : ``} <label><input class="checkbox" id="load-images" name="load-images" type="checkbox"${add_attribute("checked", $settings.loadImages, 1)}><span class="ml-2" data-svelte-h="svelte-6vzljo">Automatically load images
                  in popups</span></label> <label><input class="checkbox" id="close-popups" name="close-popups" type="checkbox"${add_attribute("checked", $settings.closePopups, 1)}><span class="ml-2" data-svelte-h="svelte-124ili0">Close popups automatically on button click</span></label> <label><input class="checkbox" type="checkbox"${add_attribute("checked", $settings.spiderfyMarkers, 1)}> <span class="ml-1" data-svelte-h="svelte-145ns41">Spiderfy markers</span></label> <label><input class="${[
      "checkbox",
      (!$settings.spiderfyMarkers ? "!bg-surface-400" : "") + " " + (!$settings.spiderfyMarkers ? "border-on-surface-500" : "")
    ].join(" ").trim()}" ${disableCheckbox ? "disabled" : ""} type="checkbox"${add_attribute("checked", $settings.keepSpiderfied, 1)}> <span class="ml-1" data-svelte-h="svelte-ulzixt">Keep spiderfied on button click</span></label> <label><input class="checkbox" type="checkbox"${add_attribute("checked", $settings.hoverMarkers, 1)}> <span class="ml-1" data-svelte-h="svelte-4qpear">Hovered marker on top</span></label> <label><input class="checkbox" name="hide-collected" type="checkbox"${add_attribute("checked", $settings.hideCollectedMarkers, 1)}><span class="ml-2" data-svelte-h="svelte-1wcx91a">Hide collected items</span></label> <div class="flex flex-col space-y-2"><label class="mt-3" for="opacity" data-svelte-h="svelte-1xw6w1k"><span>Collected marker opacity</span></label> ${validate_component(RangeSlider, "RangeSlider").$$render(
      $$result,
      {
        accent: "accent-primary-500 dark:accent-primary-500",
        class: "w-2/3",
        disabled: $settings.hideCollectedMarkers,
        id: "opacity",
        max: "0.9",
        min: "0.1",
        name: "opacity",
        step: "0.1",
        value: $settings.markerOpacity
      },
      {
        value: ($$value) => {
          $settings.markerOpacity = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <button class="btn variant-ringed mt-5 self-start" data-svelte-h="svelte-lxm6zo">Reset to default</button></div> <div><h3 class="h4 mb-4" data-svelte-h="svelte-48ppld">Import/Export Data</h3> ${validate_component(DataFileHandler, "DataFileHandler").$$render($$result, {}, {}, {})}</div> <hr> <div class="flex flex-col gap-1"><h2 class="h4 mb-3" data-svelte-h="svelte-18mh0na">Reset collected items</h2> <div class="space-y-3 mx-2"><label><input class="checkbox" id="save-collected" name="save-collected" type="checkbox"${add_attribute("checked", keepNonRespawning, 1)}><span class="ml-2" data-svelte-h="svelte-1spuq8t">Preserve non-respawning items</span></label></div> <button class="btn variant-filled-error mt-5 w-1/4" data-svelte-h="svelte-11g2ts">Reset</button></div></div> <footer class="w-full relative justify-items-center pt-7 pb-[80px] bottom-0"><a class="hover:underline" href="https://github.com/memento-morihara/star-equestrian-map"><div class="flex items-center gap-2 mx-auto w-1/3">${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return ``;
      }
      return function(icon) {
        return ` <!-- HTML_TAG_START -->${`<div class="w-[32px] h-[32px] p-0 object-contain dark:fill-white">${icon}</div>`}<!-- HTML_TAG_END --> `;
      }(__value);
    }(inlineSvg("github-mark.svg"))} <span class="dark:text-blue-400" data-svelte-h="svelte-u5e5zv">GitHub</span></div></a></footer></div>`;
  } while (!$$settled);
  $$unsubscribe_settings();
  $$unsubscribe_allMarkers();
  return $$rendered;
});
const Progress = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let percentCollected;
  let $collectibleStores, $$unsubscribe_collectibleStores;
  let $page, $$unsubscribe_page;
  $$unsubscribe_collectibleStores = subscribe(collectibleStores, (value) => $collectibleStores = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let items = [];
  let collected = {};
  let unsubscribers = [];
  const { countsWithBronco } = JSON.parse($page.data.data);
  const windowSize = getContext("windowSize");
  $collectibleStores.forEach((item) => items.push(item));
  const groupBy = (prop, list) => list.reduce(
    (groups, item) => ({
      ...groups,
      [item[prop]]: [...groups[item[prop]] ?? [], item]
    }),
    {}
  );
  let grouped = groupBy("name", items);
  function getCollected() {
    Object.keys(grouped).forEach((key) => {
      const items2 = grouped[key].filter((item) => get_store_value(item.store)?.collected);
      collected[key] = items2.length ?? 0;
    });
  }
  onDestroy(() => {
    unsubscribers.forEach((s) => s());
  });
  percentCollected = (item) => collected[item] ? collected[item] / countsWithBronco.find((c) => c.name === item)?.count : 0;
  $collectibleStores && getCollected();
  $$unsubscribe_collectibleStores();
  $$unsubscribe_page();
  return `<section class="sm:text-[1rem] text-[0.75rem] align-baseline px-2.5"><h2 class="h3 mt-2 mb-5" data-svelte-h="svelte-loiixu">Progress</h2> <div class="mx-2 grid grid-cols-2 gap-4">${each(Object.keys(grouped), (item) => {
    return `${windowSize > 450 ? `<div class="my-8 flex flex-col"><div class="flex justify-between"><div class="flex gap-2 text-base"><img class="-mt-0.5 mb-1" src="${"icons/collect/" + escape(slugifyName(item), true) + ".webp"}" width="32" height="32"${add_attribute("alt", item, 0)}${add_attribute("title", item, 0)}> <p${add_attribute("id", slugifyName(item), 0)}>${escape(item)}s</p></div> <p>${escape(collected[item])}
              / ${escape(countsWithBronco.find((c) => c.name === item).count)} </p></div> ${validate_component(ProgressBar, "ProgressBar").$$render(
      $$result,
      {
        meter: "bg-primary-500",
        track: "dark:bg-surface-400 bg-surface-200",
        value: percentCollected(item) * 100,
        height: "h-3",
        labelledby: slugifyName(item)
      },
      {},
      {}
    )} </div>` : `<div class="flex justify-center relative"><div class="absolute top-5"><div class="mx-auto flex flex-col items-center gap-0.5 sm: text-sm"><img height="32" width="32"${add_attribute("src", `/icons/collect/${slugifyName(item)}.webp`, 0)}${add_attribute("alt", item, 0)}> <span>${escape(collected[item])}
                / ${escape(countsWithBronco.find((c) => c.name === item).count)}</span> </div></div> ${validate_component(ProgressRadial, "ProgressRadial").$$render(
      $$result,
      {
        track: "stroke-surface-300/100",
        meter: "stroke-primary-500",
        value: percentCollected(item) * 100,
        width: "w-24"
      },
      {},
      {}
    )} </div>`}`;
  })}</div></section>`;
});
const PointCounter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $points, $$unsubscribe_points;
  let $itemsCollected, $$unsubscribe_itemsCollected;
  $$unsubscribe_points = subscribe(points, (value) => $points = value);
  $$unsubscribe_itemsCollected = subscribe(itemsCollected, (value) => $itemsCollected = value);
  $$unsubscribe_points();
  $$unsubscribe_itemsCollected();
  return `<div class="text-center dark:border-l-surface-600 py-6 bg-white dark:bg-surface-700 grid grid-cols-2 mx-0 box-border mt-10"><div class="border-r-[1px]"><span class="text-gray-700-token h2 block">${escape($points)}</span> <span class="text-gray-500-token" data-svelte-h="svelte-tgqy8c">SP earned</span></div> <div class="border-l-[1px] dark:border-l-surface-600"><span class="text-gray-700-token h2 block">${escape($itemsCollected)}</span> <span class="text-gray-500-token">${escape($itemsCollected === 1 ? "item" : "items")} collected</span></div></div>`;
});
const css = {
  code: '.sidebar.svelte-1mbywmr.svelte-1mbywmr{width:87%;max-width:340px;position:absolute;z-index:5000}@media(min-width: 600px){.sidebar.svelte-1mbywmr.svelte-1mbywmr{width:400px;min-width:340px}}section.svelte-1mbywmr.svelte-1mbywmr{scrollbar-gutter:stable;scrollbar-track-color:transparent;overflow-y:auto}.open.svelte-1mbywmr.svelte-1mbywmr{animation:svelte-1mbywmr-right 0.5s ease 0s 1 both}.closed.svelte-1mbywmr.svelte-1mbywmr{animation:svelte-1mbywmr-left 0.5s ease 0s 1 both}.toggle-container.svelte-1mbywmr.svelte-1mbywmr{height:48px;width:24px;position:absolute;top:calc(50% - 24px);border-radius:0 8px 8px 0;overflow-x:clip;clip-path:inset(-10px -10px -10px -1px);left:100%;border-left:1px solid rgba(79, 79, 79, 0.2)}.toggle-btn.svelte-1mbywmr.svelte-1mbywmr{cursor:pointer;z-index:5000;height:100%;width:100%}.toggle-btn.svelte-1mbywmr.svelte-1mbywmr::before{content:"";position:absolute;width:24px;height:48px;top:0;left:-1px;background:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%234B5057%22%20class%3D%22bi%20bi-caret-right-fill%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22m12.14%208.753-5.482%204.796c-.646.566-1.658.106-1.658-.753V3.204a1%201%200%200%201%201.659-.753l5.48%204.796a1%201%200%200%201%200%201.506z%22%2F%3E%3C%2Fsvg%3E") no-repeat 50% 50%;opacity:1}.open.svelte-1mbywmr .toggle-btn.svelte-1mbywmr::before{transform:rotate(180deg)}.closed.svelte-1mbywmr .toggle-btn.svelte-1mbywmr::before{transform:rotate(0deg)}@keyframes svelte-1mbywmr-left{0%{transform:translateX(0)}100%{transform:translateX(calc(-100% - 1px))}}@keyframes svelte-1mbywmr-right{0%{transform:translateX(calc(-100% - 1px))}100%{transform:translateX(0)}}',
  map: null
};
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const map = getContext("map")();
  const tabs = ["filters", "progress", "settings"];
  let activeTabIndex = 0;
  let sidebar;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<aside class="${[
      "sidebar bg-white dark:bg-surface-700 h-full shadow-md cursor-default select-none svelte-1mbywmr",
      "closed "
    ].join(" ").trim()}"${add_attribute("this", sidebar, 0)}><div class="sidebar-inner h-full w-full">${validate_component(TabGroup, "TabGroup").$$render(
      $$result,
      {
        class: "h-full",
        justify: "justify-center",
        padding: "md:py-3 py-2.5",
        regionList: "sticky top-0 right-1 bg-white dark:bg-surface-700",
        regionPanel: "bg-white h-full dark:bg-surface-700 overflow-y-auto",
        rounded: "0"
      },
      {},
      {
        panel: () => {
          return `<section class="md:text-base text-sm dark:bg-700 max-w-[390px] align-baseline svelte-1mbywmr">${activeTabIndex === 0 ? `${validate_component(FilterTree, "FilterTree").$$render($$result, { map }, {}, {})}` : `${activeTabIndex === 1 ? `${validate_component(Progress, "Progress").$$render($$result, {}, {}, {})} ${validate_component(PointCounter, "PointCounter").$$render($$result, {}, {}, {})}` : `${activeTabIndex === 2 ? `${validate_component(Settings, "Settings").$$render($$result, {}, {}, {})}` : ``}`}`}</section> `;
        },
        default: () => {
          return `${each(tabs, (tab, i) => {
            return `${validate_component(Tab, "Tab").$$render(
              $$result,
              {
                class: "w-1/3",
                name: tab,
                value: i,
                group: activeTabIndex
              },
              {
                group: ($$value) => {
                  activeTabIndex = $$value;
                  $$settled = false;
                }
              },
              {
                default: () => {
                  return `<span>${escape(tab.toUpperCase())}</span>`;
                }
              }
            )}`;
          })}`;
        }
      }
    )}</div> <div class="toggle-container bg-white dark:bg-surface-700 svelte-1mbywmr"><button class="toggle-btn leaflet-control ring-surface-50 svelte-1mbywmr"></button></div> </aside>`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $windowParams, $$unsubscribe_windowParams;
  let $page, $$unsubscribe_page;
  let $settings, $$unsubscribe_settings;
  $$unsubscribe_windowParams = subscribe(windowParams, (value) => $windowParams = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  const { locations, broncoLocations } = JSON.parse($page.data.data);
  let { width } = $windowParams;
  $$unsubscribe_windowParams();
  $$unsubscribe_page();
  $$unsubscribe_settings();
  return `${$$result.head += `<!-- HEAD_svelte-hy5o8u_START -->${$$result.title = `<title>Star Equestrian Map</title>`, ""}<!-- HEAD_svelte-hy5o8u_END -->`, ""}  ${validate_component(Map, "Map").$$render($$result, {}, {}, {
    default: () => {
      return `${width >= 300 ? `${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})}` : ``} ${validate_component(Spiderfier, "Spiderfier").$$render($$result, {}, {}, {
        default: () => {
          return `${each(locations, (location) => {
            return `${validate_component(Marker, "Marker").$$render($$result, { location }, {}, {})}`;
          })} ${$settings.broncoEnabled ? `${each(broncoLocations, (location) => {
            return `${validate_component(Marker, "Marker").$$render($$result, { location, isBronco: "true" }, {}, {})}`;
          })}` : ``}`;
        }
      })} ${validate_component(CondensedAttribution, "CondensedAttribution").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
