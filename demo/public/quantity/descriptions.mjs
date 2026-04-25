const desc = (summary, useCases, examples) => ({ summary, useCases, examples });

export const QUANTITY_DESCRIPTIONS = Object.freeze({

  length: desc(
    "Length is the most common quantity in BIM, AEC, and industrial design. It drives every spatial dimension in a model - from the thickness of a wall layer to the span of a structural beam or the run of a piping segment. Values are stored internally in meters, so any input unit (mm, cm, in, ft) is normalized automatically before reaching geometry or calculations.",
    [
      "Structural beams, columns, and braces - span and member length",
      "Architectural walls, slabs, and openings - height, width, thickness",
      "Piping and ducting - segment run, offset, elevation change",
      "Civil works - road alignment, pile length, excavation depth"
    ],
    [
      { label: "Beam span",       value: "7200 mm",  note: "typical composite floor beam" },
      { label: "Wall height",     value: "2.8 m",    note: "standard residential floor-to-floor" },
      { label: "Slab thickness",  value: "200 mm",   note: "post-tensioned flat slab" },
      { label: "Pipe segment",    value: "3.5 m",    note: "prefabricated spool run" }
    ]
  ),

  area: desc(
    "Area quantifies two-dimensional extent - the surface of a floor, the cross-section of a structural member, or the heat-transfer face of equipment. Stored internally in m², it converts cleanly to mm², cm², or ft² for different disciplines. In BIM, area drives quantity take-offs, cost estimating, and code-compliance checks.",
    [
      "Room and floor areas - GFA, NLA, and occupancy load calculations",
      "Structural cross-sections - column, beam, and plate sizing",
      "HVAC and thermal - heat-transfer surface, duct cross-section",
      "Site and civil - plot coverage, paved area, landscaping zones"
    ],
    [
      { label: "Open-plan office",   value: "240 m²",    note: "single floor plate" },
      { label: "Pipe cross-section", value: "78.5 cm²",  note: "DN 100 nominal bore" },
      { label: "Steel column",       value: "14400 mm²",  note: "120 × 120 mm hollow section" },
      { label: "Roof area",          value: "850 m²",    note: "industrial warehouse" }
    ]
  ),

  volume: desc(
    "Volume covers three-dimensional capacity and material quantities - concrete pours, tank storage, earthworks, or fluid flow volumes. Internally stored in m³, it can be displayed in liters, cm³, or gallons depending on the discipline. Accurate volume tracking is critical for cost control and procurement in construction and process engineering.",
    [
      "Concrete - pour volume per element or pour sequence",
      "Tanks and vessels - working capacity and total volume",
      "Earthworks - cut, fill, and net balance calculations",
      "Process - batch volume, hold-up volume, and ullage"
    ],
    [
      { label: "Concrete slab pour",  value: "12.5 m³",   note: "450 m² × 200 mm slab" },
      { label: "Storage tank",        value: "50000 L",   note: "vertical cylindrical tank" },
      { label: "Excavation volume",   value: "380 m³",    note: "basement cut" },
      { label: "Reactor hold-up",     value: "2.4 m³",    note: "process vessel working volume" }
    ]
  ),

  angle: desc(
    "Angle controls rotation, orientation, inclination, and bends throughout engineering models. Stored internally in radians (the SI base unit), it is almost always displayed in degrees for user interaction. Angles drive pipe elbow geometry, structural frame orientation, roof pitch, equipment mounting, and coordinate system rotations.",
    [
      "Piping - elbow angle, branch fitting angle, valve orientation",
      "Structural - member inclination, connection angle, brace angle",
      "Architecture - roof pitch, ramp gradient, curtain wall rake",
      "Equipment - rotation from north, mounting angle, shaft alignment"
    ],
    [
      { label: "Pipe elbow",       value: "45 °",   note: "standard long-radius elbow" },
      { label: "Roof pitch",       value: "30 °",   note: "residential gable" },
      { label: "Stair inclination",value: "38 °",   note: "typical code-compliant stair" },
      { label: "Brace angle",      value: "60 °",   note: "diagonal brace in braced frame" }
    ]
  ),

  temperature: desc(
    "Temperature is central to HVAC design, process engineering, and material specification. Stored internally in °C, it converts to °F and K without ambiguity. In process plants, temperature determines insulation class, material selection, and safety category. In buildings, it sets HVAC setpoints, comfort zones, and condensation risk thresholds.",
    [
      "HVAC - room setpoints, supply air temperature, chilled water setpoint",
      "Process piping - design temperature for class and insulation selection",
      "Fire protection - sprinkler bulb rating, passive fire boundary",
      "Thermal bridging - surface temperature and condensation risk"
    ],
    [
      { label: "HVAC cooling setpoint", value: "22 °C",   note: "occupied office space" },
      { label: "Steam line design",     value: "180 °C",  note: "medium-pressure steam service" },
      { label: "Cryogenic service",     value: "-196 °C", note: "liquid nitrogen line" },
      { label: "Fire boundary",         value: "538 °C",  note: "standard fire exposure limit" }
    ]
  ),

  mass: desc(
    "Mass drives structural load calculations, equipment handling, transport logistics, and material procurement. Stored internally in kg, it scales to grams for small components and metric tonnes for heavy equipment or bulk materials. In BIM, mass feeds into load take-downs, foundation design, and crane lift plans.",
    [
      "Structural - self-weight of beams, columns, slabs, and connections",
      "Equipment - dry weight, operating weight, and hydrotest weight",
      "Piping - pipe spool weight for support design and lifting",
      "Procurement - bulk material quantities by weight"
    ],
    [
      { label: "Steel beam",          value: "320 kg",   note: "UB 457 × 191 × 67, 5 m span" },
      { label: "Centrifugal pump",    value: "450 kg",   note: "operating weight with casing" },
      { label: "Concrete column",     value: "1.2 t",    note: "400 × 400 mm × 3 m" },
      { label: "Pipe spool",          value: "85 kg",    note: "DN 150 carbon steel, 6 m spool" }
    ]
  ),

  force: desc(
    "Force appears in structural load cases, anchor design, lifting operations, and equipment reactions. Stored internally in Newtons, it is displayed in kN for most structural engineering contexts. Forces are applied as point loads, distributed loads, and reactions - all requiring consistent unit handling to avoid catastrophic misinterpretation.",
    [
      "Structural loads - dead load, live load, wind, seismic, and snow",
      "Connections - bolt group shear, weld capacity, anchor tension",
      "Equipment - nozzle loads, base plate reactions, vibration forces",
      "Lifting - rigging sling load, crane hook load, lifting lug capacity"
    ],
    [
      { label: "Wind load on facade",  value: "15 kN",   note: "per column at facade" },
      { label: "Bolt preload",         value: "120 kN",  note: "M24 class 10.9 structural bolt" },
      { label: "Equipment reaction",   value: "45 kN",   note: "pump base plate vertical" },
      { label: "Crane hook load",      value: "250 kN",  note: "25 t lift with dynamic factor" }
    ]
  ),

  pressure: desc(
    "Pressure is a fundamental design parameter in process engineering, HVAC, and hydraulic systems. Stored internally in Pascals, it converts to kPa, MPa, and bar for different applications. In piping, pressure defines the pipe class and flange rating. In HVAC, static pressure determines fan selection and duct sizing. Gauge vs. absolute distinction must be handled by the output preset.",
    [
      "Process piping - design pressure for pressure class and wall thickness",
      "Pressure vessels - MAWP, test pressure, and relief valve setting",
      "HVAC - duct static pressure, fan total pressure, system resistance",
      "Hydraulics - pump head, system pressure drop, surge pressure"
    ],
    [
      { label: "HVAC duct static",       value: "250 Pa",   note: "low-pressure supply duct" },
      { label: "Process design pressure",value: "1.6 MPa",  note: "Class 150 piping system" },
      { label: "Hydraulic system",       value: "20 bar",   note: "industrial hydraulic circuit" },
      { label: "Relief valve set",       value: "2.1 MPa",  note: "10% above MAWP" }
    ]
  ),

  time: desc(
    "Time in engineering contexts covers process durations, inspection intervals, cycle times, and hold periods - not clock time. Stored internally in seconds, it is displayed in minutes or hours for most applications. Time parameters appear in process datasheets, commissioning procedures, maintenance schedules, and construction program milestones.",
    [
      "Process - reaction time, hold time, heat-up and cool-down ramp duration",
      "Commissioning - flushing duration, pressure test hold period",
      "HVAC - air change interval, purge time, control loop period",
      "Maintenance - inspection interval, overhaul cycle, mean time to repair"
    ],
    [
      { label: "Pressure test hold",  value: "30 min",  note: "hydrostatic test per code" },
      { label: "Heat-up ramp",        value: "45 min",  note: "process reactor start-up" },
      { label: "HVAC purge",          value: "10 min",  note: "air change before occupancy" },
      { label: "Inspection interval", value: "2 h",     note: "operator round frequency" }
    ]
  ),

  ratio: desc(
    "Ratio represents dimensionless proportions - efficiency, slope gradient, concentration, fill factor, or any quantity expressed as a fraction or percentage. Because there is no physical unit to convert, the internal value is stored as-is. Ratios appear throughout engineering as performance indicators, code thresholds, and material properties.",
    [
      "Mechanical - pump efficiency, motor power factor, gearbox ratio",
      "Civil - road gradient, slope stability factor, bearing capacity ratio",
      "Process - conversion rate, yield, reflux ratio, turndown ratio",
      "Structural - slenderness ratio, utilization factor, load ratio"
    ],
    [
      { label: "Pump efficiency",     value: "78 %",   note: "at best efficiency point" },
      { label: "Road gradient",       value: "2 %",    note: "maximum highway grade" },
      { label: "Utilization factor",  value: "0.92",   note: "structural member check" },
      { label: "Reflux ratio",        value: "3.5",    note: "distillation column design" }
    ]
  )
});
